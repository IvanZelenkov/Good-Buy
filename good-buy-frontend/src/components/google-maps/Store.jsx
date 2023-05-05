import { ListItem, ListItemAvatar, ListItemText, Box, Typography, Divider } from '@mui/material';

const Store = ({ store, customColors }) => {
	const { product_name, product_image_url, store_name, store_address, store_logo, distance } = store;

	return (
		<>
			<ListItem key={store_address} sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
					<ListItemText
						primary={
							<Typography
								sx={{
									color: customColors[6],
									fontSize: "14px",
									fontFamily: "Montserrat",
									fontWeight: 600
								}}
							>
								{product_name}
							</Typography>
						}
					/>
					<ListItemAvatar>
						<Box
							component="img"
							alt={`${product_name}-logo`}
							width={80}
							height={80}
							src={require(`../../images/products/${product_image_url}`)}
							sx={{ borderRadius: "10px" }}
						/>
					</ListItemAvatar>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography
							sx={{
								color: customColors[6],
								fontFamily: "Montserrat",
								fontSize: "14px",
								fontWeight: 600
							}}
						>
							{store_name}
						</Typography>
						<Box sx={{ ml: 2 }}>
							<ListItemAvatar>
								<Box
									component="img"
									alt={`${store_name}-logo`}
									width={70}
									height={40}
									src={require(`../../images/stores/${store_logo}`)}
									sx={{ borderRadius: "10px" }}
								/>
							</ListItemAvatar>
						</Box>
					</Box>
					<Box>
						<Typography
							sx={{
								color: customColors[6],
								fontFamily: "Montserrat",
								fontSize: "12px",
								fontWeight: 600,
								textAlign: "right",
							}}
						>
							{store_address}
						</Typography>
						<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Divider
								sx={{
									marginLeft: "auto",
									width: "95%",
									marginTop: "5px",
									marginBottom: "5px"
							}}/>
						</Box>
						<Typography
							sx={{
								color: customColors[6],
								fontFamily: "Montserrat",
								fontSize: "12px",
								fontWeight: 600,
								textAlign: "right",
							}}
						>
							{distance} miles away
						</Typography>
					</Box>
				</Box>
			</ListItem>
			<Divider sx={{ margin: "1vh 0" }}/>
		</>
	);
};

export default Store;