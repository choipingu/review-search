from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('signup', views.Signup.as_view(), name='signup'),  # signup
    path('login', views.LoginView.as_view(), name='login'),  # login
    path('logout', views.Logout, name='logout'),  # logout
    path('search/<str:value>', views.UserSearch.as_view(),
         name='search'),  # usersearch
]
urlpatterns += \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
