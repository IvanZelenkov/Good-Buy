import { motion } from "framer-motion";
import {Box, Button, Container, Typography, Avatar, useTheme} from "@mui/material";
import { Auth } from "aws-amplify";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { tokens } from "../../theme";

const UserProfile = ({ user }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const avatarUrl = "https://static.toiimg.com/thumb/msid-76682135,width-400,resizemode-4/76682135.jpg";

	if (user === null) {
		return (
			<motion.div exit={{ opacity: 0 }}>
				<Box margin="1.5vh">
					<Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
						<UseAnimations animation={loading} size={50} fillColor={"#e92a2a"} strokeColor={"#e92a2a"}/>
					</Box>
				</Box>
			</motion.div>
		);
	}
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
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
					padding: 4,
					backgroundColor: colors.customColors[1],
					color: colors.customColors[4],
					borderRadius: "5px",
					boxShadow: "0px 70px 60px rgba(0, 0, 0, 0.5)",
					transform: "scale(1)",
					transition: "transform 0.5s ease-out",
					"&:hover": {
						transform: "scale(1.05)",
					}
				}}>
					<Avatar
						alt="user-profile-image"
						src={avatarUrl}
						sx={{
							width: "10vh",
							height: "10vh",
							borderRadius: "50%",
							boxShadow: "0px 20px 15px rgba(0, 0, 0, 0.5)"
						}}
					/>
					<Typography
						sx={{
							fontSize: "2vh",
							fontWeight: "bold",
							textAlign: "center",
							marginTop: "2vh",
							color: colors.customColors[5]
						}}
					>
						{user.attributes.name}
					</Typography>
					<Typography
						sx={{
							fontSize: "1.5vh",
							textAlign: "center",
							marginTop: "1vh",
							color: colors.customColors[5]
						}}
					>
						{user.attributes.email}
					</Typography>
					<Typography
						sx={{
							fontSize: "1.5vh",
							textAlign: "center",
							marginTop: "1vh",
							color: colors.customColors[5]
						}}
					>
						701 Baronne St, New Orleans
					</Typography>
				</Box>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					onClick={() => {
						Auth.signOut();
					}}
					sx={{
						marginTop: 3,
						marginBottom: 2,
						backgroundColor: colors.customColors[1],
						color: colors.customColors[5],
						borderRadius: "5px",
						boxShadow: "0px 70px 60px rgba(0, 0, 0, 0.5)",
						transform: "scale(1)",
						transition: "transform 0.5s ease-out",
						"&:hover": {
							backgroundColor: colors.customColors[1],
							color: colors.customColors[5],
							boxShadow: "0px 70px 60px rgba(0, 0, 0, 0.5)",
							transform: "scale(1.05)",
							transition: "transform 0.5s ease-out",
						}
					}}
				>
					Sign Out
				</Button>
			</Container>
		</motion.div>
	);
}

export default UserProfile;