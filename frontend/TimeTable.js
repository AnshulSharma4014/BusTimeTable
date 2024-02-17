import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import axios from "axios";

const Timetable = ({ sourceParam, destinationParam, fireEvent }) => {
	const [timetable, setTimetable] = useState([]);
	const [source, setSource] = useState("");
	const [destination, setDestination] = useState("");

	useEffect(() => {
		if (sourceParam && destinationParam) {
			setSource(sourceParam);
			setDestination(destinationParam);

			const requestObj = {
				source: sourceParam?.trim()?.toLowerCase(),
				destination: destinationParam?.trim()?.toLowerCase(),
			};

			setTimeout(() => {
				fetchData(requestObj, true);
			}, 150);
		}
	}, []);

	const fetchData = async (requestObjParam, considerRequestObj = false) => {
		try {
			const requestObj = considerRequestObj
				? requestObjParam
				: {
						source: source?.trim()?.toLowerCase(),
						destination: destination?.trim()?.toLowerCase(),
				  };

			const response = await axios.post(
				"http://localhost:5000/view",
				requestObj
			);
			setTimetable(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearch = () => {
		fetchData();
	};

	const handleMoreDetails = (data) => {
		const responseObj = {
			source: source,
			destination: destination,
			details: data,
		};

		fireEvent(responseObj);
	};

	const renderTimetableItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<View style={styles.routeContainer}>
				<Text style={styles.routeText}>
					{item.source?.toUpperCase()} -{" "}
					{item.destination?.toUpperCase()}
				</Text>
			</View>
			<View style={styles.detailsContainer}>
				<Text style={styles.departureTimeText}>
					Departure: {item.departureTimeFromSource}
				</Text>
				<View style={styles.buttonContainerForMoreDetails}>
					<TouchableOpacity
						style={styles.searchButtonContainerForMoreDetails}
						onPress={() => handleMoreDetails(item)}
					>
						<Text style={styles.searchButtonTextForMoreDetails}>
							Details
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	const formatDepartureTime = (time) => {
		// Adjust departure time format as needed
		return time;
	};

	return (
		<>
			<ImageBackground
				source={require("../assets/hrtc_01.jpg")}
				style={styles.backgroundImage}
			>
				<View style={styles.container}>
					<TextInput
						placeholder="Enter Source Name"
						value={source}
						onChangeText={setSource}
						style={styles.input}
						placeholderTextColor="#BDBDBD"
					/>
					<TextInput
						placeholder="Enter Destination Name"
						value={destination}
						onChangeText={setDestination}
						style={[styles.input, styles.inputLast]}
						placeholderTextColor="#BDBDBD"
					/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.searchButtonContainer}
						onPress={handleSearch}
					>
						<Text style={styles.searchButtonText}>Search</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>

			<View style={styles.busCardsContainer}>
				<FlatList
					data={timetable}
					renderItem={renderTimetableItem}
					keyExtractor={(item) => item._id}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#F5F5F5",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginHorizontal: 20,
	},
	backgroundImage: {
		width: "100vw", // Use screen width
		height: 200,
		resizeMode: "cover",
		justifyContent: "center",
	},
	input: {
		flex: 1,
		marginRight: 10,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: "white",
		fontSize: 16,
		color: "#333333",
	},
	inputLast: {
		marginRight: 0,
	},
	buttonContainer: {
		alignItems: "center",
		marginTop: 20,
	},
	searchButtonContainer: {
		backgroundColor: "red",
		borderRadius: 20,
		width: 200, // Increase width as needed
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
	searchButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	busCardsContainer: {
		marginTop: 20, // Adjust as needed
		marginBottom: 20, // Create space between search button and flat list
	},
	itemContainer: {
		backgroundColor: "#F2F2F2",
		borderRadius: 10,
		marginVertical: 5,
		marginLeft: 15,
		marginRight: 15,
		padding: 10,
	},
	routeContainer: {
		marginBottom: 10,
	},
	routeText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	detailsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	departureTimeText: {
		fontSize: 16,
	},
});

export default Timetable;
