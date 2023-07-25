import { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	Pressable,
	Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Button from "./Button";
import Header from "./Header";
import Input from "./Input";
import { MenuRowList, MenuRowItem, MenuRowSwitch } from "./MenuRowList";

import { useSession } from "../state/SessionState";
import { isUSPhoneNumber, isValidEmail } from "../utils/validate";

const Profile = () => {
	const { session, logOut, updateUser } = useSession();
	const INITAL_FORM_STATE = {
		firstName: session?.firstName,
		familyName: session?.familyName,
		email: session?.email,
		tel: session?.tel,
		imageUrl: session?.imageUrl,
		orderStatuses: session?.orderStatuses,
		passwordChanges: session?.passwordChanges,
		specialOffers: session?.specialOffers,
		newsletter: session?.newsletter,
	};

	const [form, setForm] = useState({ ...INITAL_FORM_STATE });
	const isValidForm =
		form?.firstName?.length >= 2 &&
		form?.familyName?.length >= 2 &&
		isUSPhoneNumber(form?.tel) &&
		isValidEmail(form?.email);

	const updateFormState = (field, t) =>
		setForm((prev) => ({ ...prev, [field]: t }));

	const togglePreferences = (field) =>
		setForm((prev) => ({ ...prev, [field]: !prev[field] }));

	const handleSaveChangesPress = () => {
		if (!isValidForm) return;

		updateUser(form);
		Alert.alert("User updated");
	};

	const handleFormReset = () => setForm({ ...INITAL_FORM_STATE });

	const handleProfileImageUpdate = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (result.canceled) {
			return;
		}

		updateFormState("imageUrl", result?.assets[0]?.uri);
	};

	return (
		<SafeAreaView style={styles.safeAreaContainer}>
			<KeyboardAvoidingView style={styles.keyboardAvoidingView}>
				<Header />

				<View style={styles.mainContentBlock}>
					<ScrollView
						keyboardDismissMode="interactive"
						showsVerticalScrollIndicator={false}
					>
						<Text style={styles.sectionHeadText}>
							Personal information
						</Text>

						<Pressable
							style={styles.avatarContainer}
							onPress={handleProfileImageUpdate}
						>
							{form?.imageUrl ? (
								<Image
									resizeMode="cover"
									style={styles.profileImage}
									source={{ uri: form?.imageUrl }}
								/>
							) : (
								<View
									style={{
										backgroundColor: "lightgray",
										position: "relative",
										...styles.profileImage,
									}}
								>
									<View
										style={{
											alignItems: "center",
											justifyContent: "center",
											flexDirection: "row",
											flex: 1,
										}}
									>
										<Text style={{ fontSize: 30 }}>
											{session?.firstName?.[0]?.toUpperCase()}
										</Text>
										<Text style={{ fontSize: 30 }}>
											{session?.familyName?.[0]?.toUpperCase()}
										</Text>
									</View>
									<View
										style={{
											width: "100%",
											paddingBottom: 10,
											bottom: 0,
											fontSize: 12,
											position: "absolute",
											borderBottomRightRadius: 1,
										}}
									>
										<Text
											style={{
												width: "100%",
												textAlign: "center",
												fontSize: 12,
												color: "#333",
											}}
										>
											Change
										</Text>
									</View>
								</View>
							)}
						</Pressable>

						<MenuRowList>
							<MenuRowItem
								style={styles.rowInput}
								underline
								leftChild={
									<Input
										clearButtonMode={"while-editing"}
										value={form?.firstName}
										onValueChange={(t) =>
											updateFormState("firstName", t)
										}
										placeholder={"First name"}
										autoComplete="given-name"
									></Input>
								}
							></MenuRowItem>

							<MenuRowItem
								style={styles.rowInput}
								underline
								leftChild={
									<Input
										clearButtonMode={"while-editing"}
										value={form?.familyName}
										onValueChange={(t) =>
											updateFormState("familyName", t)
										}
										placeholder={"Family name"}
										autoComplete="family-name"
									></Input>
								}
							></MenuRowItem>

							<MenuRowItem
								style={styles.rowInput}
								underline
								leftChild={
									<Input
										clearButtonMode={"while-editing"}
										value={form?.email}
										onValueChange={(t) =>
											updateFormState("email", t)
										}
										placeholder={"Email"}
										autoComplete="email"
										keyboardType="email-address"
									></Input>
								}
							></MenuRowItem>

							<MenuRowItem
								style={styles.rowInput}
								leftChild={
									<Input
										value={form?.tel}
										clearButtonMode={"while-editing"}
										onValueChange={(t) =>
											updateFormState("tel", t)
										}
										placeholder={"Tel"}
										autoComplete="tel"
										keyboardType="phone-pad"
									></Input>
								}
							></MenuRowItem>
						</MenuRowList>

						<Text style={styles.sectionHeadText}>Preferences</Text>

						<MenuRowList>
							<MenuRowSwitch
								underline
								text={"Order statuses"}
								value={form.orderStatuses}
								onToggle={() =>
									togglePreferences("orderStatuses")
								}
							/>

							<MenuRowSwitch
								underline
								text={"Password changes"}
								value={form.passwordChanges}
								onToggle={() =>
									togglePreferences("passwordChanges")
								}
							/>

							<MenuRowSwitch
								underline
								text={"Special orders"}
								value={form.specialOffers}
								onToggle={() =>
									togglePreferences("specialOffers")
								}
							/>

							<MenuRowSwitch
								text={"Newsletter"}
								value={form.newsletter}
								onToggle={() => togglePreferences("newsletter")}
							/>
						</MenuRowList>

						<View>
							<Button
								text={"Log out"}
								onPress={() => logOut()}
								color="#F4CE14"
							/>
						</View>
					</ScrollView>

					<View style={styles.tabContainer}>
						<View style={styles.tabLeftBtn}>
							<Button
								text={"Reset"}
								type="secondary"
								onPress={handleFormReset}
							></Button>
						</View>

						<View style={styles.tabRightBtn}>
							<Button
								disabled={!isValidForm}
								text={"Save"}
								onPress={handleSaveChangesPress}
							></Button>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeAreaContainer: { flex: 1 },
	keyboardAvoidingView: { flex: 1 },
	sectionHeadText: {
		fontSize: 30,
		fontWeight: "600",
		marginBottom: 20,
		color: "#000000",
	},
	mainContentBlock: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	avatarContainer: {
		width: "100%",
		alignItems: "center",
		marginBottom: 20,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 999,
	},
	rowInput: {
		color: "#000000",
	},
	tabContainer: {
		flexDirection: "row",
		width: "100%",
		paddingVertical: 20,
	},
	tabLeftBtn: {
		width: "20%",
	},
	tabRightBtn: {
		marginLeft: "auto",
		width: "75%",
	},
});

export default Profile;
