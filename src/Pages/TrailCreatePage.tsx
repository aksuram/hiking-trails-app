import CoordinateList from "../Components/Trail/CoordinateList";
import { CoordinateSelectionProvider } from "../Components/Trail/CoordinateSelectionContext";
import { TrailProvider } from "../Components/Trail/TrailContext";
import TrailLayout from "../Components/Trail/TrailLayout";
import TrailMap from "../Components/Trail/TrailMap";

const TrailCreatePage = () => {
  return (
    <CoordinateSelectionProvider>
      <TrailProvider>
        <TrailLayout
          coordinateColumn={<CoordinateList />}
          mapColumn={<TrailMap />}
        />
      </TrailProvider>
    </CoordinateSelectionProvider>
  );
};

export default TrailCreatePage;
