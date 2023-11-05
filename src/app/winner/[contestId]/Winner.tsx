import { getWinner } from '@/app/Services/serverApi';
import { formattedDateFn } from '@/lib/utils';
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

export default async function Winner({data: { params: { contestId } }}: any) {
    const winner = await getWinner({ contest_id: contestId })
    console.log("winner__winner", winner);

    const date = formattedDateFn(winner.data.winners[0].createdAt);
    const group = winner.data.group[0];
    const prizes_count = winner.data.winners[0].prizes_count;
    const conditionsLabel = winner.data.winners[0].contest_type;
    console.log("winner__group", group);

    return (
    <div className='flex'>
        { winner.data && <>
            <Card className='mb-10 rounded-xl border-none'>
                        <CardHeader>
                        <CardTitle className='!text-base !mt-0 min-h-[50px] flex items-center'>
                            <img src={group.photo_200} width={50} height={50} className='rounded-3xl mr-2' />
                                <div className='flex flex-col'>
                                <span> {group.name}</span>
                                <span className=' font-normal'>{group.screen_name}</span>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            {group.description}
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className=' flex flex-col'>
                            <span><span className='mr-2 font-semibold'>Розыгрыш проведен:</span>{date}</span>
                            <span><span className='font-semibold mr-2'>Количество победителей: </span>{prizes_count}</span> 
                            <span><span className='font-semibold'>Условия участия</span>: {conditionsLabel}</span>
                            {/* <span>Ссылка на пост: https://vk.com/wall-115202970_21910</span> */}
                            {/* <span>Публикация результатов:</span> */}
                        
                            
                        </div>
                        </CardContent> 
                        
                        <CardFooter className="grid gap-3 max-[600px]:grid-cols-1 max-[1000px]:grid-cols-2 grid-cols-4 min-[1550px]:grid-cols-4 justify-items-center">
                        <div className=''>
                            {/* Winners */}
                            { winner.data.winners.map((winner: any) => {
                                return (
                                    <div key={winner.id}>
                                    <div>
                                        <p>{winner.first_name}</p>
                                        <p>{winner.last_name}</p>
                                    </div>                
                                        <p>{winner.prize_name}</p>        
                                        <img src={winner.user_photo} width={150} height={150} alt={winner.first_name} />
                                    </div>
                                    )
                                })
                            }
                        </div>

                        {/* <Link href={''}>
                            <Button className=' bg-green-600  text-white'  variant='outline'>Подробнее</Button>
                        </Link>
                        <Link href={''}> */}
                        {/* <Link href={`https://vk.com/${userWinner.group.screen_name}?w=wall`+ userWinner.wall_id}> */}
                            {/* <Button className=' bg-blue-500 text-white'  variant='outline'>Посмотреть пост</Button>
                        </Link> */}
                        </CardFooter>
                    </Card>
            </>
        }
    </div>
  )
}