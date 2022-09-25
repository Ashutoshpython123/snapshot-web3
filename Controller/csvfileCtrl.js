const csvFileModel = require("../Model/csvFileModel");
const csvtojson = require('csvtojson');

const csvfileCtrl = {
    //Function to add csv file of addresses in white list three in database.
    csv_upload: async (req, res) => {
        try {
            var fileName = `${__dirname}/../csv/data${req.params.tier}.csv`;
            var arrayToInsert = [];
            //Here we are taking addresses from csv and storing in an arrayToInsert.
            csvtojson().fromFile(fileName).then((source) => {
                for (var i = 0; i < source.length; i++) {
                    var addr = source[i]['userAddress'].toLowerCase()
                    var oneRow = {
                        ido_id: req.params.id,
                        user_address: addr,
                        tier: req.params.tier
                    };
                    arrayToInsert.push(oneRow);
                }


                
                //Inserting csv file addresses in white list.
                csvFileModel.insertMany(arrayToInsert, (err, result) => {
                    if (err) console.log(err);
                    if (result) {
                        res.status(200).json({ msg: "Import CSV into whitelist successfully" });
                    }
                });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // function for getting address and tier of csv
    csv_tier_get: async (req, res) => {
        try {

            const ido_id = req.params.data.split(',')[0];
            const user_address = req.params.data.split(',')[1].toLowerCase();
            const tier_data = await csvFileModel.findOne({ user_address, ido_id });
            if (!tier_data) {
                return res.json(0)
            }
            res.json(tier_data)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = csvfileCtrl;