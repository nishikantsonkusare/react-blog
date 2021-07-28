from django.db import models
from ckeditor.fields import RichTextField
import datetime
from django.contrib.auth.models import User

# Create your models here.

class  Category(models.Model):
    name = models.CharField(max_length=256)
    def __str__(self):
        return self.name


class Blog(models.Model):
    name = models.CharField(max_length=256, null=False, blank=False)
    body = RichTextField(blank=False, null=False)
    date = models.DateField(default=datetime.date.today)
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    thumbnail = models.ImageField(upload_to='pictures/', default='')
    def __str__(self):
        return self.name


class Comment(models.Model):
    post_id = models.IntegerField(null=False, blank=False)
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.CharField(max_length=256, null=False, blank=False)
    comments = models.CharField(max_length=256, null=False, blank=False)
    date = models.DateField(auto_now_add=True)
    