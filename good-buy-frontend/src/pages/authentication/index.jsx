import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import SignIn from "./signIn";
import AccountActivation from "./accountActivation";
import SignUp from "./signUp";

import { Auth, Hub } from "aws-amplify";

const initialFormState = {
	username: "", // In Cognito, the field "username" means "email"
	name: "",
	password: "",
	authCode: "",
	formType: "signIn",
};

const Authentication = ({ user, updateUser }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [formState, updateFormState] = useState(initialFormState);

	const checkUser = async () => {
		try {
			const user = await Auth.currentAuthenticatedUser();
			updateUser(user);
			console.log("User authenticated.", user);
			updateFormState(() => ({ ...formState, formType: "signedIn" }));
		} catch (error) {
			console.log("User not authenticated.", error);
			updateFormState(() => ({ ...formState, formType: "signIn" }));
		}
	};

	const setAuthListener = async () => {
		Hub.listen("auth", (data) => {
			switch (data.payload.event) {
				case "signOut":
					console.log(data);

					updateFormState(() => ({
						...formState,
						formType: "signIn",
					}));

					break;
				case "signIn":
					console.log(data);

					break;
			}
		});
	};

	useEffect(() => {
		checkUser();
		setAuthListener();
	}, []);

	const { formType } = formState;

	const onChange = (event) => {
		event.persist();
		updateFormState(() => ({ ...formState, [event.target.name]: event.target.value }));
	};

	const signUp = async () => {
		const { username, name, password } = formState;
		await Auth.signUp({ username, password, attributes: { name } });
		updateFormState(() => ({ ...formState, formType: "accountActivation" }));
	};

	const signUpInstead = () => {
		updateFormState(() => ({ ...formState, formType: "signUp" }));
	}

	const signInInstead = () => {
		updateFormState(() => ({ ...formState, formType: "signIn" }));
	}

	const confirmSignUp = async () => {
		const { username, authCode } = formState;
		await Auth.confirmSignUp(username, authCode);
		updateFormState(() => ({ ...formState, formType: "signIn" }));
	};

	const signIn = async () => {
		const { username, password } = formState;
		await Auth.signIn(username, password);
		updateFormState(() => ({ ...formState, formType: "signedIn" }));
	};

	return (
		<motion.div exit={{ opacity: 0 }}>
			{formType === "signUp" && (
				<SignUp onInputChange={onChange} signUp={signUp} signInInstead={signInInstead}/>
			)}
			{formType === "accountActivation" && (
				<AccountActivation onInputChange={onChange} confirmSignUp={confirmSignUp}/>
			)}
			{formType === "signIn" && (
				<SignIn onInputChange={onChange} signIn={signIn} signUpInstead={signUpInstead}/>
			)}
			{formType === "signedIn" && (
				<div>
					<h2>
						Welcome the app, {user.username} ({user.attributes.email})!
					</h2>
					<button
						onClick={() => {
							Auth.signOut();
						}}
					>
						Sign out
					</button>
				</div>
			)}
		</motion.div>
	);
}

export default Authentication;