"""
Lambda_function script, handles lambdas
This docstring is needed because we love pylint <3
"""
import json


def lambda_handler(event, context):
    """
    This is a module docstring
    This function basically does nothing at the moment
    it prints that it has been run and its parameters
    then returns a statuscode and dumps hello from lambda into a json file
    """
    print("Hello from Lambda! " + event + context)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
