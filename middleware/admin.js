const Users = require("../Model/userModel");

const admin = async (req, res, next) => {
	try {
		const user = await Users.findOne({ _id: req.user.id });
		if (user.role === 0) {
			return res.status(400).json({ msg: "Admin access denied" });
		}
		next();
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = admin;
