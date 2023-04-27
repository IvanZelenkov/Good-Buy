import os
import sys
import unittest
import boto3

current_dir = os.path.dirname(os.path.realpath(__file__))
src = os.path.dirname(current_dir)
sys.path.append(src)

from service.ProductService import ProductService
from service.S3Service import S3Service
from strategy.FilterStrategyInterface import FilterStrategyInterface
from strategy.ProductNameStrategy import ProductNameStrategy
from strategy.StoreNameStrategy import StoreNameStrategy
from strategy.CustomerRatingStrategy import CustomerRatingStrategy
from strategy.PriceRangeStrategy import PriceRangeStrategy
from strategy.PriceStrategy import PriceStrategy
from strategy.OnSaleStrategy import OnSaleStrategy
from strategy.ClearanceStrategy import ClearanceStrategy
from strategy.AvailabilityStrategy import AvailabilityStrategy


class TestProductService(unittest.TestCase):

    def setUp(self):
        s3_client = boto3.resource("s3")
        s3_bucket_name = "good-buy-json-data"
        s3_folder_name = "products"
        s3_service = S3Service(s3_client, s3_bucket_name, s3_folder_name)
        self.product_service = ProductService(s3_service)

    def assertFilteredProducts(self, filter_strategies):
        self.assertIsInstance(filter_strategies, list)
        self.assertTrue(all(isinstance(strategy, FilterStrategyInterface) for strategy in filter_strategies))

        filtered_products = self.product_service.filter(filter_strategies)

        self.assertIsInstance(filtered_products, list)

        for filtered_product in filtered_products:
            self.assertIsInstance(filtered_product, dict)
            self.assertFilteredProductFields(filtered_product)

    def assertFilteredProductFields(self, product):
        self.assertIn("ID", product)
        self.assertIsInstance(product["ID"], str)

        self.assertIn("Name", product)
        self.assertIsInstance(product["Name"], str)

        self.assertIn("image_url", product)
        self.assertIsInstance(product["image_url"], str)

        self.assertIn("category", product)
        self.assertIsInstance(product["category"], str)

        self.assertIn("availability", product)
        self.assertIsInstance(product["availability"], bool)

        self.assertIn("on_clearance", product)
        self.assertIsInstance(product["on_clearance"], bool)

        self.assertIn("on_sale", product)
        self.assertIsInstance(product["on_sale"], bool)

        self.assertIn("brand", product)
        self.assertIsInstance(product["brand"], str)

        self.assertIn("price", product)
        self.assertIsInstance(product["price"], int)

        self.assertIn("store_link", product)
        self.assertIsInstance(product["store_link"], str)

        self.assertIn("store_location", product)
        self.assertIsInstance(product["store_location"], str)

        self.assertIn("rating", product)
        self.assertIsInstance(product["rating"], float)

    def test_get_all_products(self):
        products = self.product_service.get_all_products()
        self.assertIsInstance(products, list)
        for product in products:
            self.assertIsInstance(product, dict)
            self.assertFilteredProductFields(product)

    def test_all_filter_strategies(self):
        filter_strategies = [
            ProductNameStrategy("Twix"),
            StoreNameStrategy("Rouses"),
            CustomerRatingStrategy(1),
            PriceRangeStrategy("1-2"),
            PriceStrategy("true"),
            OnSaleStrategy("true"),
            ClearanceStrategy("true"),
            AvailabilityStrategy("true")
        ]

        self.assertFilteredProducts(filter_strategies)

    def test_identical_products_from_stores_filter_strategy(self):
        self.assertFilteredProducts([ProductNameStrategy("Twix")])
        self.assertFilteredProducts([ProductNameStrategy("Snickers")])

    def test_store_name_filter_strategy(self):
        self.assertFilteredProducts([StoreNameStrategy("Rouses")])
        self.assertFilteredProducts([StoreNameStrategy("Walmart")])
        self.assertFilteredProducts([StoreNameStrategy("Winn-Dixie")])

    def test_customer_rating_filter_strategy(self):
        self.assertFilteredProducts([CustomerRatingStrategy(1)])
        self.assertFilteredProducts([CustomerRatingStrategy(2)])
        self.assertFilteredProducts([CustomerRatingStrategy(3)])
        self.assertFilteredProducts([CustomerRatingStrategy(4)])
        self.assertFilteredProducts([CustomerRatingStrategy(5)])

    def test_price_range_filter_strategy(self):
        self.assertFilteredProducts([PriceRangeStrategy("1-2")])
        self.assertFilteredProducts([PriceRangeStrategy("2-3")])
        self.assertFilteredProducts([PriceRangeStrategy("3-4")])
        self.assertFilteredProducts([PriceRangeStrategy("1-4")])

    def test_price_strategy_filter_strategy(self):
        self.assertFilteredProducts([PriceStrategy("true")])
        self.assertFilteredProducts([PriceStrategy("false")])

    def test_on_sale_filter_strategy_returns(self):
        self.assertFilteredProducts([OnSaleStrategy("true")])
        self.assertFilteredProducts([OnSaleStrategy("false")])

    def test_on_clearance_filter_strategy(self):
        self.assertFilteredProducts([ClearanceStrategy("true")])
        self.assertFilteredProducts([ClearanceStrategy("false")])

    def test_availability_filter_strategy(self):
        self.assertFilteredProducts([AvailabilityStrategy("true")])
        self.assertFilteredProducts([AvailabilityStrategy("false")])


if __name__ == '__main__':
    unittest.main()
