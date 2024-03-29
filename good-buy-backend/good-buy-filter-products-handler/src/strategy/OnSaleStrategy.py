"""
This module provides an implementation of a filter strategy to filter products by sale.
"""

import os
import sys
from typing import Dict, List, Any

current_dir = os.path.dirname(os.path.realpath(__file__))
src = os.path.dirname(current_dir)
sys.path.append(src)

from strategy.FilterStrategyInterface import FilterStrategyInterface


class OnSaleStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by sale.
    """

    def __init__(self, param_value: str):
        """
        Initializes the OnSaleStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "onSale" key "true".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Filters products by clearance.

        Args:
            products (List[Dict[str, Any]]): A list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, Any]]: A list of products that match the clearance criteria.
        """
        try:
            on_sale = str(self.param_value).lower() == "true"

            filtered_products = [product for product in products
                                 if product.get("on_sale") == on_sale]

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
