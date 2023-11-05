'use client'

import { useGetContestsQuery } from '@/app/Services/baseApi'
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formattedDateFn } from '@/lib/utils';

export default function MyContests() {
    const { data: contestData, currentData, isLoading, isSuccess } = useGetContestsQuery({}, { refetchOnMountOrArgChange: true });
        
    if(isLoading) {<div>Загрузка...</div>}

    return (
        <div>
            <div><h1>Проведенные розыгрыши</h1>   
            { isSuccess && <div> 
                { contestData.data.length > 0 ?<>
                {
                    contestData.data.map((userWinner: any) => {
                    let formattedDate = formattedDateFn(userWinner.createdAt); 
                        
                    return (
                        <Card key={userWinner.id} className='mb-10'>
                        <CardHeader>
                        <CardTitle className='!text-base !mt-0 min-h-[50px] flex items-center'>
                            <img src={userWinner.group.photo_200} width={50} height={50} className='rounded-3xl mr-2' />
                            {userWinner.group.name}
                        </CardTitle>
                        <CardDescription>{userWinner.group.screen_name}</CardDescription>
                        <CardDescription><span className='font-semibold'>Описание сообщества</span>: { userWinner.group.description } </CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className='flex'>
                            {/* <Link href={'http://127.0.0.1:3000/winner/' + userWinner.contest_id}>
                                <img src={userWinner.user_photo} width={150} height={150} alt={userWinner.first_name}></img>
                            </Link> */}
                            <div className=' flex flex-col'>
                                <span><span className='font-semibold'>Дата проведения</span>: {formattedDate}</span>
                                    <span><span className='font-semibold'>Количестов победителей</span>: {userWinner.prizes_count}</span>
                                    <span><span className='font-semibold'>Условия участия</span>: {userWinner.contest_type}</span>
                                    {/* <span>Ссылка на пост: https://vk.com/wall-115202970_21910</span> */}
                                    {/* <span>Публикация результатов:</span> */}
                            </div>
                        </div>
                        </CardContent> 
                        
                        <CardFooter className="flex justify-between">
                        <Link href={'http://127.0.0.1:3000/winner/' + userWinner.contest_id}>
                            <Button className=' bg-green-600  text-white'  variant='outline'>Подробнее</Button>
                        </Link>
                        <Link href={`https://vk.com/${userWinner.group.screen_name}?w=wall`+ userWinner.wall_id}>
                            <Button className=' bg-blue-500 text-white'  variant='outline'>Посмотреть пост</Button>
                        </Link>
                        </CardFooter>
                    </Card>
                    )
                }
            )      
                }</>
                : <div>У вас нет проведенных розыгрышей</div>
                }
            </div>
            }
    </div>
    </div>
  )
}
