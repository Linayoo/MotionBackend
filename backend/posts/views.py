from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from posts.models import Post
from posts.serializers import PostSerializer

# Create your views here.
"""
api/social/posts/ POST: user can create a new post by sending post data. He should also be able to share another post.
"""

# ListCreateAPIView is for multiple views
class ListCreatePostView(ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        query_set = Post.objects.all()
        return query_set

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


# class RetrieveUpdateDestroyPostView(RetrieveUpdateDestroyAPIView):
#     queryset = Post.object.all()
#     serializer_class = PostSerializer
#     lookup_field = 'post_id'
#     permission_classes = [isAuthor]



