const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeTableViewSchema = new Schema({
	source: { type: String },
	destination: { type: String },
	routeDetails: { type: Object },
	departureTimeFromSource: { type: String },
	arrivalTimeAtDestination: { type: String },
	operator: { type: String },
	depot: { type: String },
});

const BusRecords = mongoose.model("BusRecords", timeTableViewSchema);
module.exports = BusRecords;
