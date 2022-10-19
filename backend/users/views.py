from rest_framework.generics import RetrieveUpdateAPIView, get_object_or_404
from users.models import User
from users.serializers import UserSerializer


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
