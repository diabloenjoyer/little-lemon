import { useOrder } from "../state/OrderState";

import {
	View,
	SectionList,
	Text,
	SafeAreaView,
	StyleSheet,
	Image,
} from "react-native";

import Header from "./Header";
import Button from "./Button";

import { COLORS, brandFont, API_ENDPOINTS } from "../utils/config";
import { capitalizeStr } from "../utils/strings";
import { getTimeDifferenceInMinutes } from "../utils/time";
import { useEffect } from "react";

const OrderView = ({ navigation }) => {
	const { order, getTotalOrderPrice, resetOrder } = useOrder();
	const getSectionData = () => {
		const sectionData = [];
		const productsByCategory = order.products.reduce(
			(sections, product) => {
				if (!sections[product?.category]) {
					sections[product?.category] = [];
				}

				sections[product?.category].push(product);
				return sections;
			},
			{}
		);

		for (const category in productsByCategory) {
			sectionData.push({
				title: category,
				data: productsByCategory[category],
			});
		}

		return sectionData;
	};

	const handleOrderReset = () => {
		navigation.popToTop();
		resetOrder();
	};

	const sectionData = getSectionData();
	useEffect(() => {
		if (getTimeDifferenceInMinutes(order.timeUntilReadyForDelivery) < 1) {
			handleOrderReset();
		}
	}, []);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header />

			<View>
				<SectionList
					ListHeaderComponent={OrderHeader}
					ListFooterComponent={
						<OrderFooter onOrderReset={handleOrderReset} />
					}
					sections={sectionData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <OrderItem {...item} />}
					renderSectionHeader={({ section: { title } }) => (
						<Text style={styles.menuSectionHeadingText}>
							{capitalizeStr(title)}
						</Text>
					)}
				></SectionList>
			</View>

			<View style={styles.viewFooterWrapper}>
				<View
					style={[
						styles.sectionContainer,
						styles.grandTotalContainer,
					]}
				>
					<Text style={styles.grandTotalText}>Grand total:</Text>
					<Text style={styles.grandTotalText}>
						${getTotalOrderPrice()}
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

const OrderItem = ({ name, description, image, qty, price }) => {
	return (
		<View style={styles.menuItemContainer}>
			<View>
				<Image
					resizeMode="stretch"
					style={styles.menuItemImage}
					source={{
						uri: image ? API_ENDPOINTS.MENU_IMAGE(image) : null,
					}}
				></Image>
			</View>

			<View style={styles.menuItemBodyWrapper}>
				<Text style={styles.menuItemProductNameText}>{name}</Text>

				<Text numberOfLines={2} style={styles.menuItemDescriptionText}>
					{description}
				</Text>

				<View style={styles.menuItemBottomWrapper}>
					<Text style={styles.menuItemPriceText}>${price}</Text>
					<Text style={styles.menuItemPriceText}>x{qty}</Text>
				</View>
			</View>
		</View>
	);
};

const OrderHeader = () => {
	const { order } = useOrder();

	return (
		<>
			<Text style={styles.sectionHeadText}>
				We're preparing your order
			</Text>

			{order.timeUntilReadyForDelivery && (
				<Text
					style={[
						styles.sectionParagraph,
						styles.deliveryEstimateText,
					]}
				>
					Expected delivery in&nbsp;
					{getTimeDifferenceInMinutes(
						order.timeUntilReadyForDelivery
					).toFixed()}
					&nbsp;minutes
				</Text>
			)}

			<View style={styles.imageContainer}>
				<Image
					resizeMode="contain"
					style={styles.gifImage}
					source={require("../assets/cooking.gif")}
				></Image>
			</View>

			<View style={styles.sectionContainer}>
				<Text style={styles.sectionSubheading}>
					Here's what you've ordered
				</Text>
			</View>
		</>
	);
};
const OrderFooter = ({ onOrderReset }) => {
	return (
		<View style={styles.orderFooterWrapper}>
			<Button
				text={"Reset order"}
				color="#900C3F"
				onPress={onOrderReset}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollViewContainer: { height: "100%" },
	sectionContainer: {
		marginLeft: 20,
	},
	sectionHeadText: {
		fontSize: 30,
		fontWeight: "600",
		marginBottom: 20,
		marginTop: 20,
		marginLeft: 20,
		color: "#000000",
		maxWidth: 250,
	},
	gifImage: { width: 200, height: 200 },
	imageContainer: {
		alignItems: "center",
	},
	sectionSubheading: {
		fontSize: 20,
		fontWeight: "600",
	},
	sectionParagraph: {
		fontSize: 16,
		fontWeight: "400",
		fontFamily: brandFont(),
	},
	menuSectionHeadingText: {
		fontSize: 16,
		fontWeight: "600",
		paddingHorizontal: 20,
		marginTop: 20,
		color: COLORS.brand.green,
	},
	deliveryEstimateText: {
		fontSize: 20,
		marginLeft: 20,
	},
	grandTotalContainer: {
		marginTop: 20,
		marginBottom: 20,
		marginRight: 20,
		justifyContent: "space-between",
		flexDirection: "row",
	},
	grandTotalText: { fontSize: 23, fontWeight: "600" },
	menuItemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
		marginHorizontal: 20,
		borderBottomColor: "rgba(84,84,88,0.25)",
		borderBottomWidth: 0.33,
	},
	menuItemPriceText: {
		fontSize: 23,
		color: COLORS.brand.green,
		fontFamily: brandFont(),
	},
	menuItemBottomWrapper: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	menuItemDescriptionText: {
		color: COLORS.brand.green,
		fontFamily: brandFont(),
	},
	menuItemProductNameText: {
		fontSize: 16,
		color: "black",
		fontWeight: "600",
		marginBottom: 13,
	},
	menuItemImage: { height: 100, width: 100, borderRadius: 5 },
	menuItemBodyWrapper: { marginLeft: 16, flex: 1 },
	viewFooterWrapper: {
		borderTopColor: COLORS.brand.neutralHighlight,
		borderTopWidth: 1,
		backgroundColor: "#EFEFEF",
		position: "absolute",
		bottom: 0,
		paddingHorizontal: 20,
		width: "100%",
		paddingBottom: 40,
	},
	orderFooterWrapper: {
		marginBottom: 160,
		marginTop: 50,
		paddingHorizontal: 20,
	},
});

export default OrderView;
