import User from "../models/user.model.js"


export const getUserForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id

    const allUserExceptLoggedIn = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password")

    res.status(200).json(allUserExceptLoggedIn)
  } catch (error) {
    next(error)
  }
}


export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password,cPassword, profilePic } = req.body;

  // Validate required fields (optional)
  if (!username && !email && !password && !profilePic) {
    return res.status(400).json({ error: "At least one field is required for update." });
  }
  if (password !== cPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  if (password) {
    password = bcryptjs.hashSync(password, 10);
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, password, profilePic },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
    
  } catch (error) {
    next(error);
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while updating user." });
  }
};
