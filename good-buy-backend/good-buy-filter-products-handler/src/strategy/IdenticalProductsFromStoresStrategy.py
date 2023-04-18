"""
This module provides an implementation of a filter strategy to filter products
by name in order to get identical products from different stores.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class IdenticalProductsFromStoresStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products
    by name in order to get identical products from different stores.
    """

    def filter(self, products: List[Dict[str, Any]], params: Dict[str, Any]) \
            -> List[Dict[str, Any]]:
        """
        Filters products by name.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.
            params (Dict[str, Any]): A dictionary containing parameter "productName": "X"

        Returns:
            (List[Dict[str, Any]]): A list of products whose names match.
        """
        param_product_name = params.get("productName")
        if not param_product_name:
            return products

        try:
            filtered_products = [product for product in products
                                 if product.get("Name") == param_product_name]
            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
