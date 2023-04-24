"""
S3Service module.

This module defines a service class for interacting with S3.
"""

from botocore.exceptions import ClientError


class S3Service:
    """
    A service class for interacting with S3.
    """

    def __init__(self, s3_client, s3_bucket_name, s3_folder_name):
        """
        Initialize the S3Service with an S3 client and environment variables.
        """
        self.s3_client = s3_client
        self.s3_bucket_name = s3_bucket_name
        self.s3_folder_name = s3_folder_name

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
