const User = require("../models/user");

const getAuthUser = async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ message: `User Not Found` });
    }
    res.status(200).json({
        data: req.user,
    });
};

const getAllUsers = async (req, res) => {
    const allUsers = await User.find({ _id: { $ne: req.user._id } })
        .select("-password")
        .sort({ _id: -1 });
    res.status(200).send({ data: allUsers });
};

// --- Naya function yahan add karein ---
const updateProfilePic = async (req, res) => {
    const { image } = req.body;
    const userId = req.user._id;

    if (!image) {
        return res.status(400).json({ message: "Image URL is missing" });
    }

    // Database mein user dhoond kar image update karein
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { image: image },
        { new: true } // New: true se update ke baad wala data milta hai
    ).select("-password");

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,
    });
};

// Module exports mein naye function ko include karein
module.exports = { getAuthUser, getAllUsers, updateProfilePic };