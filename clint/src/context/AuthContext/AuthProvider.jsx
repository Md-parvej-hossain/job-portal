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
import axios from 'axios';
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
        if (currentUser?.email) {
          const userData = { email: currentUser.email };
          axios
            .post('http://localhost:5000/jwt', userData, {
              withCredentials: true,
            })
            .then(res => {
              console.log(res.data);
              // const token = res.data.token;
              // localStorage.setItem('token', token);
            })
            .catch(err => {
              console.log(err);
            });
        }
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
