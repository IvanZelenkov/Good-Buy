import { motion } from "framer-motion";

const ShoppingCart = () => {
	return (
		<motion.div exit={{ opacity: 0 }}>
			<div className = "Cart-Container">
			<h1> You set sail, for fail</h1>

				<div className="top">
					<div className='sel-box'>
						<input type="checkbox" />
						<i>全選</i>
					</div>
					<span className='imgname-box'>商品名稱</span>
                <span>單價</span>
                <span className='count-box'>數量</span>
                <span>金額</span>
                <span>操作</span>
            </div>
			</div>
		</motion.div>
	);
}

export default ShoppingCart;