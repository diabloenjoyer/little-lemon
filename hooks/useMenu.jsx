import { useEffect, useState, useRef } from "react";
import {
	getMenu,
	saveMenu,
	filterMenu,
	createMenuTable,
	debugDropDb,
} from "../utils/database";

import { API_ENDPOINTS } from "../utils/config";
import { Alert } from "react-native";

const useMenu = () => {
	const [state, setState] = useState({
		menu: null,
		isLoading: true,
	});

	const fetchMenu = async () => {
		try {
			if (state.menu !== null) return;
			const res = await fetch(API_ENDPOINTS.MENU);
			const data = await res.json();
			await saveMenu(data?.menu);
			return data?.menu;
		} catch (error) {
			Alert.alert("Error fetching menu", error);
		}
	};

	useEffect(() => {
		// (async () => {
		// 	await debugDropDb();
		// })();

		if (state.menu || state.menu?.length > 0) return () => {};

		(async () => {
			try {
				const menu = await getMenu();

				if (!menu || menu?.length <= 0)
					throw new Error("Menu is empty");

				setState({ menu, isLoading: false });
			} catch (error) {
				await createMenuTable();
				const menu = await fetchMenu();

				setState({
					isLoading: false,
					menu,
				});
			}
		})();
	}, []);

	return { menu: state.menu, isLoading: state.isLoading };
};

export default useMenu;
