"""
S3Service module.

This module defines a service class for interacting with S3.
"""

import os
from botocore.exceptions import ClientError


class S3Service:
    """A service class for interacting with S3."""

    def __init__(self, s3):
        """Initialize the S3Service with an S3 client and environment variables."""
        self.s3 = s3
        self.bucket_name = os.getenv("S3_BUCKET_NAME")
        self.folder_name = os.getenv("S3_JSON_FOLDER_NAME")

    def get_s3_object(self, store_name: str) -> str:
        """
        Retrieve a JSON object from S3.

        Args:
            store_name (str): The name of the store.

        Returns:
            str: The JSON object.
        """
        try:
            key = f"{self.folder_name}/{store_name}_products.json"
            s3_object = self.s3.Object(self.bucket_name, key)
            return s3_object.get()["Body"].read().decode("utf-8")
        except ClientError as error:
            if error.response["Error"]["Code"] == "NoSuchKey":
                raise ValueError(f"Store {store_name} not found in "
                                 f"S3 bucket {self.bucket_name}.") from error
            raise RuntimeError(f"Failed to retrieve S3 object: {error}") from error
