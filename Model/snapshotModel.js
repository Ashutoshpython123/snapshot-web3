const mongoose = require("mongoose");

const snapshotSchema = mongoose.Schema(
    {
        owner: {
            type: String,
        },
        from: {
            type: String,
        },
        tokenId: {
            type: String,
        },
        eTokens: {
            type: String,
        },
        block: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("snapshots", snapshotSchema)