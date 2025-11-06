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
  const [loading, setLoading] = useState(true);
  console.log(user);
  //socal provider

  const googleProvider = new GoogleAuthProvider();
  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in user
  const siginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google login
  const googLeLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //signOut
  const signoutUser = () => {
    return signOut(auth);
  };
  const authInfo = {
    loading,
    createUser,
    siginUser,
    googLeLogin,
    signoutUser,
    user,
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
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
