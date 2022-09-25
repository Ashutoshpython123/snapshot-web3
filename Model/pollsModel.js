const mongoose = require("mongoose");

const pollsScheme = new mongoose.Schema(
    {
        poll_id:{
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        description:{
            type:String,
            required: true,
        },
        start_date: {
			type: String,
            required: true,
		},
		end_date: {
			type: String,
            required: true,
		},
        image: {
            type: String,
            default:"",
        },
        pdf : {
            type : String,
            default:"",
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("polls", pollsScheme);