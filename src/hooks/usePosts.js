import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
        setLoading(false); // Stop loading once data is fetched
      },
      (error) => {
        console.error("Error fetching posts:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    );

    return () => unsubscribe();
  }, []);

  return { posts, loading };
};

export default usePosts;
