import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Switch } from "react-native";

export const MenuRowList = ({ children, style }) => {
	return <View style={[menuRowListStyle.container, style]}>{children}</View>;
};

export const MenuRowItem = ({
	leftChild,
	rightChild,
	underline = false,
	style,
}) => {
	return (
		<View
			style={[
				menuRowItemStyle.container,
				underline
					? {
							borderBottomWidth: 0.33,
					  }
					: null,
				style,
			]}
		>
			{leftChild}
			{rightChild && rightChild}
		</View>
	);
};

export const MenuRowSwitch = ({ value, onToggle, text, underline = false }) => {
	return (
		<MenuRowItem
			underline={underline}
			leftChild={
				<Text style={menuRowItemStyle.menuRowItemText}>{text}</Text>
			}
			rightChild={
				<View style={{ marginRight: 10 }}>
					<Switch value={value} onValueChange={onToggle} />
				</View>
			}
		></MenuRowItem>
	);
};

const menuRowListStyle = StyleSheet.create({
	container: {
		width: "100%",
		borderRadius: 10,
		backgroundColor: "white",
		paddingLeft: 16,
	},
});

export const menuRowItemStyle = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 50,
		borderBottomColor: "rgba(84,84,88,0.25)",
	},
	menuRowItemText: {
		color: "#000",
		fontSize: 17,
	},
});
