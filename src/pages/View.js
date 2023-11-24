import { useParams } from "react-router-dom";
import useViewStore from "../store/useViewStore";
import { useEffect } from "react";
import getItemByShareToken from "../lib/apis/getItemByShareToken";
import ViewItemContainer from "../components/viewItem/ViewItemContainer";
import Loader from "../components/common/Loader";
import { useErrorBoundary } from "react-error-boundary";
import Navbar from "../components/common/Navbar";

const getStoreData = (state) => ({
  setLoading: state.setLoading,
  setViewStore: state.setViewStore,
  resetViewStore: state.resetViewStore,
  isLoading: state.loading,
  title: state.metadata?.title,
});

const View = () => {
  const { id: shareToken } = useParams();
  const { setLoading, setViewStore, resetViewStore, isLoading, title } =
    useViewStore(getStoreData);
  const { showBoundary } = useErrorBoundary();

  // Fetch comic data on mount and set store
  useEffect(() => {
    if (!shareToken) return;

    const fetchComic = async () => {
      try {
        const comic = await getItemByShareToken(shareToken);
        if (!comic) {
          showBoundary(new Error("404: Comic not found"));
        } else {
          setViewStore(comic);
        }
      } catch (err) {
        showBoundary(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComic();

    return () => {
      resetViewStore();
    };
  }, [shareToken]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <ViewItemContainer />
    </>
  );
};

export default View;
