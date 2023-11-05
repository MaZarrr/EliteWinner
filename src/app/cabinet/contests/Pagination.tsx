'use client'

import { Button } from '@/components/ui/button'
import useScroll from '@/hooks/useScroll'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function Pagination({ currentOffset, groupId, offset }: any) {
const element = document.querySelector('.container_Walls');

const [visible] = useScroll({ isVisible: false, ancor: 'bottom', count: 100, targetElement: element });
useEffect(() => {
        console.log("visible", visible);
        console.log("element", element);

    }, [visible, element])
  return (
    <>
    { visible &&
        <div className='absolute bottom-3 ml-[30%] '>
        <Link replace href={`cabinet/contests/likes/${groupId}?offset=${Number(currentOffset) - 10}`}>
        <Button className='bg-slate-100 hover:bg-sky-700 hover:text-white' variant={'outline'}>Назад</Button>
        {/* <Button className='bg-slate-100 hover:bg-sky-700 hover:text-white' disabled={offset == 0 ? true : false} variant={'outline'}>Назад</Button> */}
        </Link>
        <Link replace href={`cabinet/contests/likes/${groupId}?offset=${Number(currentOffset) + 10}`}>
        {/* <Button className='bg-slate-100 hover:bg-sky-700 hover:text-white' variant={'outline'} 
        disabled={walls?.data?.length >= offset}>Вперед</Button> */}
        <Button className='bg-slate-100 hover:bg-sky-700 hover:text-white' variant={'outline'} >Вперед</Button>
        </Link></div>
    }
    </>
  )
}
