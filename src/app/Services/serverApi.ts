import 'server-only'

import { cookies } from "next/headers";

export async function getMe(params?: any) {
    const { name, value: cookieValue }: any =  cookies().get('hash');
    
    const headers = new Headers({});
    headers.set('Content-Type', 'application/json');
    headers.set('Cookie', `hash=${cookieValue}`)
  try {
    const res = await fetch('http://127.0.0.1:2023/me', {
        method: 'POST', 
        headers,
        credentials: 'include',
        body: JSON.stringify({ cookie: params })
    });
    return await res.json();
} catch (error) {
        console.log("getMe err", error);
    }
}

export async function getGroups(params?: any) {
    const { name, value: cookieValue }: any =  cookies().get('hash');
    
    const headers = new Headers({});
    headers.set('Content-Type', 'application/json');
    headers.set('Cookie', `hash=${cookieValue}`)
  try {
    const res = await fetch('http://127.0.0.1:2023/getGroups', {
        method: 'POST', 
        headers,
        credentials: 'include',
        body: JSON.stringify({ cookie: cookieValue })
    });
    return await res.json();
} catch (error) {
        console.log("getGroups err", error);
    }
}

export async function getWall({ groupId, offset }: any) {
    const cookieName =  cookies().get('hash');
    const headers = new Headers();
    headers.set('Content-Type', 'application/json')
  try {
    const res = await fetch('http://127.0.0.1:2023/getWall', {
        method: 'POST', 
        headers,
        credentials: 'include',
        body: JSON.stringify({ cookie: cookieName, group_id: groupId, offset })   
    });
    return await res.json();
} catch (error) {
        console.log("getWall err", error);
    }
}

export async function getWinner({ contest_id }: any) {
    const cookieName =  cookies().get('hash')?.value;
    const headers = new Headers();
    headers.set('Content-Type', 'application/json')
    headers.set('Cookie', `hash=${cookieName}`)
  try {
    const res = await fetch('http://127.0.0.1:2023/getWinner', {
        method: 'POST', 
        headers,
        credentials: 'include',
        body: JSON.stringify({ contest_id })   
    });
    return await res.json();
} catch (error) {
        console.log("getWinner err", error);
    }
}