import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Abi from "./sabi.json"
import Web3 from "web3";

let web3 = new Web3(
    new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
);
const divider = 500

const totalItem = 9999
let base = 1
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
            "0x0b4B2bA334f476C8F41bFe52A428D6891755554d"
        );
        const arr = range(fr, to);

        let dataArr;
        // try {
        dataArr = await Promise.all(arr.map(async (key) => {
            return await contractInstance.methods.ownerOf(+key).call();
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

            if (status) {
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
                    filename={`JRNY NFT Club (JNC).csv`}
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
            </div>
        )
    }
}

export default NFTSnapshot