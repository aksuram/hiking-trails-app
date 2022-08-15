import { LatLngTuple } from "leaflet";
import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import useArray from "../../Hooks/useArray";
import { TrailCoordinate } from "../../Interfaces/TrailCoordinate";
import {
  getCoordinateBetweenTwoCoordinates,
  getCoordinateInValidRange
} from "../../Utilities/trailDrawing";

const MAXIMUM_TRAIL_COORDINATE_COUNT = 200;
const INSERT_LATITUDE_DELTA = 0.01;
const INSERT_LONGITUDE_DELTA = 0.01;

export enum InsertType {
  Before,
  After,
}

interface TrailData {
  coordinates: TrailCoordinate[];
  pushCoordinate: (coordinate: LatLngTuple) => void;
  insertCoordinate: (index: number, insertType: InsertType) => void;
  editCoordinate: (
    index: number,
    coordinateId: string,
    coordinate: LatLngTuple
  ) => void;
  removeCoordinate: (index: number) => void;
  toggleCoordinateForEditing: (index: number) => void;
  toggleAllCoordinatesForEditing: (isEditing: boolean) => void;
  clearAllCoordinates: () => void;
}

const formInsertCoordinate = (
  latitude: number,
  longitude: number,
  insertType: InsertType
) => {
  let deltaInversion = insertType === InsertType.Before ? 1 : -1;
  let newLatitude = latitude + INSERT_LATITUDE_DELTA * deltaInversion;
  let newLongitude = longitude + INSERT_LONGITUDE_DELTA * deltaInversion * -1;

  return [newLatitude, newLongitude] as LatLngTuple;
};

const TrailContext = createContext<TrailData>(null!);

export const useTrail = () => {
  return useContext(TrailContext);
};

export const TrailProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    array: coordinates,
    pushToArray,
    addToArray,
    editInArray,
    removeFromArray,
    clearArray,
    mapArray,
  } = useArray<TrailCoordinate>();

  //TODO: Return error if adding was unsuccessful? (because of the coordinate limit)
  const pushCoordinate = (coordinate: LatLngTuple) => {
    if (coordinates.length >= MAXIMUM_TRAIL_COORDINATE_COUNT) return;

    let [latitude, longitude] = getCoordinateInValidRange(
      coordinate[0],
      coordinate[1]
    );

    pushToArray({ id: uuidv4(), isEditing: false, latitude, longitude });
  };

  //TODO: Return error if adding was unsuccessful? (because of the coordinate limit)
  const insertCoordinate = (index: number, insertType: InsertType) => {
    if (coordinates.length >= MAXIMUM_TRAIL_COORDINATE_COUNT) return;

    let latitude: number, longitude: number;

    let canCoordinateBeComputedFromNearbyCoordinates = !(
      coordinates.length === 1 ||
      (index === 0 && insertType === InsertType.Before) ||
      (index === coordinates.length - 1 && insertType === InsertType.After)
    );

    if (canCoordinateBeComputedFromNearbyCoordinates) {
      let secondCoordinateIndex =
        insertType === InsertType.Before ? index - 1 : index + 1;

      let firstCoordinate = [
        coordinates[index].latitude,
        coordinates[index].longitude,
      ] as LatLngTuple;
      let secondCoordinate = [
        coordinates[secondCoordinateIndex].latitude,
        coordinates[secondCoordinateIndex].longitude,
      ] as LatLngTuple;

      [latitude, longitude] = getCoordinateBetweenTwoCoordinates(
        firstCoordinate,
        secondCoordinate
      );
    } else {
      [latitude, longitude] = formInsertCoordinate(
        coordinates[index].latitude,
        coordinates[index].longitude,
        insertType
      );
    }

    [latitude, longitude] = getCoordinateInValidRange(latitude, longitude);

    addToArray(insertType === InsertType.Before ? index : index + 1, {
      id: uuidv4(),
      isEditing: true,
      latitude,
      longitude,
    });
  };

  const editCoordinate = (
    index: number,
    coordinateId: string,
    coordinate: LatLngTuple
  ) => {
    editInArray(index, {
      id: coordinateId,
      isEditing: true,
      latitude: coordinate[0],
      longitude: coordinate[1],
    });
  };

  const removeCoordinate = (index: number) => {
    removeFromArray(index);
  };

  const toggleCoordinateForEditing = (index: number) => {
    mapArray((coordinate, idx) =>
      idx === index
        ? { ...coordinate, isEditing: !coordinate.isEditing }
        : coordinate
    );
  };

  const toggleAllCoordinatesForEditing = (isEditing: boolean) => {
    mapArray((coordinate) => {
      return { ...coordinate, isEditing };
    });
  };

  const clearAllCoordinates = () => {
    clearArray();
  };

  return (
    <TrailContext.Provider
      value={{
        coordinates,
        pushCoordinate,
        insertCoordinate,
        editCoordinate,
        removeCoordinate,
        toggleCoordinateForEditing,
        toggleAllCoordinatesForEditing,
        clearAllCoordinates,
      }}
    >
      {children}
    </TrailContext.Provider>
  );
};
