(function ($) {
    $(document).on('input propertychange', 'input[name="image_url"]', function () {
        var url = $(this).val();
        var $preview = $('#product-admin-preview');

        if (url) {
            $preview.attr('src', url).show();
        } else {
            $preview.hide();
        }
    });
})(django.jQuery);
