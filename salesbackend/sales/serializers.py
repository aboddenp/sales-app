from rest_framework import serializers
from sales.models import Profile
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('phone',)

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    profile = serializers.PrimaryKeyRelatedField()
    class Meta:
        model = User
        fields = ('first_name','last_name','username', 'profile', 'date_joined',)

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