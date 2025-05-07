"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type Props = {
  height: number;
};

const containerStyle = {
  width: "100%",
  borderRadius: "10px",
};

const center = {
  lat: -34.40755818806117,
  lng: 150.87911127658157,
};

const Map = ({ height = 500 }: Props) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={{ ...containerStyle, height: `${height}px` }}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
