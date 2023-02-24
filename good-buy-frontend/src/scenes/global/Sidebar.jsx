import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, Link as ProfileLink, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { motion } from "framer-motion";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SidebarItem from "../../components/SidebarItem";
import Home from "../home";
import { BiStore } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import appLogo from "../../images/appLogo.png";

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [selected, setSelected] = useState("Home");

	return (
		<Box
			sx={{
				"& .pro-sidebar-inner": {
					backgroundColor: `${colors.grey[800]} !important`,
					backgroundSize: 'cover',
					backgroundRepeat  : 'no-repeat',
					backgroundPosition: 'center'
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important"
				},
				"& .pro-inner-item": {
					padding: "0 3vh 0.7vh 2vh !important"
				},
				"& .pro-inner-item:hover": {
					color: `${colors.customColors[5]} !important`
				},
				"& .pro-menu-item.active": {
					color: `${colors.customColors[5]} !important`
				},
				".pro-sidebar": {
					height: "100%"
				}
			}}
		>
			<ProSidebar collapsed={isCollapsed} width="100%">
				<Menu iconShape="square">
					<Box style={{
						display: "flex",
						alignItems: "center",
						marginTop: "1vh"
					}}>
						{!isCollapsed && <MenuItem>
							<Box style={{ cursor: "auto" }}>
								<img
									src={appLogo}
									alt=""
									style={{
										width: "100px",
										borderRadius: "10px",
										marginLeft: "1vw"
									}}
								/>
							</Box>
						</MenuItem>}
						<MenuItem
							onClick={() => setIsCollapsed(!isCollapsed)}
							icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
							style={{ color: colors.customColors[4] }}
						>
							{!isCollapsed && (
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									marginLeft="1vw"
								>
									<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
										<MenuOutlinedIcon sx={{ color: "custom.steamColorD" }}/>
									</IconButton>
								</Box>
							)}
						</MenuItem>
					</Box>

					{/* MENU ITEMS */}
					<Box paddingLeft={isCollapsed ? undefined : "10%"}>
						<motion.div whileHover={{ scale: 1.1 }}>
							<SidebarItem
								title="Home"
								to="/"
								icon={<BiStore size={20}/>}
								selected={selected}
								setSelected={setSelected}
							/>
						</motion.div>
						<motion.div whileHover={{ scale: 1.1 }}>
							<SidebarItem
									title="Popular Products"
								to="/popular-products"
								icon={<MdOutlineProductionQuantityLimits size={20}/>}
								selected={selected}
								setSelected={setSelected}
							/>
						</motion.div>
						<motion.div whileHover={{ scale: 1.1 }}>
							<SidebarItem
								title="Deals"
								to="/deals"
								icon={<RiCoupon3Line size={20}/>}
								selected={selected}
								setSelected={setSelected}
							/>
						</motion.div>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;