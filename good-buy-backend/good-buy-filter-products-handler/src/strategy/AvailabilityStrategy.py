"""
This module provides an implementation of a filter strategy to filter products by availability.
"""

from typing import Dict, List
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

    def filter(self, products: List[List[Dict[str, str]]]) -> List[Dict[str, str]]:
        """
        Filters products by availability.

        Args:
            products (List[List[Dict[str, str]]]): A nested list of dictionaries
                                                   representing products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of products that match the availability criteria.
        """
        try:
            filtered_products = []
            for store_products in products:
                for product in store_products:
                    if product["availability"] == self.param_value:
                        filtered_products.append(product)

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
