"""
This module provides an implementation of a filter strategy to sort
products from highest to lowest price.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class MaxPriceStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to sort products from highest to lowest price.
    """

    def filter(self, products: List[Dict[str, Any]], params: Dict[str, Any]) \
            -> List[Dict[str, Any]]:
        """
        Sorts products from highest to lowest price.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.
            params (Dict[str, Any]): A dictionary containing parameter "maxPrice": "true"

        Returns:
            (List[Dict[str, Any]]): A list of products sorted from highest to lowest price.
        """
        if "maxPrice" not in params or params["maxPrice"] != "true":
            return products

        try:
            # By default, sorted function sorts the elements in ascending order.
            # sorted function takes an element x from the products list and returns its price,
            # which is then used as the sorting key for sorted().
            # reverse=True argument is used to sort in reverse order.
            sorted_products = sorted(products, key=lambda x: x["price"], reverse=True)
            return sorted_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
