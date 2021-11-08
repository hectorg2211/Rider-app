import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";

const Search = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <Wrapper>
      {/* Button container */}
      <ButtonContainer>
        <Link href="/">
          <BackButton src="https://img.icons8.com/ios-filled/50/037ffc/left.png" />
        </Link>
      </ButtonContainer>
      {/* Input Container */}
      <InputContainer>
        <FromToIcons>
          <Circle src="https://img.icons8.com/ios-filled/50/037ffc/filled-circle.png" />
          <Line src="https://img.icons8.com/ios/50/037ffc/vertical-line.png" />
          <Square src="https://img.icons8.com/material-sharp/50/037ffc/square.png" />
        </FromToIcons>

        <InputBoxes>
          <Input
            placeholder="Enter pickup location..."
            onChange={(e) => setPickup(e.target.value)}
            value={pickup}
          />
          <Input
            placeholder="Where are we headed?"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
          />
        </InputBoxes>

        <PlusIcon src="https://img.icons8.com/ios/50/037ffc/plus-math.png"></PlusIcon>
      </InputContainer>

      {/* Save places Container */}
      <SavedPlaces>
        <StarIcon src="https://img.icons8.com/ios-filled/50/037ffc/star--v1.png" />
        Saved places
      </SavedPlaces>

      {/* Confirm Location Button */}
      <Link href={{ pathname: "/confirm", query: { pickup, destination } }}>
        <ConfirmButton>Confirm Locations</ConfirmButton>
      </Link>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  bg-blue-200 h-screen
`;

const ButtonContainer = tw.div`
  bg-white px-3 
`;

const BackButton = tw.img`
  cursor-pointer
`;

const FromToIcons = tw.div`
  w-10 flex flex-col mr-2 items-center
`;

const InputContainer = tw.div`
  bg-white flex items-center px-4 pb-2
`;

const Circle = tw.img`
  h-2.5
`;

const Line = tw.img`
  h-10
`;

const Square = tw.img`
  h-3
`;

const InputBoxes = tw.div`
  flex flex-col flex-1
`;

const Input = tw.input`
  h-10 bg-blue-200 my-2 rounded-xl p-2 outline-none border-none
  placeholder-blue-400 ml-3 text-blue-700
`;

const PlusIcon = tw.img`
  w-10 h-10 bg-blue-300 rounded-full ml-3
`;

const SavedPlaces = tw.div`
  flex items-center bg-white px-4 py-2
  cursor-pointer 
`;

const StarIcon = tw.img`
  bg-blue-400 w-10 h-10 p-2 rounded-full mr-2
  transform hover:scale-105  transition
`;

const ConfirmButton = tw.div`
  bg-blue-400 p-2 m-5 rounded-full text-center text-white transform hover:scale-105  transition cursor-pointer
`;

export default Search;
