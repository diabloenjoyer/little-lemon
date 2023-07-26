import { useCallback } from "react";
import { useFonts as useExpoFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const useFonts = () => {
	const [fontsLoaded] = useExpoFonts({
		"Marakazi Text": require("../assets/fonts/marakazi-text.ttf"),
		"Karla Regular": require("../assets/fonts/karla-regular.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	return { fontsLoaded, onLayoutRootView };
};

export default useFonts;
