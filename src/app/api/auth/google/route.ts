import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';



export async function POST(req: NextRequest) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error('Missing GOOGLE_CLIENT_ID');
  }

  const client = new OAuth2Client(clientId);
  try {
    const { credential } = await req.json() as { credential: string };

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    // Set session or cookie here if needed
    return NextResponse.json({ success: true, user: payload });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
