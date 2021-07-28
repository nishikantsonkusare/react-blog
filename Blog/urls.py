from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from api import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='Home'),
    # re_path(r'.*', views.home),
    path('postdata/', views.postdata, name='Post Data'),
    path('category-wise/<category>/', views.categoryposts, name='Category Post Data'),
    path('post/<int:id>/', views.singlepost, name='Single Post Data'),
    path('post/savecomment/', views.comment, name='Comment save'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
