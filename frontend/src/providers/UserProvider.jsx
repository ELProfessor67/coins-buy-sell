'use client'
import { loadUserRequest } from "@/http/user";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(undefined);
    const [loading, setLoading] = useState(false);



    async function getUser() {
        try {
            setLoading(true);
            const {data} = await loadUserRequest();
            setIsAuth(true);
            setUser(data.user);
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setIsAuth(false);
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser();
    },[])

    return(
        <UserContext.Provider value={{user,setUser,isAuth,setIsAuth,loading,getUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;