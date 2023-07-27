import { useLayoutEffect, useState } from "react";
import { useOrder } from "../state/OrderState";

import {
	View,
	ScrollView,
	SectionList,
	Text,
	SafeAreaView,
	StyleSheet,
	Image,
} from "react-native";

import Header from "./Header";

import { COLORS, brandFont, API_ENDPOINTS } from "../utils/config";
import { capitalizeStr } from "../utils/strings";
import { getTimeDifferenceInMinutes } from "../utils/time";

const OrderView = () => {
	const [sectionData, setSectionData] = useState([]);
	const { order, getTotalOrderPrice } = useOrder();

	if (!order || !order?.products) return null;
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

	useLayoutEffect(() => {
		setSectionData(getSectionData());
	}, []);
	return (
		<SafeAreaView>
			<Header />

			<ScrollView
				keyboardDismissMode="interactive"
				style={{ height: "100%" }}
			>
				{order && order?.products?.length > 0 ? (
					<>
						<Text style={styles.sectionHeadText}>
							We're preparing your order
						</Text>
						{order?.timeUntilReadyForDelivery && (
							<Text
								style={[
									styles.sectionParagraph,
									styles.deliveryEstimateText,
								]}
							>
								Expected delivery in&nbsp;
								{getTimeDifferenceInMinutes(
									order.timeUntilReadyForDelivery
								).toFixed()}{" "}
								minutes
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

						<View>
							<SectionList
								sections={sectionData}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => (
									<OrderItem {...item} />
								)}
								renderSectionHeader={({
									section: { title },
								}) => (
									<Text
										style={{
											fontSize: 16,
											fontWeight: "600",
											paddingHorizontal: 20,
											marginTop: 20,
											color: COLORS.brand.green,
										}}
									>
										{capitalizeStr(title)}
									</Text>
								)}
							></SectionList>
						</View>

						<View
							style={[
								styles.sectionContainer,
								{
									marginTop: 20,
									marginBottom: 100,
									marginRight: 20,
									justifyContent: "space-between",
									flexDirection: "row",
								},
							]}
						>
							<Text style={{ fontSize: 23, fontWeight: "600" }}>
								Grand total:
							</Text>
							<Text style={{ fontSize: 23, fontWeight: "600" }}>
								${getTotalOrderPrice()?.toFixed(2)}
							</Text>
						</View>
					</>
				) : (
					<>
						<Text style={styles.sectionHeadText}>Whoops</Text>

						<View style={styles.sectionContainer}>
							<Text style={styles.sectionSubheading}>
								You aren't suposed to see this page.
							</Text>
							<Text style={styles.sectionParagraph}>
								Please, go back and fill your order.
							</Text>
						</View>
					</>
				)}
			</ScrollView>
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

const styles = StyleSheet.create({
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
	deliveryEstimateText: {
		fontSize: 20,
		marginLeft: 20,
	},
	menuItemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
		marginHorizontal: 20,
		borderBottomColor: "rgba(84,84,88,0.25)",
		borderBottomWidth: 0.33,
	},
	menuItemOrderButtonContainer: {
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 10,
		backgroundColor: COLORS.brand.neutralHighlight,
		alignItems: "center",
		justifyContent: "center",
	},
	menuOrderButtonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuOrderButtonText: {
		fontWeight: "600",
		color: COLORS.brand.green,
		fontSize: 16,
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
});

export default OrderView;
