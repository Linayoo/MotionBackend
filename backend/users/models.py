from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    password = models.CharField(max_length=250)
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    profile_pic = models.ImageField()
    occupation = models.CharField(max_length=100)
    location = models.TextField()
    about_me = models.TextField()
    avatar = models.ImageField()
    banner = models.ImageField()
    following = models.ManyToManyField("self", blank=True, symmetrical=False, related_name="followers")
    friends = models.ManyToManyField("self", blank=True, symmetrical=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}: {self.username}'


class FriendRequest(models.Model):
    requested_by = models.ForeignKey(User, blank=True, on_delete=models.CASCADE, related_name="friend_requested_by")
    requested_to = models.ForeignKey(User, blank=True, on_delete=models.CASCADE, related_name="friend_requested_to")
    created = models.DateTimeField(auto_now_add=True)
    friend_request_status = models.CharField(max_length=100, default="Pending")


class RegistrationProfile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    email = models.EmailField()
    validation_code = models.IntegerField()
