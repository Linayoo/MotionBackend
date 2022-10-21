from django.urls import path

from posts.views import ListCreatePostView

urlpatterns = [
    path("", ListCreatePostView.as_view()),
]