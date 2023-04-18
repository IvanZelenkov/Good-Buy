"""
This module provides an implementation of a filter strategy to filter products by clearance.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class ClearanceStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by clearance.
    """

    def filter(self, products: List[Dict[str, Any]], params: Dict[str, Any]) \
            -> List[Dict[str, Any]]:
        """
        Filters products by clearance.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.
            params (Dict[str, Any]): A dictionary containing parameter "onClearance": "true|false"

        Returns:
            (List[Dict[str, Any]]): A list of products that match the clearance criteria.
        """
        param_on_clearance = params.get("onClearance")
        if not param_on_clearance:
            return products

        try:
            filtered_products = [product for product in products
                                 if product.get("on_clearance") == param_on_clearance]
            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
