from typing_extensions import Required
from rest_framework import serializers
from sales.models import Profile
from django.contrib.auth.models import User

from .models import Product,SaleLog

def get_primary_key_related_model(model_class, **kwargs):
    """
    Nested serializers are a mess. https://stackoverflow.com/a/28016439/2689986
    This lets us accept ids when saving / updating instead of nested objects.
    Representation would be into an object (depending on model_class).
    """
    class PrimaryKeyNestedMixin(model_class):

        def to_internal_value(self, data):
            try:
                return model_class.Meta.model.objects.get(pk=data)
            except model_class.Meta.model.DoesNotExist:
                self.fail('does_not_exist', pk_value=data)
            except (TypeError, ValueError):
                self.fail('incorrect_type', data_type=type(data).__name__)

        def to_representation(self, data):
            return model_class.to_representation(self, data)

    return PrimaryKeyNestedMixin(**kwargs)



#USER MODEL SERIALIZERS

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('phone',)

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    sale_count = serializers.IntegerField(required=False)
    sale_total = serializers.DecimalField(max_digits=19,decimal_places=2,required=False)
    full_name = serializers.SerializerMethodField(required=False)
    class Meta:
        model = User
        fields = ('id','full_name','first_name','last_name','username', 'profile', 'date_joined','sale_count','sale_total')

    def get_full_name(self,user):
        return user.first_name +" "+ user.last_name

    def create(self, validated_data):

        # create user 
        user = User.objects.create(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'],
        )

        #remove the profile data to create a new profile
        profile_data = validated_data.pop('profile')

        # create profile
        profile = Profile.objects.create(
            user = user,
            phone = profile_data['phone'],
        )

        return user

# PRODUCT Serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("__all__")

# Sale Log  Serializers
class SaleLogSerializer(serializers.ModelSerializer):
    user = get_primary_key_related_model(UserSerializer)
    product = get_primary_key_related_model(ProductSerializer)
    class Meta: 
        model = SaleLog
        fields= ('id','date','quantity','product','total','total_currency','user')

class DbSummarySerializer(serializers.Serializer):
   userCount= serializers.IntegerField()
   saleCount= serializers.IntegerField()
   productCount = serializers.IntegerField()
   saleTotal = serializers.DecimalField(max_digits=14, decimal_places=2)
