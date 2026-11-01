import Navbar from '@/components/shared/Navbar'
import { getMe } from '@/service/getMe'
import React from 'react'

const AuthGroupLayout = async ({children} : {children : React.ReactNode}) => {
    const user = await getMe();
  return (
    <div>
        <Navbar user={user}></Navbar>
        <main>
            {children}
        </main>
    </div>
  )
}

export default AuthGroupLayout;