'use client';

import TodoDetail from '@/modules/TodoDetail';
import { useSearchParams } from 'next/navigation';

const TodoItem = () => {
  const params = useSearchParams();
  const isCreate = !!params.get('create');
  const updateId = params.get('id');

  return (
    <div className="max-w-lg w-full">
      <TodoDetail isCreate={isCreate} id={updateId} />
    </div>
  );
};

export default TodoItem;
