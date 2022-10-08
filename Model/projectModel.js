const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        owner: {
            type: String,
        },
        amount: {
            type: Number,
        },

    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("projects", projectSchema);
