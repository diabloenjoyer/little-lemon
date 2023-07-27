import { useNavigation } from "@react-navigation/native";

import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import ProfileImage from "./ProfileImage";
import { COLORS } from "../utils/config";

import { Entypo } from "@expo/vector-icons";

const Header = () => {
	const navigator = useNavigation();

	return (
		<View style={styles.header}>
			{navigator.canGoBack() && (
				<View style={styles.backButtonWrapper}>
					<TouchableOpacity
						onPress={() => navigator.goBack()}
						style={styles.backButtonContainer}
					>
						<Text style={styles.backButtonText}>
							<Entypo
								name="chevron-left"
								size={24}
								color="black"
							/>
						</Text>
					</TouchableOpacity>
				</View>
			)}
			<Image
				style={styles.logo}
				resizeMode="stretch"
				source={require("../assets/Logo.png")}
			/>
			<View style={styles.profileIconContainer}>
				<ProfileImage
					onPress={() => navigator.navigate("Profile")}
					style={styles.profileImage}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		minHeight: 55,
		paddingHorizontal: 20,
		width: "100%",
		paddingVertical: 5,
		alignItems: "center",
		justifyContent: "center",
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
	backButtonContainer: {
		backgroundColor: COLORS.brand.neutralHighlight,
		alignItems: "center",
		justifyContent: "center",
		width: 28,
		height: 28,
		borderRadius: 999,
	},
	backButtonWrapper: {},
	backButtonText: {},
});
export default Header;
