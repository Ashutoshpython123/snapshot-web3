// const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/admin')
const router = require("express").Router();
const fetchContractEvents = require("../Controller/events");
//Route url to to fetch contract events.
router.get("/eventFetch", fetchContractEvents.nodeEvent);
router.get("/arrayEvent", fetchContractEvents.arrayEvent);

router.post("/insertOwner", fetchContractEvents.getProfile)
router.get("/updateTransfer", fetchContractEvents.updateTransferFrom)
router.get("/getNftTransfer", fetchContractEvents.getNftTransfer)
router.get("/nft-snapshot", fetchContractEvents.getNftSnapshot)
router.get("/snft-snapshot", fetchContractEvents.getSnftSnapshot)

module.exports = router;

