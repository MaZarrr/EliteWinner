import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, response: NextResponse) {
  // const cookie = response.cookies.get('hash');
     return NextResponse.json(
      {},
      { status: 200 }
    )
}