import { db } from '@/db/client';
import { todo, todoInsertSchema } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  return Response.json(
    await db.query.todo.findFirst({
      where: eq(todo.id, params.id),
    }),
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } },
) {
  const res = await request.json();

  // Validate the request body against the schema
  const body = todoInsertSchema.parse(res);

  await db
    .update(todo)
    .set({
      updatedAt: new Date(),
      title: body.title,
      priority: body.priority,
      status: body.status,
    })
    .where(eq(todo.id, params.id))
    .returning();

  return Response.json(body);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  await db.delete(todo).where(eq(todo.id, params.id)).returning();

  return Response.json({
    message: 'Todo deleted',
  });
}
