from django.urls import path
from sales import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('users/', views.userList.as_view()),
    path('users/<int:pk>/', views.userDetail.as_view()),
    path('products/',views.ProductList.as_view()),
    path('products/<int:pk>',views.ProductDetail.as_view()),
    path('salelogs/',views.SaleLogList.as_view()),
    path('salelogs/<int:pk>',views.SaleLogDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)