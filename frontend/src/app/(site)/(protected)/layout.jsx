'use client'
import { UserContext } from '@/providers/UserProvider'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const layout = ({children}) => {
    const {user,isAuth} = useContext(UserContext);
    const router = useRouter()

    useEffect(() => {
        if(isAuth == false){
            router.push('/login');
        }
    },[user,isAuth])
  return (
    children
  )
}

export default layout