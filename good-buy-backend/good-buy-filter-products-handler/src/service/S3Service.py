"""
S3Service module.

This module defines a service class for interacting with Amazon S3 service.
"""

import os
import boto3
from botocore.exceptions import ClientError, NoCredentialsError


class S3Service:
    """
    A service class for interacting with Amazon S3 service.
    """

    def __init__(self, s3_client, s3_bucket_name, s3_folder_name):
        """
        Initialize the S3Service with an S3 client and environment variables.
        """
        self.s3_client = s3_client
        self.s3_bucket_name = s3_bucket_name
        self.s3_folder_name = s3_folder_name

    @staticmethod
    def create_s3_client() -> boto3.client:
        """
        Create an S3 client object.

        Returns:
            botocore.client.S3: An S3 client object.
        """
        try:
            s3_client = boto3.resource(
                "s3",
                aws_access_key_id=os.getenv("ACCESS_KEY"),
                aws_secret_access_key=os.getenv("SECRET_ACCESS_KEY")
            )
            return s3_client
        except NoCredentialsError as error:
            raise RuntimeError(f"Failed to authenticate with AWS: {error}") from error

    def get_s3_object(self, store_name: str) -> str:
        """
        Retrieve a JSON object from S3.

        Args:
            store_name (str): The name of the store.

        Returns:
            str: The JSON object.
        """
        try:
            key = f"{self.s3_folder_name}/{store_name}_products.json"
            s3_object = self.s3_client.Object(self.s3_bucket_name, key)
            return s3_object.get()["Body"].read().decode("utf-8")
        except ClientError as error:
            if error.response["Error"]["Code"] == "NoSuchKey":
                raise ValueError(f"Store {store_name} not found in "
                                 f"S3 bucket {self.s3_bucket_name}.") from error
            raise RuntimeError(f"Failed to retrieve S3 object: {error}") from error
