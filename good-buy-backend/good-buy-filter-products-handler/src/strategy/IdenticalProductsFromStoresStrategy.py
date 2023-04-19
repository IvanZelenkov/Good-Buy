"""
This module provides an implementation of a filter strategy to filter products
by name in order to get identical products from different stores.
"""

from typing import Dict, List
from FilterStrategyInterface import FilterStrategyInterface


class IdenticalProductsFromStoresStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products
    by name in order to get identical products from different stores.
    """

    def __init__(self, param_value: str):
        """
        Initializes the IdenticalProductsFromStoresStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "productName" key "Any".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """
        Filters products by product name.

        Args:
            products (List[Dict[str, str]]): A list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of products whose names match.
        """
        try:
            filtered_products = [product for product in products
                                 if product.get("Name") == self.param_value]

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
