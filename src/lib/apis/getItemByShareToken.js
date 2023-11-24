import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const getItemByShareToken = async (shareToken) => {
  if (!shareToken) return null;

  const comicsRef = collection(db, "comics");
  const panelDBRef = collection(db, "panel_data");

  const metadataQry = query(comicsRef, where("shareToken", "==", shareToken));
  const metadataQrySS = await getDocs(metadataQry, limit(1));

  const comic = {};
  metadataQrySS.forEach((doc) => {
    comic.metadata = doc.data();
  });

  const id = comic.metadata?.id;
  if (!id) return null;

  const panelQry = query(panelDBRef, where("comicId", "==", id));
  const panelQrySS = await getDocs(panelQry, limit(1));

  panelQrySS.forEach((doc) => {
    comic.panels = doc.data().panels;
  });
  
  return comic;
};

export default getItemByShareToken;
