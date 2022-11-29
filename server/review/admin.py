from django.contrib import admin
from .models import Review,ReviewImage

class ReviewInline(admin.TabularInline):
    model = ReviewImage

class ReviewAdmin(admin.ModelAdmin):
    inlines = [ReviewInline, ]

admin.site.register(Review,ReviewAdmin)