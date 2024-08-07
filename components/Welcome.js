'use client';

// ./app/components/Welcome.js

import { useState } from 'react';
import Image from 'next/image';
import { CustomButton } from './CustomButton';
import Link from 'next/link';
import { login } from '../lib/authUtils'; // Adjust the path as necessary
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/authContext';


export function Welcome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError,setLocalError] = useState('');
  const router = useRouter();
  
  const { user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      alert('user login successful');
      router.push('/dashboard'); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error.message);
      setLocalError('username or password invalid')
      setTimeout(() => {
        setLocalError('')
      },3000);

     
    }
  };



  return (
    <div className="min-h-screen py-40 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/2 p-8">
          <Image
            src="/early.png"
            alt="notify image"
            width={200}
            height={350}
            className="rounded-md w-full"
          />
        </div>
        <div className="md:w-1/2 py-16 px-12">
          <div className="flex flex-col mb-8">
            <h2 className="text-black text-3xl mb-4">STAFF ATTENDANCE PORTAL</h2>
            <h4 className="text-gray-800">Login to continue</h4>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 py-2 px-4 w-full mt-3 rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 py-2 px-4 w-full mt-3 rounded-lg"
                required
              />
              {localError && <p className='text-red-700 text-center p-2'>{localError}</p>}
              <CustomButton
                title="Login"
                type="submit"
                className="w-full bg-blue-400 py-3 mt-3 text-center text-white rounded-lg"
            
              />
            </div>
          </form>
          <div  className='text-center'>
          <p className="text-gray-600">
            Don't have an account? <Link href="/register"><span className="text-blue-400 cursor-pointer">Register</span></Link>
          </p>
          <p className="text-gray-600">
            Forgotten password? <Link href="/resetPassword"><span className="text-blue-400 cursor-pointer">Resest</span></Link>
          </p>
          </div>
       
        </div>
      </div>
    </div>
  );
}
