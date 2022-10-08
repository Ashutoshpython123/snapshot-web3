const Event = require("../Model/eventModel");
const Web3 = require("web3");
const snapshot = require("../Model/snapshotModel");
const projectModel = require("../Model/projectModel")
const eventAbi = require("../BlockchainContractAbi/bulk_abi.json")
const axios = require('axios')


function compareBlock(a, b) {

  return a.block - b.block;
}

const fetchLiquidityLocked = async (contractAddress, blockNo, snft) => {
  try {
    return new Promise(async (resolve, reject) => {
      let getTotalSupplyUrl = "";
      let tokenBalanceUrl = "";
      getTotalSupplyUrl = `https://api.bscscan.com/api?module=stats&action=tokensupplyhistory&contractaddress=${contractAddress}&blockno=${blockNo}&apikey=${process.env.BSC_API_KEY}`
      tokenBalanceUrl = `https://api.bscscan.com/api?module=account&action=tokenbalancehistory&contractaddress=${snft}&address=${contractAddress}&blockno=${blockNo}&apikey=${process.env.BSC_API_KEY}`;


      const getTotalSupply = await axios.get(getTotalSupplyUrl);
      const getTokenBalance = await axios.get(tokenBalanceUrl);

      const totalSupply = +getTotalSupply.data.result / Math.pow(10, 18);
      const tokenBalance = +getTokenBalance.data.result / Math.pow(10, 18);


      const data = {
        totalSupply: totalSupply,
        totalBalance: tokenBalance,
      };
      resolve(data);
    });
  } catch (err) {
    return {
      totalSupply: 0,
      totalBalance: 0,
    };
  }
};

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
      for (k = 1; k <= 50; k++) {

        toBlockData = fromBlockData + (interval - 1);
        if (k == 50) {
          toBlockData = 15666555
        }

        const res = await MyContract.getPastEvents('PunkTransfer', {
          fromBlock: fromBlockData,
          toBlock: toBlockData
        })
        fromBlockData = (k * interval) + 15443367;
        console.log(k, '============')

        for (let i = 0; i < res.length; i++) {
          let to = res[i].returnValues.to
          let from = res[i].returnValues.from
          let tokenId = res[i].returnValues.punkIndex
          let block = res[i].blockNumber

          const instance = new projectModel({
            from: from,
            to: to,
            tokenId: tokenId,
            block: block
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
      for (let index = 1; index <= 9595; index++) {
        const options = {
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/nft/0x75E95ba5997Eb235F40eCF8347cDb11F18ff640B/${index}/transfers`,
          headers: { accept: 'application/json', 'X-API-Key': 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
        };

        console.log('++++++++++++++++++++++++++', index)
        await axios
          .request(options)
          .then(async function (response) {
            for (let i = (response.data.result.length - 1); i >= 0; i--) {
              const element = response.data.result[i];
              if (parseInt(element.block_number) <= 15443367) {
                if (element.to_address === '0x73555a153d301d95a3f90919e645d301f1f9e219') {
                  console.log(element.transaction_hash, 'stake')
                  let instance = new snapshot({
                    owner: element.from_address,
                    id: element.token_id,
                    eTokens: element.amount
                  })
                  await instance.save()
                }
                if (element.from_address === '0x73555a153d301d95a3f90919e645d301f1f9e219') {
                  const del = await snapshot.deleteOne({ owner: element.to_address, id: element.token_id })
                  console.log(element.transaction_hash, 'unstake')
                }
              }

              // if (parseInt(element.block_number) > 15443367) {
              //   var regex = new RegExp(["^", element.to_address, "$"].join(""), "i");
              //   await snapshot.findOneAndUpdate(
              //     { owner: regex, id: element.token_id },
              //     { owner: element.from_address }
              //   );
              //   console.log('+++++++++++++++++++++++++++++++++++', element.token_id);
              // }
            }
          })
          .catch(function (error) {
            console.error(error);
          });

        // await axios
        //   .request(options)
        //   .then(async function (response) {
        //     for (let i = 0; i < response.data.result.length; i++) {
        //       const element = response.data.result[i];
        //       console.log('------', element.token_id);
        //       if (parseInt(element.block_number) > 15443367) {
        //         var regex = new RegExp(["^", element.to_address, "$"].join(""), "i");
        //         await snapshot.findOneAndUpdate(
        //           { owner: regex, id: element.token_id },
        //           { owner: element.from_address }
        //         );
        //         console.log('+++++++++++++++++++++++++++++++++++', element.token_id);
        //       }
        //     }
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });
      }

      // const project = await projectModel.find().sort({ createdAt: -1 })

      // for (let i = 0; i < project.length; i++) {
      //   const evntcheck = await snapshot.findOne({ owner: project[i].to, id: project[i].tokenId })
      //   if (evntcheck) {
      //     console.log('__________', project[i].tokenId)
      //     const result = await snapshot.findOneAndUpdate(
      //       { owner: project[i].to, id: project[i].tokenId },
      //       { owner: project[i].from }
      //     );
      //   } else {
      //     console.log('heeeeeeellllLLLLLLLLLLLLLLLLLLLL', project[i].tokenId,)
      //   }
      // }


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
      // const { from, to, erc1155Metadata } = req.body
      // const tokenId = parseInt(erc1155Metadata[0].tokenId)
      // const amount = parseInt(erc1155Metadata[0].value)

      // const evntcheck = await snapshot.findOne({ owner: to, id: `${tokenId}` })
      // if (evntcheck) {
      //   console.log(parseInt(evntcheck.eTokens), '...', amount, 'iii+++++++++++++++++', to, from)
      //   let remToken = parseInt(evntcheck.eTokens) - amount
      //   if (parseInt(evntcheck.eTokens) === amount) {
      //     evntcheck.owner = from;
      //     await evntcheck.save()
      //   } else if (parseInt(evntcheck.eTokens) > amount) {
      //     evntcheck.eTokens = `${remToken}`;
      //     await evntcheck.save()

      //     let instance = new snapshot({
      //       owner: to,
      //       id: `${tokenId}`,
      //       eTokens: `${amount}`
      //     })
      //     await instance.save()

      //   }
      // }

      console.log('\x1b[36m%s\x1b[0m', 'I am cyan');

      // const snap = new snapshot(req.body)
      // await snap.save()
      res.json({
        msg: "done"
      });


    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  getNftTransfer: async (req, res) => {
    try {
      var cursor;
      for (let index = 1; index <= 8; index++) {
        const options = {
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/nft/0xf64e6fB725f04042b5197e2529b84be4a925902C/333/transfers`,
          params: {
            chain: 'eth',
            format: 'decimal',
            cursor: cursor
          },
          headers: { accept: 'application/json', 'X-API-Key': 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
        };

        console.log('++++++++++++++++++++++++++', index)
        await axios
          .request(options)
          .then(async function (response) {
            cursor = response.data.cursor
            console.log(response.data.result.length, response.data.page, '__________')
            for (let i = 0; i < response.data.result.length; i++) {
              const element = response.data.result[i];
              if (parseInt(element.block_number) <= 15443367) {
                const firstcheck = await snapshot.findOne({ owner: element.to_address })
                if (!firstcheck) {
                  let instance = new snapshot({
                    owner: element.to_address,
                  })
                  await instance.save()
                }
                const secondcheck = await snapshot.findOne({ owner: element.from_address })
                if (!secondcheck) {
                  let instanc = new snapshot({
                    owner: element.from_address,
                  })
                  await instanc.save()
                }

              }
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }

      res.json({ msg: "NFT Transfer!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNftSnapshot: async (req, res) => {
    try {

      const filterEthData = async (wallet) => {
        var iteration;
        const option = {
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/${wallet}/nft/transfers`,
          params: {
            chain: 'eth',
            format: 'decimal',
            direction: 'both',
            from_block: '13580880',
            to_block: '15443367',
          },
          headers: { accept: 'application/json', 'X-API-Key': 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
        };
        await axios
          .request(option)
          .then(async function (response) {
            iteration = Math.ceil(response.data?.total / 100)
          })
          .catch(function (error) {
            console.error(error);
          });
        console.log(iteration, 'iter')

        var cursor;
        var tokenOne = 0
        var tokenThree = 0
        for (let index = 1; index <= iteration; index++) {
          const options = {
            method: 'GET',
            url: `https://deep-index.moralis.io/api/v2/${wallet}/nft/transfers`,
            params: {
              chain: 'eth',
              format: 'decimal',
              direction: 'both',
              from_block: '13580880',
              to_block: '15443367',
              cursor: cursor
            },
            headers: { accept: 'application/json', 'X-API-Key': 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
          };
          await axios
            .request(options)
            .then(async function (response) {
              cursor = response.data.cursor
              const filterdata = response.data.result.filter((data) => data.token_address === "0xf64e6fb725f04042b5197e2529b84be4a925902c")
              for (let i = 0; i < filterdata.length; i++) {
                const element = filterdata[i];
                if (parseInt(element.block_number) <= 15443367) {
                  if (element.from_address === wallet) {
                    if (element.token_id === '1') {
                      tokenOne = tokenOne - parseInt(element.amount)
                    } else if (element.token_id === '333') {
                      tokenThree = tokenThree - parseInt(element.amount)
                    }
                  }
                  if (element.to_address === wallet) {
                    if (element.token_id === '1') {
                      tokenOne = tokenOne + parseInt(element.amount)
                    } else if (element.token_id === '333') {
                      tokenThree = tokenThree + parseInt(element.amount)
                    }
                  }
                }
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        }

        if (tokenOne > 0) {
          for (let i = 0; i < tokenOne; i++) {
            let instance = new projectModel({
              owner: wallet,
              tokenId: '1',
              eTokens: '1'
            })
            await instance.save()
          }
        } else {
          console.log(tokenOne, 'errrrrr ---token-1')
        }

        if (tokenThree > 0) {
          for (let i = 0; i < tokenThree; i++) {
            let instance = new projectModel({
              owner: wallet,
              tokenId: '333',
              eTokens: '1'
            })
            await instance.save()
          }
        } else {
          console.log(tokenThree, 'errrrrr ---token-333')
        }


      }
      const snpshot = await snapshot.find().sort({ createdAt: -1 })
      for (let index = 2163; index < snpshot.length; index++) {
        const element = snpshot[index];
        await filterEthData(element.owner)
        console.log(index, '......')
      }

      res.status(200).json({ msg: "nft snapshot has been taken!", result: arr });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getSnftSnapshot: async (req, res) => {
    try {
      const from_block = '20923765'
      const to_block = '21981486'
      const snft_token = '0x6f51a1674befdd77f7ab1246b83adb9f13613762'
      const lp_token = "0xe4399d0c968fbc3f5449525146ea98b0dc7fc203"
      const claimedBal = 2500
      const filterEthData = async (wallet) => {

        var isClaimed = false
        var userBalance = 0
        var staked = 0
        var iterationOne;

        //CALCULATE USER WALLET BALANCE
        const option_bal = {
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/${wallet}/erc20`,
          params: {
            chain: 'bsc',
            to_block: '21966675',
            token_addresses: snft_token
          },
          headers: { accept: 'application/json', 'X-API-Key': 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
        };

        await axios
          .request(option_bal)
          .then(function (response) {
            if (response.data[0]?.balance) {
              userBalance = parseInt(response.data[0]?.balance) / 10 ** 18
            }
            console.log(userBalance, 'userBalance : ');
          })
          .catch(function (error) {
            console.error(error);
          });


        // CALCUALTE STAKE AND FARM 
        const option = {
          method: 'GET',
          url: `https://deep-index.moralis.io/api/v2/${wallet}/erc20/transfers`,
          params: { chain: 'bsc', from_block: from_block, to_block: to_block },
          headers: { accept: 'application/json', 'X-API-Key': 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
        };

        await axios
          .request(option)
          .then(async function (response) {
            iterationOne = Math.ceil(response.data?.total / 100)
          })
          .catch(function (error) {
            console.error(error);
          });

        var cursorOne;
        var stake_14days = []
        var stake_30days = []
        var stake_60days = 0;
        var stake_90days = 0;
        var stake_180days = 0;
        var stake_lp_farm = 0;
        for (let index = 1; index <= iterationOne; index++) {
          const options = {
            method: 'GET',
            url: `https://deep-index.moralis.io/api/v2/${wallet}/erc20/transfers`,
            params: { chain: 'bsc', from_block: '20923765', to_block: to_block, cursor: cursorOne },
            headers: { accept: 'application/json', 'X-API-Key': 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
          };
          await axios
            .request(options)
            .then(async function (response) {
              cursorOne = response.data.cursor
              const transferData = response.data?.result;
              const filterdata = transferData.filter(data => data.address === snft_token && data.from_address === "0xec9099285bfca49fc990b1c385fe35107fe723ae")
              if (filterdata.length > 0) {
                isClaimed = true
              }
              if (!isClaimed) {
                console.log(userBalance, 'claimed : ', isClaimed)
                return
              }
              if (userBalance >= claimedBal) {
                console.log('userBalance : ', userBalance)
                return
              }

              //CALCULATE STAKE BALANCE IN ALL FIVE CONTRACT
              const filterPool_14days_staked = transferData.filter(data => data.address === snft_token && data.to_address === "0xe6115ada0452d6c48b292971e656bc07901b53f6")
              for (let index = 0; index < filterPool_14days_staked.length; index++) {
                const element = filterPool_14days_staked[index];
                stake_14days.push(
                  {
                    amount: parseFloat(element.value) / 10 ** 18,
                    block: parseInt(element.block_number),
                    type: "stake"
                  }
                )
              }
              const filterPool_14days_withdraw = transferData.filter(data => data.address === snft_token && data.from_address === "0xe6115ada0452d6c48b292971e656bc07901b53f6")
              for (let index = 0; index < filterPool_14days_withdraw.length; index++) {
                const element = filterPool_14days_withdraw[index];
                stake_14days.push(
                  {
                    amount: parseFloat(element.value) / 10 ** 18,
                    block: parseInt(element.block_number),
                    type: "unstake"
                  }
                )
              }

              const filterPool_30days_staked = transferData.filter(data => data.address === snft_token && data.to_address === "0x707bef77240cc19714a2e9c0a86eb64fa9430c2e")
              for (let index = 0; index < filterPool_30days_staked.length; index++) {
                const element = filterPool_30days_staked[index];
                stake_30days.push(
                  {
                    amount: parseFloat(element.value) / 10 ** 18,
                    block: parseInt(element.block_number),
                    type: "stake"
                  }
                )
              }
              const filterPool_30days_withdraw = transferData.filter(data => data.address === snft_token && data.from_address === "0x707bef77240cc19714a2e9c0a86eb64fa9430c2e")
              for (let index = 0; index < filterPool_30days_withdraw.length; index++) {
                const element = filterPool_30days_withdraw[index];
                stake_30days.push(
                  {
                    amount: parseFloat(element.value) / 10 ** 18,
                    block: parseInt(element.block_number),
                    type: "unstake"
                  }
                )
              }

              const filterPool_60days_staked = transferData.filter(data => data.address === snft_token && data.to_address === "0xd1a57c5ac9bf4019073f995c6f1ac3d2f431dc7a")
              for (let index = 0; index < filterPool_60days_staked.length; index++) {
                const element = filterPool_60days_staked[index];
                console.log(element)
                stake_60days += parseFloat(element.value) / 10 ** 18;
              }
              const filterPool_90days_staked = transferData.filter(data => data.address === snft_token && data.to_address === "0x5cf4861b1d6ddbcf9098569f699388f1446b0db7")
              for (let index = 0; index < filterPool_90days_staked.length; index++) {
                const element = filterPool_90days_staked[index];
                stake_90days += parseFloat(element.value) / 10 ** 18
              }
              const filterPool_180days_staked = transferData.filter(data => data.address === snft_token && data.to_address === "0xd650b71ab786361c5daad3f9bf14572b72eb60cd")
              for (let index = 0; index < filterPool_180days_staked.length; index++) {
                const element = filterPool_180days_staked[index];
                stake_180days += parseFloat(element.value) / 10 ** 18
              }

              //CALCULATE STAKE BALANCE OF LP TOKEN IN FARM CONTRACT CONTRACT  

              const filterFarm_lp_staked = transferData.filter(data => data.address === lp_token && data.to_address === "0x19ee35c5b2ccabaae367b6f99b2f5747e6a6c0d0")
              for (let index = 0; index < filterFarm_lp_staked.length; index++) {
                const element = filterFarm_lp_staked[index];
                stake_lp_farm += parseFloat(element.value) / 10 ** 18
              }
              const filterFarm_lp_withdraw = transferData.filter(data => data.address === lp_token && data.from_address === "0x19ee35c5b2ccabaae367b6f99b2f5747e6a6c0d0")
              for (let index = 0; index < filterFarm_lp_withdraw.length; index++) {
                const element = filterFarm_lp_withdraw[index];
                stake_lp_farm -= parseFloat(element.value) / 10 ** 18
              }

            })
            .catch(function (error) {
              console.error(error);
            });
        }
        stake_14days = stake_14days.sort(compareBlock)
        stake_30days = stake_30days.sort(compareBlock)
        let stake_fourteen = 0
        let stake_thirty = 0
        for (let index = 0; index < stake_14days.length; index++) {
          const element = stake_14days[index];
          stake_fourteen = element.amount
          if (element.type === "unstake")
            stake_fourteen = 0
        }
        for (let index = 0; index < stake_30days.length; index++) {
          const element = stake_30days[index];
          stake_thirty = element.amount
          if (element.type === "unstake")
            stake_thirty = 0
        }

        let total_staked = stake_fourteen + stake_thirty + stake_60days + stake_90days + stake_180days
        if (total_staked + userBalance >= claimedBal) {
          console.log('total_staked + userBalance', total_staked + userBalance)
          return
        }


        const liquidityLocked = await fetchLiquidityLocked(lp_token, to_block, snft_token)
        const totalSupplyCount = stake_lp_farm / liquidityLocked.totalSupply;
        const farmAmount = totalSupplyCount * liquidityLocked.totalBalance;

        if (total_staked + farmAmount + userBalance >= claimedBal) {
          console.log('total_staked + farmAmount + userBalance', total_staked + farmAmount + userBalance)
          return
        }

        const instance = new projectModel({
          owner: wallet,
          amount: total_staked + farmAmount + userBalance
        })
        await instance.save()

        console.log(stake_14days, '+++++___________', stake_30days, stake_60days, stake_90days, stake_180days, stake_lp_farm, total_staked, farmAmount)

      }

      // const snpshot = await snapshot.find()
      // for (let index = 0; index < snpshot.length; index++) {
      // const element = snpshot[index];
      await filterEthData(element.owner)
      console.log('......', index)
      // }

      res.status(200).json({ msg: "nft snapshot has been taken!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};
module.exports = nodeevents;
