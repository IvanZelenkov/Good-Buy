"""
This module provides an implementation of a filter strategy to sort
products from lowest to highest price.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class LowestToHighestPriceStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to sort products from lowest to highest price.
    """

    def __init__(self, param_value: str):
        """
        Initializes the LowestToHighestPriceStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "minPrice" key "true".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Sorts products from lowest to highest price.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.

        Returns:
            (List[Dict[str, Any]]): A list of products sorted from lowest to highest price.
        """
        if not self.param_value:
            return products

        try:
            # By default, sorted function sorts the elements in ascending order.
            # sorted function takes an element x from the products list and returns its price,
            # which is then used as the sorting key for sorted().
            sorted_products = sorted(products, key=lambda x: x["price"])
            return sorted_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
