"""
This module provides an implementation of a filter strategy to sort
products from lowest to highest price.
"""

from typing import Dict, List
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

    def filter(self, products: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """
        Sorts products from lowest to highest price.

        Args:
            products (List[Dict[str, str]]): A list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of products sorted from lowest to highest price.
        """
        try:
            # By default, sorted function sorts the elements in ascending order.
            # sorted function takes an element x from the products list and returns its price,
            # which is then used as the sorting key for sorted().
            sorted_products = sorted(products, key=lambda x: x["price"])

            return sorted_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
