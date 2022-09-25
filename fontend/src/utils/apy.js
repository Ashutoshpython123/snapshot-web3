import { web3 } from "../redux/actions/metamaskAction";
import stakingABI from "../component/stakingABI.json";

const StakingContract_7days = new web3.eth.Contract(
  stakingABI,
  "0xb667c499b88AC66899E54e27Ad830d423d9Fba69"
);
const StakingContract_14days = new web3.eth.Contract(
  stakingABI,
  "0x027fC3A49383D0E7Bd6b81ef6C7512aFD7d22a9e"
);
const StakingContract_30days = new web3.eth.Contract(
  stakingABI,
  "0x8900475BF7ed42eFcAcf9AE8CfC24Aa96098f776"
);
const StakingContract_60days = new web3.eth.Contract(
  stakingABI,
  "0x66b8c1f8DE0574e68366E8c4e47d0C8883A6Ad0b"
);

const StakingContract_90days = new web3.eth.Contract(
  stakingABI,
  "0x5745b7E077a76bE7Ba37208ff71d843347441576"
);

const StakingContract_180days = new web3.eth.Contract(
  stakingABI,
  "0xf420F0951F0F50f50C741f6269a4816985670054"
);

var staked;
var currentStaked;
var stakedInAllPools = [];

export const allStakedPool = async (wallet) => {
  const stackedBalance7 = await StakingContract_7days.methods
    .userDeposits(wallet)
    .call();
  const stackedBalance14 = await StakingContract_14days.methods
    .userDeposits(wallet)
    .call();
  const stackedBalance30 = await StakingContract_30days.methods
    .userDeposits(wallet)
    .call();
  const stackedBalance60 = await StakingContract_60days.methods
    .userDeposits(wallet)
    .call();
  const stackedBalance90 = await StakingContract_90days.methods
    .userDeposits(wallet)
    .call();
  const stackedBalance180 = await StakingContract_180days.methods
    .userDeposits(wallet)
    .call();

  const stackedBalance7_rate = await StakingContract_7days.methods
    .rate()
    .call();
  const stackedBalance14_rate = await StakingContract_14days.methods
    .rate()
    .call();
  const stackedBalance30_rate = await StakingContract_30days.methods
    .rate()
    .call();
  const stackedBalance60_rate = await StakingContract_60days.methods
    .rate()
    .call();
  const stackedBalance90_rate = await StakingContract_90days.methods
    .rate()
    .call();
  const stackedBalance180_rate = await StakingContract_180days.methods
    .rate()
    .call();

  let amount;
  let leftDays;
  let apy_rate;
  if (stackedBalance7) {
    amount = parseFloat(
      parseFloat(web3.utils.fromWei(stackedBalance7[0], "ether")).toFixed(2)
    );
    leftDays = Math.ceil(
      (parseInt(stackedBalance7[2]) - Math.round(new Date().getTime() / 1000)) /
      86400
    );
    apy_rate = Math.round((parseFloat(stackedBalance7_rate) * 365) / 700);

    if (amount) {
      staked = {
        day: 7,
        amount: amount,
        leftDays: amount ? leftDays : 0,
        apy_rate: apy_rate,
      };
    }
    currentStaked = {
      day: 7,
      amount: amount,
      leftDays: amount ? leftDays : 0,
      apy_rate: apy_rate,
    };
    stakedInAllPools.push(currentStaked);
  }

  if (stackedBalance14) {
    amount = parseFloat(
      parseFloat(web3.utils.fromWei(stackedBalance14[0], "ether")).toFixed(2)
    );
    leftDays = Math.ceil(
      (parseInt(stackedBalance14[2]) -
        Math.round(new Date().getTime() / 1000)) /
      86400
    );
    apy_rate = Math.round((parseFloat(stackedBalance14_rate) * 365) / 1400);

    if (amount) {
      staked = {
        day: 14,
        amount: amount,
        leftDays: amount ? leftDays : 0,
        apy_rate: apy_rate,
      };
    }
    currentStaked = {
      day: 14,
      amount: amount,
      leftDays: amount ? leftDays : 0,
      apy_rate: apy_rate,
    };
    stakedInAllPools.push(currentStaked);
  }

  if (stackedBalance30) {
    amount = parseFloat(
      parseFloat(web3.utils.fromWei(stackedBalance30[0], "ether")).toFixed(2)
    );
    leftDays = Math.ceil(
      (parseInt(stackedBalance30[2]) -
        Math.round(new Date().getTime() / 1000)) /
      86400
    );
    apy_rate = Math.round((parseFloat(stackedBalance30_rate) * 365) / 3000);

    if (amount) {
      staked = {
        day: 30,
        amount: amount,
        leftDays: amount ? leftDays : 0,
        apy_rate: apy_rate,
      };
    }
    currentStaked = {
      day: 30,
      amount: amount,
      leftDays: amount ? leftDays : 0,
      apy_rate: apy_rate,
    };
    stakedInAllPools.push(currentStaked);
  }

  if (stackedBalance60) {
    amount = parseFloat(
      parseFloat(web3.utils.fromWei(stackedBalance60[0], "ether")).toFixed(2)
    );
    leftDays = Math.ceil(
      (parseInt(stackedBalance60[2]) -
        Math.round(new Date().getTime() / 1000)) /
      86400
    );
    apy_rate = Math.round((parseFloat(stackedBalance60_rate) * 365) / 6000);

    if (amount) {
      staked = {
        day: 60,
        amount: amount,
        leftDays: amount ? leftDays : 0,
        apy_rate: apy_rate,
      };
    }
    currentStaked = {
      day: 60,
      amount: amount,
      leftDays: amount ? leftDays : 0,
      apy_rate: apy_rate,
    };
    stakedInAllPools.push(currentStaked);
  }

  if (stackedBalance90) {
    amount = parseFloat(
      parseFloat(web3.utils.fromWei(stackedBalance90[0], "ether")).toFixed(2)
    );
    leftDays = Math.ceil(
      (parseInt(stackedBalance90[2]) -
        Math.round(new Date().getTime() / 1000)) /
      86400
    );
    apy_rate = Math.round((parseFloat(stackedBalance90_rate) * 365) / 9000);

    if (amount) {
      staked = {
        day: 90,
        amount: amount,
        leftDays: amount ? leftDays : 0,
        apy_rate: apy_rate,
      };
    }
    currentStaked = {
      day: 90,
      amount: amount,
      leftDays: amount ? leftDays : 0,
      apy_rate: apy_rate,
    };
    stakedInAllPools.push(currentStaked);
  }

  if (stackedBalance180) {
    amount = parseFloat(
      parseFloat(web3.utils.fromWei(stackedBalance180[0], "ether")).toFixed(2)
    );
    leftDays = Math.ceil(
      (parseInt(stackedBalance180[2]) -
        Math.round(new Date().getTime() / 1000)) /
      86400
    );
    apy_rate = Math.round((parseFloat(stackedBalance180_rate) * 365) / 18000);

    if (amount) {
      staked = {
        day: 180,
        amount: amount,
        leftDays: amount ? leftDays : 0,
        apy_rate: apy_rate,
      };
    }
    currentStaked = {
      day: 180,
      amount: amount,
      leftDays: amount ? leftDays : 0,
      apy_rate: apy_rate,
    };
    stakedInAllPools.push(currentStaked);
  }

  return { staked: staked, stakedInAllPools: stakedInAllPools };
};

export const getUserTier = (stakeBalance, liquidityBalance) => {
  let balance = parseFloat(stakeBalance) + parseFloat(liquidityBalance)
  if (+balance >= 250 && +balance <= 999.999) {
    return 1;
  } else if (+balance >= 1000 && +balance <= 2499.999) {
    return 2;
  } else if (+balance >= 2500 && +balance <= 4999.999) {
    return 3;
  } else if (+balance >= 5000 && +balance <= 7499.999) {
    return 4;
  } else if (+balance >= 7500 && +balance <= 9999.999) {
    return 5;
  } else if (+balance >= 10000 && +balance <= 24999.999) {
    return 6;
  } else if (+balance >= 25000 && +balance <= 49999.999) {
    return 7;
  } else if (+balance >= 50000 && +balance <= 99999.999) {
    return 8;
  } else if (+balance >= 100000) {
    return 9;
  } else {
    return 0;
  }
}

export const getTierLimit = (tier) => {

  if (tier === "tier1") {
    return 1000;
  } else if (tier === "tier2") {
    return 2500;
  } else if (tier === "tier3") {
    return 5000;
  } else if (tier === "tier4") {
    return 7500;
  } else if (tier === "tier5") {
    return 10000;
  } else if (tier === "tier6") {
    return 25000;
  } else if (tier === "tier7") {
    return 50000;
  } else if (tier === "tier8") {
    return 100000;
  } else if (tier === "tier9") {
    return 100000;
  } else {
    return 0;
  }
}

export const getPollWeight = (tier) => {
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