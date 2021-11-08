import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import User from "./assets/Hector.jpg";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, []);

  return (
    <Wrapper>
      <Map />
      <ActionItems>
        {/* Header */}
        <Header>
          <HeaderLogo src="https://cdn-icons-png.flaticon.com/512/732/732135.png" />
          <Profile>
            <Name>{user?.name}</Name>
            <UserImage src={user?.photoUrl} onClick={() => signOut(auth)} />
          </Profile>
        </Header>

        {/* ActionButtons */}
        <ActionButtons>
          <Link href="/search">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
            Wheels
          </ActionButton>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Reserve
          </ActionButton>
        </ActionButtons>
        <InputButton>Where to?</InputButton>

        {/* InputButtons */}
      </ActionItems>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col h-screen
`;

const ActionItems = tw.div`
  flex-1 p-4 justify-between flex flex-col
`;

const Header = tw.div`
  flex justify-between items-center
`;

const HeaderLogo = tw.img`
  h-10
`;

const Profile = tw.div`
  flex items-center
`;

const Name = tw.div`
  mr-4 w-20 text-m
`;

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-blue-200 p-px
  cursor-pointer
`;

const ActionButtons = tw.div`
  flex
`;

const ActionButton = tw.div`
  flex flex-col bg-blue-200 flex-1 m-1 h-32 items-center justify-center rounded-xl
  transform hover:scale-105 transition text-xl cursor-pointer
`;

const ActionButtonImage = tw.img`
  h-3/5  
`;

const InputButton = tw.div`
  h-20 bg-blue-200 text-xl p-4 flex items-center rounded-xl mt-1
`;

export default Home;
