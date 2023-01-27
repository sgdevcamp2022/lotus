from django.db import models

class Post(models.Model):
    title=models.CharField(max_length=200, verbose_name='TITLE', help_text='*MAX 100*')
    author=models.CharField(max_length=100, verbose_name='AUTHOR')
    content=models.TextField(verbose_name='CONTENT')
    published_date=models.DateTimeField(auto_now=True, verbose_name='PUBLISH_DATE')

    def __str__(self):
        return self.title

# Create your models here.
