import axios from 'axios';
import { todoInsertSchema } from '@/db/schema';
import { z } from 'zod';

export const getTodos = async () => {
  return await axios.get('/api/todos').then((d) => d.data);
};

export const createTodoHandler = async (
  data: z.infer<typeof todoInsertSchema>,
) => {
  return await axios.post('/api/todos', {
    ...data,
  });
};

export const updateTodoById = async (
  data: z.infer<typeof todoInsertSchema>,
) => {
  return await axios.put(`/api/todos/${data.id}`, data).then((d) => d.data);
};

export const updateTodoToCompleted = async (id: string) => {
  return await axios.put('/api/todos', {
    id,
  });
};

export const getTodoById = async (id: string | null) => {
  return await axios.get(`/api/todos/${id}`).then((d) => d.data);
};

export const deleteTodoById = async (id: string | null) => {
  return await axios.delete(`/api/todos/${id}`).then((d) => d.data);
};
