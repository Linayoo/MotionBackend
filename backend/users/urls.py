from django.urls import path
from users.views import LoggedInUserProfileView, UpdateLoggedInUserProfile

urlpatterns = [
    path("api/users/me/", LoggedInUserProfileView.as_view()),
]
