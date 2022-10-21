from rest_framework.permissions import BasePermission


# only the author is allowed to modify or delete an post
class IsCreater(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.author == obj.user:
            return True
        else:
            return False
