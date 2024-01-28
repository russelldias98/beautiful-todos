'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { todoInsertSchema } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodoHandler, getTodoById, updateTodoById } from '@/handlers';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Loader from '@/modules/loader';

const TodoDetail = ({
  isCreate,
  id,
}: {
  isCreate: boolean;
  id: string | null;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof todoInsertSchema>>({
    resolver: zodResolver(todoInsertSchema),
  });

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['todo', id],
    enabled: !!id,
    queryFn: () => getTodoById(id),
  });

  const { mutateAsync: mutateCreateTodo } = useMutation({
    mutationFn: createTodoHandler,
    onSuccess: async () => {
      router.push('/');
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: 'Todo created! :)',
      });
    },
  });

  const { mutateAsync: mutateUpdateTodo } = useMutation({
    mutationFn: updateTodoById,
    onSuccess: async () => {
      router.push('/');
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: 'Todo updated! :)',
      });
    },
  });

  const handleBack = () => {
    router.back();
  };

  const actionText = isCreate ? 'Create' : 'Update';

  async function onSubmit(values: z.infer<typeof todoInsertSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (isCreate) {
      await mutateCreateTodo(values);
    } else {
      await mutateUpdateTodo(values);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset(data);
    }
  }, [isSuccess]);

  if (isFetching) {
    return <Loader count={10} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 items-center">
        <Button onClick={handleBack} variant="outline" size="icon">
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h4>{`${actionText} todo`}</h4>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Type out your todo..." {...field} />
                </FormControl>
                <FormDescription>
                  Be descriptive, but not too descriptive.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>How important is this todo?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{actionText}</Button>
        </form>
      </Form>
    </div>
  );
};

export default TodoDetail;
