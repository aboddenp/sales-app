from django.urls import path
from rest_framework import urlpatterns
from sales import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers


router = routers.SimpleRouter()
router.register(r'products',views.ProductViewSet)
router.register(r'salelogs',views.SaleLogViewSet, basename="salelog")
router.register(r'users',views.UserViewSet, basename="user")

urlpatterns = router.urls + [path('',views.api_root),path('summary/',views.dbSummary.as_view(),name='db-summary')]
