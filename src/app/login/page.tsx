'use client'

export default function login() {
  return (
    <div>
      <button className='bg-cyan-600 p-5'><a href={'https://oauth.vk.com/authorize?client_id=51626351&display=page&redirect_uri=http://127.0.0.1:3000/auth&scope=groups,friends,email,offline&group_ids=&response_type=code&v=5.131'} ><h2>Войти</h2></a></button>
    </div>
  )
}
