import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { getTextColor } from "../utils/contrast";

const APPLE_BLUE = "#007AFF";
const BRAND_GREEN = "#495E57";
const DISABLED_COLOR = "#EDEFEE";

const Button = ({
	text,
	onPress,
	color = BRAND_GREEN,
	type = "default",
	disabled = false,
}) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			style={[
				styles.button,
				type === "secondary"
					? { backgroundColor: "transparent" }
					: disabled
					? { backgroundColor: DISABLED_COLOR }
					: { backgroundColor: color },
			]}
		>
			<Text
				style={[
					styles.buttonText,
					type === "secondary"
						? { color: APPLE_BLUE }
						: disabled
						? { color: getTextColor(DISABLED_COLOR) }
						: { color: getTextColor(color) },
				]}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "100%",
		borderRadius: 12,
		height: 50,
		backgroundColor: APPLE_BLUE,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 17,
		fontWeight: "400",
		color: "#fff",
		textAlign: "center",
		lineHeight: 22,
	},
});

export default Button;
