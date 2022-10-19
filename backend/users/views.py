from rest_framework.generics import ListAPIView, UpdateAPIView
from users.models import User
from users.serializers import UserSerializer


class LoggedInUserProfileView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        return queryset


# class UpdateLoggedInUserProfile(UpdateAPIView):
#     serializer_class = UserSerializer
#
#     def Patch(self, request, *args, *kwargs):
#         queryset = User.objects.filter(id=self.request.user.id)
#         return
