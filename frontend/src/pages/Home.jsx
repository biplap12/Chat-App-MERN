import React from "react";
import { useAuthContext } from "../context/AuthContext"; // Ensure you're importing the context
import Sidebar from "../component/sidebar/Sidebar";
import MessageContainer from "../component/messages/MessageContainer";
import Landing from "./Landing";

const Home = () => {
  const { authUser } = useAuthContext(); // Get authUser from context

  return (
    <>
      {authUser ? (
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-200">
          <Sidebar />
          <MessageContainer />
        </div>
      ) : (
        <Landing />
      )}
    </>
  );
};

export default Home;
