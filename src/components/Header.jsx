import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleSignOut = ()=> {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect( ()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse");
          
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
        }
      });
      // Unsubscribe when component unmount
      return unsubscribe();
  }, []);

  return (
    <div className='w-screen px-4 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img
        className='w-30 sm:w-44'
        src={LOGO}
        alt='logo'
        />

        {/* user-icon at the header */}
        {user && <div className='flex items-center'>
          <h3
          className='font-bold mr-4 text-white'
          >Hi, {user.displayName}!</h3>
          <img
          className='h-12 rounded-lg'
          src={user?.photoURL}
          alt='usericon'
          />
          {/* Sign out button */}
          <button 
          className='font-bold text-white cursor-pointer ml-2'
          onClick={handleSignOut}
          >(Sign Out)</button>
        </div>
        }
        
    </div>
  )
}

export default Header