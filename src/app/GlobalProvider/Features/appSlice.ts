'use client'

import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"
import { AnyArray } from "immer/dist/internal"
// import { HYDRATE } from "next-redux-wrapper";

// SETTINGS
// vk / ok / aukcion / random number

type SubscriberPartner = {
    is_subscriber_partner: boolean
    text: string // ссылка на группу партнера
}

type MessageWall = {
    is_message_wall: boolean,
    text: string
}

type MinFrends = {
    is_min_frends: boolean
    text: string
}

type VKRequiredConditions = {
    is_repost: boolean // информация о reposte usera
    is_like_wall: boolean
    is_message_wall: MessageWall // информацио о комментариии под постом
}

type VKAdditionalConditions = {
    is_closed: boolean // открытый или закрытый профиль
    has_photo: boolean // 1 фото установлено 0 не установлено 
    is_subscriber: boolean // является подписчиком
    is_subscriber_partner: SubscriberPartner  // явдяется подписчиком партнера
    // is_pinned_repost: boolean // информацио о том запись закреплена или нет
    is_min_frends: MinFrends
}

type Prizes = {
    participants: number,
    item_prizes: Array<{ prize_id: number, value: string }>,
    different_prizes: boolean
}

interface VKSettings {
    type: string,
    post: WallOptions,
    required_conditions: VKRequiredConditions[]
    additional_conditions: VKAdditionalConditions[]
}

type Auction = {
    type: string
    group_id: number | null
}

interface ConditionsContest {
    prizes: Prizes,
    vk_settings: VKSettings,
    ok_settings: any
    randomNum_settings: any
    auction_settings: Auction
}

interface STATE {
    winners: any[],
    conditions_contest: ConditionsContest
}

type WallOptions = {
    type: string
    owner_id: number
    wall_id: string
    group_id: string
    item_id: number
    extended?: number
    skip_own?: boolean
}

const initialState: STATE = {
    winners: [],
    conditions_contest:<ConditionsContest> {
        prizes: {
            participants: 1,
            item_prizes: [{ prize_id: 1, value: ''}],
            different_prizes: false
        },
        vk_settings: <VKSettings><unknown>{
            type: 'vk_settings',
            post: null,
            required_conditions: [
                {
                    type_conditions: 'required_conditions',
                    id: "is_like_wall",
                    label: "Поставить лайк",
                    is_like_wall: true,
                    isInput: false,
                },
                {
                    type_conditions: 'required_conditions',
                    id: "is_repost",
                    is_repost: false,
                    label: "Сделать репост",
                    isInput: false,
                },
                {
                    type_conditions: 'required_conditions',
                    is_message_wall: false,
                    id: "is_message_wall",
                    label: "Написать сообщение",
                    isInput: false,
                    anyText: false,
                    input_lable: 'Кодовое слово, которое нужно написать под постом',
                    text: ''
                },
            ],
            additional_conditions: [
                {   
                    type_conditions: 'additional_conditions',
                    is_subscriber: false,
                    id: "is_subscriber",
                    label: "Вступление в группу",
                    isInput: false,
                },
                {
                    type_conditions: 'additional_conditions',
                    is_subscriber_partner: false,
                    id: "is_subscriber_partner",
                    label: "Вступление в группу партнера",
                    isInput: false,
                    input_lable: 'Укажите ссылку на группу партнера',
                    text: ''
                },
                // {
                //     type_conditions: 'additional_conditions',
                //     is_pinned_repost: false,
                //     id: "is_pinned_repost",
                //     label: "Розыгрыш должен быть закреплен на стене участника",
                //     isInput: false
                // },
                {
                    type_conditions: 'additional_conditions',
                    has_photo: false,
                    id: "has_photo",
                    label: "Профили с фото",
                    isInput: false
                },
                {
                    type_conditions: 'additional_conditions',
                    is_min_frends: false,
                    id: "is_min_frends",
                    label: "Количество друзей",
                    input_lable: 'Укажите минимальное количество друзей участника',
                    isInput: false,
                    text: ''
                },
                {
                    type_conditions: 'additional_conditions',
                    id: "is_closed",
                    label: "Участиники с открытыми профилями",
                    isInput: false,
                    is_closed: false
                }
            ]
        },
        ok_settings: {
            type: 'ok_settings',
            post: null,
            required_conditions: [],
            additional_conditions: []
        },
        randomNum_settings:{
            type: 'randomNum_settings'
        },
        auction_settings: {
            type: 'auction_settings',
            group_id: null
        }
    },
}

export const apiSlie = createSlice({
    name: 'winners',
    initialState,
    reducers: {
        setAuth: (state, action) => { {
            // state.userAuth = action.payload
            // console.log("curren__", current(state));
        }},
        setWinners: (state, { type, payload }) => {
            const findWinner = state.winners.find((winner: any) => winner.contest_id === payload.contest_id);
            if(!findWinner) {
                state.winners.push(payload);
            }
            console.log("curren__setWinners", current(state));
        },
        setSettingContest: (state, { type, payload }: PayloadAction<{ 
                contest_type: string, // vk_settings / ok_settings
                value: string, // измененной значение
                prop_name: string, // название измененного значения
                conditions_type: string // тип условий обязаьельные или нет required_conditions additional_conditions и тд
            }>) => {

            const settings = state.conditions_contest[payload.contest_type][payload.conditions_type]
            
            if (payload.contest_type === 'vk_settings') {
                state.conditions_contest[payload.contest_type][payload.conditions_type] = settings.map(item => {
                    if(item.id === payload.prop_name) {
                        const is_input = 'text' in item; // показывать input или нет
                        return {
                            ...item,
                            [payload.prop_name]: !item[payload.prop_name],
                            ...(is_input && { isInput: !item.isInput })
                        }
                    }
                    return item;
                })
            }
            console.log("curren__setWinners", current(state));
        },
        setSettingInput: (state, { type, payload }: PayloadAction<{ 
            contest_type: string, // vk_settings / ok_settings
            value: string, // измененной значение
            type_conditions: string // тип условий обязаьельные или нет required_conditions additional_conditions и тд,
        }>) => {

            const settings = state.conditions_contest[payload.contest_type][payload.type_conditions]
            
            if (payload.contest_type === 'vk_settings') { // тип менятется динамически
                state.conditions_contest[payload.contest_type][payload.type_conditions] = settings.map((item: any) => {
                        if(item.isInput) {
                            return {
                                ...item,
                                text: payload.value,
                            }
                        }
                        return item;
                    })
            }
            console.log("curren__setSettingInput", current(state));

        },
        setParticipantsCount: (state, { type, payload }: PayloadAction<number>) => {state.conditions_contest.prizes.participants = payload;},
        
        clearPrizesItem: (state, { type, payload }: PayloadAction<void>) => {
            state.conditions_contest.prizes.item_prizes = [];
            state.conditions_contest.prizes.item_prizes[0] = { prize_id: 1, value: '' }
        },
        setPrizesItem: (state, { type, payload }: PayloadAction<{prize_id: number, value: string}>) => {
            const findItemPrize = state.conditions_contest.prizes.item_prizes.find((item) => item.prize_id === payload.prize_id);
            if(!findItemPrize) {
                state.conditions_contest.prizes.item_prizes.push({ prize_id: payload.prize_id, value: '' })
            } 
            // else {
            //     state.conditions_contest.prizes.item_prizes = state.conditions_contest.prizes.item_prizes.map((item) => {return {...item, value: ''}})
            // }
        },
        changePrizesItem: (state, { type, payload }: PayloadAction<{prize_id: number, value: string}>) => {
            
            if(state.conditions_contest.prizes.different_prizes) {
                state.conditions_contest.prizes.item_prizes = state.conditions_contest.prizes.item_prizes.map((item) => {
                    if(item.prize_id === payload.prize_id) {
                        return { ...item, value: payload.value}
                    }
                    return item;
                })
            } else {
                state.conditions_contest.prizes.item_prizes = [];
                state.conditions_contest.prizes.item_prizes[0] = { prize_id: payload.prize_id, value: payload.value }
            }
            console.log("curren__changePrizesItem", current(state));

        },
       
        changeDifferentPrizes: (state, { type, payload }: PayloadAction<void>) => { // сменить призы на все разные призы
            state.conditions_contest.prizes.different_prizes = !state.conditions_contest.prizes.different_prizes;
            console.log("curren__changeDifferentPrizes", current(state));
        },
        changeAnyMessageWall: (state, { type, payload }: PayloadAction<void>) => { // сменить призы на все разные призы
            let isAny: any = state.conditions_contest.vk_settings.required_conditions.find((item: any) => item.id === 'is_message_wall' );
            let isAnyIndex = state.conditions_contest.vk_settings.required_conditions.findIndex((item: any) => item.id === 'is_message_wall' );
            let required_conditions = state.conditions_contest.vk_settings.required_conditions;
            
            let newRequired_conditions: any = [ 
                ...required_conditions.slice(0, isAnyIndex), // все элементы до нужного
                {...isAny, anyText: !isAny.anyText}, 
                ...required_conditions.slice(isAnyIndex + 1), 
            ]
            
            state.conditions_contest.vk_settings.required_conditions = newRequired_conditions;

        },
        choosePost: (state, { type, payload }: PayloadAction<WallOptions>) => {
            state.conditions_contest.vk_settings.post = payload;
            console.log("curren__changePrizeschoosePost", current(state));
        },
        setDefaultContestSettings: (state, payload: PayloadAction<void>) => {
        },
        // AUCTION ==============
        setAuctionSettings: (state, { type, payload }: PayloadAction<{ group_id: number }>) => {
            state.conditions_contest.auction_settings.group_id = payload.group_id;
        }
    },
});

console.log(apiSlie);

export const { 
    setAuth, 
    setWinners, 
    setSettingContest, 
    setSettingInput, 
    setDefaultContestSettings,
    setParticipantsCount,
    changeDifferentPrizes,
    setPrizesItem,
    changePrizesItem,
    clearPrizesItem,
    changeAnyMessageWall,
    choosePost
} = apiSlie.actions;
export default apiSlie.reducer;
















    // extraReducers: (builder) => {
    //     builder
    //       .addCase(fetchData.fulfilled, (state, action) => {
    //         // update state with data from API call
    //       })
    //       .addCase(fetchData.rejected, (state, action) => {
    //         // handle error
    //       });
    //   },
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //       console.log('HYDRATE', state, action.payload);
    //       return {
    //         ...state,
    //         ...action.payload.subject,
    //       };
    //     },
    //   },