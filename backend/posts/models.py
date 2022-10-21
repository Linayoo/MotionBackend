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


class PostImage(models.Model):
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    used_in_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")

#
# class ContentImage(models.Model):
#     post = models.ForeignKey(Post, blank=True, on_delete=models.CASCADE)
#
#
#
# class Comment(models.Model):
#     post = models.ForeignKey(Post, blank=True, on_delete=models.CASCADE)
#     content = models.TextField()
