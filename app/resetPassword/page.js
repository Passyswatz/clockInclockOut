'use client'

import { CustomButton, Navbar } from '@/components'
import { auth } from '@/lib/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import {useState} from 'react'
import Link from 'next/link';


const page = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    

    const handleSubmitReset = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try{
            await sendPasswordResetEmail(auth,email);
            setMessage('Pasword reset email sent. Please check your inbox.')
            
        } catch(error) {
            console.error('Error sending password reset email:', error)
            setError(error.message)
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='min-h-screen py-40 flex flex-col item-center justify-center'>
            <div className='w-full max-w-md bg-white rounded-xl mx-auto shadow-lg overflow-hidden p-8'>
                        <h2 className='text-black text-xl mb-4'>Reset Password</h2>
                        <form onSubmit={handleSubmitReset}>
                            <div className='mb-6'>
                                <input
                                type='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border border-gray-400 py-2 px-4 w-full mt-3 rounded-lg'
                                required/>
                                {message && <p className='text-green-600'>{message}</p>}
                                {error && <p className='text-red-600'>{error}</p>}
                                <CustomButton
                                title="Send password reset Email"
                                type="submit"
                                className="w-full bg-blue-400 py-3 mt-3 text-center text-white rounded-lg"/>

                            </div>

                        </form>

                        <div className='text-center'>
               
               <p className="text-gray-600">
              <Link href="/"><span className="text-blue-400 cursor-pointer">Login with the new password</span></Link>
                    </p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default page