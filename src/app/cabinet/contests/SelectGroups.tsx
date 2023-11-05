'use client'

import { useGetGroupsQuery } from "@/app/Services/baseApi"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch } from "@/hooks"
import { CheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SelectGroups({ defaultGroup, wallText, lotteryType }: any) {
    const { isError, isLoading, data = {} } = useGetGroupsQuery({});
    const dispatch = useAppDispatch();

    const router = useRouter();

    useEffect(() => { // для переключения в режим диалогового окна при жестрой перезагрузке
        // defaultGroup = 'Выберите группу';
        if(defaultGroup) {
          router.push('/cabinet/contests/likes/'+defaultGroup)
        }
      }, [defaultGroup])

    
    function changeGroup(value: string) {
        router.push(`/cabinet/contests/likes/${value}`)
        // router.push(`/cabinet/contests/${lotteryType}/${value}`)

      }

  return (
    <>
    { !isLoading && <Card className=' bg-gray-50 mb-5'>
    <CardHeader>
      <CardTitle className='!text-lg !mt-0'>Группа, где будет запущен проект</CardTitle>
    </CardHeader>
    <CardContent>
        <Select defaultValue={defaultGroup} onValueChange={changeGroup} >
        <SelectTrigger className="w-full sm:w-4/5">
          <SelectValue placeholder="Выберите группу"/>
        </SelectTrigger>
        <SelectContent className='bg-white h-[300px]'>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
            {
              data.data.map((group: any) => {
                return (<div key={group.id}>
                <div key={group.id} className='flex items-center'>
                    <img src={group.photo_200} width={40} height={40} className='rounded-3xl' />
                    <SelectItem value={String(group.id)}>{group.name}</SelectItem>
                </div>
                    <Separator orientation='horizontal' />
                </div>
              )})}
            </SelectGroup>
          </SelectContent>
        </Select>
    </CardContent>
    <CardFooter>
    { wallText  && <>
    <div className='flex items-center bg-slate-50'>
      <span className='rounded-full border-solid border-s border-gray-700 mr-2'>
        <CheckIcon color='green' width={"45px"} height={"45px"} /></span>
      <span>{wallText.slice(0, 100)}...</span>
    </div>
  </>}
</CardFooter>
</Card>
}
</>
  )
}
