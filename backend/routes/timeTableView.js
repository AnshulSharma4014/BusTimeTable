const router = require("express").Router();
const TimeTable = require("../models/timeTableView.modal");

router.route("/").post(async (req, res) => {
	try {
		const source = req.body.source;
		const destination = req.body.destination;

		console.log(source);
		console.log(destination);

		const busData = await TimeTable.find({
			$and: [
				{
					routeDetails: {
						$elemMatch: {
							sourceName: { $regex: source, $options: "i" },
						},
					},
				},
				{
					routeDetails: {
						$elemMatch: {
							sourceName: { $regex: destination, $options: "i" },
						},
					},
				},
			],
		})
			.sort({ departureTime: "asc" })
			.exec();

		console.log(busData);
		res.json(busData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
