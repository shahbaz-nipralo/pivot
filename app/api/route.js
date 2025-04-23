// app/api/store-user-in-strapi/route.js

import { NextResponse } from 'next/server';
import { storeUserInStrapi } from '@/utils/strapi';

export async function POST(req) {
  const { user } = await req.json();
  console.log("Frontend sent user:", body.user);

  if (!user || !user.email) {
    return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
  }

  const saved = await storeUserInStrapi(user);
  return NextResponse.json(saved);
}
