from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, BrandViewSet, GlobalDiscountViewSet, DurationDiscountViewSet, WhatsAppClickViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'brands', BrandViewSet, basename='brand')
router.register(r'discounts', GlobalDiscountViewSet, basename='discount')
router.register(r'duration-discounts', DurationDiscountViewSet, basename='duration-discount')
router.register(r'whatsapp-clicks', WhatsAppClickViewSet, basename='whatsapp-click')

urlpatterns = [
    path('', include(router.urls)),
]
