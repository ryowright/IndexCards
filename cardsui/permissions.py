from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:  # SAFE_METHODS are 'GET', 'HEAD', and 'OPTIONS'; these just retrieve info and can't modify them
            return True

        else:
            return obj.owner == request.user