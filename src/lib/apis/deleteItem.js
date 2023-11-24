import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const deleteComic = async (metadata) => {
  const comicRef = doc(db, "comics", metadata.docId);
  const panelRef = doc(db, "panel_data", metadata.panelDocId);

  await deleteDoc(comicRef);
  await deleteDoc(panelRef);
};

export default deleteComic;
