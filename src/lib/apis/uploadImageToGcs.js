import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const uploadImage = async (blob, comicId, panel) => {
  const storageRef = ref(storage, `comics/${comicId}/panel-${panel}`);
  const ss = await uploadBytes(storageRef, blob);
  const url = await getDownloadURL(ss.ref);
  return url;
};

export default uploadImage;
