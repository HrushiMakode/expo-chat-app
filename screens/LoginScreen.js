import React, { useEffect } from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			console.log(authUser);
			if (authUser) {
				navigation.replace("Home");
			}
		});
		return unsubscribe;
	}, []);

	const signIn = () => {
		console.log("Email::", email);
		console.log("Password::", password);

		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error));
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={styles.container}
		>
			<Image
				style={{ width: 200, height: 200 }}
				source={require("../assets/signal.png")}
			/>
			<View style={styles.inputContainer}>
				<Input
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					autoFocus
					type="email"
				/>
				<Input
					placeholder="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
					autoFocus
					type="password"
				/>
			</View>

			<Button containerStyle={styles.button} title="Login" onPress={signIn} />
			<Button
				containerStyle={styles.button}
				type="outline"
				title="Register"
				onPress={() => {
					navigation.navigate("Register");
				}}
			/>

			<StatusBar style="light"></StatusBar>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 10,
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
