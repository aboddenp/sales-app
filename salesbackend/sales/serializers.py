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
    class Meta:
        model = User
        fields = ('id','first_name','last_name','username', 'profile', 'date_joined','sale_count')


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

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ("__all__")

# Sale Log  Serializers
class SaleLogSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    product = serializers.HyperlinkedRelatedField(view_name='product-detail', read_only=True)
    class Meta: 
        model = SaleLog
        fields= ('date','quantity','product','total','total_currency','user')