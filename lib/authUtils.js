import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebaseConfig'

//intialize firebase auth


export const login = (email, password) => {
    return signInWithEmailAndPassword(auth,email,password)
};
