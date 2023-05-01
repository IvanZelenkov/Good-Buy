import { TableCell } from "@mui/material";

const ProductImageCell = ({ productImageUrl, productStoreLink, customColors }) => {
	return (
		<TableCell
			sx={{
				fontSize: "1.4vh",
				fontFamily: "Montserrat",
				color: customColors[1],
				textAlign: "center"
			}}
		>
			<img
				className={"product-image"}
				src={require(`../../images/products/${productImageUrl}`)}
				alt=""
				loading="lazy"
				onClick={() => window.open(productStoreLink, "_blank")}
				style={{
					backgroundColor: `${customColors[3]}`,
					borderRadius: "5px",
					height: "7vh"
				}}
			/>
		</TableCell>
	);
}

export default ProductImageCell;