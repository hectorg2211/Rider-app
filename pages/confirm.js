import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";

import Map from "./components/Map";
import RideSelector from "./components/RideSelector";
import Link from "next/link";

const Confirm = () => {
  const { pickup, destination } = useRouter().query;
  const [pickupCoordinates, setPickup] = useState([0, 0]);
  const [destinationCoordinates, setDestination] = useState([0, 0]);

  /* TODO: Set conditions for destination and pickup coordinates
  - Delete the if blocks looking at the first element of the array */
  const getPickupCoordinates = (pickup) => {
    // const pickup = "Tijuana";

    // Fetch location
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA",
          limit: 1,
        })
    ).then((response) =>
      response.json().then((data) => setPickup(data.features[0].center))
    );
  };

  const getDestinationCoordinates = (destination) => {
    // const destination = "Tijuana";
    // Fetch location

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA",
          limit: 1,
        })
    ).then((response) =>
      response.json().then((data) => setDestination(data.features[0].center))
    );
  };

  useEffect(() => {
    getPickupCoordinates(pickup);
    getDestinationCoordinates(destination);
  }, [pickup, destination]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/037ffc/left.png" />
        </Link>
      </ButtonContainer>
      <Map
        pickupCoordinates={pickupCoordinates}
        destinationCoordinates={destinationCoordinates}
      />
      <ConfirmRide>
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          destinationCoordinates={destinationCoordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm Standard rider</ConfirmButton>
        </ConfirmButtonContainer>
      </ConfirmRide>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex h-screen flex-col
`;

const ButtonContainer = tw.div`
  rounded-full absolute top-4 left-4 z-10 bg-white cursor-pointer
  transform hover:scale-110  transition
`;

const BackButton = tw.img`
  h-full object-container
`;

const ConfirmRide = tw.div`
  flex-1 flex flex-col h-1/2 
`;

const ConfirmButtonContainer = tw.div`
border-t-2
`;

const ConfirmButton = tw.div`
  text-white  my-4 mx-4 bg-blue-400 rounded-full p-4 text-center text-xl cursor-pointer 
`;

export default Confirm;
