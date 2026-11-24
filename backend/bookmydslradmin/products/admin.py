from django.contrib import admin
from django.utils.safestring import mark_safe
# pyrefly: ignore [missing-import]
from unfold.admin import ModelAdmin
from .models import Product, Category, Brand, GlobalDiscount, DurationDiscount, WhatsAppClick

@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Brand)
class BrandAdmin(ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(GlobalDiscount)
class GlobalDiscountAdmin(ModelAdmin):
    list_display = ('offer_name', 'discount_percentage', 'is_active', 'created_at')
    list_editable = ('is_active',)

@admin.register(DurationDiscount)
class DurationDiscountAdmin(ModelAdmin):
    list_display = ('__str__', 'min_days', 'max_days', 'discount_percentage', 'label', 'is_active')
    list_display_links = ('__str__',)
    list_editable = ('discount_percentage', 'is_active')
    ordering = ('min_days',)
    fieldsets = (
        ('Rental length', {
            'fields': ('min_days', 'max_days'),
            'description': 'Both ends are inclusive. Example: 1 and 10 means rentals of 1 to 10 days. Leave the maximum empty for "and above".',
        }),
        ('Discount', {
            'fields': ('discount_percentage', 'label', 'is_active'),
        }),
    )

@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ('image_thumbnail', 'name', 'brand', 'category', 'price_per_day', 'is_available', 'is_active')
    search_fields = ('name', 'brand__name', 'category__name')
    list_filter = ('category', 'brand', 'is_available', 'is_active')
    list_editable = ('is_available', 'is_active')
    readonly_fields = ('created_at', 'image_preview')
    ordering = ('-created_at',)

    def image_preview(self, obj):
        if obj.image_url:
            return mark_safe(f'<img src="{obj.image_url}" style="max-height: 200px; border-radius: 8px; border: 1px solid #ddd;" id="product-admin-preview" />')
        return mark_safe('<img src="" style="max-height: 200px; border-radius: 8px; border: 1px solid #ddd; display: none;" id="product-admin-preview" />')
    image_preview.short_description = "Preview"

    def image_thumbnail(self, obj):
        if obj.image_url:
            return mark_safe(f'<img src="{obj.image_url}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />')
        return "No Image"
    image_thumbnail.short_description = "IMG"

    fieldsets = (
        ('Header Information', {
            'fields': ('name', 'brand', 'category')
        }),
        ('Imagery', {
            'fields': ('image_url', 'image_preview'),
            'description': 'Paste an image URL to see a preview below. (Preview refreshes on save)'
        }),
        ('Pricing & Status', {
            'fields': ('price_per_day', 'is_available', 'is_active', 'created_at')
        }),
        ('Product Description', {
            'fields': ('description',),
        }),
    )

    class Media:
        js = (
            'js/admin_image_preview.js',
        )


@admin.register(WhatsAppClick)
class WhatsAppClickAdmin(ModelAdmin):
    list_display = ('event_type', 'product', 'product_names_short', 'cart_total_display', 'created_at')
    list_filter = ('event_type', 'created_at')
    search_fields = ('product__name', 'product_names')
    readonly_fields = ('event_type', 'product', 'product_names', 'cart_total', 'page_url', 'created_at')
    ordering = ('-created_at',)

    def has_add_permission(self, request):
        return False   # clicks come from the frontend only

    def has_change_permission(self, request, obj=None):
        return False

    def product_names_short(self, obj):
        txt = obj.product_names
        return (txt[:60] + "…") if len(txt) > 60 else txt
    product_names_short.short_description = "Products"

    def cart_total_display(self, obj):
        if obj.cart_total is not None:
            return f"₹{obj.cart_total:,}"
        return "—"
    cart_total_display.short_description = "Cart ₹"
