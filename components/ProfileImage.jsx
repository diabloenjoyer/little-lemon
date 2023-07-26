import { useSession } from "../state/SessionState";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileImage = ({
	style,
	children,
	initialsOnly = false,
	imageUrl,
	onPress,
	fontSize,
}) => {
	const { session } = useSession();

	if (!session) return null;

	if (!imageUrl) imageUrl = session?.imageUrl;

	return (
		<Pressable onPress={onPress}>
			{!initialsOnly && imageUrl ? (
				<Image
					resizeMode="cover"
					style={[styles.container, style]}
					source={{ uri: imageUrl }}
				/>
			) : (
				<View style={[styles.container, style]}>
					<View style={styles.imageBlock}>
						<Text style={[styles.profileImageLetter, { fontSize }]}>
							{session?.firstName?.[0]?.toUpperCase()}
						</Text>
						<Text style={[styles.profileImageLetter, { fontSize }]}>
							{session?.familyName?.[0]?.toUpperCase()}
						</Text>
					</View>
					{children}
				</View>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		borderRadius: 999,
		position: "relative",
	},
	imageBlock: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		flex: 1,
	},
	profileImageLetter: { fontSize: 20 },
});

export default ProfileImage;
