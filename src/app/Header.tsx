import Auth from "@/components/header/Auth";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "./Services/serverApi";
import { cookies } from "next/headers";

async function Header() {
    const cookieName =  cookies().get('hash');
    let mee;
    if(cookieName) {
       mee = await getMe();
    }

  return (
    <header className='flex sticky z-10 top-0 max-sm:px-3 w-full shadow-md space-x-10 px-8 justify-between items-center  bg-orange-500'>
          <Link href={'/'}>
                <Image className='py-2' src={'/logo.png'} width={70} height={70} alt="Мой конкурс" />
          </Link>
        {/* <ul className="list-none flex  justify-evenly items-center">
          <li>
            Проверить победителя
          </li>
          <li>
            Проверить победителя
          </li>
          <li>
            Проверить победителя
          </li>
        </ul> */}
        {/* <div>возможности</div> */}
        <div className='flex items-center text-sm'>
            {mee && <div className='flex justify-center flex-col'>
              <img className='rounded-full' src={mee?.photo_100} width={60} height={60}></img>
            </div>}
            <div className='flex justify-center flex-col pl-2'>
               {/* { mee && <div className='text-center'>{mee?.first_name }</div>} */}
                <Auth mee={mee}/>
              </div>
            </div>
    </header>
  )
}

export default Header;
