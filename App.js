import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Timetable from "./frontend/TimeTable";
import BusDetails from "./frontend/BusDetails";

const App = () => {
	const [showDetails, setShowDetails] = useState(false);
	const [busDetails, setBusDetails] = useState(false);
	const [sourceDetails, setSourceDetails] = useState("");
	const [destinationDetails, setDestinationDetails] = useState("");

	const handleEvent = (eventDetails) => {
		setSourceDetails(eventDetails.source);
		setDestinationDetails(eventDetails.destination);

		setBusDetails(eventDetails.details.routeDetails);
		setShowDetails(true);
	};

	const handleBackFromDetails = () => {
		setShowDetails(false);
		setBusDetails(null);
	};

	return (
		<SafeAreaView style={styles.container}>
			{!showDetails && (
				<Timetable
					sourceParam={sourceDetails}
					destinationParam={destinationDetails}
					fireEvent={handleEvent}
				></Timetable>
			)}
			{showDetails && (
				<BusDetails
					busData={busDetails}
					handleBack={handleBackFromDetails}
				></BusDetails>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
	title: {
		textAlign: "center",
		marginVertical: 8,
	},
	fixToText: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	separator: {
		marginVertical: 8,
		borderBottomColor: "#737373",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});

export default App;
