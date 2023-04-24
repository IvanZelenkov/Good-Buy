"""
This module provides an implementation of a filter strategy to filter products by customer rating.
"""

import os
import sys
from typing import Dict, List, Any

current_dir = os.path.dirname(os.path.realpath(__file__))
src = os.path.dirname(current_dir)
sys.path.append(src)

from strategy.FilterStrategyInterface import FilterStrategyInterface


class CustomerRatingStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by customer rating.
    """

    def __init__(self, param_value: str):
        """
        Initializes the CustomerRatingStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "rating" key "[0-5]".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Filters products by customer rating.

        Args:
            products (List[Dict[str, Any]]): A nested list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, Any]]: A list of products that match the customer rating criteria.
        """
        try:
            min_rating = float(self.param_value)
            filtered_products = [product for product in products
                                 if float(product.get("rating", 0)) >= min_rating]

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
