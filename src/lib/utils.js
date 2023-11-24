import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import updateItem from "../lib/apis/updateItem";
import useEditStore from "../store/useEditStore";
import { toast } from "react-toastify";

export const useGetUser = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, authLoading };
};

export const useSaveComic = () => {
  const comicData = useEditStore((state) => ({
    metadata: {
      ...state.metadata,
      lastEditedOn: new Date().toDateString(),
    },
    panels: state.panels,
  }));

  const saveComic = async () => {
    try {
      await updateItem(comicData);
      toast.success("Comic saved successfully!");
    } catch (err) {
      toast.error("Unable to save comic");
    }
  };

  return saveComic;
};

export const blobToBase64 = (blob) =>
  new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

export const Portrait = [
  {
    xs: 6,
    ratio: 3 / 2.5,
  },
  {
    xs: 6,
    ratio: 3 / 2.5,
  },
  {
    xs: 4,
    ratio: 1,
  },
  {
    xs: 4,
    ratio: 1,
  },
  {
    xs: 4,
    ratio: 1,
  },
  {
    xs: 6,
    ratio: 3 / 2.5,
  },
  {
    xs: 6,
    ratio: 3 / 2.5,
  },
  {
    xs: 4,
    ratio: 1,
  },
  {
    xs: 4,
    ratio: 1,
  },
  {
    xs: 4,
    ratio: 1,
  },
];

export const getGridParams = (index) => {
  return Portrait[index];
};

export const getImageUrlFromBlob = (blob) => {
  try {
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    return null;
  }
};

export const getUserNick = () => {
  if (auth?.currentUser?.displayName) {
    return auth?.currentUser?.displayName.split(" ")[0];
  }
  return "";
};
