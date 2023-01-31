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
# Create your views here.
def new_LoginView(request):
    if request.method == "GET":
        return render(request, 'login.html')

    elif request.method == "POST":
        user_id= request.POST.get('user_id')
        user_pw= request.POST.get('user_pw')

        user = authenticate(request, username=user_id, password=user_pw)

        if user is not None:
            login(request,user=user)
            return redirect('post:index')

        else:
            return redirect('accounts:login')

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
        # return JsonResponse({'message': us})    
        pw=data['password']
        # return JsonResponse({'message': pw})
        if User.objects.filter(username=us) is not None:
            # return JsonResponse({'message': "none"})    
            user = User.objects.create_user(username=us, password=pw)
        return JsonResponse({'message': 'SUCCESS', 'username': user.username})    
        # u=User.objects.get(username=us) #username return
        # print(u.id)
        # SECRET = 'SECRET'
        # access_token = jwt.encode({'id':u.id, 'username': u.username}, SECRET, algorithm='HS256')
        # print(access_token)
        # print(type(access_token))
        # k=access_token.encode('utf-8').decode('utf-8')
        # print(k)
        # payload=jwt.decode(access_token, SECRET, algorithms='HS256')
        # print(payload)
        # return JsonResponse({'message': 'SUCCESS', 'access_token': k}, status = 200)    
    # elif request.method=="GET":
    #     return render(request, 'todo/test.html', {'GET': 'GET 방식입니다'})    

def test_user_login(request):
    access_token=request.headers.get('Authorization', None)
    # return JsonResponse({'message': access_token}, status = 200)    
    payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
    # return JsonResponse({'message': payload}, status = 200)    
    u = User.objects.get(id=payload['id'])
    print(type(u))
    print(u)
    return JsonResponse({'message': u.username}, status = 200)    

def regist(request):
    if request.method=='POST':
        form=RegistForm(request.POST)
        if form.is_valid():
            post=form.save()
            return redirect('post:index')
    else:
        form=RegistForm()
    context={'form': form}
    return render(request, 'post/regist_form.html', context)

def detail(request, pk):
    board_list=get_object_or_404(Post, id=pk)
    comments=Comment.objects.filter(post=pk)
    if request.method=='POST':
        comment=Comment()
        comment.post=board_list
        comment.user=request.POST['user_name']
        comment.text=request.POST['body']
        comment.created_at=timezone.now()
        comment.save()
    context={'board_list': board_list, 'comments': comments}
    return render(request, 'post/detail.html', context)

def edit(request, pk):
    post = get_object_or_404(Post, id=pk)
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
    return redirect('post:index')
