'use client'

import React, {useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { 
  setDefaultContestSettings,
  changeAnyMessageWall,
  setParticipantsCount, 
  setSettingContest, 
  setSettingInput,
  changeDifferentPrizes,
  setPrizesItem,
  changePrizesItem,
  clearPrizesItem
} from '@/app/GlobalProvider/Features/appSlice'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  // SelectLabel,
} from "@/components/ui/select"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from '@/hooks';
import ToastDemo from '@/components/ui/radix-toast/radix-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import ChooseWinner from '@/components/ChooseWinner';
import { CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import useScroll from '@/hooks/useScroll';
import SelectGroups from './SelectGroups';
import { useStartAuctionMutation } from '@/app/Services/baseApi';

const ZSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function ContestSettings() {
  // console.log("zSchema", ZSchema);
  // const { isError, isLoading, data = {} } = useGetGroupsQuery({});
  
  const itemsChecked = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { vk_settings: { post, required_conditions, additional_conditions } }: any = useAppSelector((state) => state.winners.conditions_contest) // conditions_contest[тип розыгрыша] 
  const { prizes: { participants: participants_count, item_prizes, different_prizes } } = useAppSelector((state) => state.winners.conditions_contest) // conditions_contest[тип розыгрыша] 
  const [startAuction, { isLoading, data }] = useStartAuctionMutation();
  const [groupId, setGroupId] = useState(null);
  // const [ancors] = useScroll({ ancor: 'bottom', isVisible: false, count: 500 })
  let defaultGroup = pathname.split('likes/')[1]
  let lotteryType: string = pathname.split('/')[3]
  let group_id: number = +pathname.split('/')[4]
  console.log("pathname__", lotteryType);
  // console.log("ancors", window.scrollY);

  useEffect(() => {
    if(!different_prizes) {
      dispatch(clearPrizesItem())
    } else {
      Array.from({ length: participants_count }, (_, index) => index + 1)
      .forEach((item: any, idx) => {
        dispatch(setPrizesItem({ prize_id: item, value: '' }))
      })
    }
  }, [different_prizes])

  // const [itemsSettingsRequired, setItemsSettingsRequired] = useState(itemsRequired)
  // const [itemsSettingsAdditional, setItemsSettingsAdditional] = useState(additionalItems)

  function getCheckedCount(checkboxes: any) {
    let count = 0;
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        count++;
      }
    });
    return count;
  }

  function changeParticipantsCount(e: any) {
    dispatch(setParticipantsCount(e.target.value))
    // if(e.target.value < 1 && different_prizes) {
        // dispatch(changeDifferentPrizes())
    // }
  }

  function changeGroup(value: string) {
    router.push(`/cabinet/contests/likes/${value}`)
    // container.current?.scrollTo(0, 0)
  }

  // Функция изменения инпутов и сохранение в contestSettings в случае если isInput true 
  function conditionsInputChange(evt: any, { type_conditions, isInput }: any) {
    const value: string = evt.target.value;
    dispatch(setSettingInput({ contest_type: 'vk_settings', value, type_conditions }))
  }

  // Настройки условий конкурса и отправки редакс хранилище
  function changeConditions(evt: any) {
      const checkboxesElement = itemsChecked.current?.querySelectorAll('.data-checkbox-required');
      const checkedCount = getCheckedCount(checkboxesElement);
    
      // Если выбран только один checkbox, блокируем изменение его состояния
      if (checkedCount === 0 && evt.target.checked === false) {
        evt.preventDefault();
        evt.target.checked = true;
        return
      }
      const { value, conditions_type } = JSON.parse(evt.target.value);
      dispatch(setSettingContest({ contest_type: 'vk_settings', value, prop_name: value, conditions_type}))
  }

  function changePrizes(e, item: number) {
    dispatch(changePrizesItem({ prize_id: item, value: e.target.value }));
  }

  return (<div ref={container}>
          <h1 className='max-sm:text-2xl'>Настройки розыгрыша</h1>
          {/* <div className='sticky top-[100px]'> */}
            <SelectGroups 
              defaultValue={defaultGroup}
              wallText={post?.text}
              lotteryType={lotteryType}
            />
            <div>
            </div>

            <Card className='bg-gray-50 mb-5 !text-4xl'>
                <CardHeader>
                  <CardTitle className='!text-lg !mt-0'>Обязательные условия участия</CardTitle>
                  <CardDescription>Выберите одно или несколько обязательных условий для участия.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid text-sm' ref={itemsChecked}>
                  { required_conditions.map((item: any) => (
                    <div key={item.id}>
                      <div className='flex items-start'>
                            <Input
                              checked={item[item.id]}
                              className='data-checkbox-required w-5 min-w-[40px] min-h-5 h-5 mb-2 mr-2 ' 
                              type='checkbox'
                              value={JSON.stringify({ value: item.id, conditions_type: item.type_conditions })}
                              onChange={changeConditions}/>
                            <span>
                              {item.label}
                            </span>
                    </div>
                    { item.isInput && (<div className='ml-10'>
                        <div className='flex items-start'><Input
                                className='data-checkbox-required w-5 min-w-[40px] min-h-5 h-5 mb-2 mr-2 ' 
                                type='checkbox'
                                value={JSON.stringify({ value: item.id, conditions_type: item.type_conditions })}
                                onChange={() => dispatch(changeAnyMessageWall())}/>
                                <span>
                                Любое сообщение
                              </span>
                        </div>
                        {
                          !item?.anyText && <Input className="mb-4 ml-2 w-full sm:w-4/5" 
                              required min={3} max={150} 
                              onChange={(evt) => conditionsInputChange(evt, {type_conditions: item.type_conditions, isInput: item.isInput, prop_name: 'anyText'})} 
                          placeholder={item.input_lable}/>
                        }
                    </div>
                    )}
                    </div>
                  )
                )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                      {/* <Input placeholder="Введите ваш email" /> */}
                      {/* <FormDescription>Введите ваш email</FormDescription> */}
                </CardFooter>
            </Card>

            <Card className='bg-gray-50 mb-5'>
                <CardHeader>
                  <CardTitle className='!text-lg !mt-0'>Дополнительные настройки</CardTitle>
                  <CardDescription>Настройте необязательные условия для участия.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid text-sm'>
                  { additional_conditions.map((item: any) => (
                    <div key={item.id}>
                      <div className='flex items-start'>
                            <Input
                              className=' w-5 min-w-[40px] min-h-5 h-5 mb-2 mr-2 ' 
                              type='checkbox'
                              checked={item[item.id]}
                              value={JSON.stringify({ value: item.id, conditions_type: item.type_conditions })}
                              onChange={changeConditions}/>
                              <span>
                                {item.label}
                              </span>
                    </div>
                    { item.isInput && (
                        <Input className="mb-4 w-full ml-2 sm:w-4/5" 
                              required min={3} max={150} 
                              value={item.text}
                              onChange={(evt) => conditionsInputChange(evt, {type_conditions: item.type_conditions, isInput: item.isInput})} 
                              placeholder={item.input_lable}/>
                    )}
                    </div>
                  )
                )}
                </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                        {/* <Input placeholder="Введите ваш email" /> */}
                      {/* <FormDescription>Введите ваш email</FormDescription> */}
                </CardFooter>
            </Card>

            <Card className='bg-gray-50 mb-5'>
                <CardHeader>
                  <CardTitle className='!text-lg !mt-0'>Настройка призов</CardTitle>
                  <CardDescription>Укажите количество участников и призы.</CardDescription>
                </CardHeader>
                <CardContent>
                <Label htmlFor="participants_count">Количество победителей</Label>
                <Input className="mb-1 w-full sm:w-4/5"
                      id="participants_count"
                      required
                      defaultValue={participants_count}
                      type='number'
                      onChange={(changeParticipantsCount)}
                      maxLength={3}
                      onBlur={(e) => console.log('abort', e.target)}
                      placeholder={'Укажите количество участников'}/>
                      <CardDescription className=' mb-6 '>Рекомендуем не более 100</CardDescription>
                
                  {/* <CardTitle className='!text-lg !mt-4 !mb-4'>Призы</CardTitle> */}
                  { participants_count > 1 && <div className='flex text-sm bg-gray-200 items-start w-full sm:w-4/5'>
                            <Input
                              className=' w-5 min-w-[40px] min-h-5 h-5 m-0 ' 
                              type='checkbox'
                              checked={different_prizes}
                              onChange={() => dispatch(changeDifferentPrizes())}/>
                              <span>
                                Разные призы
                              </span>
                    </div>
                  }

                  { participants_count > 1 && different_prizes ? Array.from({ length: participants_count }, (_, index) => index + 1)
                  .map((item: any, idx) => {
                    
                    return (<div key={item} className='mt-6'>
                    {/* <Label htmlFor="participants_count">Количестов участников</Label> */}
                    <Input className="mb-1 w-full sm:w-4/5"
                          id="participants_count"
                          required
                          type='text'
                          value={item_prizes[idx]?.value || ''}
                          onChange={(e) => changePrizes(e, item)}
                          minLength={3}
                          maxLength={100}
                          placeholder={'Название'}/>
                          <CardDescription className=' mb-6 '>приз № {item}</CardDescription>
                      </div>)
                    }) : <div className='text-sm mt-6'>
                      <Label htmlFor="participants_count">Название</Label>
                      <Input className="mb-1 w-full sm:w-4/5"
                          id="participants_count"
                          required
                          type='text'
                          value={item_prizes[0]?.value || ''}
                          onChange={(e) => dispatch(changePrizesItem({ prize_id: 1, value: e.target.value }))}
                          minLength={3}
                          maxLength={100}
                          // onBlur={(e) => dispatch(setPrizesItem(e.target.value))}
                          placeholder={'Напишите название приза'}/>
                          {/* <CardDescription className=' mb-6 '>Рекомендуем не более 100</CardDescription> */}
                      </div>
                  }

                  {/* <Button variant={'outline'}>Добавить приз</Button> */}

                </CardContent>
                <CardFooter className="flex justify-between">
              { post  && <div className='mb-2 relative'>
                <h3>Выбранный пост</h3>
                <span className='flex'>
                  <img width={450} height={450} src={post.image.url} alt="Выбранный пост" />
                <div className='bg-slate-50 mb-2 ml-3'>
                  <span>{post.text.slice(0, 350)}...</span>
                </div>
                  <div className='flex items-baseline absolute bottom-0 right-0'>
                    <ChooseWinner />
                    <Link href={'/cabinet/contests/likes/'+ post.from_id.toString().split('-')[1]}>
                      <Button variant='outline'>Изменить</Button>
                    </Link>
                    <Button disabled={groupId ? true : false} 
                      onClick={() => startAuction({ group_id })} 
                      variant="destructive">
                        Аукцион
                      </Button>
                  </div>
                </span>
              </div>
              }
              </CardFooter>
            </Card>
            <ChooseWinner />
    </div>
      // {/* <ToastDemo /> */}
  )
}


function Post() {
  return (
    <div>ContestSettings</div>
  )
}

