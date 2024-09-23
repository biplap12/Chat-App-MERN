import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">About Chat App</h1>
      <p className="mb-6 text-lg text-center max-w-2xl">
        Chat App is a modern messaging platform that allows you to connect with friends and family in real-time. 
        Whether you want to chat one-on-one or in groups, our app provides a seamless experience across devices.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Features:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Real-time messaging</li>
        <li>Group chats</li>
        <li>Media sharing</li>
        <li>User profiles</li>
        <li>Cross-platform support</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
      <p className="text-lg text-center">
        Sign up today to start connecting with your loved ones!
      </p>
    </div>
  );
};

export default About;
