// import React, { useEffect, useRef } from "react"
// import Message from "./Message"
// import useGetMessages from "../../hooks/useGetMessages"
// import useListenMessages from "../../hooks/useListenMessages"

// const Messages = () => {
//   const { messages, loading } = useGetMessages()

//   // console.log(messages)

//   useListenMessages()

//   const lastMessageRef = useRef()

//   useEffect(() => {
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" })
//     })
//   }, [messages])

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {!loading && messages.length === 0 && (
//         <p className="text-center">Start conversation by sending a message</p>
//       )}

//       {!loading &&
//         messages.length > 0 &&
//         messages.map((message) => (
//           <div key={message._id} ref={lastMessageRef}>
//             <Message message={message} />
//           </div>
//         ))}
//     </div>
//   )
// }

// export default Messages



// import React, { useEffect, useRef } from "react";
// import Message from "./Message";
// import useGetMessages from "../../hooks/useGetMessages";
// import useListenMessages from "../../hooks/useListenMessages";

// const Messages = () => {
//   const { messages, loading } = useGetMessages(); // Fetches all messages for the conversation

//   useListenMessages(); // Listens for real-time updates

//   // Ref for scrolling to the last message
//   const lastMessageRef = useRef();

//   // Scroll to the last message whenever messages update
//   useEffect(() => {
//     lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {loading && <p className="text-center">Loading...</p>}
//       {!loading && messages.length === 0 && (
//         <p className="text-center">Start the conversation by sending a message</p>
//       )}
//       {!loading && messages.length > 0 && messages.map((message, index) => (
//         <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
//           <Message message={message} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;


import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages(); // Fetch messages initially
  useListenMessages(); // Hook to listen for real-time messages

  // Scroll to the latest message
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <p>Loading...</p>}
      {!loading && messages.length === 0 && <p>No messages yet, start chatting!</p>}

      {!loading && messages.length > 0 && messages.map((message, index) => (
        <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default Messages;



