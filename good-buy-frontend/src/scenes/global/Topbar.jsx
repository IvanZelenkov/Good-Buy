import { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../../theme";

const Topbar = ({ userDenied }) => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	const navigate = useNavigate();

	const signOut = () => {
		localStorage.setItem("is_user_allowed", "deny");
		userDenied(localStorage.getItem("is_user_allowed"));
	}

	return (
		<Box display="flex" justifyContent="space-between" padding="2vh">

			<Box display="flex"/>

			{/* ICONS */}
			<Box display="flex">
				<motion.div whileHover={{ scale: 1.2 }}>
					<IconButton onClick={signOut}>
						<LogoutIcon sx={{
							color: "custom.customColorA",
							":hover": {
								color: "custom.customColorE"
							}
						}}/>
					</IconButton>
				</motion.div>
				<motion.div whileHover={{ scale: 1.2 }}>
					<IconButton onClick={colorMode.toggleColorMode}>
						{theme.palette.mode === "dark" ? (
							<DarkModeOutlinedIcon sx={{
								color: "custom.customColorA",
								":hover": {
									color: "custom.customColorE"
								}
							}}/>
						) : (
							<LightModeOutlinedIcon sx={{
								color: "custom.customColorD",
								":hover": {
									color: "custom.customColorE"
								}
							}}/>
						)}
					</IconButton>
				</motion.div>
				<motion.div whileHover={{ scale: 1.2 }}>
					<IconButton onClick={() => navigate("/profile")}>
						<PersonOutlinedIcon sx={{
							color: "custom.customColorA",
							":hover": {
								color: "custom.customColorE"
							}
						}}/>
					</IconButton>
				</motion.div>
			</Box>
		</Box>
	);
};

export default Topbar;