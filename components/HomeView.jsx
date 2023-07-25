import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

import { View, Text, SafeAreaView } from "react-native";

import Header from "./Header";

import { API_ENDPOINTS } from "../utils/config";

const HomeView = () => {
	const { data, error, isLoading } = useSWR(API_ENDPOINTS.MENU, fetcher);

	if (error) return <Text>Something went wrong</Text>;

	if (isLoading) return <Text>Loading...</Text>;
	console.log(data);
	return (
		<SafeAreaView>
			<Header />
			<Text>HomeView</Text>
		</SafeAreaView>
	);
};

export default HomeView;
