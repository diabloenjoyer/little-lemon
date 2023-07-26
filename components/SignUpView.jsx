import { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	Image,
} from "react-native";

import Header from "./Header";
import Button from "./Button";
import Input from "./Input";

import { isValidEmail } from "../utils/validate";
import { useSession } from "../state/SessionState";

import { MenuRowItem, MenuRowList } from "./MenuRowList";

const SignUpView = () => {
	const [form, setForm] = useState({
		firstName: "",
		email: "",
	});

	const { registerNewUser } = useSession();

	const updateFormState = (key, value) =>
		setForm((prev) => ({ ...prev, [key]: value }));

	const submitForm = () => {
		if (!isValidEmail(form.email)) return;
		if (form.email.length <= 0 || form.firstName.length <= 0) return;

		registerNewUser(form);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{ flex: 1, width: "100%" }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<Header />
				<ScrollView
					keyboardDismissMode="interactive"
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "flex-end",
						paddingHorizontal: 20,
					}}
				>
					<Image
						source={require("../assets/logo_big.png")}
						style={{
							width: "60%",
							height: "60%",
							marginHorizontal: "auto",
							alignSelf: "center",
						}}
						resizeMode="contain"
					></Image>
					<View>
						<Text style={styles.heroText}>
							Let us get to know you
						</Text>
					</View>
					<MenuRowList style={styles.section}>
						<MenuRowItem
							underline
							leftChild={
								<Input
									label={"First name"}
									placeholder={"Type your first name"}
									autoComplete="given-name"
									value={form.firstName}
									onValueChange={(e) =>
										updateFormState("firstName", e)
									}
								/>
							}
						/>

						<MenuRowItem
							leftChild={
								<Input
									label={"Email"}
									placeholder={"Type your email"}
									keyboardType="email-address"
									autoComplete="email"
									value={form.email}
									onValueChange={(e) =>
										updateFormState("email", e)
									}
								/>
							}
						/>
					</MenuRowList>
				</ScrollView>
				<View
					style={{
						height: 100,
						paddingHorizontal: 20,
						width: "100%",
						justifyContent: "center",
						alignItems: "flex-end",
					}}
				>
					<Button
						text={"Next"}
						onPress={submitForm}
						disabled={!isValidEmail(form?.email)}
					/>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	heroText: {
		textAlign: "center",
		fontSize: 23,
		color: "#556772",
		fontWeight: "600",
		marginBottom: "15%",
	},
	section: {
		marginBottom: 30,
	},
});

export default SignUpView;
