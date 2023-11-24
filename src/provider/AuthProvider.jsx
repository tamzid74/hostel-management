import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider } from "firebase/auth";
import app from "../config/firebase.config";
// import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    signOut(auth).then(() => {
      toast.success("SignOut Successfully");
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   const userEmail = currentUser?.email || user?.email;
    //   const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
    //   if (currentUser) {
    //     axios
    //       .post(
    //         "https://b8-a11-jobify-server-side.vercel.app/jwt",
    //         loggedUser,
    //         {
    //           withCredentials: true,
    //         }
    //       )
    //       .then((res) => {
    //         console.log(res.data);
    //       });
    //   } else {
    //     axios
    //       .post(
    //         "https://b8-a11-jobify-server-side.vercel.app/logout",
    //         loggedUser,
    //         {
    //           withCredentials: true,
    //         }
    //       )
    //       .then((res) => {
    //         console.log(res.data);
    //       });
    //   }
    });
    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  const authInfo = {
    user,
    setUser,
    googleLogin,
    createUser,
    signIn,
    logOut,
    updateUser,
    loading,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
