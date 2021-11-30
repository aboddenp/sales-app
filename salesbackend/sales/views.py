from django.http.response import Http404
from rest_framework.views import APIView
from .models import Product, User, SaleLog
from .serializers import ProductSerializer, SaleLogSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from rest_framework import generics

# USER API
class userList(APIView):
    """

        Create a user or view all users

    """
    def get(self,request,format=None):
        users = User.objects.all()
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
    queryset = SaleLog.objects.all()
    serializer_class = SaleLogSerializer
class SaleLogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SaleLog.objects.all()
    serializer_class = SaleLogSerializer
