const project = require("../Model/projectModel");
// const person = require("../Model/personModel");

const projectCtrl = {
	//Function to create project.
	createProject: async (req, res) => {
		try {
			const { project_id, tier_limit, address, status } = req.body;
			//Saving in database.
			const newProject = new project({
				project_id,
				tier_limit,
				address,
				status,
			});
			await newProject.save();
			res.json("project is created");
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to get project.
	getProjectRes: async (req, res) => {
		try {
			const project_id = req.query.project_id;
			const tier_limit = req.query.tier_limit;
			const address = req.query.address;
			const id = await project.findOne({ project_id });
			const tier = await project.findOne({ tier_limit });
			const add = await project.findOne({ address });

			if (id && tier && add) {
				return res.json({
					success: true,
				});
			} else {
				return res.json({ success: false });
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	
};



module.exports = projectCtrl;
