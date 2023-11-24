import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";

const getAllItems = async () => {
  if (!auth.currentUser) return [];

  const q = query(
    collection(db, "comics")
  );
  const ss = await getDocs(q);
  return ss.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      author: data.author,
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      title: data.title,
      description: data.description,
      shareToken: data.shareToken,
    };
  });
};

export default getAllItems;
