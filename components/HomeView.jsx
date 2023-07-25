import React from "react";
import { View, Text, SafeAreaView } from "react-native";

import Header from "./Header";

import { API_ENDPOINTS } from "../utils/config";

const getMenu = async () => {};

const HomeView = () => {
	return (
		<SafeAreaView>
			<Header />
			<Text>HomeView</Text>
		</SafeAreaView>
	);
};

export default HomeView;
