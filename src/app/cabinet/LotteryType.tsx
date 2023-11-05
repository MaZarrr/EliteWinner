import Image from "next/image";
import Link from 'next/link';

export default function LotteryType(props) {
    console.log("LotteryType_props", props);
  return (
    // <div className='p-12'>
    <div className='flex'>
    <div className='w-44 p-7  mr-5  bg-orange-300 cursor-pointer'>
    <Link href={'cabinet/contests/likes'}>
      <Image className='py-2 m-auto' src={'/love.png'} width={70} height={70} alt="Мой конкурс" />
      <div className='text-center'>Выбрать победителя лайки</div>
    </Link>
    </div>
    <div className='w-44 p-7 mx-5  bg-fuchsia-300 cursor-pointer'>
    <Link href={'cabinet/contests/auction'}>
      <Image className='py-2 m-auto' src={'/share.png'} width={70} height={70} alt="Мой конкурс" />
      <div className='text-center'>Выбрать победителя репосты</div>
    </Link>
    </div>
    <div className='w-44 p-7 mx-5  bg-green-300 cursor-pointer'>
    <Link href={'cabinet/contests/randomNum'}>
      <Image className='py-2 m-auto' src={'/numbers.png'} width={70} height={70} alt="Мой конкурс" />
      <div className='text-center'>Выбрать победителя случайное число</div>
    </Link>
    </div>
  </div>
// </div>
  )
}
