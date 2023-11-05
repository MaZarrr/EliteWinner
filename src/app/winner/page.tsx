'use client'

import { useAppSelector } from '@/hooks'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Winner() {
    const searchParams = useSearchParams();
    // const winners = useAppSelector((state) => state.winners);
    const winners = useAppSelector((state) => state.winners.winners.find((winner: any) => searchParams.get('contest') === winner.contest_id));
    const router = useRouter()
    console.log("searchParams_", searchParams.get('contest'));
    console.log("searchParams_winners", winners);
    
    useEffect(() => {
        if(!searchParams.get('contest')) router.push('/');

    }, [])

    return (
        <div>Winner</div>
    )
}
