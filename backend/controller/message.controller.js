// import Conversation from "../models/conversation.model.js"
// import Message from "../models/message.model.js"
// import { getReceiverSocketId, io } from "../socket/socket.js"

// export const sendMessage = async (req, res, next) => {
//   try {
//     const { message } = req.body
//     const { id: receiverId } = req.params
//     const senderId = req.user.id

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     })

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       })
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     })

//     if (newMessage) {
//       conversation.messages.push(newMessage._id)
//     }

//     await Promise.all([conversation.save(), newMessage.save()])

//     // socket io functionality
//     const receiverSocketId = getReceiverSocketId(receiverId)

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage)
//     }

//     res.status(201).json(newMessage)
//   } catch (error) {
//     next(error)
//   }
// }

// export const getMessage = async (req, res, next) => {
//   try {
//     const { id: userToMessage } = req.params
//     const senderId = req.user.id

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToMessage] },
//     }).populate("messages")

//     if (!conversation) {
//       return res.status(200).json([])
//     }

//     const messages = conversation.messages

//     res.status(200).json(messages)
//   } catch (error) {
//     next(error)
//   }
// }


// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";
// import { huffmanEncode,huffmanDecode } from "../utils/huffman.js"; // Import Huffman encoding function

// export const sendMessage = async (req, res, next) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user.id;

//     // Encode the message using Huffman coding
//     const { encodedMessage, huffmanTree } = huffmanEncode(message);

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message: encodedMessage, // Store the encoded message
//       huffmanTree: JSON.stringify(huffmanTree), // Store the Huffman tree (optional)
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//     }

//     await Promise.all([conversation.save(), newMessage.save()]);

//     // Socket.io functionality
//     const receiverSocketId = getReceiverSocketId(receiverId);

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     next(error);
//   }
// };


// export const getMessage = async (req, res, next) => {
//   try {
//     const { id: userToMessage } = req.params;
//     const senderId = req.user.id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToMessage] },
//     }).populate("messages");

//     if (!conversation) {
//       return res.status(200).json([]);
//     }

//     const messages = conversation.messages.map(message => {
//       const huffmanTree = JSON.parse(message.huffmanTree); // Parse Huffman tree
//       const decodedMessage = huffmanDecode(message.message, huffmanTree); // Decode the message
//       return { ...message._doc, message: decodedMessage }; // Return the decoded message
//     });

//     res.status(200).json(messages);
//   } catch (error) {
//     next(error);
//   }
// };


import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { huffmanEncode, huffmanDecode } from "../utils/huffman.js"; // Import Huffman encoding/decoding functions
// export const sendMessage = async (req, res, next) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user.id;

//     // Encode the message using Huffman coding
//     const { encodedMessage, huffmanTree } = huffmanEncode(message);

//     // Ensure the Huffman tree is generated and valid
//     if (!encodedMessage || !huffmanTree) {
//       throw new Error("Failed to generate Huffman encoding");
//     }

//     // Make sure the Huffman tree is correctly stringified
//     let huffmanTreeStr = '';
//     try {
//       huffmanTreeStr = JSON.stringify(huffmanTree);
//     } catch (jsonError) {
//       throw new Error("Failed to stringify Huffman tree: " + jsonError.message);
//     }

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message: encodedMessage, // Store the encoded message
//       huffmanTree: huffmanTreeStr, // Store the stringified Huffman tree
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//     }

//     await Promise.all([conversation.save(), newMessage.save()]);

//     // socket.io functionality: decode the message before emitting it
//     const receiverSocketId = getReceiverSocketId(receiverId);

//     if (receiverSocketId) {
//       // Parse the Huffman tree and decode the message
//       let decodedMessage = encodedMessage; // Fallback to encoded message if decoding fails
//       try {
//         const parsedHuffmanTree = JSON.parse(huffmanTreeStr);
//         decodedMessage = huffmanDecode(encodedMessage, parsedHuffmanTree);
//       } catch (err) {
//         console.error("Error decoding message:", err.message);
//       }

//       // Emit the decoded message
//       const messageToEmit = {
//         ...newMessage._doc,
//         message: decodedMessage // Send decoded message to the receiver
//       };
//       io.to(receiverSocketId).emit("newMessage", messageToEmit);
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     next(error);
//   }
// };


export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Encode message using Huffman encoding
    const { encodedMessage, huffmanTree } = huffmanEncode(message); 

    const newMessage = new Message({
      senderId,
      receiverId,
      message: encodedMessage,
      huffmanTree: JSON.stringify(huffmanTree), // Save tree for decoding later
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // Decode the message for real-time update
    const decodedMessage = huffmanDecode(newMessage.message, huffmanTree);

    // socket.io functionality: send the decoded message to the receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        ...newMessage._doc,
        message: decodedMessage,
      });
    }

    res.status(201).json({ ...newMessage._doc, message: decodedMessage });
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { id: userToMessage } = req.params;
    const senderId = req.user.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToMessage] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages?.map(message => {
      let decodedMessage = message.message; 
      try {
        const huffmanTree = JSON.parse(message.huffmanTree); 
        decodedMessage = huffmanDecode(message.message, huffmanTree); 
      } catch (err) {
        console.error("Error decoding message:", err.message);
      }

      return { ...message._doc, message: decodedMessage }; // Return the decoded message
    });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};



