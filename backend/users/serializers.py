from rest_framework import serializers

from users.models import User, FriendRequest


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["id", "last_login", "is_superuser", "is_staff", "is_active", "date_joined", "created", "updated"]


class RetrieveFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['followers']


class RetrieveFolloweeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['following']


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'


class FriendRequestDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        exclude = ['id', 'requested_to']
