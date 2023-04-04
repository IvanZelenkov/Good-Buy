import { motion } from "framer-motion";

const ShoppingCart = () => {
	return (
		<motion.div exit={{ opacity: 0 }}>
			<div className = "Cart-Container">
			<h1> You set sail, for fail</h1>

			</div>
		</motion.div>
	);
}

export default ShoppingCart;