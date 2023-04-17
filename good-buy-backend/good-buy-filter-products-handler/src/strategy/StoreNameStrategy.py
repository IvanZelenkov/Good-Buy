"""
This module provides an implementation of a filter strategy to filter products by store name.
"""

import json
from typing import Dict, Any
from FilterStrategyInterface import FilterStrategyInterface
from S3Service import S3Service


class StoreNameStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by store name.
    """
    def filter(self, s3_service: S3Service, params: dict) -> Dict[str, Any]:
        """
        Filters products by store name.

        Args:
            s3_service: An instance of the S3Service class is used to connect to the S3 service.
            params: A dictionary containing parameter "store_name": "rouses|walmart|winn_dixie"

        Returns:
            A list of products that match the store name criteria.
        """
        try:
            return json.loads(s3_service.get_s3_object(params.get("store_name")))
        except json.JSONDecodeError as error:
            raise ValueError(f"Invalid JSON data: {error}") from error
