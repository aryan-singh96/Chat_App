const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../models/user");
const wrapAsync = require("./wrapAsync");

const authorization = wrapAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const userId = getUserIdFromToken(token);

    if (!userId) {
        return res.status(401).send({ message: "Invalid or Expired Token" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    req.user = user;
    next();
});

module.exports = { authorization };
