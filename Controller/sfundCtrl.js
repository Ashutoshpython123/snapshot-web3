const axios = require('axios').default;
require("dotenv").config();

let axiosConfig = {
	headers: {
		"token": process.env.token,
	}
};

let axiosConfig_for_pollWeight = {
	headers: {
		"Origin": "https://launchpad.seedify.fund"
	}
};

const sfundCtrl = {
	//Function to create project.
	participatedIGO: async (req, res) => {
		try {
			const { wallet, page } = req.query;
			const response = await axios.get(`https://sfundapi.combotools.online/?wallet=${wallet}&page=${page}`, axiosConfig);
			return res.json(response.data)
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	tokenInfo: async (req, res) => {
		try {
			const response = await axios.get(`https://sfundapi.combotools.online/tokeninfo`, axiosConfig);
			return res.json(response.data)
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	pollWeight: async (req, res) => {
		let getScrores = [];
		try {
			if (req.body.addresses) {
				const addresses = req.body.addresses;
				for (let i = 0; i < addresses.length; i++) {
					const element = addresses[i];

					getScrores.push({ score: 2, address: element })

					// const response = await axios(`https://snapshotapi.seedify.fund/api/v1/block/check/${element}`, axiosConfig_for_pollWeight);
					// const tierResponse = response.data.data
					// if (tierResponse.data && tierResponse.data.tier) {
					// 	const pollWeight = getPollWeight(tierResponse.data.tier)
					// 	getScrores.pus .h({ score: pollWeight, address: element })
					// }
				}
				console.log({ score: getScrores }, '4444444444')

				return res.json({ score: getScrores })
			} else {
				return res.status(500).json({ msg: "inavlid request addresses is required" });
			}


		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	}
	

}


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

module.exports = sfundCtrl;


