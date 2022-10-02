const Event = require("../Model/eventModel");
const Web3 = require("web3");
const snapshot = require("../Model/snapshotModel");
const projectModel = require("../Model/projectModel")
const eventAbi = require("../BlockchainContractAbi/bulk_abi.json")

const nodeevents = {
  //Function to register the user.
  nodeEvent: async (req, res) => {
    console.log('klSFE')
    try {
      var addr = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        ),
      );

      const MyContract = new web3.eth.Contract(eventAbi, addr);
      var interval = 4500;
      var k;
      var fromBlockData = 15443367;
      var toBlockData;
      for (k = 1; k <= 47; k++) {

        toBlockData = fromBlockData + (interval - 1);
        if (k == 47) {
          toBlockData = 15653139
        }

        const res = await MyContract.getPastEvents('Transfer', {
          fromBlock: fromBlockData,
          toBlock: toBlockData
        })
        fromBlockData = (k * interval) + 15443367;
        console.log(k, '============')

        for (let i = 0; i < res.length; i++) {
          let to = res[i].returnValues.to
          let from = res[i].returnValues.from
          let tokenId = res[i].returnValues.tokenId

          const instance = new projectModel({
            from: from,
            to: to,
            tokenId: tokenId
          })
          await instance.save()

        }
      }



      res.json({ msg: "done!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateTransferFrom: async (req, res) => {
    console.log('klSFE')
    try {

      const project = await projectModel.find().sort({ createdAt: -1 })

      for (let i = 0; i < project.length; i++) {
        const evntcheck = await snapshot.findOne({ owner: project[i].to, id: project[i].tokenId })
        if (evntcheck) {
          console.log('__________',project[i].tokenId)
          const result = await snapshot.findOneAndUpdate(
            { owner: project[i].to, id: project[i].tokenId },
            { owner: project[i].from }
          );
        } else {
          console.log('heeeeeeellllLLLLLLLLLLLLLLLLLLLL', project[i].tokenId,)
        }
      }


      res.json({ result: 'done' })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  arrayEvent: async (req, res) => {
    console.log('klSFE')
    try {

      const result = await snapshot.aggregate([
        {
          "$group":
          {
            _id: { owner: "$owner" },
            "eTokens": { $sum: 1 },
            "id": { $addToSet: "$id" }
          }
        },
        {
          $project: {
            eTokens: "$eTokens",
            id: "$id",
            owner: "$owner"
          }
        }
      ]);

      res.json({ result: result })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      //   const options = {
      //     method: 'GET',
      //     url: 'https://deep-index.moralis.io/api/v2/nft/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/transfers',
      //     params: { chain: 'eth', format: 'decimal', page : 3 },
      //     headers: { accept: 'application/json', "x-api-key" : 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
      // };

      // axios
      //     .request(options)
      //     .then(function (response) {
      //         console.log(response.data);
      //     })
      //     .catch(function (error) {
      //         console.error(error);
      //     });
      const snap = new snapshot(req.body)
      await snap.save()
      res.json({
        msg: "done"
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  createVesting: async (req, res) => {
    try {
      var addr = req.body.addr;
      var upcPoolData = await upcPool.findOne({ address: addr.toLowerCase() });
      const vesting = new Vesting({
        vetsing_date: req.body.vetsing_date,
        contract_addr: addr,
        pool_type: upcPoolData.up_pool_access,
        vesting_percentage: req.body.vesting_percentage,
        return_of_investment: req.body.return_of_investment,
        token_symbol: upcPoolData.symbol,
      });

      await vesting.save();
      res.json({ msg: "IGO Detail is dumped!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addProfilecsv: async (req, res) => {
    try {
      //Here we are taking addresses from csv and storing in an arrayToInsert.
      const { data, addr } = req.body;
      var list = [];
      for (i = 0; i < data.length; i++) {
        const evntcheck = await Event.find({ contract_addr: addr.toLowerCase(), user_address: data[i][0].toLowerCase() })
        if (evntcheck.length > 0) {
          await Event.findOneAndUpdate(
            { contract_addr: addr.toLowerCase(), user_address: data[i][0].toLowerCase() },
            { user_address: data[i][0].toLowerCase(), amount: data[i][1] }
          );
        } else {
          const newEvent = new Event({
            contract_addr: addr.toLowerCase(),
            user_address: data[i][0].toLowerCase(),
            amount: data[i][1],
          });
          await newEvent.save();
        }

      }
      res.status(200).json({ msg: "CSV is uploaded!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};
module.exports = nodeevents;
