import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA";

const Map = ({ pickupCoordinates, destinationCoordinates }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/hectorg2211/ckvlrc8910e2715qtrkjc9tc7",
      center: [-99.29011, 39.39172],
      zoom: 3,
    });

    if (
      !pickupCoordinates ||
      pickupCoordinates[0] === 0 ||
      destinationCoordinates[0] === 0
    )
      return;
    if (pickupCoordinates) addToMap(map, pickupCoordinates);
    if (destinationCoordinates) addToMap(map, destinationCoordinates);
    if (pickupCoordinates[0] != 0 && destinationCoordinates[0] != 0) {
      map.fitBounds([pickupCoordinates, destinationCoordinates], {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
      });

    }

    map.on("load", async () => {
      const query = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA`;
      const response = await fetch(query);
      const data = await response.json();
      if (data.routes?.length > 0) {
        const route = data.routes[0]?.geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };

        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    });
  }, [pickupCoordinates, destinationCoordinates]);

  const addToMap = (map, coordinates) => {
    if (coordinates?.length > 0) {
      const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    }
  };

  return <Wrapper id="map"></Wrapper>;
};

const Wrapper = tw.div`
  flex-1
`;

export default Map;
