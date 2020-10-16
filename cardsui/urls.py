from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cardsui import views

router = DefaultRouter()
router.register(r'cards', views.CardViewSet),   # add CardViewSet
router.register(r'users', views.UserViewSet)    # add UserViewSet

urlpatterns = [
    path('', include(router.urls))
]