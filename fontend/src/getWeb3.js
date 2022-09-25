import Web3 from "web3";
import { useEffect, useState } from "react";

const useWeb3 = () => {
	const [web3, setWeb3] = useState("");

	useEffect(() => {
		var instance;
		if (window.ethereum) {
			try {
				instance = new Web3(window.ethereum);
			} catch (error) {
				console.error(error);
			}
		} else if (window.web3) {
			instance = new Web3(window.web3);
		} else {
			instance = new Web3(
				new Web3.providers.HttpProvider(
					"https://data-seed-prebsc-1-s1.binance.org:8545/",
				),
			);
		}
		setWeb3(instance);
	}, []);
	return web3;
};

export default useWeb3;
