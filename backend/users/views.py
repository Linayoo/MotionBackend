from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, get_object_or_404, RetrieveAPIView, ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from django.db import DatabaseError

from users.models import User, FriendRequest
from users.permissions import IsReceiver
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


# api/social/friends/requests/<int:friend_request_id>/
# GET: Get details of a friend request
# PATCH: Accept or Reject an open friend request
# DELETE: Delete a friend request
class FriendRequestDetailsAndAccept(RetrieveUpdateDestroyAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    lookup_field = "id"
    permission_classes = [IsReceiver]

    # def patch(self, request, *args, **kwargs):
    #     if request.data.get("friend_request_status") == "Accepted":
    #         friend_request_id = kwargs["id"]
    #         friend_request = FriendRequest.objects.get(id=friend_request_id)
    #         requestee = friend_request.requested_to
    #         requester = friend_request.requested_by
    #         requestee.friends.add(requester)
    #         requester.friends.add(requestee)
    #         return Response(data="friend request accepted", status=status.HTTP_200_OK)
    #     else:
    #         return Response(data="friend request not accepted", status=status.HTTP_404_NOT_FOUND)
    #
    #     return self.partial_update(request, *args, **kwargs)

    # def get_queryset(self):
    #     return FriendRequest.objects.filter(requested_to=self.request.user.id)
    #
    # def retrieve(self, request, *args, **kwargs):
    #     friend_request_id = kwargs["friend_request_id"]
    #
    #     try:
    #         friend_request = FriendRequest.objects.get(id=friend_request_id)
    #     except FriendRequest.DoesNotExist:
    #         return Response(data="This friend request does not exist.", status=status.HTTP_404_NOT_FOUND)
    #     return Response(self.get_serializer(friend_request).data)

    # def patch(self, request, *args, **kwargs):
    #     friend_request_id = kwargs["friend_request_id"]
    #     friend_request = FriendRequest.objects.get(id=friend_request_id)
    #
    #     if friend_request.requested_to == request.user:
    #         body_unicode = request.body.decode()
    #         body = json.loads(body_unicode)
    #         content = body["content"]
    #
    #         if content["status"] == "Accepted":
    #             friend_request.requested_to.friends.add(friend_request.requested_by)
    #             friend_request.requested_by.friends.add(friend_request.requested_to)
    #         return Response(data="friend request accepted", status=status.HTTP_200_OK)
    #     else:
    #         return Response(data="you don't have access", status=status.HTTP_404_NOT_FOUND)
    #
    # We have problem to add requester and requestee to the user model's friends!!!
    # Will check it later...


# api/social/friends/
# GET: List all accepted friends


# api/users/
# GET: Get all the users
class ListAllUsers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
