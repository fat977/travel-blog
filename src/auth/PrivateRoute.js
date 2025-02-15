import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../lib/userInfo';
import { auth } from '../lib/firebase';
import SkeletonImg from '../components/Skeleton/SkeletonImg';

const PrivateRoute = ({ element }) => {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        fetchUserInfo(null); // Clear user info if logged out
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

    // If still loading, return a loading message or spinner
    if (isLoading) {
        return  <SkeletonImg
        rows={1}
         baseColor="#ddd"
         columns={2}
         width="100%"
         height="350px"
       />;
    }
    if (!isLoading) {
        return element
    }
  if (currentUser === null) {
    return <Navigate to="/" />;
  }

  
};

export default PrivateRoute;
