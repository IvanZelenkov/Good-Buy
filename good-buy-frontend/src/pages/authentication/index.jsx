import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import SignIn from "./signIn";
import AccountActivation from "./accountActivation";
import SignUp from "./signUp";
import ResetPassword from "./resetPassword";
import UserProfile from "../userProfile";
import { checkUser, setAuthListener } from "../../utils/authentication/utils";

const Authentication = ({ user, updateUser }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [authenticationState, setAuthenticationState] = useState({
		formState: {
			username: "", // In Amazon Cognito, the field "username" means "email"
			name: "",
			password: "",
			newPassword: "",
			authCode: "",
			formType: "signIn"
		},
		invalidEmailMessage: "",
		invalidUsernameMessage: "",
		invalidPasswordMessage: "",
		invalidNewPasswordMessage: "",
		invalidAuthCodeMessage: ""
	});

	useEffect(() => {
		checkUser(updateUser, authenticationState, setAuthenticationState);
		setAuthListener(authenticationState, setAuthenticationState);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { formType } = authenticationState.formState;

	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
			{formType === "signUp" && (
				<SignUp
					authenticationState={authenticationState}
					setAuthenticationState={setAuthenticationState}
					customColors={colors.customColors}
				/>
			)}
			{formType === "accountActivation" && (
				<AccountActivation
					authenticationState={authenticationState}
					setAuthenticationState={setAuthenticationState}
					customColors={colors.customColors}
				/>
			)}
			{formType === "signIn" && (
				<SignIn
					updateUser={updateUser}
					authenticationState={authenticationState}
					setAuthenticationState={setAuthenticationState}
					customColors={colors.customColors}
				/>
			)}
			{formType === "forgotPassword" && (
				<ResetPassword
					updateUser={updateUser}
					authenticationState={authenticationState}
					setAuthenticationState={setAuthenticationState}
					customColors={colors.customColors}
				/>
			)}
			{formType === "signedIn" && (
				<UserProfile user={user}/>
			)}
		</Box>
	);
}

export default Authentication;