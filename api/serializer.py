from rest_framework import serializers
from .models import Blog, Comment

class BlogSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name')
    author_name = serializers.CharField(source='author.username')

    class Meta:
        model = Blog
        fields = ['id', 'name', 'body', 'date', 'author_name', 'category_name', 'thumbnail', 'thumbnail_url']

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        thumbnail_url = obj.thumbnail.url
        return request.build_absolute_uri(thumbnail_url)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post_id', 'name', 'email', 'comments', 'date']