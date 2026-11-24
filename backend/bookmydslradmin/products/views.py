from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from .models import Product, Category, Brand, GlobalDiscount, DurationDiscount
from .serializers import ProductSerializer, CategorySerializer, BrandSerializer, GlobalDiscountSerializer, DurationDiscountSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class GlobalDiscountViewSet(viewsets.ModelViewSet):
    queryset = GlobalDiscount.objects.all()
    serializer_class = GlobalDiscountSerializer

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'brand__name', 'category__name']

    def get_queryset(self):
        return Product.objects.filter(is_active=True)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DurationDiscountViewSet(viewsets.ReadOnlyModelViewSet):
    """Public, read-only list of active duration discount tiers. Edited in the Django admin."""
    serializer_class = DurationDiscountSerializer
    pagination_class = None
    filter_backends = []

    def get_queryset(self):
        return DurationDiscount.objects.filter(is_active=True).order_by('min_days')
