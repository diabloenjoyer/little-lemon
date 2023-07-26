import useMenu from "../hooks/useMenu";
import { capitalizeStr } from "../utils/strings";

import {
	View,
	Text,
	SafeAreaView,
	Image,
	StyleSheet,
	ScrollView,
	FlatList,
} from "react-native";

import Header from "./Header";
import Input from "./Input";
import { MenuRowList, MenuRowItem } from "./MenuRowList";

import { API_ENDPOINTS, COLORS, brandFont } from "../utils/config";
import { Pressable } from "react-native";

const HomeView = () => {
	const { menu, isLoading } = useMenu();

	if (isLoading || !menu) return <Text>Loading menu...</Text>;
	const categories = Array.from(
		new Set(menu.map((item) => capitalizeStr(item?.category)))
	);

	return (
		<SafeAreaView>
			<Header />
			<ScrollView
				keyboardDismissMode="interactive"
				style={{ height: "100%" }}
			>
				<HomeBanner />
				<CategoryList categories={categories} />
				<MenuList menuData={menu} />
			</ScrollView>
		</SafeAreaView>
	);
};

const MenuList = ({ menuData }) => {
	return (
		<View style={{ marginTop: 20, marginBottom: 60 }}>
			<FlatList
				data={menuData}
				keyExtractor={(item, index) => index}
				renderItem={({ item }) => <MenuItem {...item} />}
			></FlatList>
		</View>
	);
};

const MenuItem = ({ name, price, description, image, category }) => {
	return (
		<Pressable
			onPress={() => {
				console.log(`${name} chosen for ${price}`);
			}}
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				paddingVertical: 20,
				marginHorizontal: 20,
				borderBottomColor: "rgba(84,84,88,0.25)",
				borderBottomWidth: 0.33,
			}}
		>
			<View style={{ maxWidth: "68%" }}>
				<Text
					style={{
						fontSize: 16,
						color: "black",
						fontWeight: "600",
						marginBottom: 13,
					}}
				>
					{name}
				</Text>
				<Text
					numberOfLines={2}
					style={{
						color: COLORS.brand.green,
						fontFamily: brandFont(),
					}}
				>
					{description}
				</Text>
				<Text
					style={{
						marginTop: 20,
						fontSize: 20,
						color: COLORS.brand.green,
						fontFamily: brandFont(),
					}}
				>
					${price}
				</Text>
			</View>
			<View style={{ marginLeft: "auto" }}>
				<Image
					resizeMode="cover"
					style={{ height: 100, width: 100, borderRadius: 5 }}
					source={{
						uri: image ? API_ENDPOINTS.MENU_IMAGE(image) : null,
					}}
				></Image>
			</View>
		</Pressable>
	);
};

const HomeBanner = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.heroHeading}>Little Lemon</Text>

			<View style={styles.heroTextContainer}>
				<View style={{ maxWidth: "55%" }}>
					<Text style={styles.restaurantLocationText}>Chicago</Text>
					<Text style={styles.restaurantDescriptionText}>
						We are family-owned Mediterranean restaurant, focused on
						traditional recipes served with a modern twist.
					</Text>
				</View>
				<View style={styles.heroImageContainer}>
					<Image
						resizeMode="cover"
						style={styles.heroImage}
						source={require("../assets/hero_image.png")}
					></Image>
				</View>
			</View>

			<MenuRowList style={{ marginTop: 20 }}>
				<MenuRowItem
					leftChild={
						<Input
							placeholder={"Search dishes"}
							clearButtonMode="while-editing"
						/>
					}
				/>
			</MenuRowList>
		</View>
	);
};

const SearchBar = () => {};

const CategoryList = ({ categories }) => {
	const CategoryItem = ({ category, onPress, selectedCategories }) => {
		return (
			<Pressable
				onPress={onPress}
				style={[styles.categoryItem, styles.categortyItemNotSelected]}
			>
				<Text style={styles.categoryItemText}>{category}</Text>
			</Pressable>
		);
	};

	return (
		<View style={styles.categoryListContainer}>
			<Text style={styles.categoryListHeading}>Order for delivery</Text>
			<FlatList
				style={styles.categoryList}
				horizontal
				data={categories}
				keyExtractor={({ item }) => item}
				renderItem={({ item }) => <CategoryItem category={item} />}
			></FlatList>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.brand.green,
		padding: 20,
		position: "relative",
	},
	heroTextContainer: {
		flexDirection: "row",
		gap: 10,
	},
	heroHeading: {
		fontFamily: brandFont("heading"),
		fontSize: 65,
		lineHeight: 65,
		color: COLORS.brand.yellow,
	},
	heroImage: {
		borderRadius: 10,
		width: 153.125,
		height: 175,
	},
	heroImageContainer: { marginLeft: "auto" },
	restaurantLocationText: {
		fontFamily: brandFont("heading"),
		fontSize: 35,
		lineHeight: 35,
		color: "white",
		marginBottom: 10,
	},
	restaurantDescriptionText: {
		fontFamily: brandFont(),
		fontSize: 16,
		color: "white",
	},
	categoryListContainer: {
		borderBottomColor: "rgba(84,84,88,0.25)",
		borderBottomWidth: 0.33,
		paddingBottom: 20,
	},
	categoryListHeading: {
		padding: 20,
		fontWeight: "600",
		fontSize: 23,
	},
	categoryList: {
		paddingHorizontal: 20,
		gap: 20,
	},
	categoryItem: {
		padding: 8,
		borderRadius: 12,
		marginRight: 10,
	},
	categoryItemText: {
		fontSize: 14,
		fontWeight: "600",
		color: COLORS.brand.green,
	},
	categortyItemNotSelected: {
		backgroundColor: "rgba(179,179,179,0.2)",
	},
	categoryItemSelected: {
		backgroundColor: "rgba(17,17,17,0.2)",
	},
});

export default HomeView;
