import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
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
        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/121492725?v=4"
      }).then(() => {
        // Profile updated!
        const {uid, email, displayName, photoURL} = auth.currentUser;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
      }).catch((error) => {
        // An error occurred
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
        navigate("/browse");
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
    <div>

        <Header />

        <div className='absolute'>
            <img
            className=''
            src='https://assets.nflxext.com/ffe/siteui/vlv3/50fcc930-ba3f-4cae-9257-9f920e30a998/web/IN-en-20250310-TRIFECTA-perspective_739387a0-ff14-44ed-a5af-36e5aa4d236e_large.jpg'
            alt='backround-img'
            /> 
        </div>

        <form 
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute bg-black/80 text-white p-12 mx-auto my-36 right-0 left-0 rounded-lg'
        >
            
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
            placeholder='Email or mobile number'
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