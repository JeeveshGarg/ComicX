import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";

const getItems = async () => {
  if (!auth.currentUser) return [];

  const q = query(
    collection(db, "comics"),
    where("author", "==", auth.currentUser.uid)
  );
  const ss = await getDocs(q);
  return ss.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      shareToken: data.shareToken,
    };
  });
};

export default getItems;
