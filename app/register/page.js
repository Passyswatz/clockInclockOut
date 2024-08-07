'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';


import Image from 'next/image';
import { CustomButton } from '../../components/CustomButton';
import { Navbar } from '@/components'; // Adjust the import according to your project structure
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';

const Page = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const router = useRouter();
    const {registerUser} = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (password !== confirmPassword) {
            setLocalError('Passwords do not match...');
            setTimeout(() => {
                setLocalError('')
            },3000)

            return;
        }

        try {
          await registerUser(firstName, lastName,email, password)

            alert('User registered successfully.');
            router.push('/');
        } catch (error) {
           // console.error('Error registering:', error);
            setLocalError('email already in use please login');
            setTimeout(() => {
                setLocalError('')
            },3000)

            //setError(error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen py-40 flex flex-col items-center justify-center">
                <div className="w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden md:flex">
                    <div className="md:w-1/2 p-8  ">
                        <Image
                            src="/early.png"
                            alt="notify image"
                            width={200}
                            height={350}
                            className="rounded-md w-full "
                        />
                    </div>

                    <div className="md:w-1/2 py-16 px-12">
                        <div className="flex flex-col mb-8">
                            <h2 className="text-black text-3xl mb-4">STAFF ATTENDANCE PORTAL</h2>
                            <h4 className="text-gray-800">Register to continue</h4>
                        </div>
                        <form onSubmit={handleRegister}>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="border border-gray-400 py-2 px-4 w-full mt-3 rounded-lg"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="border border-gray-400 py-2 px-4 w-full mt-3 rounded-lg"
                                    required
                                />

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

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="border border-gray-400 py-2 px-4 w-full mt-3 rounded-lg"
                                    required
                                />
                                {localError && <p className='text-red-500 text-center pt-2'>{localError}</p>}
                                <CustomButton
                                    title="Register"
                                    type="submit"
                                    className="w-full bg-blue-400 py-3 mt-3 text-center text-white rounded-lg"
                                />
                            </div>
                        </form>

                        <div className='text-center'>
               
                       <p className="text-gray-600">
                      already have an account ? <Link href="/"><span className="text-blue-400 cursor-pointer">Login</span></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
