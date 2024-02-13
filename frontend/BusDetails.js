import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";

const BusDetails = ({ busData, sourceParam, destinationParam, handleBack }) => {
	return (
		<>
			<View style={styles.container}>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					{busData.map((route, index) => (
						<View key={index} style={styles.card}>
							<Text style={styles.sourceName}>
								{route.sourceName?.toUpperCase()}
							</Text>
							<Text>
								Arrival Time: {route.sourceDetails.arrivalTime}
							</Text>
							{route.sourceDetails.showDepartureTime && (
								<Text>
									Departure Time:{" "}
									{route.sourceDetails.departureTime}
								</Text>
							)}
						</View>
					))}
				</ScrollView>
			</View>

			<View style={styles.staticButtonView}>
				<TouchableOpacity
					onPress={() =>
						handleBack({
							sourceDetailsFromChild: sourceParam,
							destinationDetailsFromChild: destinationParam,
						})
					}
					style={styles.backButton}
				>
					<Text style={styles.backButtonText}>Back</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 0,
		flex: 1,
		backgroundColor: "rgba(242, 242, 242, 0.5)", // Semi-transparent background
		paddingHorizontal: 20,
		paddingTop: 20,
		justifyContent: "center", // Center content vertically
	},
	contentContainer: {
		paddingBottom: 100, // Adjust based on the button height
	},
	card: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		marginBottom: 20,
	},
	sourceName: {
		fontWeight: "bold",
		marginBottom: 10,
	},
	backButtonText: {
		color: "white",
		fontSize: 16,
	},
	staticButtonView: {
		backgroundColor: "red",
		position: "absolute",
		bottom: 20, // Adjust as needed
		alignSelf: "center", // Center the button horizontally
		backgroundColor: "blue", // Solid blue background
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
	},
});

export default BusDetails;
