"""
StoreApiInterface module: provides an abstract interface for interacting with store APIs.
"""

from abc import ABCMeta, abstractmethod


class StoreApiInterface(metaclass=ABCMeta):
    """An abstract interface for interacting with store APIs."""

    @abstractmethod
    def get_all_products(self) -> dict:
        """Return all products from the store."""
        pass

    @abstractmethod
    def get_product_by_id_and_store_name(self) -> dict:
        """Return the product with the given ID from the given store."""
        pass

    @abstractmethod
    def get_identical_products_from_stores(self) -> dict:
        """Return a list of identical products from all stores."""
        pass
