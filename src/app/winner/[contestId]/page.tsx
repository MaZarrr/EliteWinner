import React, { Suspense } from 'react'
import Winner from './Winner';

export default async function page({ params: { contestId } }: any) {
  return (
    <Suspense fallback={<div>Загрузка</div>}>
        <Winner data={{ params: { contestId } }}/>
    </Suspense>
  )
}
