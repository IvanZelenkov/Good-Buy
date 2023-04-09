import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import { Auth, Hub } from "aws-amplify";
import SignIn from "./signIn";
import AccountActivation from "./accountActivation";
import SignUp from "./signUp";
import UserProfile from "../userProfile";

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
	const [invalidEmailMessage, setInvalidEmailMessage] = useState("");
	const [invalidUsernameMessage, setInvalidUsernameMessage] = useState("");
	const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");
	const [invalidAuthCodeMessage, setInvalidAuthCodeMessage] = useState("");

	const checkUser = async () => {
		try {
			const authUser = await Auth.currentAuthenticatedUser();
			updateUser(authUser);
			console.log("User authenticated.", authUser);
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
					updateFormState(() => ({
						...formState,
						formType: "signIn",
					}));

					break;
				case "signIn":
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
		setInvalidEmailMessage("");
		setInvalidUsernameMessage("");
		setInvalidPasswordMessage("");
		setInvalidAuthCodeMessage("");
		event.persist();
		updateFormState(() => ({ ...formState, [event.target.name]: event.target.value }));
	};

	const signIn = async () => {
		const { username, password } = formState;
		if (!(/\S+@\S+\.\S+/.test(username)))
			setInvalidEmailMessage("Invalid email address.");
		if (!(/^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/).test(password))
			setInvalidPasswordMessage("Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals.")
		else {
			await Auth.signIn(username, password).catch(() => {
				setInvalidPasswordMessage("Wrong password. Try again or click Forgot Password to reset it.");
				checkUser();
			});
			updateFormState(() => ({ ...formState, formType: "signedIn" }));
			checkUser();
		}
	};

	const signUpInstead = () => {
		updateFormState(() => ({ ...formState, formType: "signUp" }));
	}

	const confirmSignUp = async () => {
		const { username, authCode } = formState;
		if (!(/\S+@\S+\.\S+/.test(username)))
			setInvalidEmailMessage("Invalid email address!");
		if (!(/^[0-9]{6}$/.test(authCode)))
			setInvalidAuthCodeMessage("The activation code must be 6 digits.");
		else {
			let flag = 0;
			await Auth.confirmSignUp(username, authCode).catch(() => {
				setInvalidAuthCodeMessage("Invalid activation code.");
				flag = 1;
			});
			if (flag === 0)
				updateFormState(() => ({ ...formState, formType: "signIn" }));
		}
	};

	const signUp = async () => {
		const { username, name, password } = formState;
		if (!(/\S+@\S+\.\S+/.test(username)))
			setInvalidEmailMessage("Invalid email address.");
		if (!(/^[A-Za-z][A-Za-z0-9_]/.test(name)))
			setInvalidUsernameMessage("Please use only letters, numbers, and periods.");
		if (!(/^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/).test(password))
			setInvalidPasswordMessage("Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals.")
		else {
			let flag = 0;
			await Auth.signUp({ username, password, attributes: { name } }).catch(() => {
				setInvalidPasswordMessage("Wrong password. Try again or click Forgot Password to reset it.");
				flag = 1;
			});
			if (flag === 0)
				updateFormState(() => ({ ...formState, formType: "accountActivation" }));
		}
	};

	const signInInstead = () => {
		updateFormState(() => ({ ...formState, formType: "signIn" }));
	}

	return (
		<motion.div exit={{ opacity: 0 }}>
			{formType === "signUp" && (
				<SignUp
					onInputChange={onChange}
					signUp={signUp}
					signInInstead={signInInstead}
					invalidEmailMessage={invalidEmailMessage}
					invalidUsernameMessage={invalidUsernameMessage}
					invalidPasswordMessage={invalidPasswordMessage}
				/>
			)}
			{formType === "accountActivation" && (
				<AccountActivation
					onInputChange={onChange}
					confirmSignUp={confirmSignUp}
					invalidEmailMessage={invalidEmailMessage}
					invalidAuthCodeMessage={invalidAuthCodeMessage}
				/>
			)}
			{formType === "signIn" && (
				<SignIn
					onInputChange={onChange}
					signIn={signIn}
					signUpInstead={signUpInstead}
					invalidEmailMessage={invalidEmailMessage}
					invalidPasswordMessage={invalidPasswordMessage}
				/>
			)}
			{formType === "signedIn" && (
				<UserProfile user={user}/>
			)}
		</motion.div>
	);
}

export default Authentication;