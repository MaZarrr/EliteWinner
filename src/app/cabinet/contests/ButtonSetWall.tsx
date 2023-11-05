'use client'

import { choosePost } from '@/app/GlobalProvider/Features/appSlice';
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ButtonSetWall({ options }: any) {
    
    const router = useRouter();
    const dispatch = useAppDispatch();

    const setWall = (e) => {
        const params = JSON.parse(e.target.dataset.options)
        dispatch(choosePost(params))
        router.back();
    }

  return (
    <div className='mt-2'>
    <Button 
      variant={'outline'} 
      data-options={JSON.stringify(options)}
      className="p-2 bg-blue-600 text-white border-cyan-600 w-full" 
      onClick={setWall}>Выбрать
    </Button>
  </div>
  )
}
