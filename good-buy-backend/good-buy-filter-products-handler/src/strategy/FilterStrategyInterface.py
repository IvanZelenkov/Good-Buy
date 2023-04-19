"""
This module defines the abstract base class FilterStrategyInterface.
"""

from abc import ABCMeta, abstractmethod
from typing import Dict, Any, List


class FilterStrategyInterface(metaclass=ABCMeta):
    """
    Abstract base class for filtering products based on a given strategy.
    """

    @abstractmethod
    def filter(self, products: list) -> List[Dict[str, Any]]:
        """
        Filters products based on a given strategy.

        Args:
            products (list): A list of products to be filtered.

        Returns:
            (List[Dict[str, Any]]): A list of filtered products.
        """
        pass
