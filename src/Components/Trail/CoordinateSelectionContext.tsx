import { createContext, useContext, useState } from "react";

import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";

interface CoordinateSelectionData {
  setPanToCoordinateFunction: (
    panToCoordinate: (coordinate: TrailCoordinate) => void
  ) => void;
  panToCoordinate: (coordinate: TrailCoordinate) => void;
}

const CoordinateSelectionContext = createContext<CoordinateSelectionData>(
  null!
);

export const useCoordinateSelection = () => {
  return useContext(CoordinateSelectionContext);
};

export const CoordinateSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [panToCoordinateOnMapFunction, SetPanToCoordinateOnMapFunction] =
    useState<((coordinate: TrailCoordinate) => void) | null>(null);

  const setPanToCoordinateFunction = (
    panToCoordinate: (coordinate: TrailCoordinate) => void
  ) => {
    SetPanToCoordinateOnMapFunction(() => panToCoordinate);
  };

  const panToCoordinate = (coordinate: TrailCoordinate) => {
    if (panToCoordinateOnMapFunction === null) return;
    panToCoordinateOnMapFunction(coordinate);
  };

  return (
    <CoordinateSelectionContext.Provider
      value={{ setPanToCoordinateFunction, panToCoordinate }}
    >
      {children}
    </CoordinateSelectionContext.Provider>
  );
};
