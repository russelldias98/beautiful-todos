'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodoById, updateTodoToCompleted } from '@/handlers';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useToast } from '@/components/ui/use-toast';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const [isExploding, setIsExploding] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync: updateTodoToCompletedMutation } = useMutation({
    mutationFn: updateTodoToCompleted,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const navigateToDetail = () => {
    router.push(`/todo?id=${row.getValue('id')}`);
  };

  const status = row.getValue('status');

  return (
    <DropdownMenu>
      {isExploding && <Confetti width={1000} height={1000} />}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={navigateToDetail}>Edit</DropdownMenuItem>
        {status === 'todo' && (
          <DropdownMenuItem
            onClick={async () => {
              setIsExploding(true);
              await updateTodoToCompletedMutation(row.getValue('id'));
              toast({
                title: 'Todo marked as completed! :)',
                description: "Keep up the good work! You're doing great!",
              });
              setTimeout(() => {
                setIsExploding(false);
              }, 3500);
            }}
          >
            Mark as Completed
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={async () => {
            await deleteTodoMutation(row.getValue('id'));
            toast({
              title: 'Todo deleted! :(',
            });
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
