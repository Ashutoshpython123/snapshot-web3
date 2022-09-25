const Event = require("../Model/eventModel");
const Web3 = require("web3");
const snapshot = require("../Model/snapshotModel");
const projectModel = require("../Model/projectModel")

const nodeevents = {
  //Function to register the user.
  nodeEvent: async (req, res) => {
    console.log('klSFE')
    const eventAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_partslink","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"byebye","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"goblinbyebye","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"goblins","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"howmanygobblins","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"parts","type":"string"}],"name":"makegobblinhaveparts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"lords","type":"address"},{"internalType":"uint256","name":"_goblins","type":"uint256"}],"name":"makegoblinnnfly","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_bye","type":"bool"}],"name":"makegoblngobyebye","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"makingobblin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_byebye","type":"uint256"}],"name":"spredgobblins","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sumthinboutfunds","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    try {
      var addr = "0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e";
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
      for (k = 1; k <= 42; k++) {

        toBlockData = fromBlockData + (interval - 1);
        if (k == 42) {
          toBlockData = 15443367
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
          // console.log( evntcheck, '__________',project[i].tokenId)
          const result = await snapshot.findOneAndUpdate(
            { owner: project[i].to, id: project[i].tokenId },
            { owner: project[i].from }
          );
        } else {
          console.log('heeeeeee', project[i].tokenId,)
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
      const data = req.query.page;
      const addr = data.split(',')[0].toLowerCase();

      //Reading ico
      const completed = await Event.find({ user_address: addr }).sort({ createdAt: -1 });
      const vesting = await Vesting.find().sort({ createdAt: -1 });
      var VESTING = []
      for (let i = 0; i < completed.length; i++) {
        var vestingdata = await Vesting.findOne({ contract_addr: completed[i].contract_addr });

        if (vestingdata) {
          var upcPoolData = await upcPool.findOne({ address: completed[i].contract_addr });
          VESTING.push(
            {
              "logo": upcPoolData.images,
              "title": upcPoolData.title,
              "phase": upcPoolData.idophase,
              "amount": completed[i].amount,
              "vesting_percentage": vestingdata.vesting_percentage,
              "return_of_investment": vestingdata.return_of_investment,
              "token_symbol": vestingdata.token_symbol,
              "vetsing_date": vestingdata.vetsing_date,
              "pool_type": upcPoolData.up_pool_access
            }
          )
        }

      }
      //pagination.
      const pageSize = parseInt(data.split(',')[1]);

      const totalcompleted = completed.length;
      const totalcompletedPage = Math.ceil(totalcompleted / pageSize);
      // const paginatedCompleted = await Event
      //   .find({ user_address: addr })
      //   .sort({ createdAt: -1 })
      //   .limit(pageSize);

      var userProfile = [];
      for (let i = 0; i < completed.length; i++) {
        var upcPoolData = await upcPool.findOne({ address: completed[i].contract_addr });

        userProfile.push({
          "title": upcPoolData.title,
          "logo_url": upcPoolData.images,
          "pool_access_type": upcPoolData.up_pool_access,
          "phase": upcPoolData.idophase,
          "crypto_type": upcPoolData.crypto_type,
          "pool_raise": upcPoolData.up_pool_raise,
          "symbol": upcPoolData.symbol,
          "amount": completed[i].amount,
          "pool_type": upcPoolData.up_pool_access
        })

      }

      res.json({
        totalcompletedPage: totalcompletedPage,
        paginatedcompleted_pool: userProfile,
        vesting: VESTING
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
