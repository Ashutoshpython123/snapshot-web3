import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Abi from "./sabi.json"
import Web3 from "web3";
import {getAPI} from "./utils/API"

let web3 = new Web3(
    new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
);

const totalItem = 10000
let rem = totalItem % 1000;
let noOfIteration = Math.floor(totalItem / 1000)
let from = 1;
let to = 1000
console.log(noOfIteration)
class Snapshot extends Component {
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
            console.log(start, end)
            return Array(end - start + 1)
                .fill()
                .map((_, idx) => start + idx);
        }
        const contractInstance = new web3.eth.Contract(
            Abi,
            "0x75E95ba5997Eb235F40eCF8347cDb11F18ff640B"
        );
        const arr = range(fr, to);
        const dataArr = await Promise.all(arr.map(async (key) => {
            return await contractInstance.methods.ownerOf(+key).call();
        })
        );
        this.setState({
            dataArr: [...this.state.dataArr, ...dataArr],
        });
    }

    getNFTDetails = async (fr, to) => {
        console.log('snapshot clicked')
        try {
            await this.getArray(fr, to)

            if (to < noOfIteration * 1000) {
                from = from + 1000
                to = to + 1000
                this.getNFTDetails(from, to)
            }

            if (from <= noOfIteration * 1000 && to === noOfIteration * 1000) {
                from = from + 1000
                this.getArray(from, to + rem)
            }


        } catch (err) {
            console.log(err);
        }
    };

    makeCSV = async () => {
        const res = await getAPI('arrayEvent')
        const csvData = [];
        res.data.result.map((data, key) => {
         
                csvData.push({
                    walletAddress: data._id.owner,
                    id: data.id,
                    eTokens: data.eTokens,
                });
        });
        csvData.length > 0
            ? this.setState({ csvData: csvData })
            : this.setState({ isLoading: false, fileError: true });
    };

    // getCsvArray = async () => {
       
    //     const res = await getAPI('arrayEvent')
    //     const csvData = [];
    //     res.data.result.map((data, key) => {
         
    //             csvData.push({
    //                 walletAddress: data._id.owner,
    //                 id: data.id,
    //                 eTokens: data.eTokens,
    //             });
    //     });
    //     csvData.length > 0
    //         ? this.setState({ csvData: csvData })
    //         : this.setState({ isLoading: false, fileError: true });
    // };
        

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
                <button onClick={() => this.makeCSV()}>Snapshot data</button>
                <CSVLink
                    filename={`goblintown (GOBLIN).csv`}
                    data={this.state.csvData}
                    headers={this.state.headers}
                    target="_blank"
                    style={{ marginTop: "25px" }}
                    className="css-1iewgp6-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root"
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

export default Snapshot