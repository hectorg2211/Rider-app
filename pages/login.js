import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  return (
    <Wrapper>
      <RiderLogo src="./Full-rider.png" />
      <Title>Log in to access your account </Title>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
      <SignInButton onClick={() => signInWithPopup(auth, provider)}>
        Sign in with Google
      </SignInButton>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    flex flex-col h-screen w-screen bg-gray-200 p-4
`;

const RiderLogo = tw.img`
    h-20 w-auto object-contain 
`;

const Title = tw.div`
    text-5xl pt-4 text-blue-500 text-center
`;

const HeadImage = tw.img`
    object-contain w-full
`;

const SignInButton = tw.button`
    bg-blue-400 text-white text-center py-4 mt-8 self-center w-full
    rounded-full
`;

export default Login;
