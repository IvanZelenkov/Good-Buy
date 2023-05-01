import { useMemo } from "react";
import { Auth } from "aws-amplify";
import { Box, Button, Container, Typography, Avatar, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Loader from "../../components/others/Loader";

const UserProfile = ({ user }) => {
	const { palette: { mode } } = useTheme();
	const colors = useMemo(() => tokens(mode), [mode]);
	const navigate = useNavigate();
	const avatarUrl = "https://static.toiimg.com/thumb/msid-76682135,width-400,resizemode-4/76682135.jpg";

	if (user === null)
		return <Loader colors={colors}/>;
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
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
					padding: 4,
					backgroundColor: colors.customColors[6],
					color: colors.customColors[1],
					borderRadius: "5px",
					transform: "scale(1)",
					transition: "transform 0.5s ease-out",
					"&:hover": {
						transform: "scale(1.025)",
					}
				}}>
					<Avatar
						alt="user-profile-image"
						src={avatarUrl}
						sx={{
							width: "12vh",
							height: "12vh",
							borderRadius: "50%",
							boxShadow: "0px 20px 15px rgba(0, 0, 0, 0.5)"
						}}
					/>
					<Typography
						sx={{
							fontFamily: "Montserrat",
							fontWeight: "600",
							letterSpacing: "1px",
							fontSize: "2vh",
							textAlign: "center",
							marginTop: "2vh",
							color: colors.customColors[1]
						}}
					>
						{user.attributes.name}
					</Typography>
					<Typography
						sx={{
							fontFamily: "Montserrat",
							fontWeight: "600",
							letterSpacing: "1px",
							fontSize: "1.5vh",
							textAlign: "center",
							marginTop: "1vh",
							color: colors.customColors[1]
						}}
					>
						{user.attributes.email}
					</Typography>
					<Typography
						sx={{
							fontFamily: "Montserrat",
							fontWeight: "600",
							letterSpacing: "1px",
							fontSize: "1.5vh",
							textAlign: "center",
							marginTop: "1vh",
							color: colors.customColors[1]
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
						Auth.signOut().then(() => {
							navigate('/');
							window.location.reload();
						});
					}}
					sx={{
						fontFamily: "Montserrat",
						fontWeight: "600",
						letterSpacing: "1px",
						marginTop: 3,
						marginBottom: 2,
						backgroundColor: colors.customColors[6],
						color: colors.customColors[1],
						borderRadius: "5px",
						"&:hover": {
							backgroundColor: colors.customColors[5],
							color: colors.customColors[1]
						}
					}}
				>
					Sign Out
				</Button>
			</Container>
		</Box>
	);
}

export default UserProfile;