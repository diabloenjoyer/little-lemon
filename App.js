import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpView from "./components/SignUpView";
import ProfileView from "./components/ProfileView";

import { useSession } from "./state/SessionState";

import SessionState from "./state/SessionState";
const Stack = createStackNavigator();

export default function App() {
	return (
		<SessionState>
			<Routes />
		</SessionState>
	);
}

const Routes = () => {
	const { session, isInitialLoading } = useSession();

	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			{!isInitialLoading && (
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName={!session ? "Get Started" : "Profile"}
				>
					{!session && (
						<Stack.Screen
							name="Get Started"
							component={SignUpView}
						></Stack.Screen>
					)}

					<Stack.Screen
						name="Profile"
						component={ProfileView}
					></Stack.Screen>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};
