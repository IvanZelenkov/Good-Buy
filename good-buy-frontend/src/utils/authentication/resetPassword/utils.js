import { Auth } from "aws-amplify";

export const forgotPasswordInstead = (authenticationState, setAuthenticationState) => {
	setAuthenticationState(prevState => ({
		...prevState,
		formState: {
			...authenticationState.formState,
			formType: "forgotPassword"
		}
	}));
}

export const handleSubmit = async (updateUser, authenticationState, setAuthenticationState) => {
	const { username, password, newPassword } = authenticationState.formState;

	if (!(/\S+@\S+\.\S+/.test(username))) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidEmailMessage: "Invalid email address."
		}));
		return;
	}

	const passwordRegex = /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;

	if (!passwordRegex.test(password)) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidPasswordMessage: "Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals."
		}));
		return;
	}

	if (!passwordRegex.test(newPassword)) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidNewPasswordMessage: "Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals."
		}));
		return;
	}

	try {
		const user = await Auth.signIn(username, password);
		await Auth.changePassword(user, password, newPassword);
		setAuthenticationState(prevState => ({
			...prevState,
			formState: {
				...authenticationState.formState,
				formType: "signIn"
			}
		}));
	} catch (error) {
		setAuthenticationState(prevState => ({
			...prevState,
			invalidPasswordMessage: "Incorrect email address or password."
		}));
	}
};