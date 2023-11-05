import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    const cookiesList = cookies();
    const hasCookie = cookiesList.has('theme');
    if(hasCookie) {
        response.cookies.delete('hash');
        return NextResponse.json({ isAuth: false  }, { status: 200 })
    }
    return NextResponse.json({ isAuth: true  }, { status: 200 })
} 