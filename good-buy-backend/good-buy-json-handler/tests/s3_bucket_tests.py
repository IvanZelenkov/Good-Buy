import boto3
import os
import pytest
from moto import mock_s3
from lambda_function import lambda_handler


@pytest.fixture
def s3_client():
    with mock_s3():
        yield boto3.client('s3', region_name='us-east-1')


@pytest.fixture
def s3_bucket(s3_client):
    bucket_name = 'good-buy-json-data-test'
    s3_client.create_bucket(Bucket=bucket_name)
    yield bucket_name
    s3_client.delete_bucket(Bucket=bucket_name)


@pytest.fixture
def s3_object(s3_client, s3_bucket):
    key = 'products/walmart_products.json'
    s3_client.put_object(Bucket=s3_bucket, Key=key, Body=
    """{"productjsons": [
            {
                "ID": "42544113",
                "Name": "Ring Pop",
                "image_url": "unique_url",
                "color": "N/A",
                "store_name": "Walmart",
                "price": "4.8",
                "brand": "N/A",
                "store_link": "https://www.walmart.com/",
                "store_location": "8101 W Judge Perez Dr, Chalmette",
                "rating": "3.0"
            }
        ]
    }
    """)
    yield key
    s3_client.delete_object(Bucket=s3_bucket, Key=key)


def test_lambda_handler_returns_correct_body(s3_client, s3_bucket, s3_object):
    event = {'store_name': 'walmart'}
    os.environ['S3_BUCKET_NAME'] = s3_bucket

    response = lambda_handler(event, {})

    assert response['statusCode'] == 200
    assert response['body'] == {
        "productjsons": [
            {
                "ID": "42544113",
                "Name": "Ring Pop",
                "image_url": "unique_url",
                "color": "N/A",
                "store_name": "Walmart",
                "price": "4.8",
                "brand": "N/A",
                "store_link": "https://www.walmart.com/",
                "store_location": "8101 W Judge Perez Dr, Chalmette",
                "rating": "3.0"
            }
        ]
    }


def test_lambda_handler_returns_error_for_missing_store_name(s3_client, s3_bucket, s3_object):
    event = {}
    os.environ['S3_BUCKET_NAME'] = s3_bucket

    with pytest.raises(KeyError):
        lambda_handler(event, {})
