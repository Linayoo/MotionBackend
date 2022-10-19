from django.urls import path
from users.views import LoggedInUserProfileView, GetAllUsers

urlpatterns = [
    path("api/users/me/", LoggedInUserProfileView.as_view()),
    path("api/users/", GetAllUsers.as_view()),
]
