import { db, auth } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { nanoid } from "nanoid";
import { defaultPanel } from "../../store/useEditStore";

const createNewComic = async () => {
  const id = nanoid();
  await addDoc(collection(db, "comics"), {
    id,
    title: "Untitled",
    description: "No description",
    lastEditedOn: new Date().toDateString(),
    author: auth?.currentUser?.uid,
    authorName: auth?.currentUser?.displayName,
    authorEmail: auth?.currentUser?.email,
    shareToken: nanoid(20),
  });

  await addDoc(collection(db, "panel_data"), {
    comicId: id,
    panels: Array(10).fill(defaultPanel),
  });

  return id;
};

export default createNewComic;
