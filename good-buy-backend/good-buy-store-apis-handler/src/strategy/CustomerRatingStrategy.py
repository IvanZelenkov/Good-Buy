"""
This module provides an implementation of a filter strategy to filter products by customer rating.
"""

import json
from typing import List, Dict
from FilterStrategyInterface import FilterStrategyInterface


class CustomerRatingStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by customer rating.
    """

    def filter(self, s3_service, params: Dict) -> List:
        """
        Filters products by customer rating.

        Args:
            s3_service: An instance of the S3Service class is used to connect to the S3 service.
            params: A dictionary containing the filter parameters.

        Returns:
            TODO
        """
        # TODO
        try:
            return json.loads(s3_service.get_s3_object(params.get("store_name")))
        except json.JSONDecodeError as error:
            raise ValueError(f"Invalid JSON data: {error}") from error
