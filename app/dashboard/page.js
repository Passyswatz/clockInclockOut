'use client'



import { CustomButton } from '../../components/CustomButton';
import { useRouter } from 'next/navigation';

import {useAuth } from '@/lib/authContext';
import { auth,db } from '@/lib/firebaseConfig';
import { useEffect ,useState} from 'react';
import {doc,getDoc,updateDoc} from "firebase/firestore"
import { signOut } from "firebase/auth";



export default function page() {
  const {currentUser} = useAuth();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

 useEffect(()=>{
  if(!currentUser){
    router.push('/');

  } else {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if(userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };
    fetchUserData();
  }
 }, [currentUser,router]);

 const handleClockIn = async () => {
  try{
    await updateDoc(doc(db, 'users', currentUser.uid),{
      lastClockIn: new Date(),
    });
    alert('Welcome to work');
    await signOut(auth);
    router.push('/');

  } catch (error) {
    console.error('error clocking:', error)
  }

  
 };

 const handleClockOut = async () => {
  try{
    await updateDoc(doc(db, 'users', currentUser.uid),{
      lastClockOUt: new Date(),
    });
    alert('Goodbye from work');
    await signOut(auth);
    router.push('/');

  } catch (error) {
    console.error('error clocking:', error)
  }
};

  if(!userData){
    return<div>
     
    </div>
  }

 

  
 
  return (
    
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 ">
      <div className="md:w-1/4 bg-slate-900 shadow-lg p-8 ">
        <div className=" flex flex-col items-center  ">
          <div className="bg-blue-400 text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl">{userData.email[0].toUpperCase()}
          </div>
          <p className="text-white pt-4">{userData.email}</p>
        </div>
    </div>

    <div className="md:w-3/4 bg-slate-200 rounded-xl shadow-lg p-8 m-4 flex flex-col justify-center items-center">
        <div className="text-center mb-6">
          <h1>Welcome,  {userData.firstName}</h1>

        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <CustomButton
            title="Clock In"
            onClick={handleClockIn}
            className="bg-green-600 hover:bg-green-900  text-white font bold py-2 px-4 rounded-lg"/>
          </div>
          <div>
            <CustomButton
             title="Clock Out"
             onClick={handleClockOut}
             className="bg-red-600 hover:bg-red-900 text-white font bold py-2 px-4 rounded-lg"/>
          </div>

        </div>

    </div>
      
     
      
     
    </div>
  )
}

