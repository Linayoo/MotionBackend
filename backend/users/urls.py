from django.urls import path

from users.views import LoggedInUserProfileView, ListLoggedInUserFollowers, ListLoggedInUserFollowees, \
    SendFriendRequest, FriendRequestDetails

urlpatterns = [
    path("api/users/me/", LoggedInUserProfileView.as_view()),
    path("api/social/followers/followers/", ListLoggedInUserFollowers.as_view()),
    path("api/social/followers/following/", ListLoggedInUserFollowees.as_view()),
    path("api/social/friends/request/<int:user_id>/", SendFriendRequest.as_view()),
    path("api/social/friends/requests/<int:friend_request_id>/", FriendRequestDetails.as_view()),
]
