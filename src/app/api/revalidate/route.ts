import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * POST /api/revalidate
 * Called by the WordPress plugin whenever portfolio content is published/updated.
 * Body: { path: string; secret: string }
 */
export async function POST(req: NextRequest) {
  const { path, secret } = await req.json();
  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
