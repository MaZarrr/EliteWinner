import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

export default function Groups({ groups }: any) {
    
 return (
    <div className='grid gap-3 max-[600px]:grid-cols-1 max-[1000px]:grid-cols-2 grid-cols-3 min-[1550px]:grid-cols-4 justify-items-stretch'>
    {
        groups.data.map((group: any) => {
          return (
              <Card key={group.id}>
              <CardHeader>
                <CardTitle className='!text-lg !mt-0 min-h-[60px]'>{group.name}</CardTitle>
                <CardDescription>{group.screen_name}</CardDescription>
              </CardHeader>
              <CardContent>
                  <img src={group.photo_200} width={100} height={100} className='rounded-3xl' />
              </CardContent>
              
              <CardFooter className="flex justify-between">
                { !group.isAuth ?<><Link href={`https://oauth.vk.com/authorize?client_id=51626351&display=page&redirect_uri=http://127.0.0.1:3000/auGfswrrr&group_ids=${group.id}&scope=messages,manage,photos,docs&response_type=code&v=5.131`}> 
                                    <Button className=' hover:bg-green-600  hover:text-white' variant="outline">Подключить</Button>
                                </Link> 
                                <div className='max-sm:mb-1'><span className=' text-red-500 text-sm '>не подключено</span></div></>
                                : <Button className=' bg-green-600  text-white'  variant='secondary'>Подключено</Button>
                }
              </CardFooter>
            </Card>
          )
      })
    }
</div>
  )
}