import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-ionicons";

const Input = ({
	placeholder,
	value,
	onValueChange,
	keyboardType = "default",
	isSecure = false,
	autoComplete = "off",
	clearButtonMode = false,
	clearTextOnFocus = false,
}) => {
	return (
		<TextInput
			clearTextOnFocus={clearTextOnFocus}
			clearButtonMode={clearButtonMode}
			style={styles.input}
			placeholder={placeholder}
			value={value}
			onChangeText={onValueChange}
			keyboardType={keyboardType}
			secureTextEntry={isSecure}
			autoCompleteType={autoComplete}
			placeholderTextColor="gray"
		></TextInput>
	);
};

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: 20,
		color: "#556772",
		marginBottom: 10,
		fontWeight: "500",
	},
	inputBox: {
		fontSize: 20,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderColor: "#556772",
		borderWidth: 2,
		borderRadius: 8,
		color: "#333",
		backgroundColor: "#cbd2d9",
		marginBottom: 20,
	},
	container: {
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		height: "100%",
		width: "100%",
		color: "#000000",
		fontSize: 17,
	},
	clearIcon: {
		paddingRight: 9,
		backgroundColor: "transparent",
		marginTop: 2,
	},
});

export default Input;
