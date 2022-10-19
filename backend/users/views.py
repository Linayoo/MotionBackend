from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer


# GET:
class LoggedInUserProfileView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        return queryset


class UpdateLoggedInUserProfile(GenericAPIView):
    queryset = User
    serializer_class = UserSerializer

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        return Response(self.get_serializer(user).data)
