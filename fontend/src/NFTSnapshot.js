import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Abi from "./sabi.json"
import Web3 from "web3";
import { postDataAPI } from "./utils/API"
import axios from 'axios';
import { Alchemy, Network, fromHex } from "alchemy-sdk";
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(Abi);

let web3 = new Web3(
    new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
);
const divider = 500

const totalItem = 9999
let base = 0
let rem = totalItem % divider;
let noOfIteration = Math.floor(totalItem / divider)
let from = base;
let to = base + divider
var status = false
console.log(noOfIteration, rem, from, to)
class NFTSnapshot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invtFile: null,
            invtData: [],
            csvData: [],
            dataArr: [],
            fxnType: "add_snapshotData",
            fromIt: 1,
            toIt: noOfIteration === 0 ? rem : noOfIteration,
            isFetching: false,
            fileError: false,
        }
    }

    getArray = async (fr, to) => {
        function range(start, end) {
            console.log(start, end, 'mmmmmmmmmm')

            return Array(end - start + 1)
                .fill()
                .map((_, idx) => start + idx);
        }
        const contractInstance = new web3.eth.Contract(
            Abi,
            "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"
        );
        const arr = range(fr, to);

        let dataArr;
        // try {
        dataArr = await Promise.all(arr.map(async (key) => {
            return await contractInstance.methods.punkIndexToAddress(+key).call();
        })
        );
        // } catch (error) {
        //     console.log(error)
        // }
        this.setState({
            dataArr: [...this.state.dataArr, ...dataArr],
        });
        console.log('wewewe')
    }

    getNFTDetails = async (fr, to) => {
        try {
            await this.getArray(fr, to)
            // for (let index = 0; index < noOfIteration; index++) {
            //     await this.getArray(fr, to)
            //     from = from + divider
            //     to = to + divider
            // }


            if (to < base + (noOfIteration * divider)) {
                from = from + divider
                to = to + divider
                console.log('1111111111')

                this.getNFTDetails(from + 1, to)
                if (to === (base + (noOfIteration * divider))) {
                    status = true
                }
            }

            if (status && rem) {
                from = from + divider
                to = to + rem
                console.log('22222222222')
                this.getArray(from + 1, to)
                status = false
            }


        } catch (err) {
            console.log(err);
        }
    };

    makeCSV = () => {
        const csvData = [];
        this.state.dataArr.map((address, key) => {
            // if (csvData.find((ele) => ele.walletAddress === address)) {
            //     const index = csvData.findIndex((ele) => ele.walletAddress === address);
            //     csvData[index] = {
            //         walletAddress: address,
            //         id: csvData[index].id + ";" + (key + 1).toString(),
            //         eTokens: csvData[index].eTokens + 1,
            //     };
            //     console.log(csvData[index]);
            // } else {
            csvData.push({
                owner: address,
                id: (key + base).toString(),
                eTokens: 1,
            });
            console.log(key + base);
            // }
        });
        csvData.length > 0
            ? this.setState({ csvData: csvData })
            : this.setState({ isLoading: false, fileError: true });
    };

    getSingleOwner = async () => {
        const contractInstance = new web3.eth.Contract(
            Abi,
            "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"
        );

        for (let index = 10002; index <= 30006; index++) {
            try {
                var data = await contractInstance.methods.ownerOf(index).call();
                let instance = {
                    owner: data,
                    id: `${index}`,
                    eTokens: "1"
                }
                await postDataAPI('insertOwner', instance)
            } catch (err) {
                console.log(index, 'err')
            }

        }
    }

    getAllNFTOwner = async () => {
        // const options = {
        //     method: 'GET',
        //     url: 'https://deep-index.moralis.io/api/v2/nft/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/transfers',
        //     params: { chain: 'eth', format: 'decimal', page : 200 },
        //     headers: { accept: 'application/json', "x-api-key" : 't6HIon5Osj3HdPOsQuIJT8LLmIbK3DZe87FSrUtX1yJOv7qc8EtigtkmwHGjkXJ5' }
        // };

        // axios
        //     .request(options)
        //     .then(function (response) {
        //         console.log(response.data.result.length);
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //     });


        const config = {
            apiKey: "vn0-0S2q3PUTYryCzelASrEiJrr08EGM",
            network: Network.ETH_MAINNET,
        };
        const alchemy = new Alchemy(config);

        const address = ["0xf64e6fB725f04042b5197e2529b84be4a925902C"];
        // Get all NFTs
        const response = await alchemy.core.getAssetTransfers({
            fromBlock: 15443367,
            contractAddresses: address,
            category: ["erc1155"],
            excludeZeroValue: false,
        });

        console.log(response)

        for (let index = 353; index >= 0; index--) {
            console.log(index)
            const element = response.transfers[index];
            await postDataAPI('insertOwner', element)
        }





        // console.log(parseInt("0x000000000000000000000000000000000000000000000000000000000000114a"))
        // console.log(parseInt("0xebb1ab"), parseInt("0xebb697"))
        // console.log(data)
        // const filterd = data.transfers.filter(txn => txn.asset === "WPUNKS")
        // console.log(filterd)

        // const owner = await alchemy.nft.getOwnersForNft("0xf64e6fB725f04042b5197e2529b84be4a925902C", 333);
        // const contractInstance = new web3.eth.Contract(
        //     Abi,
        //     "0xf64e6fB725f04042b5197e2529b84be4a925902C"
        // );

        // console.log(owner);
        // for (let index = 0; index < owner.owners.length; index++) {
        //     const element = owner.owners[index];

        //     var data = await contractInstance.methods.balanceOf(element, 333).call();
        //     let instance = {
        //         owner: element,
        //         id: '333',
        //         eTokens: `${data}`
        //     }
        //     await postDataAPI('insertOwner', instance)

        //     console.log('------', instance)
        // }
        console.log('done')
    }


    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button onClick={() => this.getNFTDetails(from, to)}>Snapshot data</button>
                <CSVLink
                    filename={`CRYPTOPUNKS (Ͼ).csv`}
                    data={this.state.csvData}
                    headers={this.state.headers}
                    target="_blank"
                    style={{ marginTop: "25px" }}
                    className="css-1iewgp6-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root"
                    onClick={(event, done) => {
                        this.makeCSV();
                        //   done(); // Don't Proceed
                    }}
                >

                    Download CSV
                </CSVLink>

                <br />
                <br />
                <br />
                <button onClick={() => this.getSingleOwner()}>Snapshot single data</button><br />
                <button onClick={() => this.getAllNFTOwner()}>Snapshot all nft Owner</button><br />

            </div>
        )
    }
}

export default NFTSnapshot