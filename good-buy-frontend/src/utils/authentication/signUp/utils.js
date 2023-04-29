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
	if (!(/\S+@\S+\.\S+/.test(username)))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidEmailMessage: "Invalid email address."
		}));
	if (!(/^[A-Za-z][A-Za-z0-9_]/.test(name)))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidUsernameMessage: "Please use only letters, numbers, and periods."
		}));
	if (!(/^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/).test(password))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidPasswordMessage: "Use 8 characters or more for your password that include lowercase, uppercase characters, and numerals."
		}));
	else {
		let flag = 0;
		await Auth.signUp({ username, password, attributes: { name } }).catch(() => {
			setAuthenticationState(prevState => ({
				...prevState,
				invalidPasswordMessage: "Wrong password. Try again or click Forgot Password to reset it."
			}));
			flag = 1;
		});
		if (flag === 0)
			setAuthenticationState(prevState => ({
				...prevState,
				formState: {
					...authenticationState.formState,
					formType: "accountActivation"
				}
			}));
	}
};

export const confirmSignUp = async (authenticationState, setAuthenticationState) => {
	const { username, authCode } = authenticationState.formState;
	if (!(/\S+@\S+\.\S+/.test(username)))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidEmailMessage: "Invalid email address."
		}));
	if (!(/^[0-9]{6}$/.test(authCode)))
		setAuthenticationState(prevState => ({
			...prevState,
			invalidAuthCodeMessage: "The activation code must be 6 digits."
		}));
	else {
		let flag = 0;
		await Auth.confirmSignUp(username, authCode).catch(() => {
			setAuthenticationState(prevState => ({
				...prevState,
				invalidAuthCodeMessage: "Invalid activation code."
			}));
			flag = 1;
		});
		if (flag === 0)
			setAuthenticationState(prevState => ({
				...prevState,
				formState: {
					...authenticationState.formState,
					formType: "signIn"
				}
			}));
	}
};