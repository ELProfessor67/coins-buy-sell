"use client";
import DialogBox from '@/components/DialogBox';
import { addTokenRequest, getAllTokensRequest } from '@/http/tokens';
import { Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {
    const [tokens, setTokens] = useState([]);
    const [open, setOpen] = useState(false);

    const [tokenData, setTokenData] = useState({
        name: '',
        price: '',
        file: '',
        fileprev: ''
    });

    //get widthraw requests
    const getTokens = async () => {
        const res = await getAllTokensRequest();
        setTokens(res.data.tokens);
    };
    useEffect(() => {
        getTokens();
    }, []);


    const handlechange = useCallback((e) => {
        setTokenData(prev => ({...prev,[e.target.name]:e.target.value}));
    },[]);


    const handleFileChnage = useCallback((e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState == 2){
                setTokenData(prev => ({...prev,file,fileprev: reader.result}));
            }
        }
        reader.readAsDataURL(file);
    },[]);


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name',tokenData.name);
            formData.append('price',tokenData.price);
            formData.append('file',tokenData.file);

            const res = await addTokenRequest(formData);
            toast.success(res?.data?.message);
            setOpen(false);
            setTokenData({
                name: '',
                price: '',
                file: '',
                fileprev: ''
            });
            if(typeof window != 'undefined'){
                window.location.reload();
            }
        } catch (e) {
            toast.error(e.response?.data?.message || e.message)    
        }
    },[tokenData])


    return (
        <>
            <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">
                {/* Bill Summary Table */}
                <div className="dark:bg-gray-7 bg-white  rounded-lg shadow p-6 overflow-x-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <h2 className='dark:text-white text-black text-3xl font-medium'>Tokens</h2>

                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center" onClick={() => setOpen(prev => !prev)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Token
                        </button>

                    </div>
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="text-left text-gray-500 dark:text-gray-400">
                                <th className="pb-4">ID</th>
                                <th className="pb-4">Name</th>
                                <th className="pb-4">Price</th>
                                <th className="pb-4">Image</th>
                                <th className="pb-4">Creation Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tokens && tokens.map((token, index) => (
                                <tr key={token._id?.toString()} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="py-4">{token._id}</td>
                                    <td className="py-4">
                                        {token.name}
                                    </td>
                                    <td className="py-4">{token.price}</td>
                                    <td className="py-4">
                                        <img src={token?.image?.url} className='w-12 h-12 object-cover rounded-sm' />
                                    </td>
                                    <td className="py-4">{new Date(token.createdAt).toLocaleDateString()}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <DialogBox open={open} onClose={() => setOpen(false)}>
                <h2 className='text-[24px] font-semibold mb-4 dark:text-white text-black text-center'>Add Token</h2>
                <p className='text-[16px] font-normal mb-4 dark:text-white text-black opacity-70 text-center'>Create a new token that will be publicly available for all users to purchase.</p>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-[16px] font-normal mb-2 dark:text-white text-black'>Token Name*</label>
                        <input type="text" id="name" name="name" placeholder='Enter token name' className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none' value={tokenData.name} onChange={handlechange} required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="price" className='text-[16px] font-normal mb-2 dark:text-white text-black'>Price*</label>
                        <input type="number" id="price" name="price" placeholder='Enter token price' className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none' required value={tokenData.price} onChange={handlechange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="image" className='text-[16px] font-normal mb-2 dark:text-white text-black'>Token Image*</label>
                        <input type="file" id="image" name="image" accept="image/*" className='bg-white dark:bg-gray-10 border border-gray-9 dark:border-transparent rounded-md py-2 px-4 outline-none' required onChange={handleFileChnage}/>
                    </div>

                    {
                        tokenData.fileprev &&
                        <div className='flex items-center justify-center'>
                            <img src={tokenData.fileprev} className='w-28 h-24 rounded-sm'/>
                        </div>
                    }
                    <button className='bg-black dark:bg-white dark:text-black text-white rounded-md px-4 py-2 font-medium flex items-center gap-2 w-full justify-center !mt-8' type='submit'>Add Token</button>
                </form>
            </DialogBox>

        </>
    )
}