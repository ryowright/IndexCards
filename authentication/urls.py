from django.urls import path, include
from knox import views as knox_views
from authentication.views import LoginView, UserAPI, RegisterAPI

urlpatterns = [
    path(r'register/', RegisterAPI.as_view(), name='register_api'),
    path(r'login/', LoginView.as_view(), name='knox_login'),
    path(r'logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path(r'logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path(r'user/', UserAPI.as_view(), name='user_api')
]