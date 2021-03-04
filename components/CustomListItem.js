import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { db, auth } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
	const [chatMessage, setChatMessage] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setChatMessage(snapshot.docs.map((doc) => doc.data()))
			);
		return unsubscribe;
	}, []);

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={() => {
				enterChat(id, chatName);
			}}
		>
			<ListItem key={id} bottomDivider>
				<Avatar
					rounded
					source={{
						uri:
							chatMessage?.[0]?.photoURL ||
							"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
					}}
				/>
				<ListItem.Content>
					<ListItem.Title style={{ fontWeight: "600" }}>
						{chatName}
					</ListItem.Title>
					<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
						{auth.currentUser.displayName === chatMessage?.[0]?.displayName
							? "You"
							: chatMessage?.[0]?.displayName}
						: {chatMessage?.[0]?.message}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		</TouchableOpacity>
	);
};

export default CustomListItem;

const styles = StyleSheet.create({});
