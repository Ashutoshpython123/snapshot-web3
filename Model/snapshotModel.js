const mongoose = require("mongoose");

const snapshotSchema = mongoose.Schema(
    {
        owner: {
            type: String,
        },
        
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("snapshots", snapshotSchema)