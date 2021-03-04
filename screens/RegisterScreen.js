import React from "react";
import { useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			// Not Working
			headerBackTitle: "Back to Login",
		});
	}, [navigation]);

	const register = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: name,
					photoURL:
						imageUrl ||
						"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
				});
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<Text h3 style={{ marginBottom: 50 }}>
				Create a Signal Account
			</Text>

			<View style={styles.inputContainer}>
				<Input
					placeholder="Full Name"
					autoFocus
					type="text"
					value={name}
					onChangeText={(text) => setName(text)}
				/>
				<Input
					placeholder="Email"
					type="text"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					type="text"
					value={password}
					secureTextEntry
					onChangeText={(text) => setPassword(text)}
				/>
				<Input
					placeholder="Profile Picture URL (optional)"
					type="text"
					value={imageUrl}
					onChangeText={(text) => setImageUrl(text)}
					onSubmitEditing={register}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				raised
				onPress={register}
				title="Register"
			></Button>
			<StatusBar style="light"></StatusBar>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},
	inputContainer: {
		width: 300,
	},
	button: {
		width: 200,
		marginTop: 10,
	},
});
