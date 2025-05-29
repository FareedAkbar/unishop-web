"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";

type Props = {
  height: number;
};

const containerStyle = {
  width: "100%",
  borderRadius: "10px",
  position: "relative" as const,
};

const center = {
  lat: -34.40755818806117,
  lng: 150.87911127658157,
};

const placeId = "ChIJL7MK-3AZE2sRzpY_n6vPMSs"; // UOW UniShop

const Map = ({ height = 500 }: Props) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [placeDetails, setPlaceDetails] =
    useState<google.maps.places.PlaceResult | null>(null);

  const handleLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(
      {
        placeId,
        fields: [
          "name",
          "formatted_address",
          "rating",
          "user_ratings_total",
          "geometry",
        ],
      },
      (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place?.geometry?.location
        ) {
          setPlaceDetails(place);
        }
      },
    );
  };

  return (
    <div style={{ ...containerStyle, height: `${height}px` }}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
          center={center}
          zoom={16}
          onLoad={handleLoad}
        >
          {placeDetails?.geometry?.location && (
            <Marker position={placeDetails.geometry.location.toJSON()} />
          )}
        </GoogleMap>
      </LoadScript>

      {placeDetails && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 8,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            maxWidth: 300,
            fontFamily: "Arial, sans-serif",
            zIndex: 5,
          }}
        >
          <strong style={{ fontSize: 16, color: "#1a73e8" }}>
            {placeDetails.name}
          </strong>
          <div style={{ fontSize: 14, color: "#555", marginBottom: 6 }}>
            {placeDetails.formatted_address}
          </div>
          <div style={{ fontSize: 14, marginBottom: 4 }}>
            <span style={{ color: "#f57c00" }}>★</span>
            <span style={{ color: "#f57c00" }}>★</span>
            <span style={{ color: "#f57c00" }}>★</span>
            <span style={{ color: "#f57c00" }}>★</span>
            <span style={{ color: "#f57c00" }}>
              {placeDetails.rating && placeDetails.rating < 5 ? "☆" : "★"}
            </span>
            &nbsp;
            {placeDetails.rating} (
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#000" }}
            >
              {placeDetails.user_ratings_total} reviews
            </a>
            )
          </div>
          <div style={{ fontSize: 13 }}>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination_place_id=${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1a73e8",
                textDecoration: "none",
                marginRight: 8,
              }}
            >
              ➤ Directions
            </a>
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a73e8", textDecoration: "none" }}
            >
              View larger map
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
