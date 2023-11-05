import React, { Suspense } from 'react'
import Walls from '../../Walls';
import ContestSettings from '../../ContestSettings';

export default async function WallPage( { params: { groupId }, searchParams: { offset = 0, type = "to"} }) {
    return (
    <></>
        // <Suspense fallback={<p>Loading feed...</p>}>
        //   <Walls data={{ params: { groupId }, searchParams: { offset, type} }} />
        // </Suspense>
      )
}
