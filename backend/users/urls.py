from django.urls import path

from users.views import LoggedInUserProfileView, ListLoggedInUserFollowers, ListLoggedInUserFollowees, \
    SendFriendRequest, FriendRequestDetailsAndAccept, ListAllUsers

urlpatterns = [
    path("api/users/me/", LoggedInUserProfileView.as_view()),
    path("api/social/followers/followers/", ListLoggedInUserFollowers.as_view()),
    path("api/social/followers/following/", ListLoggedInUserFollowees.as_view()),
    path("api/social/friends/request/<int:user_id>/", SendFriendRequest.as_view()),
    path("api/social/friends/requests/<int:id>/", FriendRequestDetailsAndAccept.as_view()),
    path("api/users/", ListAllUsers.as_view()),
]
