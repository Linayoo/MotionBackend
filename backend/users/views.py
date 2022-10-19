from rest_framework.generics import RetrieveUpdateAPIView, get_object_or_404, RetrieveAPIView
from users.models import User
from users.serializers import UserSerializer, TestSerializer


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
    serializer_class = TestSerializer
    queryset = User.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.request.user.id)
        return obj

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset
