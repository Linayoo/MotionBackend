from django.urls import path
from users.views import LoggedInUserProfileView, ListLoggedInUserFollowers

urlpatterns = [
    path("api/users/me/", LoggedInUserProfileView.as_view()),
    path("api/social/followers/followers/", ListLoggedInUserFollowers.as_view())
]
