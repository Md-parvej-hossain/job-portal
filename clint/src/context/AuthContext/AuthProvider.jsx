import { AuthContext } from './AuthContext';
import { auth } from './../../firebase/firebase.init';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  //socal provider

  const googleProvider = new GoogleAuthProvider();
  //create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in user
  const siginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google login
  const googLeLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  //signOut
  const signoutUser = () => {
    return signOut(auth);
  };
  const authInfo = { createUser, siginUser, googLeLogin, signoutUser ,user};

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
