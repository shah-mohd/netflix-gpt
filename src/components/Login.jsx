import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return;

    // sign up and sign in logic
    if(!isSignInForm){
      // sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name.current.value, photoURL: USER_AVATAR
      }).then(() => {
        // Profile updated!
        const {uid, email, displayName, photoURL} = auth.currentUser;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
      }).catch((error) => {
        setErrorMessage(error.message);
      });

      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + " " + errorMessage);
    });
    }
    else {
      // sign in ligic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
  }

  const toggeleSignInForm = ()=> {
    setIsSignInForm(!isSignInForm);
    email.current.value = null;
    password.current.value = null;
    setErrorMessage(null);
  }

  return (
    <div className='bg-black h-svh md:overflow-auto
    md:pb-33 md:bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/50fcc930-ba3f-4cae-9257-9f920e30a998/web/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_large.jpg)]
    bg-center bg-cover'>


      <Header/>
      
      <form 
      onSubmit={(e) => e.preventDefault()}
      className='border-2 border-gray-500 w-10/12 h-fit p-5 mx-auto my-30 md:my-5 rounded-lg text-white flex flex-col items-center md:bg-black/80 md:border-none md:w-3/12'>

        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        
        {!isSignInForm && <input
        ref={name}
        className='my-4 p-4 w-full bg-gray-700'
        type='text'
        placeholder='Full Name'
        />}

        <input
        ref={email}
        className='my-4 p-4 w-full bg-gray-700'
        type='text'
        placeholder='Email'
        />

        <input
        ref={password}
        className='my-4 p-4 w-full bg-gray-700'
        type='password'
        placeholder='Password'
        />

        <p className='text-red-500 text-lg'>{errorMessage}</p>

        <button className='my-6 p-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        <p className='py-4 cursor-pointer' onClick={toggeleSignInForm}>
         {isSignInForm ? 'New to Netflix? Sign Up now' : 'Already registered? Sign In now.'}
        </p>

      </form>

    </div>
  )
}

export default Login;