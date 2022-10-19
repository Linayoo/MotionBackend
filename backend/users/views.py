from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, get_object_or_404, RetrieveAPIView, ListCreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from django.db import DatabaseError

from users.models import User, FriendRequest
from users.serializers import UserSerializer, RetrieveFollowerSerializer, RetrieveFolloweeSerializer, \
    FriendRequestSerializer


# GET & PATCH: /api/users/me/
class LoggedInUserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.request.user.id)
        return obj

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset


# api/social/followers/followers/
# GET: List of all the logged-in user’s followers
class ListLoggedInUserFollowers(RetrieveAPIView):
    serializer_class = RetrieveFollowerSerializer
    queryset = User.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.request.user.id)
        return obj

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset


# api/social/followers/following/
# GET: List of all the people the current logged-in user is following
class ListLoggedInUserFollowees(RetrieveAPIView):
    serializer_class = RetrieveFolloweeSerializer
    queryset = User.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.request.user.id)
        return obj

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset


# api/social/friends/request/int:friends_id/
# POST: Send friend request to another user
class SendFriendRequest(ListCreateAPIView):
    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(requested_by=self.request.user.id)

    # # @login_required
    def create(self, request: Request, *args, **kwargs):
        requestee_id = kwargs["user_id"]
        try:
            requestee = User.objects.get(id=requestee_id)
        except FriendRequest.DoesNotExist:
            return Response(data='This requestee id does not exist', status=status.HTTP_404_NOT_FOUND)

        try:
            if FriendRequest.objects.filter(requested_to=requestee, requested_by=self.request.user).exists():
                return Response(data="Friend request already exists!", status=status.HTTP_200_OK)
            else:
                FriendRequest(requested_to=requestee, requested_by=self.request.user).save()
                return Response(data="Success", status=status.HTTP_201_CREATED)
        except DatabaseError or ValueError:
            return Response(data="Oops, something went wrong..", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
