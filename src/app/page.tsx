import Link from "next/link";
import hrefRedirect from "./lib/hrefRedirect";

export default async function Home() {
  
  return (
    <div className="flex flex-col w-full items-center justify-between font-mono text-sm">
      <h1 className='mt-14'>
        МойКонкурс - легкий способ определить победителя в конкурсе
      </h1>

      <button className='mt-14 px-4 py-3 w-52 shadow-md text-cyan-900 bg-red-300 rounded-lg'>
        <Link href={hrefRedirect()}>Провести розыгрыш</Link> 
       {/* {!isAuth ? <a href={hrefRedirect()}>Провести розыгрыш</a> : <Link href={'/cabinet'}>Провести розыгрыш</Link> }  */}
      </button>
      <button className='mt-14 px-4 py-3 w-52 shadow-md text-cyan-900 bg-red-300 rounded-lg'>

        <Link href={'/cabinet'}>Кабинет</Link> 
      </button>
      <button className='mt-14 px-4 py-3 w-52 shadow-md text-cyan-900 bg-red-300 rounded-lg'>
        <Link href={'/cabinet/mycontests'}>Мои конкурсы</Link> 
      </button>

    </div>
  )
}
