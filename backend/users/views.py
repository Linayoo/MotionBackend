from rest_framework.generics import ListAPIView
from users.models import User
from users.serializers import UserSerializer


class LoggedInUserProfileView(ListAPIView):
    serializer = UserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user)
        return queryset
