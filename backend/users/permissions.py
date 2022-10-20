from rest_framework.permissions import BasePermission


class IsReceiver(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.requested_to:
            return True
        else:
            return False
