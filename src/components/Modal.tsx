'use client'
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { Cross1Icon } from '@radix-ui/react-icons'
// import Link from 'next/link'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    document.body.style.overflow = 'auto';
    router.back()
    // router.
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
    //   if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
    //   }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

const onDestroy = () => {
    document.removeEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'auto';
}

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown)
    return () => onDestroy();
  }, [onKeyDown])


  return (
    <div
        ref={overlay}
        className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
        // onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute pb-0 bg-[aliceblue] pt-[10px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
        >
        <div className='h-full'>
        <div className='absolute flex items-center mb-2 shadow-md top-0 left-0 w-full bg-slate-50 px-2'>
          Выберите пост
        <Cross1Icon onClick={onClick} className='p-1 ml-auto cursor-pointer' width={"35px"} height={"35px"}/>
    </div>
        {children}
      </div>
    </div>
    </div>

  )
}