// import { useEffect } from "react"
// import { useSocketContext } from "../context/SocketContext"
// import useConversation from "../zustand/useConversation"
// import notificationSound from "../assets/sounds/notification.mp3"

// const useListenMessages = () => {
//   const { socket } = useSocketContext()
//   const { messages, setMessages } = useConversation()

//   //   console.log(messages);

//   useEffect(() => {
//     socket?.on("newMessage", (newMessage) => {
//       const sound = new Audio(notificationSound)
//       sound.play()

//       setMessages([...messages, newMessage])
//     })

//     return () => socket?.off("newMessage")
//   }, [socket, setMessages, messages])
// }

// export default useListenMessages

import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { addMessageToConversation, selectedConversationId } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Check if the message belongs to the current conversation
      if (newMessage.receiverId === selectedConversationId || newMessage.senderId === selectedConversationId) {
        addMessageToConversation(newMessage); // Adds message to conversation in real-time
      }
    };

    // Listen for new messages from the server
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage); // Cleanup listener on unmount
    };
  }, [socket, selectedConversationId, addMessageToConversation]);
};

export default useListenMessages;
