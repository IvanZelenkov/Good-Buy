import { motion } from "framer-motion";
import { CheckBox as CheckBoxIcon, LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { muiTextFieldCSS, tokens } from "../../../theme";
import Copyright from "../../../components/authentication/Copyright";

const SignIn = ({ onInputChange, signIn, signUpInstead, invalidEmailMessage, invalidPasswordMessage }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box component={motion.div} exit={{ opacity: 0 }}>
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
						Sign In
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
							name="password"
							label="Password"
							type="password"
							error={invalidPasswordMessage !== ""}
							helperText={invalidPasswordMessage}
							onChange={onInputChange}
							sx={muiTextFieldCSS(colors.customColors[1])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
						<FormControlLabel
							control={<Checkbox
								value="remember"
								sx={{ color: "custom.customColorA" }}
								checkedIcon={<CheckBoxIcon sx={{ color: "custom.customColorA" }}/>}
							/>}
							label={
								<Typography style={{
									color: "custom.customColorA",
									fontFamily: "Montserrat",
									fontWeight: "600"
								}}>
									Remember me
								</Typography>
							}
							sx={{ color: "custom.customColorA" }}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={signIn}
							sx={{
								marginTop: 3,
								marginBottom: 2,
								color: "custom.customColorE",
								backgroundColor: "custom.customColorA"
							}}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link
									variant="body2"
									sx={{
										color: "custom.customColorA",
										textDecorationColor: colors.customColors[1],
										cursor: "pointer",
										fontFamily: "Montserrat"
									}}
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									onClick={signUpInstead}
									variant="body2"
									sx={{
										color: "custom.customColorA",
										textDecorationColor: colors.customColors[1],
										cursor: "pointer",
										fontFamily: "Montserrat"
									}}
								>
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright textdecorationcolor={colors.customColors[1]}/>
			</Container>
		</Box>
	);
}

export default SignIn;