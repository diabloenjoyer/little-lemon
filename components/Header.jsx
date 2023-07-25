import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Button from "./Button";

const Header = ({ type = "only-logo" }) => {
	return (
		<View style={styles.header}>
			<View>
				<Button text="Back" />
			</View>
			<Image
				style={styles.logo}
				resizeMode="stretch"
				source={require("../assets/Logo.png")}
			/>
			<Image
				style={styles.profileIcon}
				resizeMode="contain"
				source={require("../assets/Logo.png")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 20,
		width: "100%",
		paddingVertical: 20,
		alignItems: "center",
		justifyContent: "space-between",
		// backgroundColor: "#dee3e9",
		flexDirection: "row",
	},
	logo: {
		height: 30,
		width: 150,
	},
	profileIcon: {
		width: 50,
		height: 50,
		borderRadius: 999,
	},
});
export default Header;
