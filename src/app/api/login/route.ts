// import { redirect } from "next/navigation";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(request.url);
  console.log("searchParams_",searchParams);
  
  const id = searchParams.get('code');
  // // let body = await request.json();
  console.log("api/login_body", id);
  const headers = new Headers();
  headers.set('Content-Type', 'application/json')
  const user =  await fetch('http://127.0.0.1:2023/auth', {
    method: 'POST', 
    headers,
    credentials: 'include',
    body: JSON.stringify({code: searchParams.get('code')})     
});
// console.log("dddddddd", await user.json());

  const data = await user.json();
  console.log("user_data", data);
     NextResponse.json(
      {
          ok: false,
      },
      { status: 200 }
    )
  // if(true) {
    // const { userId, hash } = data;
    // console.log("userIdhash", hash);
    
    // const response = NextResponse.json(
    //   {
    //       ok,
    //   },
    //   { status: 200 },
    // )
    res.cookies.set({
      name: 'hash',
      value: data.hash,
      httpOnly: true,
      maxAge: 60 * 60,
    });
    // return response;
    return NextResponse.redirect('http://127.0.0.1:3000');
    // return NextResponse.redirect(new URL('http://127.0.0.1:3000/auth', request.url));
  // } else {
  //  return NextResponse.json(
  //     {
  //         ok: false,
  //     },
  //     { status: 200 }
  //   )
  // }
}