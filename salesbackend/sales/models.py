from functools import _Descriptor
from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE, SET_NULL 
from django.db.models.signals import post_save
from django.dispatch import receiver
from djmoney.contrib.django_rest_framework import MoneyField

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    phone = models.TextField()

class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(null=True)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD')

class SaleLog(models.Model):
    date = models.DateField(auto_now=True)
    quantity = models.IntegerField()
    product = models.ForeignKey(Product,null=True, on_delete=SET_NULL)
    user = models.ForeignKey(on_delete=CASCADE)
