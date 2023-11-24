import useViewStore from "../../store/useViewStore";
import { getGridParams } from "../../lib/utils";
import ComicGridContainer from "../common/ComicGridContainer";
import ViewGridCell from "./ViewGridCell";

const getStoreData = (state) => ({
  panels: state.panels
});

const ViewItemGrid = () => {
  const { panels } = useViewStore(getStoreData);
  return (
    <ComicGridContainer
      panels={panels}
      renderGridCells={() => renderGridCells(panels)}
    />
  );
};

const renderGridCells = (panels) => {
  return panels.map((panel, i) => {
    const { xs, ratio } = getGridParams(i);
    return <ViewGridCell xs={xs} ratio={ratio} key={i} panel={panel} />;
  });
};

export default ViewItemGrid;
