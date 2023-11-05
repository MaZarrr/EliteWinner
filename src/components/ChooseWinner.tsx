'use client'

import { useAddContestMutation, useLazyGetUserAccountQuery, useLazyGetUsersConditionQuery } from '@/app/Services/baseApi'
import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { setWinners } from '@/app/GlobalProvider/Features/appSlice'
import { useRouter } from 'next/navigation'
import uniqid from 'uniqid'
import './style.css'
import { Button } from './ui/button'
import useScroll from '@/hooks/useScroll'

export default function ChooseWinner() {
const [setCondition, conditionResult] = useLazyGetUsersConditionQuery();
const [getUser, userWinnerData] = useLazyGetUserAccountQuery(); // получаем всех пользователей по установленным настройкам
const [addContest, { isLoading, data }] = useAddContestMutation(); // добавление победителя после получения всех участников по условиям

const [ winner_, setWinner ] = useState<any>(null);
const triggerElement = useRef<HTMLDivElement>(null);
// const [ isWinner, setIsWinner ] = useState(null);
// const [ winnerLoading, setWinnerLoading ] = useState(false);
const router = useRouter();
const settings = useAppSelector((state) => state.winners.conditions_contest.vk_settings);
const prizes = useAppSelector((state) => state.winners.conditions_contest.prizes);
const options = useAppSelector((state) => state.winners.conditions_contest.vk_settings.post)
// const dispatch = useAppDispatch();
console.log("options__", options);
const [ancors] = useScroll({ ancor: 'bottom', isVisible: false, count: 500 })


  const setContest = async (options: any) => {
      try {
        await addContest({...options}).unwrap()
      } catch (err) {
      }
  }

  useEffect(() => {
    const element = triggerElement.current as HTMLDivElement;
    if(ancors) {
        // element.style.cssText = `
        //   position: absolute;
        //   width: 91%;
        //   bottom: 150px;
        //   transition: bottom 1s ease-in-out;
        // `
          // transition: all .3s;
          //   animation: myanim 2s infinite;

          //   @keyframes myanim {
          //     20% {
          //        bottom: 100px;
          //     }
          //  }

        // element.style.position = 'absolute';
        // element.style.bottom = '0'
        // element.style.animationDuration = '1s';
        // element.style.anim = '1s';
      } else {
        // element.style.bottom = '-200px';
        // element.style.cssText = `
        //   position: absolute;
        //   width: 91%;
        //   bottom: 200px;
        // `;
      }
  }, [ancors, triggerElement])

  useEffect(() => {
          if(!conditionResult.data?.data && !winner_ || !conditionResult.data?.data.ok) return;
          console.log("conditionResult_data_s", conditionResult.data?.data.data);
          const conditionsLabel: string = conditionResult.data?.data?.data.data.conditionsLabel.join(', ');
          const userItems = conditionResult.data.data?.data?.data.items;
          const userItemsLength = conditionResult.data.data?.data?.data.items.length; // ???!!! если меньше то выдвать что участников менее 0 по заданным настройкам

          console.log("userItems___", userItems);

          let prizes_item: any = [];
          if(userItemsLength > 0) {
            if(prizes.different_prizes) {
              prizes.item_prizes.forEach((prize) => {
                let winner = userItems[Math.floor(Math.random()*userItems.length)];
                if(userItems.length < +prizes.participants) {
                  prizes_item.push({...winner, prize_name: prize.value});
                } else {
                  while(true) {
                    let findWinner = prizes_item.find((item: any) => item.id == winner.id)
                      if(!findWinner) {
                        prizes_item.push({...winner, prize_name: prize.value});
                        break;
                      }
                      winner = userItems[Math.floor(Math.random()*userItems.length)];
                  }
                }
              });
              setWinner({ winners: prizes_item, contest_id: uniqid(), contest_type: conditionsLabel } );
            } else {
              const prize_name = prizes.item_prizes[0].value;
              if(+prizes.participants > 1) {
                Array.from({ length: +prizes.participants }, (_, index) => index).forEach((item) => {
                  let winner = userItems[Math.floor(Math.random()*userItems.length)];
                  if(userItems.length < +prizes.participants) {
                    prizes_item.push({...winner, prize_name});
                  } else {
                    while(true) {
                      let findWinner = prizes_item.find((item: any) => item.id == winner.id)
                        if(!findWinner) {
                          prizes_item.push({...winner, prize_name});
                          break;
                        }
                        winner = userItems[Math.floor(Math.random()*userItems.length)];
                    }
                  }
                })
                setWinner({ winners: prizes_item, contest_id: uniqid(), contest_type: conditionsLabel} );
              } else {
                const winner = userItems[Math.floor(Math.random()*userItems.length)];
                console.log("fffffff", { winners: [{...winner, prize_name: prizes.item_prizes[0].value}], contest_id: uniqid(), contest_type: 'like'});
                setWinner({ winners: [{...winner, prize_name }], contest_id: uniqid(), contest_type: conditionsLabel });
              }
            }
          }
  },[conditionResult.data])

  useEffect(() => {
        if(!winner_) return
            // dispatch(setWinners({...winner_, user_photo: userWinnerData.currentData?.data[0]?.photo_200, loadingWinner: false}));
            console.log("34234234", {...winner_, user_photo: userWinnerData.currentData?.data[0]?.photo_200, loadingWinner: false});            
            setContest({ 
              ...winner_, 
              group_id: Number(options.group_id), 
              wall_id: options.wall_id,
              loadingWinner: false,
              prizes_count: +prizes.participants,
            })
            router.push(`winner/${winner_.contest_id}`)
        // }
    }, [winner_])

  function getWinner() {
    let required_conditions: any = {};
    let additional_conditions: any = {};

    settings.required_conditions.forEach((item: any) => {
      if('text' in item) {
        required_conditions[item.id] = {
          value: item[item.id],
          text: item.text,
          ...('anyText' in item && {anyText: item.anyText})
        }  
      } else {
        required_conditions[item.id] = item[item.id]
      }
    })

    settings.additional_conditions.forEach((item: any) => {
      if('text' in item) {
        additional_conditions[item.id] = {
          value: item[item.id],
          text: item.text
        }  
      } else {
        additional_conditions[item.id] = item[item.id]
      }
    })
    
    const conditionsUpdate = {
      ...options,
      conditions: {
        type: settings.type,
        required_conditions: {
          ...required_conditions,
        },
        additional_conditions: {
          ...additional_conditions,
        },
        prizes: {
          participants_count: prizes.participants,
          item_prizes: prizes.item_prizes,
          different_prizes: prizes.different_prizes
        }
      },
    }

    setCondition(conditionsUpdate);
  }

  return (
    <div className='mt-2'>
    {/* <div ref={triggerElement} className='mt-2'> */}
      <Button 
        variant={'outline'} 
        className="p-2 bg-blue-600 text-white border-cyan-600 w-full" 
        onClick={getWinner}>Выбрать победителя
      </Button>
    </div>
  )
}
