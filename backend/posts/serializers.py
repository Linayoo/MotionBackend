from posts.models import Post # ContentImage, Comment
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'content', 'liked_by', 'created', 'updated']
        read_only_fields = ['creator']

# class PostDetailSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Post
#         exclude = ['id', 'creator', 'content_images']
#
# class ContentImageSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = ContentImage
#         fields = '__all__'
#
# class ContentImagesDetailsSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         exclude = ['id', 'post']
#
# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'
#
#
# class ContentImageDetailsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         exclude = ['id', 'post']
