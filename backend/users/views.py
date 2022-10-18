from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from users.models import User
from users.serializers import UserSerializer


class LoggedInUserProfileView(GenericAPIView):
    queryset = User
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]