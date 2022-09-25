const mongoose = require("mongoose");

const lotterySchema = new mongoose.Schema(
    {
        wallet: {
            type: String,
        },
        title: {
            type: String,
        },
        poolId : {
            type : String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("lottery", lotterySchema);
