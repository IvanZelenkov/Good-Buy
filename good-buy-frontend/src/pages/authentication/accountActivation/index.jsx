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
					<Avatar sx={{ margin: 1, backgroundColor: "custom.customColorA" }}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography
						sx={{
							fontSize: "20px",
							fontFamily: "Montserrat",
							color: "custom.customColorA"
						}}
					>
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
							sx={muiTextFieldCSS(colors.customColors[1])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
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
							sx={muiTextFieldCSS(colors.customColors[1])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={confirmSignUp}
							sx={{
								marginTop: 3,
								marginBottom: 2,
								color: "custom.customColorE",
								backgroundColor: "custom.customColorA"
							}}
						>
							Activate
						</Button>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Link
								variant="body2"
								sx={{
									color: "custom.customColorA",
									textDecorationColor: colors.customColors[1],
									cursor: "pointer"
								}}
							>
								Didn't receive a code? Resend
							</Link>
						</Box>
					</Box>
				</Box>
				<Copyright textdecorationcolor={colors.customColors[1]}/>
			</Container>
		</motion.div>
	);
}

export default AccountActivation;