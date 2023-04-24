"""
This module provides an implementation of a filter strategy to filter products by store name.
"""

import os
import sys
from typing import Dict, List, Any

current_dir = os.path.dirname(os.path.realpath(__file__))
src = os.path.dirname(current_dir)
sys.path.append(src)

from strategy.FilterStrategyInterface import FilterStrategyInterface


class StoreNameStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by store name.
    """

    def __init__(self, param_value: str):
        """
        Initializes the StoreNameStrategy with the given param value.

        Args:
            param_value: (str): A string containing the value of the "storeName"
                                key "rouses|walmart|winn_dixie". If comma-separated
                                values are received that means that multiple parameter
                                values have been passed.
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Filters products by store name.

        Args:
            products (List[Dict[str, Any]]): A list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, Any]]: A list of products that match the store name criteria.
        """
        try:
            filtered_products = [product for product in products
                                 if product.get("store_name") in self.param_value]

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
