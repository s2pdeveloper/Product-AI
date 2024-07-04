const router = require("express").Router();

const ApiRouter = require("./routes");


/* GET home page. */
router.get("/", function(req, res) {
	res.status(200).json({message:"yahoo server route working"})
});
router.use("/api", ApiRouter);
module.exports = router;
