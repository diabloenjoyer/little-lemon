import {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
	useMemo,
} from "react";
import {
	getMenu,
	saveMenu,
	filterMenu,
	createMenuTable,
	debugDropDb,
} from "../utils/database";

import debounce from "lodash.debounce";

import { Alert } from "react-native";

import { API_ENDPOINTS, MENU_CATEGORIES } from "../utils/config";

const menuContext = createContext(undefined);

const MenuState = ({ children }) => {
	const [state, setState] = useState({
		menu: null,
		isLoading: true,
	});
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [query, setQuery] = useState("");
	const [searchBarText, setSearchBarText] = useState("");

	const lookup = useCallback((q) => {
		setQuery(q);
	}, []);

	const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

	const handleMenuSearchChange = (q) => {
		setSearchBarText(q);
		debouncedLookup(q);
	};

	const onCategoryPress = (categoryStr) => {
		if (selectedCategories.includes(categoryStr)) {
			setSelectedCategories((prev) =>
				prev.filter(
					(selectedCategory) => selectedCategory !== categoryStr
				)
			);
			return;
		}

		setSelectedCategories((prev) => [...prev, categoryStr]);
	};

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

	const loadMenuFromDb = async () => {
		const menu = await getMenu();

		if (!menu || menu?.length <= 0) throw new Error("Menu is empty");

		setState({ menu: menu, isLoading: false });
	};

	useEffect(() => {
		// (async () => {
		// 	await debugDropDb();
		// })();

		if (state.menu || state.menu?.length > 0) return () => {};

		(async () => {
			try {
				await loadMenuFromDb();
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

	useEffect(() => {
		(async () => {
			const filteredMenu = await filterMenu(
				query,
				selectedCategories.length <= 0
					? MENU_CATEGORIES.map((item) => item?.toLowerCase())
					: selectedCategories.map((item) => item?.toLowerCase())
			);
			setState({ isLoading: false, menu: filteredMenu });
		})();
	}, [query, selectedCategories.length]);

	return (
		<menuContext.Provider
			value={{
				menu: state.menu,
				isLoading: state.isLoading,
				selectedCategories,
				onCategoryPress,
				query: searchBarText,
				setQuery: handleMenuSearchChange,
				categories: MENU_CATEGORIES,
			}}
		>
			{children}
		</menuContext.Provider>
	);
};

export const useMenu = () => useContext(menuContext);

export default MenuState;
