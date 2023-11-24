import useEditStore from "../../store/useEditStore";
import ComicGridContainer from "../common/ComicGridContainer";
import EditGridCell from "./EditGridCell";
import { getGridParams } from "../../lib/utils";

const EditView = () => {
  const panels = useEditStore((state) => state.panels);
  return <ComicGridContainer renderGridCells={() => renderGridCells(panels)} />;
};

const renderGridCells = (panels) =>
  panels.map((panel, i) => {
    const { xs, ratio } = getGridParams(i);
    return (
      <EditGridCell xs={xs} ratio={ratio} index={i} key={i} panel={panel} />
    );
  });

export default EditView;
