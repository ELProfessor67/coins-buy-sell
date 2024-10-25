'use client'


import { buyTokenRequest, getTokensRequest, sellTokenRequest } from '@/http/tokens';
import { UserContext } from '@/providers/UserProvider';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = ({ params }) => {
    const id = params.id;
    const [token, setToken] = useState(null);
    const [dealLoading, setDealLoading] = useState(false);
    const [isalreadybuy,setisalreadybuy] = useState();
    const {user,getUser} = useContext(UserContext);

    const getTokenDetails = useCallback(async () => {
        
        try {
            const res = await getTokensRequest(id);
            setToken(res.data.token);
          
        } catch (error) {
            console.log(error.message);
        }
    },[id]);

    useEffect(() => {
        getTokenDetails();
    },[id]);


    useEffect(() => {
        if(user){
            const isbuy = user.tokens.find(t => t._id.toString() == id);
            setisalreadybuy(isbuy ? true : false);
        }
    },[user]);

    const buyToken = useCallback(async () => {
        setDealLoading(true)
        try {
            const formData = new FormData();
            formData.append('tokenId',id);
            const res = await buyTokenRequest(formData);
            toast.success(res.data?.message);
            getUser();
            setisalreadybuy(true);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }finally{

            setDealLoading(false);
        }
    },[id])

    const sellToken = useCallback(async () => {
        setDealLoading(true)
        try {
            const formData = new FormData();
            formData.append('tokenId',id);
            const res = await sellTokenRequest(formData);
            toast.success(res.data?.message);
            getUser();
            setisalreadybuy(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }finally{
            setDealLoading(false)
        }
    },[id])


    const handleDeal = useCallback(() => {
        console.log('isalreadybuy',isalreadybuy)
        if(isalreadybuy){
            sellToken();
        }else{
            buyToken();
        }
    },[id,isalreadybuy])


 

    return (
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 relative pt-16 md:pt-0">
            <div className='h-[6rem]'>

            </div>
            <div className="min-h-screen flex items-center justify-center p-4">


                <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">{token?.name}</h1>
                        <div className="aspect-square relative mb-4">
                            <img
                                src={token?.image?.url}
                                alt="Cosmic Voyager NFT"
                                className="rounded-lg object-cover w-full h-full"
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-500">Created by: 0x1234...5678</p>
                            <p className="text-sm text-gray-500">Owned by: 0x8765...4321</p>
                            <p className="font-semibold">Price: ${token?.price}</p>
                        </div>
                        
                        
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">

                        <button onClick={handleDeal} className={`w-full ${isalreadybuy ? 'bg-red-600' : 'bg-green-600'} text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out`}>
                            {dealLoading ? 'Loading...': isalreadybuy ? 'Sell' : 'Buy'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page