from django.urls import path
from . import views

app_name='post'
urlpatterns=[
    path('',views.index, name='index'),
    path('regist/',views.regist, name='regist'),
    path('detail/<int:pk>/', views.detail, name='detail'),
    path('edit/<int:pk>/', views.edit, name='edit'),   
    path('delete/<int:pk>', views.delete, name='delete'),
    path('test/',views.test_user_create, name='test'),
    path('testlogin/',views.test_user_login, name='testlogin'),
    path('like/<int:pk>/',views.like_post, name='like_post'),
    path('comment/', views.comment_post, name='comment_post')
]