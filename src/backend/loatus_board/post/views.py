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
from django.core import serializers
from math import ceil
# Create your views here.

auth_url="http://"+"3.39.191.83:8080"

def index(request):
    
    page = int(request.GET.get("page", 1) or 1)
    page_size = 10
    limit = int(page_size * page)
    offset = int(limit - page_size)
    board_list=Post.objects.all().order_by('-id')[offset:limit]
    page_count = ceil(Post.objects.count() / page_size)
    board_list_json = serializers.serialize("json", board_list)
    res_post_json=json.loads(board_list_json)
    
    
    return JsonResponse({"code": 200, "message": "All Posts", "data": res_post_json})                        
    
    

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
            access_token=request.headers.get('Authorization', None)
            ac=access_token
            print(ac)
            user_info=requests.get(auth_url+"/auth/my", headers={'Authorization': ac})
            print(user_info)
            print(type(user_info))
            json_user_info=json.loads(user_info.content.decode('utf-8'))
            # print(json_user_info["data"]['email'])
            # print(json_user_info["data"]["nickname"])
            # print(json_user_info)
            user_email=json_user_info["data"]["email"]
            user_nickname=json_user_info["data"]["nickname"]
            
            print(User.objects.filter(username=user_nickname).exists())
            if User.objects.filter(username=user_nickname).exists() is False:
                print("flag")
                user = User.objects.create_user(username=user_nickname, email=user_email)
            print(User.objects.filter(username=user_nickname))
            # not test
            # return JsonResponse({"code": 200, "message": "New Post Regist!", "data": json_user_info})                        
            # return JsonResponse({"code": 200, "message": "New Post Regist!", "data": "hello"})                        

            # access_token=request.headers.get('Authorization', None)
            # payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
            u = User.objects.get(username=user_nickname)
            print(u)
            # return JsonResponse({"code": 200, "message": "New Post Regist!", "data": "hello"})                        
            
            body =  json.loads(request.body.decode('utf-8'))
            
        except jwt.exceptions.DecodeError:
            return JsonResponse({'message': 'INVALID TOKEN'}, status = 400)
        except User.DoesNotExist:
            return JsonResponse({'message': 'INVALID USER'}, status = 400)                        
        
        # content=request.POST.get("content")
        # title=request.POST.get("title")
        
        # return JsonResponse({'message': "hello1"})
        new_post=Post.objects.create(author=u, title=body["title"], content=body["content"])
        # print(new_post)
        # return JsonResponse({'message': new_post.id})    
        return JsonResponse({"code": 200, "message": "New Post Regist!", "data": new_post.id})                        
        # return JsonResponse({'message': new_post.title})
        
        # return render(request, 'post/regist_form.html', context)
    
    return JsonResponse({"code": 405, "message": "Please POST", "data": None})                        
    

def detail(request, pk):
    board_list=get_object_or_404(Post, id=pk)
    # print(board_list.like.all())
    # print(board_list.id)
    # print(board_list.pk)
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
    # access_token=request.headers.get('Authorization', None)
    # payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
    # u = User.objects.get(id=payload['id'])
    
    access_token=request.headers.get('Authorization', None)
    ac=access_token
    user_info=requests.get(auth_url+"/auth/my", headers={'Authorization': ac})
    json_user_info=json.loads(user_info.content.decode('utf-8'))
    # print(json_user_info["data"]['email'])
    # print(json_user_info["data"]["nickname"])
    # print(json_user_info)
    user_nickname=json_user_info["data"]["nickname"]
    u=User.objects.get(username=user_nickname)
    
        
    body =  json.loads(request.body.decode('utf-8'))
    
    post=Post.objects.get(id=pk)
    if u.id is not post.author.id:
        return JsonResponse({"code": 401, "message": "Current User is not Authenticated", "data": None})                            
    
    
    post.title=body["title"]
    post.content=body["content"]
    post.save()

    post_filter=Post.objects.filter(id=pk)
    cur_post_json = serializers.serialize("json", post_filter)             
    res_post_json=json.loads(cur_post_json)
    return JsonResponse({"code": 200, "message": "Post Edited", "data": res_post_json})                        


def delete(request, pk):
    # access_token=request.headers.get('Authorization', None)
    # payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
    # u = User.objects.get(id=payload['id'])
    
    access_token=request.headers.get('Authorization', None)
    ac=access_token
    user_info=requests.get(auth_url+"/auth/my", headers={'Authorization': ac})
    
    json_user_info=json.loads(user_info.content.decode('utf-8'))
    user_nickname=json_user_info["data"]["nickname"]
    u=User.objects.get(username=user_nickname)
    
    post=get_object_or_404(Post, id=pk)    
    if u.id is not post.author.id:
        return JsonResponse({"code": 401, "message": "Current User is not Authenticated", "data": None})                            

    post.delete()
    return JsonResponse({"code": 200, "message": "Post Deleted", "data": None})                        
    # return redirect('post:index')

def like_post(request, pk):
    if request.method=='GET':
        post=get_object_or_404(Post, id=pk)

        #test auth
        # access_token=request.headers.get('Authorization', None)
        # payload = jwt.decode(access_token, 'SECRET', algorithms='HS256')
        # u = User.objects.get(id=payload['id'])
        #test auth
        
        access_token=request.headers.get('Authorization', None)
        ac=access_token
        user_info=requests.get(auth_url+"/auth/my", headers={'Authorization': ac})
    
        json_user_info=json.loads(user_info.content.decode('utf-8'))
        user_nickname=json_user_info["data"]["nickname"]
        u=User.objects.get(username=user_nickname)
        
        
        print(post.like.all())


        if u in post.like.all():
            post.like.remove(u)
            cur_post_json = serializers.serialize("json", post.like.all())
            res_post_json=json.loads(cur_post_json)
            return JsonResponse({"code": 200, "message": "Post Like removed", "data": res_post_json})                        
        else:
            post.like.add(u)
            cur_post_json = serializers.serialize("json", post.like.all())
            res_post_json=json.loads(cur_post_json)
            return JsonResponse({"code": 200, "message": "Post Like Added", "data": res_post_json})                        
    return JsonResponse({"code": 405, "message": "Please GET", "data": None})                        

def comment_post(request):
    if request.method == 'POST':
        
        access_token=request.headers.get('Authorization', None)
        ac=access_token
        user_info=requests.get(auth_url+"/auth/my", headers={'Authorization': ac})
    
        json_user_info=json.loads(user_info.content.decode('utf-8'))
        user_nickname=json_user_info["data"]["nickname"]
        u=User.objects.get(username=user_nickname)
        

        body =  json.loads(request.body.decode('utf-8'))
        cur_user_id=u.id
        cur_post_id=body["post"]
        cur_user_comment=body["text"]

        cur_post=Post.objects.filter(id=cur_post_id)
        cur_post_json = serializers.serialize("json", cur_post)
        res_post_json=json.loads(cur_post_json)
        
        # cur_post[0].comments=None
        # print(cur_post[0].comments)
        # cur_post[0].save()
        
        comment_json_object={
                "cur_user_id": cur_user_id,
                "cur_user_comment": cur_user_comment,
                "cur_post_id": cur_post_id,
            }
        
        
        if cur_post[0].comments is None:
            

            comment_list=list()
            comment_list.append(comment_json_object)
            cur_post[0].comments=comment_json_object
            cur_post[0].save()

            res_post_json[0]["fields"]["comments"]=comment_list
            
            
        else:
            
            comment_json_str=json.dumps(comment_json_object)
            print(comment_json_str)
            print(type(comment_json_str))
            
            if cur_post[0].comments is "":
                cur_post[0].comments=comment_json_str
                cur_post[0].save()
            else:
                cur_post[0].comments+="\n"+comment_json_str
                cur_post[0].save()
            
            
            print(cur_post[0].comments)
            comments_split=cur_post[0].comments.split("\n")
            comment_list=list()
            print(len(comments_split))
            
            
            
            for i in range(len(comments_split)):
                print(comments_split[0])
                print(type(comments_split[0]))
                cur_str=comments_split[i]
                cur_dict=eval(cur_str)
                comment_list.append(cur_dict)
            print(comment_list)    
            res_post_json[0]["fields"]["comments"]=comment_list
            # return JsonResponse({"status": 200, "message": "comments in post", "data": "rkskek"})
        return JsonResponse({"status": 200, "message": "comments in post", "data": res_post_json})





