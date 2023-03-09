"""
product_retrieval.py validates the various attribute values of
a specific product retrieved from the Store API.
"""
import json

# import the module in the parent directory.
from lambda_function import lambda_handler


# Tests if the ID of the first product from Store API equals 84989861.
def test_lambda_function():
    event = {
        "products-endpoint": "https://store-server-api.onrender.com/productjsons",
    }

    response = lambda_handler(event, context=object())

    # Check if a status code in response is 200
    assert response.get('statusCode') == 200

    # Check if the first product ID is 84989861
    assert json.loads(json.dumps(response["body"][0]["ID"])) == "84989861"
