import { useNavigation } from "@react-navigation/native";

import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import ProfileImage from "./ProfileImage";

const Header = () => {
	const navigate = useNavigation();

	return (
		<View style={styles.header}>
			<View>
				<TouchableOpacity onPress={() => navigate.goBack()}>
					<Text>Back</Text>
				</TouchableOpacity>
			</View>
			<Image
				style={styles.logo}
				resizeMode="stretch"
				source={require("../assets/Logo.png")}
			/>
			<View style={styles.profileIconContainer}>
				<ProfileImage
					onPress={() => navigate.navigate("Profile")}
					style={styles.profileImage}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 20,
		width: "100%",
		paddingVertical: 5,
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "#dee3e9",
		flexDirection: "row",
		position: "relative",
	},
	logo: {
		height: 30,
		width: 150,
		position: "absolute",
		alignSelf: "center",
	},
	profileIconContainer: { marginLeft: "auto" },
	profileImage: {
		backgroundColor: "lightgray",
		width: 45,
		height: 45,
	},
});
export default Header;
