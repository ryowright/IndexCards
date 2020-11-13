from rest_framework.routers import DefaultRouter
from .views import CardSetViewSet, CardViewSet

router = DefaultRouter()
router.register(r'cardsets', CardSetViewSet, 'cardsets')
router.register(r'cards', CardViewSet, 'cards')

urlpatterns = router.urls