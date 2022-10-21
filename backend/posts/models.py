from django.db import models
from users.models import User


class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    liked_by = models.ManyToManyField(User, related_name='likes', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}: {self.creator}'

#
# class ContentImage(models.Model):
#     post = models.ForeignKey(Post, blank=True, on_delete=models.CASCADE)
#     image_url = models.TextField()
#
#
# class Comment(models.Model):
#     post = models.ForeignKey(Post, blank=True, on_delete=models.CASCADE)
#     content = models.TextField()
