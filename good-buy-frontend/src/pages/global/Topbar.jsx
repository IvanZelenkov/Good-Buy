import { useState, useContext } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Button,
	MenuItem,
	useTheme
} from "@mui/material";
import {
	Menu as MenuIcon,
	Adb as AdbIcon,
	SettingsOutlined as SettingsOutlinedIcon
} from "@mui/icons-material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { motion } from "framer-motion";
import { ColorModeContext } from "../../theme";
import { Link } from "react-router-dom";

const pages = [
	{ "pageName": "Home", "route": "/" },
	{ "pageName": "Products", "route": "/products" },
	{ "pageName": "Deals", "route": "/deals" }
];
const authPages = [
	{ "pageName": "Register", "route": "/signUp" },
	{ "pageName": "Log In", "route": "/signIn" }
];
const settings = ["Profile", "Logout"];

function Topbar() {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [selected, setSelected] = useState("Home");

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" sx={{ backgroundColor: "black" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						GOOD BUY
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page, id) => (
								<MenuItem key={id} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page.pageName}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page, id) => (
							<Button
								component={Link}
								to={page.route}
								key={id}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: 'white',
									display: 'flex',
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								{page.pageName}
							</Button>
						))}
					</Box>

					<Box sx={{ display: "flex", flexGrow: 0, flexDirection: "row" }}>
						<motion.div whileHover={{ scale: 1.2 }}>
							<IconButton
								onClick={colorMode.toggleColorMode}
								sx={{ marginRight: "1vw" }}
							>
								{theme.palette.mode === "dark" ? (
									<DarkModeOutlinedIcon sx={{
										color: "custom.customColorD",
										":hover": {
											color: "custom.customColorE",
										}
									}}/>
								) : (
									<LightModeOutlinedIcon sx={{
										color: "custom.customColorA",
										":hover": {
											color: "custom.customColorE"
										}
									}}/>
								)}
							</IconButton>
						</motion.div>
						<motion.div whileHover={{ scale: 1.2 }}>
							<IconButton onClick={handleOpenUserMenu} sx={{ marginRight: "1vw" }}>
								<SettingsOutlinedIcon sx={{ color: "white" }}/>
							</IconButton>
						</motion.div>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{authPages.map((authPage, id) => (
								<Button
									component={Link}
									to={authPage.route}
									key={id}
									onClick={handleCloseNavMenu}
									sx={{
										color: 'white',
										display: 'flex',
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									{authPage.pageName}
								</Button>
							))}
						</Box>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Topbar;