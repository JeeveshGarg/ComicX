import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getItemById from "../lib/apis/getItemById";
import useEditStore from "../store/useEditStore";
import EditView from "../components/editItem/EditView";
import EditModal from "../components/editItem/EditModal";
import isEmpty from "lodash/isEmpty";
import { useGetUser } from "../lib/utils";
import Loader from "../components/common/Loader";
import { useErrorBoundary } from "react-error-boundary";
import EditNavbar from "../components/editItem/EditNavbar";

const EditItem = () => {
  const { id: comicId } = useParams();
  const { user, authLoading } = useGetUser();
  const [loading, setLoading] = useState(true);
  const { showBoundary } = useErrorBoundary();

  const setEditStore = useEditStore((state) => state.setEditStore);

  const fetchComicData = async (id) => {
    try {
      const comicData = await getItemById(id, user?.uid);
      if (isEmpty(comicData)) {
        showBoundary(
          new Error(
            "Either the comic does not exist or you do not have permission to view it."
          )
        );
        return;
      }
      setEditStore(comicData);
    } catch (err) {
      showBoundary(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (comicId && user?.uid) {
      setLoading(true);
      fetchComicData(comicId);
    }
  }, [comicId, user?.uid]);

  if (authLoading || loading) {
    return <Loader />;
  }

  if (!Boolean(user)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <EditNavbar />
      <EditView />
      <EditModal />
    </>
  );
};

export default EditItem;
