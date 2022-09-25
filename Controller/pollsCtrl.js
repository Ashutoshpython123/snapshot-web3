const Polls = require("../Model/pollsModel");
const Voting = require("../Model/pollsVotingModel");
const axios = require('axios').default;
let axiosConfig = {
    headers: {
        "Origin": "https://launchpad.seedify.fund"
    }
};
const pollsController = {
    createPoll: async (req, res) => {
        const { title, description, start_date, end_date, image, pdf } = req.body;
        if (!title || !description || !start_date || !end_date) {
            res.status(400).send("Invalid Request")
        }
        try {
            const newPoll = new Polls({
                title,
                description,
                start_date,
                end_date,
                image,
                pdf

            });
            newPoll.poll_id = newPoll._id
            await newPoll.save();
            res.json({
                msg: "Poll Created",
                id: newPoll._id,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updatePoll: async (req, res) => {
        const poll_id = req.body.poll_id;
        try {
            const updatedPoll = await Polls.updateOne(
                { _id: poll_id },
                {
                    title: req.body.title,
                    description: req.body.description,
                    end_date: req.body.end_date,
                    start_date: req.body.start_date,
                    image: req.body.image,
                    pdf: req.body.pdf
                },
            );
            if (updatedPoll) {
                return res
                    .status(201)
                    .json({ msg: "poll is updated successfully!", id: updatedPoll._id });
            }
            return res.json({
                msg: "Oops, there is some error! poll has not updated yet!",
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
    getPollById: async (req, res) => {
        const id = req.params.id;
        let votes;
        try {
            let poll = await Polls.findById({ _id: id }).lean();
            if (poll) {
                votes = await Voting.aggregate([
                    { $match: { poll_id: id } },
                    {
                        "$group":
                        {
                            "_id": "$poll_id",
                            person: { "$first": "$$ROOT" },
                            "yesVote": {
                                '$sum': {
                                    '$cond': [{ "$eq": ["$vote_status", true] }, "$points", 0]
                                }
                            },
                            "noVote": {
                                '$sum': {
                                    '$cond': [{ "$eq": ["$vote_status", false] }, "$points", 0]
                                }
                            },
                            "yesUser": {
                                '$sum': {
                                    '$cond': [{ "$eq": ["$vote_status", true] }, 1, 0]
                                }
                            },
                            "noUser": {
                                '$sum': {
                                    '$cond': [{ "$eq": ["$vote_status", false] }, 1, 0]
                                }
                            },
                            "totalPoints": {
                                $sum: "$points"
                            },
                            "totalUsers": {
                                $sum: 1
                            }

                        }
                    },
                    { "$replaceRoot": { "newRoot": { "$mergeObjects": ["$person", { yesVote: "$yesVote", noVote: "$noVote", totalPoints: "$totalPoints", totalUsers: "$totalUsers", yesUser: "$yesUser", noUser: "$noUser" }] } } },
                ]);
                poll.voting = votes[0]
                res.json({ data: poll });
            } else {
                res.json({ msg: "data not found" });
            }

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    deletePoll: async (req, res) => {
        const id = req.params.id;
        if (!id) {
            return res.status(500).json({ msg: "invalid request" });
        }
        try {
            await Polls.deleteOne({ _id: id });

            res.json({ msg: "poll deleted successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getPollsByPagignation: async function (req, res) {
        try {
            const match_cond1 = { end_date: { $lt: Date.now().toString() } }
            const match_cond2 = { end_date: { $gt: Date.now().toString() } }
            const match_cond3 = {end_date:-1}
            let polls;
            let total_pages;
            const sort = req.query.sort;
            const per_page_item = parseInt(req.query.per_page) || 6;
            const type = req.query.type;
            const page_no = req.query.page_no ? parseInt(req.query.page_no) : 1;
            pagination = {
                limit: per_page_item,
                skip: per_page_item * (page_no - 1),
            };
            const count_items = await Polls.countDocuments(type == "ended" ? match_cond1 : type === "inprogress" ? match_cond2 : {});
            polls = await Polls.find(type == "ended" ? match_cond1 : type === "inprogress" ? match_cond2 : {})
                .sort(match_cond3)
                .limit(pagination.limit)
                .skip(pagination.skip)
                .lean();

            votes = await Voting.aggregate([
                {
                    "$group":
                    {
                        "_id": "$poll_id",
                        person: { "$first": "$$ROOT" },
                        "yesVote": {
                            '$sum': {
                                '$cond': [{ "$eq": ["$vote_status", true] }, "$points", 0]
                            }
                        },
                        "noVote": {
                            '$sum': {
                                '$cond': [{ "$eq": ["$vote_status", false] }, "$points", 0]
                            }
                        },
                        "yesUser": {
                            '$sum': {
                                '$cond': [{ "$eq": ["$vote_status", true] }, 1, 0]
                            }
                        },
                        "noUser": {
                            '$sum': {
                                '$cond': [{ "$eq": ["$vote_status", false] }, 1, 0]
                            }
                        },
                        "totalPoints": {
                            $sum: "$points"
                        },
                        "totalUsers": {
                            $sum: 1
                        }

                    }
                },
                { "$replaceRoot": { "newRoot": { "$mergeObjects": ["$person", { yesVote: "$yesVote", noVote: "$noVote", totalPoints: "$totalPoints", totalUsers: "$totalUsers", yesUser: "$yesUser", noUser: "$noUser" }] } } },
            ]);
            let combinedData = polls.map((item) => (
                {
                    ...item,
                    votings: votes.find((f) => f.poll_id == item.poll_id)

                }));
            total_pages = Math.ceil(count_items / per_page_item);
            if (polls.length == 0) {
                return res.json({ msg: "there is no data" });
            }

            res.json({
                page: page_no,
                per_page: per_page_item,
                data: combinedData,
                total_pages: total_pages,
                total: count_items,
            });
        } catch (e) {
            return res.status(500).send(e.message);
        }
    },

    getVotes: async (req, res) => {
        try {
            const result = await Voting.aggregate([
                {
                    "$group":
                    {
                        "_id": "$poll_id"
                        ,
                        "points":
                            { "$sum": "$points" },
                        "yesVote": {
                            '$sum': {
                                '$cond': [{ "$eq": ["$vote_status", true] }, "$points", 0]
                            }
                        },
                        "noVote": {
                            '$sum': {
                                '$cond': [{ "$eq": ["$vote_status", false] }, "$points", 0]
                            }
                        },
                    }
                }
            ])
            return res.json(result)
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    giveVote: async (req, res) => {
        const { id, points, address, vote_status, image_url } = req.body
        if (!id || !address) {
            return res.status(500).json({ msg: "invalid request" });
        }
        try {

            const checkPoll = await Polls.findOne({ poll_id: id })
            console.log(checkPoll)
            if (!checkPoll) {
                return res.json({ msg: "poll not found" });
            }
            const response = await axios(`https://snapshotapi.seedify.fund/api/v1/block/check/${address}`, axiosConfig);
            const tierResponse = response.data.data

            if (tierResponse.data && tierResponse.data.tier) {
                const pollWeight = getPollWeight(tierResponse.data.tier)
                if (pollWeight >= 1) {
                    const newVote = new Voting({
                        "poll_id": id,
                        "wallet": address,
                        "points": pollWeight,
                        "voted": true,
                        "vote_status": vote_status,
                        "image_url": image_url
                    });
                    const checkvoted = await Voting.findOne({ poll_id: id, wallet: address, voted: true });
                    if (checkvoted) {
                        return res.json({ msg: "You have already voted", status: false })
                    }
                    await newVote.save()
                    return res.json({ msg: "Thanks For voting", status: true })
                } else {
                    throw "Your tier is low for voting"
                }
            } else {
                throw "You have not authorized to vote"
            }
        } catch (error) {
            return res.status(500).json({ msg: error });
        }
    },

    getVoterDetail: async (req, res) => {
        const { address, poll_id } = req.query
        if (!address || !poll_id) {
            return res.status(500).json({ msg: "request is not valid" });
        }
        try {
            const data = await Voting.findOne({
                "wallet": address,
                "poll_id": poll_id
            })
            if (data) {
                return res.json({ data })
            } else {
                return res.json({ msg: "data not found" })
            }


        } catch (error) {
            return res.status(500).json({ msg: error });
        }
    },

    getVotedUserimages: async (req, res) => {
        const { poll_id } = req.query;
        if (!poll_id) {
            return res.status(500).json({ msg: "invalid request" });
        }
        try {
            const images = await Voting.find({ "poll_id": poll_id }, { "image_url": -1 }).limit(4).sort({ createdAt: -1 });
            const count = await Voting.countDocuments({ "poll_id": poll_id });
            res.json({ images, count: count - images.length })
        } catch (error) {
            return res.status(500).json({ msg: error });
        }
    }
};

module.exports = pollsController;


const getPollWeight = (tier) => {
    if (tier === "tier1") {
        return 1.2;
    } else if (tier === "tier2") {
        return 2;
    } else if (tier === "tier3") {
        return 5.5;
    } else if (tier === "tier4") {
        return 12;
    } else if (tier === "tier5") {
        return 19;
    } else if (tier === "tier6") {
        return 26;
    } else if (tier === "tier7") {
        return 70;
    } else if (tier === "tier8") {
        return 150;
    } else if (tier === "tier9") {
        return 325;
    } else {
        return 0;
    }
}