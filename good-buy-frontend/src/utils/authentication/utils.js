import { Auth, Hub } from "aws-amplify";

export const onChange = (event, authenticationState, setAuthenticationState) => {
	setAuthenticationState(prevState => ({
		...prevState,
		invalidEmailMessage: "",
		invalidUsernameMessage: "",
		invalidPasswordMessage: "",
		invalidAuthCodeMessage: ""
	}));
	event.persist();
	setAuthenticationState(prevState => ({
		...prevState,
		formState: {
			...authenticationState.formState,
			[event.target.name]: event.target.value
		}
	}));
};

export const checkUser = async (updateUser, authenticationState, setAuthenticationState) => {
	try {
		const authUser = await Auth.currentAuthenticatedUser();
		updateUser(authUser);
		setAuthenticationState(prevState => ({
			...prevState,
			formState: {
				...authenticationState.formState,
				formType: "signedIn"
			}
		}));
	} catch (error) {
		setAuthenticationState(prevState => ({
			...prevState,
			formState: {
				...authenticationState.formState,
				formType: "signIn"
			}
		}));
	}
};

export const setAuthListener = (authenticationState, setAuthenticationState) => {
	Hub.listen("auth", (data) => {
		const { event } = data.payload;
		if (event === "signOut") {
			setAuthenticationState(prevState => ({
				...prevState,
				formState: {
					...authenticationState.formState,
					formType: "signIn"
				}
			}));
		}
	});
};