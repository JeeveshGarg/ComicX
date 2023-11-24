import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const updateItem = async ({ metadata, panels }) => {
  const comicRef = doc(db, "comics", metadata.docId);
  const panelRef = doc(db, "panel_data", metadata.panelDocId);

  await updateDoc(comicRef, metadata);
  await updateDoc(panelRef, { panels, comicId: metadata.id });
};

export default updateItem;
