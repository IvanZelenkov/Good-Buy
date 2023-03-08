import json
"""Module providingFunction printing python version."""
import sys
import os

# Getting the name of the directory where current file is present.
current = os.path.dirname(os.path.realpath(__file__))

# Getting the parent directory name where the current directory is present.
parent = os.path.dirname(current)

# Adding the parent directory to the sys.path.
sys.path.append(parent)

# import the module in the parent directory.
from lambda_function import lambda_handler


def test_lambda_function():
    event = {
        "products-endpoint": "https://store-server-api.onrender.com/productjsons",
    }

    response = lambda_handler(event, context=object())

    # Check if a status code in response is 200
    assert response.get('statusCode') == 200

    # Check if the first product ID is 84989861
    assert json.loads(json.dumps(response["body"][0]["ID"])) == "84989861"