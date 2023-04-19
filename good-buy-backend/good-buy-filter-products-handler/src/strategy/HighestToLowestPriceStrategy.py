"""
This module provides an implementation of a filter strategy to sort
products from highest to lowest price.
"""

from typing import Dict, List
from FilterStrategyInterface import FilterStrategyInterface


class HighestToLowestPriceStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to sort products from highest to lowest price.
    """

    def __init__(self, param_value: str):
        """
        Initializes the HighestToLowestPriceStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "maxPrice" key "true".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """
        Sorts products from highest to lowest price.

        Args:
            products (List[Dict[str, str]]): A list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of products sorted from highest to lowest price.
        """
        try:
            # By default, sorted function sorts the elements in ascending order.
            # sorted function takes an element x from the products list and returns its price,
            # which is then used as the sorting key for sorted().
            # reverse=True argument is used to sort in reverse order.
            sorted_products = sorted(products, key=lambda x: x["price"], reverse=True)

            return sorted_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
