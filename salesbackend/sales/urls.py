from django.urls import path
from sales import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('users/', views.userList.as_view()),
    path('users/<int:pk>/', views.userDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)