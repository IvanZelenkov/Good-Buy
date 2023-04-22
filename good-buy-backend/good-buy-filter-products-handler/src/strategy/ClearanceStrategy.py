"""
This module provides an implementation of a filter strategy to filter products by clearance.
"""

from typing import Dict, List
from FilterStrategyInterface import FilterStrategyInterface


class ClearanceStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by clearance.
    """

    def __init__(self, param_value: str):
        """
        Initializes the ClearanceStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "onClearance" key "true".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """
        Filters products by clearance.

        Args:
            products (List[Dict[str, str]]): A list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of products that match the clearance criteria.
        """
        try:
            filtered_products = [product for product in products
                                 if product.get("on_clearance") == bool(self.param_value)]

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
