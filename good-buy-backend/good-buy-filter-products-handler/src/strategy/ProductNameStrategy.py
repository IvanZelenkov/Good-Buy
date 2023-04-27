"""
This module provides an implementation of a filter strategy to filter products
by name in order to get identical products from different stores.
"""
import difflib
import os
import sys
from typing import Dict, List, Any

current_dir = os.path.dirname(os.path.realpath(__file__))
src = os.path.dirname(current_dir)
sys.path.append(src)

from strategy.FilterStrategyInterface import FilterStrategyInterface


class ProductNameStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products
    by name in order to get identical products from different stores.
    """

    def __init__(self, param_value: str):
        """
        Initializes the ProductNameStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "productName" key "Any".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Filters products by product name.

        Args:
            products (List[Dict[str, Any]]): A list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, Any]]: A list of products whose names match.
        """
        try:
            filtered_products = []
            for product in products:
                name = product["Name"].lower()
                if self.param_value in name or difflib.get_close_matches(self.param_value, [name]):
                    filtered_products.append(product)

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
