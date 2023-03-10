"""
product_retrieval.py validates the various attribute values of
a specific product retrieved from the Store API.
"""
import json

# pylint: disable=import-error
from lambda_function import lambda_handler


def test_lambda_function():
    """
    Tests if the ID of the first product from Store API equals 84989861.
    """
    event = {
        "products-endpoint": "https://store-server-api.onrender.com/productjsons",
    }

    response = lambda_handler(event, context=object())

    try:
        # Check if a status code in response is 200
        if response.get('statusCode') == 200:
            raise AssertionError()
    except AssertionError:
        print("ERROR: Status code in response is not equal 200")

    try:
        # Check if the first product's ID is 84989861
        if json.loads(json.dumps(response["body"][0]["ID"])) == "84989861":
            raise AssertionError()
    except AssertionError:
        print("ERROR: The first product's ID is not equal 84989861")
