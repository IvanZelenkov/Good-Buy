"""
This module provides an implementation of a filter strategy to filter products by store name.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class StoreNameStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by store name.
    """

    def filter(self, products: List[Dict[str, Any]], params: Dict[str, Any]) \
            -> List[Dict[str, Any]]:
        """
        Filters products by store name.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.
            params (Dict[str, Any]): A dictionary containing
                parameter "storeName": "rouses|walmart|winn_dixie"

        Returns:
            (List[Dict[str, Any]]): A list of products that match the store name criteria.
        """
        param_store_name = params.get("storeName")
        if not param_store_name:
            return products

        try:
            filtered_products = [product for product in products
                                 if product.get("store_name") == param_store_name]
            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
