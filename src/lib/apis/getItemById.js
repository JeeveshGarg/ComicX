import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const getItemById = async (id, uid) => {
  if (!id || !uid) return;

  // Create ref to panel and metadata collections
  const comicsRef = collection(db, "comics");
  const panelDBRef = collection(db, "panel_data");

  // Query for comic metadata
  let metadataQry = query(comicsRef, where("id", "==", id));
  metadataQry = query(metadataQry, where("author", "==", uid));
  const metadataQrySS = await getDocs(metadataQry, limit(1));

  const comic = {};
  metadataQrySS.forEach((doc) => {
    comic.metadata = { ...doc.data(), docId: doc.id };
  });

  if (!comic.metadata) return;

  // Query for panel data
  const panelQry = query(panelDBRef, where("comicId", "==", id));
  const panelQrySS = await getDocs(panelQry, limit(1));

  panelQrySS.forEach((doc) => {
    comic.panels = doc.data().panels;
    comic.metadata["panelDocId"] = doc.id;
  });

  return comic;
};

export default getItemById;
