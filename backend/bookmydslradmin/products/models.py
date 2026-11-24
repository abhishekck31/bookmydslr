from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class GlobalDiscount(models.Model):
    offer_name = models.CharField(max_length=100)
    discount_percentage = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.offer_name} ({self.discount_percentage}%)"

    class Meta:
        verbose_name = "Global Discount"
        verbose_name_plural = "Global Discounts"

class DurationDiscount(models.Model):
    """
    Discount by rental length, e.g. 3-6 days = 10%, 7-14 days = 20%,
    15+ days = 25%. Applies to the whole rental total of an item when the
    customer picks a duration inside the range (both ends inclusive).
    """
    min_days = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text="First rental day this discount applies to (inclusive).",
    )
    max_days = models.PositiveIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(1)],
        help_text="Last rental day this discount applies to (inclusive). Leave empty for 'and above'.",
    )
    discount_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Percent off the rental total, e.g. 15 for 15%.",
    )
    label = models.CharField(
        max_length=60,
        blank=True,
        help_text="Optional name shown to customers, e.g. 'Weekly saver'.",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["min_days"]
        verbose_name = "Duration Discount"
        verbose_name_plural = "Duration Discounts"

    def __str__(self):
        upper = f"{self.max_days}" if self.max_days else "+"
        span = f"{self.min_days}-{upper}" if self.max_days else f"{self.min_days}{upper}"
        return f"{span} days: {self.discount_percentage}%"

    def clean(self):
        super().clean()
        if self.min_days and self.max_days and self.max_days < self.min_days:
            raise ValidationError({"max_days": "Must be the same as or greater than the minimum days."})
        if not self.is_active or not self.min_days:
            return
        upper = self.max_days or 10**9
        for other in DurationDiscount.objects.filter(is_active=True).exclude(pk=self.pk):
            other_upper = other.max_days or 10**9
            if self.min_days <= other_upper and other.min_days <= upper:
                raise ValidationError(
                    f"This range overlaps the active tier '{other}'. Adjust the days so each rental length has one discount."
                )


class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, related_name='products')
    price_per_day = models.IntegerField()
    image_url = models.URLField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    is_available = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"

    @property
    def final_price(self):
        """
        Logic to calculate price after applying active global discounts.
        """
        price = float(self.price_per_day)
        active_discount = GlobalDiscount.objects.filter(is_active=True).first()
        if active_discount:
            price -= (price * (float(active_discount.discount_percentage) / 100))
        return round(price, 2)

    class Meta:
        ordering = ['-created_at']
