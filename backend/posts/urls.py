from django.urls import path

from posts.views import ListCreatePostView


urlpatterns = [
    path("api/social/posts/", ListCreatePostView.as_view()),
]
