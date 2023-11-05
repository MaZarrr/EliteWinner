// 'use client'
// import Link from "next/link";
// import { useSearchParams, useRouter, redirect } from "next/navigation";
// import { useEffect } from "react";
// import { useAppDispatch } from "@/hooks";

export default function Auth() {
  // const router = useRouter();
  // const dispatch = useAppDispatch();
  // const searchParams = useSearchParams();
  
  // async function fetchData(authCode: any) {
  //     const headers = new Headers();÷
  //     headers.set('Content-Type', 'application/json')
  //   try {
  //    const res =  await fetch('http://127.0.0.1:2023/auth', {
  //       method: 'POST', 
  //       headers,
  //       credentials: 'include',
  //     body: JSON.stringify({code: authCode})     
  // });
    // localStorage.setItem('usr', JSON.stringify(await res.json() || {}))
    // window.location.assign("http://127.0.0.1:3000");
    // router.push('/');
  // } catch (error) {
  //       console.log("err", error);
  //   }
  // }


  // useEffect(() => {
        // fetchData(searchParams.get('code'));
        // localStorage.setItem('token', 'asdasfafawf')
        // return () => clearTimeout(timeout);
  // }, []);


  return (
<>
{/* <Link href={'/cabinet'}>To Cabinet</Link>
    <button>AuthPage</button> */}
</>

  )
}