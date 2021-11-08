import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const carList = [
  {
    imgUrl: "https://i.ibb.co/cyvcpfF/uberx.png",
    service: "Standard Rider",
    multiplier: 1,
  },
  {
    imgUrl: "https://i.ibb.co/YDYMKny/uberxl.png",
    service: "XL Rider",
    multiplier: 1.5,
  },
  {
    imgUrl: "https://i.ibb.co/Xx4G91m/uberblack.png",
    service: "Black Rider",
    multiplier: 2,
  },
  {
    imgUrl: "https://i.ibb.co/cyvcpfF/uberx.png",
    service: "Comfort",
    multiplier: 1.2,
  },
  {
    imgUrl: " https://i.ibb.co/1nStPWT/uberblacksuv.png",
    service: "Black SUV Rider",
    multiplier: 2.8,
  },
];

const RideSelector = ({ pickupCoordinates, destinationCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);

  // Get ride duration from Mapbox API
  useEffect(() => {
    if (pickupCoordinates[0] !== 0 && destinationCoordinates[0] !== 0) {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?access_token=pk.eyJ1IjoiaGVjdG9yZzIyMTEiLCJhIjoiY2t0eWtxbmhtMDhwMTJwcG1jZXd0b3VhMSJ9.8XhBErdMP3PqsR-xN-NkMA`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.routes[0]?.duration) {
            setRideDuration(data.routes[0]?.duration / 100);
          } else return;
        })
        // .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  }, [pickupCoordinates, destinationCoordinates]);

  const renderCarList = () => {
    return carList.map((car, i) => (
      <Car key={i}>
        <CarImage src={car.imgUrl}></CarImage>
        <CarDetails>
          <Service>{car.service}</Service>
          <Time>8 min aways</Time>
        </CarDetails>
        <CarPrice>{`$${(rideDuration * car.multiplier).toFixed(2)}`}</CarPrice>
      </Car>
    ));
  };

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <CarList>{renderCarList()}</CarList>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    flex-1  h-1/2 overflow-y-scroll flex flex-col scrollbar-hide
`;

const Title = tw.div`
    text-center text-xs py-2 border-b
`;

const CarList = tw.div`
    overflow-y-scroll scrollbar-hide
`;

const Car = tw.div`
     flex items-center p-4
`;

const CarImage = tw.img`
    h-14 mr-2
`;

const CarDetails = tw.div`
   flex-1
`;

const Service = tw.div`
    font-medium text-blue-700
`;

const Time = tw.div`
    text-xs text-blue-500
`;

const CarPrice = tw.div`
    
`;

export default RideSelector;
