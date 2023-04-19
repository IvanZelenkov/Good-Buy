"""
This module provides an implementation of a filter strategy to filter products by availability.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class AvailabilityStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by availability.
    """

    def __init__(self, param_value: str):
        """
        Initializes the AvailabilityStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "availability" key "true".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Filters products by clearance.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.

        Returns:
            (List[Dict[str, Any]]): A list of products that match the clearance criteria.
        """
        if not self.param_value:
            return products

        try:
            filtered_products = [product for product in products
                                 if product.get("availability") == self.param_value]
            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
