import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, response: NextResponse) {
  // const cookie = response.cookies.get('hash');
  // console.log("cookie__", cookie);
     return NextResponse.json(
      {},
      { status: 200 }
    )
  // // try {
  //   if(cookie) {
  //     return NextResponse.json(
  //       {ok: true},
  //       { status: 200 }
  //     )
  //   // }
  //   // const response = await fetch('http://127.0.0.1:2023/login', {
  //   //     method: 'GET', 
  //   //     credentials: 'include',
  //   //     cache: 'no-store',

  //   //   });
  //   // const result = await response.json();
  //   // console.log("GET_api/auth", result);
    
  //   // return NextResponse.json(
  //   //   {...result},
  //   //   { status: 200 }
  //   // )
  // } else {
  // // } catch (error) {
  //       return NextResponse.json(
  //           {ok: false},
  //           { status: 401 }
  //         )
  // }
}