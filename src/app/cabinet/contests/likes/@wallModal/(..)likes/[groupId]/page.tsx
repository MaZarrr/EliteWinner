// 'use client'

import React, { Suspense } from 'react'
import Walls from '../../../../Walls'
import Modal from '@/components/Modal'

export default async function page( { params: { groupId }, searchParams: { offset = 0, type = "to"} }) {
return (
    <Modal>
    <Suspense fallback={<p>Loading feed...</p>}>
        <Walls data={{ params: { groupId }, searchParams: { offset, type} }} />
    </Suspense>
    </Modal>
    )
}
