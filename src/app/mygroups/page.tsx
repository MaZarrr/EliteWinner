import { Suspense } from 'react';
import { getGroups } from '../Services/serverApi'
import Groups from './Groups';

export default async function MyGroups() {
    const groups = await getGroups();
    return (<>
    <h1>Мои сообщества</h1>
    <Suspense fallback={<div>Loading feed...</div>}>
        <Groups groups={groups} />
    </Suspense>
  </>
  )
}
