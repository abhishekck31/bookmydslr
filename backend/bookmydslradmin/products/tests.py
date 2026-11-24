from django.test import TestCase

# Create your tests here.


from decimal import Decimal

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase

from .models import DurationDiscount


class DurationDiscountTests(APITestCase):
    def test_overlapping_active_tiers_are_rejected(self):
        DurationDiscount.objects.create(min_days=1, max_days=10, discount_percentage=Decimal("10"))
        clash = DurationDiscount(min_days=10, max_days=15, discount_percentage=Decimal("15"))
        with self.assertRaises(ValidationError):
            clash.full_clean()

    def test_adjacent_tiers_and_open_ended_tier_are_allowed(self):
        DurationDiscount.objects.create(min_days=1, max_days=10, discount_percentage=Decimal("10"))
        DurationDiscount(min_days=11, max_days=15, discount_percentage=Decimal("15")).full_clean()
        DurationDiscount(min_days=16, max_days=None, discount_percentage=Decimal("20")).full_clean()

    def test_max_below_min_is_rejected(self):
        with self.assertRaises(ValidationError):
            DurationDiscount(min_days=5, max_days=3, discount_percentage=Decimal("5")).full_clean()

    def test_inactive_tier_may_overlap(self):
        DurationDiscount.objects.create(min_days=1, max_days=10, discount_percentage=Decimal("10"))
        DurationDiscount(min_days=5, max_days=8, discount_percentage=Decimal("50"), is_active=False).full_clean()

    def test_api_lists_only_active_tiers_in_order(self):
        DurationDiscount.objects.create(min_days=11, max_days=None, discount_percentage=Decimal("20"))
        DurationDiscount.objects.create(min_days=3, max_days=10, discount_percentage=Decimal("10"), label="Weekly")
        DurationDiscount.objects.create(min_days=1, max_days=2, discount_percentage=Decimal("5"), is_active=False)
        res = self.client.get("/api/duration-discounts/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(
            res.json(),
            [
                {"id": res.json()[0]["id"], "min_days": 3, "max_days": 10, "discount_percentage": "10.00", "label": "Weekly"},
                {"id": res.json()[1]["id"], "min_days": 11, "max_days": None, "discount_percentage": "20.00", "label": ""},
            ],
        )

    def test_api_is_read_only(self):
        res = self.client.post("/api/duration-discounts/", {"min_days": 1, "discount_percentage": "99"}, format="json")
        self.assertEqual(res.status_code, 405)
