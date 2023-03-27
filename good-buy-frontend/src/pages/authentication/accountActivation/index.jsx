import {
	Avatar,
	Button,
	TextField,
	Link,
	Box,
	Typography,
	Container,
	useTheme
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import Copyright from "../../../components/Copyright";
import { muiTextFieldCSS, tokens } from "../../../theme";
import { motion } from "framer-motion";

const AccountActivation = ({ onInputChange, confirmSignUp, invalidEmailMessage, invalidAuthCodeMessage }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<motion.div exit={{ opacity: 0 }}>
			<Container
				maxWidth="xs"
				sx={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)"
				}}
			>
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Avatar sx={{ margin: 1, backgroundColor: "black" }}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5" color="black">
						Account Activation
					</Typography>
					<Box sx={{ marginTop: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Email Address"
							name="username"
							autoComplete="email"
							autoFocus
							error={invalidEmailMessage !== ""}
							helperText={invalidEmailMessage}
							onChange={onInputChange}
							sx={muiTextFieldCSS}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Confirmation Code"
							name="authCode"
							error={invalidAuthCodeMessage !== ""}
							helperText={invalidAuthCodeMessage}
							onChange={onInputChange}
							sx={muiTextFieldCSS}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={confirmSignUp}
							sx={{
								marginTop: 3,
								marginBottom: 2,
								color: "white",
								backgroundColor: "black"
							}}
						>
							Activate
						</Button>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Link variant="body2" sx={{ color: "black", textDecorationColor: "black" }}>
								Didn't receive a code? Resend
							</Link>
						</Box>
					</Box>
				</Box>
				<Copyright/>
			</Container>
		</motion.div>
	);
}

export default AccountActivation;