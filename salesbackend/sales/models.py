from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE, SET_NULL 
from django.db.models.signals import post_save
from djmoney.models.fields import MoneyField
from djmoney.money import Money

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    phone = models.TextField()

class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(null=True)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', default=Money(0,'USD'))

class SaleLog(models.Model):
    date = models.DateField(auto_now=True)
    quantity = models.IntegerField()
    product = models.ForeignKey(Product,null=True, on_delete=SET_NULL)
    user = models.ForeignKey(User, on_delete=CASCADE)
    total = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', default=Money(0,'USD'))
    
    def save(self,*args, **kwargs):
        product_price = self.product.price
        self.total  = (Money(self.quantity * product_price.amount,'USD')) 
        super(SaleLog, self).save(*args, **kwargs)

    def __str__(self):
        return f" {self.user.username} {self.product.name} {self.total}"
