import { db } from '@/db/client';
import { todo, todoInsertSchema } from '@/db/schema';
import { z } from 'zod';
import { asc, eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const res = await request.json();

  // Validate the request body against the schema
  const body = todoInsertSchema.parse(res);

  await db
    .insert(todo)
    .values({
      ...body,
      updatedAt: new Date(),
    })
    .returning();

  return Response.json(body);
}

const putSchema = z.object({
  id: z.number(),
});

export async function PUT(request: Request) {
  const res = await request.json();

  // Validate the request body against the schema
  const body = putSchema.parse(res);

  await db
    .update(todo)
    .set({
      status: 'completed',
      updatedAt: new Date(),
    })
    .where(eq(todo.id, body.id))
    .returning();

  return Response.json(body);
}

export async function GET(request: Request) {
  return Response.json(
    await db.query.todo.findMany({
      orderBy: asc(todo.status),
    }),
  );
}
