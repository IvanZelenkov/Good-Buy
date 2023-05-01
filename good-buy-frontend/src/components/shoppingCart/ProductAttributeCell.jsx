import { TableCell } from "@mui/material";

const ProductAttributeCell = ({ productAttribute, customColors }) => {
	return (
		<TableCell
			sx={{
				fontSize: "18px",
				fontFamily: "Montserrat",
				color: customColors[1],
				textAlign: "center"
			}}
		>
			{productAttribute}
		</TableCell>
	);
}

export default ProductAttributeCell;