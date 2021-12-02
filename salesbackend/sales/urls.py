from django.urls import path
from sales import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('',views.api_root),
    path('summary/',views.dbSummary.as_view(),name='db-summary'),
    path('users/', views.userList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.userDetail.as_view(),name='user-detail'),
    path('products/',views.ProductList.as_view(), name='product-list'),
    path('products/<int:pk>',views.ProductDetail.as_view(),name='product-detail'),
    path('salelogs/',views.SaleLogList.as_view(),name='salelog-list'),
    path('salelogs/<int:pk>',views.SaleLogDetail.as_view(),name='salelog-detail')
]

urlpatterns = format_suffix_patterns(urlpatterns)