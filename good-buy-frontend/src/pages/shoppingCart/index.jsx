import { useState } from 'react';
import { motion } from "framer-motion";
import { tokens } from '../../theme';
import * as React from 'react';
import defImg  from '../../images/product_sample.png'
import { useTheme } from "@emotion/react";
import './Cart.scss'

const name = "ShoppingCart";

const ShoppingCart = () => {
	const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [inputProductName, setInputProductName] = useState("");
	const [isValid, setIsValid] = useState(false);

	return (
        
		<div className="cart-wrapper">
    
		<div className="top">
			<div className='sel-box'>
				<input type="checkbox" />
				<i>pick all</i>
			</div>

			<span className='imgname-box'>product name</span>
			<span>price</span>
			<span className='count-box'>count</span>
			<span>cost</span>
			<span>operate</span>
		</div>
		<div className="middle">
                <ul>

                    <li className='item'>

                        <div className='sel-box'>
                            <input type="checkbox" />
                        </div>

                        <div className='imgname-box'>
                            <img src={defImg} alt="item" />
                            <span>product nameproduct nameproduct nameproduct nameproduct nameproduct name</span>
                        </div>

                        <div className='price-box'>
                            $<span className='price'>0.00</span>
                        </div>

                        <div className='count-box'>
                            <button>-</button>
                            <input type="number" />
                            <button>+</button>
                        </div>

                        <div className='amount-box'>
                            <span className='price'>0.00</span>
                        </div>
                        <div className='action-box'>
                            <a href="#">remove item</a>
                        </div>
                    </li>
                    <li className='item'>

                        <div className='sel-box'>
                            <input type="checkbox" />
                        </div>

                        <div className='imgname-box'>
                            <img src={defImg} alt="item" />
                            <span>product nameproduct nameproduct nameproduct nameproduct nameproduct name</span>
                        </div>

                        <div className='price-box'>
							$<span className='price'>0.00</span>
                        </div>

                        <div className='count-box'>
                            <button>-</button>
                            <input type="number" />
                            <button>+</button>
                        </div>

                        <div className='amount-box'>
                            <span className='price'>0.00</span>
                        </div>
                        <div className='action-box'>
                            <a href="#">remove item</a>
                        </div>
                    </li>
                    <li className='item'>

                        <div className='sel-box'>
                            <input type="checkbox" />
                        </div>

                        <div className='imgname-box'>
                            <img src={defImg} alt="item" />
                            <span>product nameproduct nameproduct nameproduct nameproduct nameproduct name</span>
                        </div>

                        <div className='price-box'>
							$<span className='price'>0.00</span>
                        </div>

                        <div className='count-box'>
                            <button>-</button>
                            <input type="number" />
                            <button>+</button>
                        </div>

                        <div className='amount-box'>
                            <span className='price'>0.00</span>
                        </div>
                        <div className='action-box'>
                            <a href="#">remove item</a>
                        </div>
                    </li>
                    <li className='item'>

                        <div className='sel-box'>
                            <input type="checkbox" />
                        </div>

                        <div className='imgname-box'>
                            <img src={defImg} alt="item" />
                            <span>product nameproduct nameproduct nameproduct nameproduct nameproduct name</span>
                        </div>

                        <div className='price-box'>
                            $<span className='price'>0.00</span>
                        </div>

                        <div className='count-box'>
                            <button>-</button>
                            <input type="number" />
                            <button>+</button>
                        </div>

                        <div className='amount-box'>
                            <span className='price'>0.00</span>
                        </div>
                        <div className='action-box'>
                            <a href="#">remove item</a>
                        </div>
                    </li>

                </ul>
            </div>

            <div className="bottom">
                <div className="left"></div>
                <div className='count-box'>
                    Already pick <span className='price'>0</span> items
                </div>
                <div className='amount-box'>
                    Totall <span className='price'>0.00</span>
                </div>
                <div className="pay-box">
                    <i>Totall</i>
                </div>
            </div>
        </div>


	);
}

export default ShoppingCart;