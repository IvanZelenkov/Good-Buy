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
					<Avatar sx={{ margin: 1, backgroundColor: colors.customColors[6] }}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography
						sx={{
							fontSize: "20px",
							fontFamily: "Montserrat",
							color: colors.customColors[6]
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
							sx={muiTextFieldCSS(colors.customColors[6])}
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
							sx={muiTextFieldCSS(colors.customColors[6])}
							inputProps={{ style: { fontFamily: "Montserrat" }}}
							inputlabelprops={{ style: { fontFamily: "Montserrat" }}}
						/>
						<FormControlLabel
							control={<Checkbox
								value="remember"
								style={{ color: colors.customColors[6] }}
								checkedIcon={<CheckBoxIcon sx={{ color: colors.customColors[6] }}/>}
							/>}
							label={
								<Typography style={{
									color: colors.customColors[6],
									fontFamily: "Montserrat",
									fontWeight: "600"
								}}>
									Remember me
								</Typography>
							}
							sx={{ color: colors.customColors[6] }}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={signIn}
							sx={{
								fontFamily: "Montserrat",
								fontWeight: "600",
								letterSpacing: "1px",
								marginTop: 3,
								marginBottom: 2,
								backgroundColor: colors.customColors[6],
								color: colors.customColors[1],
								":hover": {
									backgroundColor: colors.customColors[5],
									color: colors.customColors[1]
								}
							}}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link
									variant="body2"
									sx={{
										color: colors.customColors[6],
										textDecorationColor: colors.customColors[6],
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
										color: colors.customColors[6],
										textDecorationColor: colors.customColors[6],
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
				<Copyright textdecorationcolor={colors.customColors[6]}/>
			</Container>
		</Box>
	);
}

export default SignIn;