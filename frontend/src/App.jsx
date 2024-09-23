// // import React from "react"
// // import { Routes, Route, Navigate } from "react-router-dom"
// // import Home from "./pages/Home"
// // import Login from "./pages/Login"
// // import SignUp from "./pages/SignUp"

// // import { Toaster } from "react-hot-toast"
// // import { useAuthContext } from "./context/AuthContext"

// // const App = () => {
// //   const { authUser } = useAuthContext()

// //   return (
// //     <div className="p-4 h-screen flex items-center justify-center">
// //       <Routes>
// //         <Route
// //           path="/"
// //           element={authUser ? <Home /> : <Navigate to={"/login"} />}
// //         />
// //         <Route
// //           path="/login"
// //           element={authUser ? <Navigate to={"/"} /> : <Login />}
// //         />
// //         <Route
// //           path="/signup"
// //           element={authUser ? <Navigate to={"/"} /> : <SignUp />}
// //         />
// //       </Routes>
// //       <Toaster />
// //     </div>
// //   )
// // }

// // export default App

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import Profile from "./pages/Profile";
// import Landing from "./pages/Landing"; // Import the Landing page
// import { Toaster } from "react-hot-toast";
// import { useAuthContext } from "./context/AuthContext";
// import Navbar from "./component/sidebar/NavBar";

// const App = () => {
//   const { authUser } = useAuthContext();

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Navbar visible for all users */}
//       <Navbar />
      
//       {/* Page content */}
//       <div className="p-4 flex-1 flex items-center justify-center">
//         <Routes>
//           {/* Landing page for non-authenticated users */}
//           <Route
//             path="/"
//             element={authUser ? <Navigate to="/home" /> : <Landing />}
//           />
//           <Route
//             path="/home"
//             element={authUser ? <Home /> : <Navigate to="/" />}
//           />
//           <Route
//             path="/login"
//             element={authUser ? <Navigate to="/home" /> : <Login />}
//           />
//           <Route
//             path="/signup"
//             element={authUser ? <Navigate to="/home" /> : <SignUp />}
//           />
//           {/* Profile route */}
//           <Route
//             path="/profile/:id"
//             element={authUser ? <Profile /> : <Navigate to="/login" />}
//           />
//         </Routes>
//         <Toaster position="top-right" reverseOrder={false} gutter={8} />
//       </div>
//     </div>
//   );
// };

// export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing"; // Import the Landing page
import About from "./pages/About"; // Import the About page
import Contact from "./pages/Contact"; // Import the Contact page
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Navbar from "./component/sidebar/NavBar";
import Footer from "./component/Footer"; // Import the Footer component

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="p-4 flex-1 flex items-center justify-center">
        <Routes>
          <Route
            path="/" element={ <Landing />}
          />
         
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/home" /> : <Login />}
          />
           <Route
            path="/home"
            element={authUser ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route
            path="/profile/:id"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} gutter={8} />
      </div>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default App;
