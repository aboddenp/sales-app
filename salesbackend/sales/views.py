from django.http.response import Http404
from rest_framework.views import APIView
from .models import Product, User, SaleLog
from .serializers import DbSummarySerializer, ProductSerializer, SaleLogSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from django.core.serializers.json import DjangoJSONEncoder
import json
from djmoney.money import Money

from django.http import HttpResponse
from django.db.models import Count,Sum

# ROOT API
@api_view(['GET'])
def api_root(request,format=None):
    return Response(
        {
            'users':reverse('user-list',request=request,format=format),
            'products':reverse('product-list',request=request,format=format),
            'saleslogs':reverse('salelog-list',request=request,format=format),
            'apiSummary':reverse('db-summary',request=request,format=format),
        }
    )

# ROOT API
class dbSummary(APIView):

    def get(self, request):
        # Calculate aggregate values 
        summaryData = {}
        userCount = User.objects.aggregate(userCount = Count("id"))
        productCount = Product.objects.aggregate(productCount = Count("id"))
        saleCount = SaleLog.objects.aggregate(saleCount = Count("id"))
        saleTotal = SaleLog.objects.aggregate(saleTotal = Sum('total'))
        summaryData.update(**userCount,**productCount,**saleCount,**saleTotal)
        return Response(DbSummarySerializer(summaryData).data)

# USER API
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.annotate(sale_count=Count('salelog'), sale_total=Sum('salelog__total')).order_by("-sale_count")
  

# PRODUCT API
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# SaleLog API
class SaleLogViewSet(viewsets.ModelViewSet):
    serializer_class = SaleLogSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned salelogs to a given user,
        by filtering against a `uid` query parameter in the URL.
        """
        queryset = SaleLog.objects.all()
        uid = self.request.query_params.get('uid')
        if uid is not None:
            queryset = queryset.filter(user__id=uid)
        return queryset