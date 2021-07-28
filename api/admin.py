from django.contrib import admin
from .models import Blog, Category

# Register your models here.


@admin.register(Blog)
class AdminBlog(admin.ModelAdmin):
    list_display =('name', 'date', 'author', 'category')


admin.site.register(Category)