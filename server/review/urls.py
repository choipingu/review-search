from django.urls import path
from . import views

urlpatterns = [
    path('search/<str:market>', views.Search.as_view(), name='search'),  # search
    path('post', views.ReviewPostSet.as_view(
        {'post': 'create'}), name='post'),  # post
]
