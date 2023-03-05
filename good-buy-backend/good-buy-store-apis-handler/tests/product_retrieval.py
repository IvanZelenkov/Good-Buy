import json
import sys

sys.path.append('..')

from lambda_function import lambda_handler


def test_lambda_function():
    event = {
        "products-endpoint": "https://good-buy-products.herokuapp.com/productjsons",
    }

    response = lambda_handler(event, context=object())

    # should get a 200 response
    assert response.get('statusCode') == 200
    # should get a response body that isn't empty
    assert json.loads(json.dumps(response["body"][0]["ID"])) == "84989861"
