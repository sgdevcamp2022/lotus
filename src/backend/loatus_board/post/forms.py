from django import forms
from django.forms import widgets
from .models import Post

class RegistForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'author', 'content']  # '__all__'
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'content': forms.Textarea(attrs={'class': 'form-control', 'rows': 10}),
        }