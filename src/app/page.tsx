'use client';

import { DataTable } from '@/modules/data-table';
import { columns } from '@/modules/columns';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@/handlers';
import { UserNav } from '@/modules/user-nav';

export default function Home() {
  const { data } = useQuery({
    queryFn: getTodos,
    queryKey: ['todos'],
    initialData: [],
  });

  return (
    <div className="h-full max-w-5xl w-full flex-col space-y-10 p-1 lg:p-8 md:flex">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight m-0 p-0">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">
            Have a productive day and don't forget to take breaks!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
