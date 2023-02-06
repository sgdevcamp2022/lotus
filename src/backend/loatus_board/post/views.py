from django.shortcuts import render,redirect,get_object_or_404
from .models import Post, Comment
from .forms import RegistForm
from django.core.paginator import Paginator
from django.utils import timezone
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User
import json,jwt
from django.http import JsonResponse 
import requests, json
# Create your views here.

def index(request):
    page=request.GET.get('page', '1')
    board_list=Post.objects.all().order_by('-id')

    paginator=Paginator(board_list, 10)
    page_obj=paginator.get_page(page)

    context={'board_list': page_obj}
    return render(request, 'post/index.html', context)

def test_user_create(request):
    if request.method == "POST":
        data = json.loads(request.body)
        us=data.get('username')
        pw=data.get('password')
        print(us)
        print(pw)
        user = User.objects.create_user(username=us, password=pw)
        # print(User.objects.filter(username="rkskek123"))
        # if User.objects.filter(username=us) is None:
        #     print("flag")
        #     user = User.objects.create_user(username=us, password=pw)
                    
        # return JsonResponse({'message': 'SUCCESS', 'username': user.username})    
        # print(us)
        # print(pw)
        
        u=User.objects.get(username=us) #username return
        # print(u.id)
        SECRET = 'SECRET'
        print(u)
        print(u.id)
        # return JsonResponse({'access_token': "hello"})    
        access_token = jwt.encode({'id':u.id, 'username': u.username}, SECRET, algorithm='HS256')
        k=access_token.encode('utf-8').decode('utf-8')
        

        # payload=jwt.decode(access_token, SECRET, algorithms='HS256')
        return JsonResponse({'access_token': k}, status = 200)    

def test_user_login(request):
    access_token=request.headers.get('Authorization', None)
    payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
    u = User.objects.get(id=payload['id'])
    return JsonResponse({'username': u.username, 'password': u.password}, status = 200)    

def regist(request):
    if request.method=='POST':
        try:
            
            # not test
            # access_token=request.headers.get('Authorization', None)
            # user_info=requests.get("http://192.168.195.15:8080/auth/my", headers={'Authorization': "Bearer "+ac})
            # json_user_info=json.loads(user_info.content.decode('utf-8'))
            # not test

            access_token=request.headers.get('Authorization', None)
            payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
            u = User.objects.get(id=payload['id'])
            
            body =  json.loads(request.body.decode('utf-8'))
            
        except jwt.exceptions.DecodeError:
            return JsonResponse({'message': 'INVALID TOKEN'}, status = 400)
        except User.DoesNotExist:
            return JsonResponse({'message': 'INVALID USER'}, status = 400)                        
        
        # content=request.POST.get("content")
        # title=request.POST.get("title")
        
        # return JsonResponse({'message': "hello1"})
        new_post=Post.objects.create(author=u, title=body["title"], content=body["content"])
        return JsonResponse({'message': new_post.id})    
        # return JsonResponse({'message': new_post.title})
        
        # return render(request, 'post/regist_form.html', context)
    
    return JsonResponse({'message': "error"})
    

def detail(request, pk):
    board_list=get_object_or_404(Post, id=pk)
    print(board_list.like.all())
    return JsonResponse({'status': 'ok'})                        
    # comments=Comment.objects.filter(post=pk)
    # if request.method=='POST':
    #     comment=Comment()
    #     comment.post=board_list
    #     comment.user=request.POST['user_name']
    #     comment.text=request.POST['body']
    #     comment.created_at=timezone.now()
    #     comment.save()
    # context={'board_list': board_list, 'comments': comments}
    # return render(request, 'post/detail.html', context)

def edit(request, pk):
    access_token=request.headers.get('Authorization', None)
    payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
    u = User.objects.get(id=payload['id'])
        
    body =  json.loads(request.body.decode('utf-8'))
    
    post = get_object_or_404(Post, id=pk)
    post.title=body["title"]
    post.content=body["content"]
    return JsonResponse({"message": post.title})

    if request.method == 'POST':
        form = RegistForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save()
            return redirect('post:index')
    else:
        form = RegistForm(instance=post)
    context = {'form': form}
    return render(request, 'post/edit.html', context)

def delete(request, pk):
    post=get_object_or_404(Post, id=pk)    
    post.delete()
    return JsonResponse({"message": "It is Deleted"})
    # return redirect('post:index')

def like_post(request, pk):
    if request.method=='GET':
        post=get_object_or_404(Post, id=pk)

        #test auth
        access_token=request.headers.get('Authorization', None)
        payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
        u = User.objects.get(id=payload['id'])
        #test auth
        print(post.like.all())
        if u in post.like.all():
            post.like.remove(u)
        else:
            post.like.add(u)
        print(post.like.all())
    return JsonResponse({'status': 'ok'})                        
