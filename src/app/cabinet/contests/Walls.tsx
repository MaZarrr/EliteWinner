import { getWall } from '@/app/Services/serverApi';
import ButtonSetWall from './ButtonSetWall';
import Pagination from './Pagination';

export default async function Walls({ data: { params: { groupId }, searchParams: { offset, type} } }: any) {
  let currentOffset = Number(offset);
  const walls = await getWall({ groupId, offset: currentOffset });
  console.log("wallws__", walls);
  
  return (
  <div className='container_Walls min-h-[250px] max-[600px]:h-[450px] h-[80vmin] overflow-auto mt-7'>
  {/* <div className='min-h-[250px] h-[75vmin] overflow-auto mt-7'> */}
  { walls.data &&
  walls.data.map((wall: any, idx: any) => {
  const image = wall?.attachments[0]?.photo?.sizes[walls?.data[0]?.attachments[0]?.photo?.sizes.length - 2] // mobile
  return (
    <div key={wall.id} className={`${idx === 0 ? 'pt-0' : 'pt-6' } px-0 pb-0 sm:text-[14px] text-[12px]`}>
        <span className='flex max-[600px]:flex-col'>
          <img className='max-[600px]:m-auto md:h-[300px] mr-2' src={image?.url} width={300} height={300} alt='Пост' />
          {wall.text.slice(0, 500)}
        </span>
        <ButtonSetWall options={{
            image,
            type: 'post',
            extended: 1,
            skip_own: true,
            item_id: wall.id,
            group_id: groupId,
            text: wall.text,
            from_id: wall.from_id,
            owner_id: wall.from_id,
            wall_id: `${wall.owner_id}_${wall.id}`,
            filter: 'likes' }}/>

        {/* <ChooseWinner options={ {
            type: 'post',
            owner_id: wall.from_id,
            item_id: wall.id,
            extended: 1,
            group_id: groupId,
            skip_own: true,
            wall_id: `${wall.owner_id}_${wall.id}`,
            filter: 'likes'
        }} /> */}
    </div>
  )
})
}

<Pagination 
    currentOffset={currentOffset} 
    groupId={groupId} 
    offset={offset}/>
</div>
  )
}
