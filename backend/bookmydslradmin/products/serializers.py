# pyrefly: ignore [missing-import]
from rest_framework import serializers
from .models import Product, Category, Brand, GlobalDiscount, DurationDiscount

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class GlobalDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalDiscount
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source='category', read_only=True)
    brand_detail = BrandSerializer(source='brand', read_only=True)
    final_price = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'category_detail', 'brand', 'brand_detail',
            'price_per_day', 'final_price', 'image_url', 'description', 
            'is_available', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class DurationDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = DurationDiscount
        fields = ['id', 'min_days', 'max_days', 'discount_percentage', 'label']
