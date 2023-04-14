import { Card, Button, Form, Col,Row } from "react-bootstrap";
import  {CartContext}  from "./CartContext"
import {useContext} from 'react';




function ProductCard(props){
    const product =props.product;
    const cart =useContext(CartContext);
    const productQuanity = cart.getProductQuanity(product.id);
    console.log (cart.item);

    return(
        <Card>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                {productQuanity > 0 ?
                <>
                    <Form as ={Row}>
                        <Form.Label column ="true" sm ="6">In cart: {productQuanity}</Form.Label>
                        <Col sm="6">
                            <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                            <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)}className="mx-2">-</Button>
                        </Col>
                    </Form>
                    <Button variant="danger" onClick={() => cart.removeEverthingFromCart(product.id)} className="my-2">REMOVE FROM CART</Button>
                </>
                :
                <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add to Cart</Button>
                }
                
            </Card.Body>
        </Card>
    )
}

export default ProductCard;