const mongoose = require("mongoose");

const pollsVotingScheme = new mongoose.Schema(
    {
        poll_id: {
            type: String,
            required: true,
        },
        wallet:{
            type:String,
            required: true,
        },
        image_url : {
            type : String
        },
        voted: {
			type: Boolean,
            required: true,  
            default: false
		},
        vote_status: {
			type: Boolean,
            required: true,  
            default: false
		},
		points: {
			type: Number,
            required: true,

		}
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("voting", pollsVotingScheme);