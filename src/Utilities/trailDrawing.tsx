import L, { FitBoundsOptions, LatLngTuple } from "leaflet";

import bezier from "@turf/bezier-spline";
import { lineString } from "@turf/helpers";

import { TrailCoordinate } from "../Interfaces/TrailCoordinate";

//COORDINATES

//Initial map boundry settings
export const initialBounds: [number, number][] = [
  [53.8, 20.8],
  [56.5, 27],
];
export const boundsOptions: FitBoundsOptions = {
  padding: [30, 30],
};

export const roundCoordinate = (coordinate: number) => {
  return coordinate.toLocaleString(undefined, {
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
  });
};

//Convert longitude to a valid range [-180, 180] and latitude to a valid range [-90, 90]
//as the coordinates from the map can be out of bounds
export const getCoordinateInValidRange = (
  latitude: number,
  longitude: number
) => {
  let positiveLatitude = (latitude + 90) % 180;
  if (positiveLatitude < 0) positiveLatitude = positiveLatitude + 180;

  let positiveLongitude = (longitude + 180) % 360;
  if (positiveLongitude < 0) positiveLongitude = positiveLongitude + 360;

  return [positiveLatitude - 90, positiveLongitude - 180] as LatLngTuple;
};

export const getCoordinateBetweenTwoCoordinates = (
  firstCoordinate: LatLngTuple,
  secondCoordinate: LatLngTuple
) => {
  let validFirstCoordinate = getCoordinateInValidRange(
    firstCoordinate[0],
    firstCoordinate[1]
  );
  let validSecondCoordinate = getCoordinateInValidRange(
    secondCoordinate[0],
    secondCoordinate[1]
  );

  let firstPositiveLatitude = validFirstCoordinate[0] + 90;
  let secondPositiveLatitude = validSecondCoordinate[0] + 90;

  let firstPositiveLongitude = validFirstCoordinate[1] + 180;
  let secondPositiveLongitude = validSecondCoordinate[1] + 180;

  let latitudeBetween =
    (firstPositiveLatitude + secondPositiveLatitude) / 2 - 90;
  let longitudeBetween =
    (firstPositiveLongitude + secondPositiveLongitude) / 2 - 180;

  return [latitudeBetween, longitudeBetween] as LatLngTuple;
};

//ICONS
export const trailStartIcon = L.icon({
  iconUrl: "../images/map-pointer-green.png",
  iconSize: [26, 40],
  iconAnchor: [13, 40],
});

export const trailEditIcon = L.icon({
  iconUrl: "../images/map-pointer-orange.png",
  iconSize: [26, 40],
  iconAnchor: [13, 40],
});

export const trailEndIcon = L.icon({
  iconUrl: "../images/map-pointer-red.png",
  iconSize: [26, 40],
  iconAnchor: [13, 40],
});

export const coordinateIndicatorIcon = L.icon({
  iconUrl: "../images/coordinate-indicator.png",
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

//BEZIER CURVE
const MINIMUM_BEZIER_CURVE_RESOLUTION = 50000;
const BEZIER_CURVE_RESOLUTION_STEP = 1000;

export const prepareTrailCoordinatesForDrawing = (
  coordinates: TrailCoordinate[]
) => {
  const coordinatesAsLineString = lineString(
    coordinates.map((x) => [x.latitude, x.longitude]) as LatLngTuple[]
  );

  //Bezier curve resolution 50000 is equal to bezier curve with 2501 points.
  //Best to have about 50 bezier curve points for every coordinate for smoothness. (2501 / 50 ~= 50)
  //Resolution for less than 50 coordinates is always 50000.
  //For every additional coordinate over 50 the resolution increases by 1000 to improve bezier curve smoothness.
  const bezierCurveResolution = Math.max(
    MINIMUM_BEZIER_CURVE_RESOLUTION,
    BEZIER_CURVE_RESOLUTION_STEP * coordinates.length
  );

  const curvedTrail = bezier(coordinatesAsLineString, {
    resolution: bezierCurveResolution,
    sharpness: 0.5,
  });

  return curvedTrail.geometry.coordinates as LatLngTuple[];
};
