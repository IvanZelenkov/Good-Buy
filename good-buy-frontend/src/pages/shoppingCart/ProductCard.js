import { Card, Button, Form, Col,Row } from "react-bootstrap";

function ProductCard(props){
    const product =props.product;
    return(
        <Card>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;