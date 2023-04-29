import { Auth } from "aws-amplify";

export const signUpInstead = (authenticationState, setAuthenticationState) => {
	setAuthenticationState(prevState => ({
		...prevState,
		formState: {
			...authenticationState.formState,
			formType: "signUp"
		}
	}));
}

export const signUp = async (authenticationState, setAuthenticationState) => {
	const { username, name, password } = authenticationState.formState;

	const isEmailValid = /\S+@\S+\.\S+/.test(username);
	const isNameValid = /^[A-Za-z][A-Za-z0-9_]/.test(name);
	const isPasswordValid = /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/.test(password);

	if (!isEmailValid) {
		setAuthenticationState(prevState => ({ ...prevState, invalidEmailMessage: "Invalid email address." }));
		return;
	}

	if (!isNameValid) {
		setAuthenticationState(prevState => ({ ...prevState, invalidUsernameMessage: "Please use only letters, numbers, and periods." }));
		return;
	}

	if (!isPasswordValid) {
		setAuthenticationState(prevState => ({ ...prevState, invalidPasswordMessage: "Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals." }));
		return;
	}

	try {
		await Auth.signUp({ username, password, attributes: { name } });
		setAuthenticationState(prevState => ({ ...prevState, formState: { ...authenticationState.formState, formType: "accountActivation" } }));
	} catch (error) {
		setAuthenticationState(prevState => ({ ...prevState, invalidPasswordMessage: "Wrong password. Try again or click Forgot Password to reset it." }));
	}
};
