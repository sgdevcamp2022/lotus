from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title=models.CharField(max_length=200, verbose_name='TITLE', help_text='*MAX 100*')
    author=models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content=models.TextField(verbose_name='CONTENT')
    published_date=models.DateTimeField(auto_now=True, verbose_name='PUBLISH_DATE')
    like = models.ManyToManyField(User, related_name='likes' ,blank=True)
    def __str__(self):
        return self.title

class Comment(models.Model):
    post=models.ForeignKey(Post, on_delete=models.CASCADE)
    comment_author=models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    text=models.TextField(verbose_name='TEXT')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
# Create your models here.
