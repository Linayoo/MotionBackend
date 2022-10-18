from django.contrib import admin
from posts.models import Post


class PostAdmins(admin.ModelAdmin):
    list_display = ['id', 'creator']
    search_fields = ['id', 'creator']


admin.site.register(Post, PostAdmins)

