from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from users.models import User
from users.serializers import UserSerializer


class LoggedInUserProfileView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user)
        return queryset


class GetAllUsers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


