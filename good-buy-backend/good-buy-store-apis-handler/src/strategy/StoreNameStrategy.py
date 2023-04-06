import json
from FilterStrategyInterface import FilterStrategyInterface
from typing import Dict, Any
from S3Service import S3Service


class StoreNameStrategy(FilterStrategyInterface):
    def filter(self, s3_service: S3Service, event: dict) -> Dict[str, Any]:
        """
        Retrieves a JSON object from an S3 bucket based on the given event dictionary.

        Args:
            s3_service: An instance of the S3Service class used to connect to S3.
            event: A dictionary containing key-value pair "store_name": "rouses|walmart|winn_dixie"

        Returns:
            A dictionary containing the parsed JSON data.
        """
        try:
            return json.loads(s3_service.get_s3_object(event.get("store_name")))
        except json.JSONDecodeError as error:
            raise ValueError(f"Invalid JSON data: {error}") from error
