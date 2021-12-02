from django.http.response import Http404
from rest_framework.views import APIView
from .models import Product, User, SaleLog
from .serializers import DbSummarySerializer, ProductSerializer, SaleLogSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from django.core.serializers.json import DjangoJSONEncoder
import json

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
class userList(APIView):
    """

        Create a user or view all users

    """
    def get(self,request,format=None):
        users = User.objects.all()
        salecount = self.request.query_params.get('salecount')
        if salecount  is not None:
            users = users.annotate(sale_count=Count('salelog')).order_by("-sale_count")
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class userDetail(APIView):
    """
    Retrieve, update or delete a user.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        serializer = UserSerializer(self.get_object(pk))
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        serializer = UserSerializer(self.get_object(pk), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        self.get_object(pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# PRODUCT API

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# SaleLog API
class SaleLogList(generics.ListCreateAPIView):
    serializer_class = SaleLogSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned salelogs to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = SaleLog.objects.all()
        uid = self.request.query_params.get('uid')
        if uid is not None:
            queryset = queryset.filter(user__id=uid)
        return queryset

class SaleLogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SaleLog.objects.all()
    serializer_class = SaleLogSerializer

