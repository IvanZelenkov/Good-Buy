"""
This module provides an implementation of a filter strategy to filter products by customer rating.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class CustomerRatingStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by customer rating.
    """

    def filter(self, products: List[Dict[str, Any]], params: Dict[str, Any]) \
            -> List[Dict[str, Any]]:
        """
        Filters products by clearance.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.
            params (Dict[str, Any]): A dictionary containing parameter "rating": "[0-5]"

        Returns:
            (List[Dict[str, Any]]): A list of products that match the customer rating criteria.
        """
        param_rating = params.get("rating")
        if not param_rating:
            return products

        try:
            min_rating = float(param_rating)
            filtered_products = [product for product in products
                                 if float(product.get("rating", 0)) >= min_rating]
            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
