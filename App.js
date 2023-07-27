import { useSession } from "./state/SessionState";
import useFonts from "./hooks/useFont";

import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpView from "./components/SignUpView";
import ProfileView from "./components/ProfileView";
import HomeView from "./components/HomeView";
import OrderView from "./components/OrderView";

import SessionState from "./state/SessionState";
import MenuState from "./state/MenuState";
import OrderState from "./state/OrderState";

const Stack = createStackNavigator();

export default function App() {
	const { fontsLoaded, onLayoutRootView } = useFonts();

	if (!fontsLoaded) return null;

	return (
		<View onLayout={onLayoutRootView} style={{ flex: 1 }}>
			<SessionState>
				<MenuState>
					<OrderState>
						<Routes />
					</OrderState>
				</MenuState>
			</SessionState>
		</View>
	);
}

const Routes = () => {
	const { session, isInitialLoading } = useSession();
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			{!isInitialLoading && (
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{session ? (
						<>
							<Stack.Screen
								name="Home"
								component={HomeView}
							></Stack.Screen>
							<Stack.Screen
								name="Profile"
								component={ProfileView}
							></Stack.Screen>
							<Stack.Screen
								name="Order"
								component={OrderView}
							></Stack.Screen>
						</>
					) : (
						<Stack.Screen
							name="Get Started"
							component={SignUpView}
						></Stack.Screen>
					)}
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};
