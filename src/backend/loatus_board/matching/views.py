from django.shortcuts import render,redirect,get_object_or_404
from .models import Raid, Matching, Party
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
import os
from urllib import parse
from django.core.cache import cache
import redis
import pymysql

# Create your views here.
rd = redis.Redis(host='redis-test.<to_change>.ng.0001.apn2.cache.amazonaws.com', port=6379, db=0)


def matching_page(request):
   
    return JsonResponse({"code": 200, "message": "All Matching"})                        
    
def enroll(request, pk):    
    if request.method=="POST":
        access_token=request.headers.get('Authorization', None)
        ac=access_token
                
        user_info=requests.get("http://<to_change>:31436/auth/my", headers={'Authorization': ac})
        
        json_user_info=json.loads(user_info.content.decode('utf-8'))
        # user_nickname=json_user_info["data"]["nickname"]
        user_nickname=json_user_info["data"]["characterName"]
        char_name=json_user_info["data"]["characterName"]
        if user_nickname is None:
            return JsonResponse({"code": 200, "message": "Please Character SET"})                            
        
        # char_name=json_user_info["data"]["characterName"]
        if char_name is not "":
            enc_char_name = parse.quote(char_name)
        char_info=requests.get("https://developer-lostark.game.onstove.com/characters/"+str(enc_char_name)+"/siblings", headers={'Accept':'application/json','Authorization': 'bearer <to_change>'})
        char_info_list=char_info.content.decode()
        cur_item_lev=0
        # print(char_name)
        json_char_info=json.loads(char_info.content.decode('utf-8'))
        
        for i in range(len(json_char_info)):
            if json_char_info[i]["CharacterName"] == char_name:
                print("hello")
                cur_item_lev=float(json_char_info[i]["ItemAvgLevel"].replace(',',''))
                # cur_item_lev=float(char_cur_item_lev.replace('.',''))
        # openapi    
        con = pymysql.connect(host='database-1.<to_change>.ap-northeast-2.rds.amazonaws.com', user='admin', password='admin123',
                      db='BOARD', charset='utf8'
                     )
        cur = con.cursor()
        sql="SELECT * FROM obj_create_raid WHERE id="+str(pk)
        cur.execute(sql)
        rows=cur.fetchall()
        print(type(cur_item_lev))
        print(type(rows[0][2]))
        
        if cur_item_lev<rows[0][2]:
            return JsonResponse({"code": 200, "message": "Item Level is low"})                        
        print(user_nickname)
        
        if User.objects.filter(username=user_nickname).exists() is False:
            user = User.objects.create_user(username=user_nickname)
        u = User.objects.get(username=user_nickname)
        # print(u)
        if not rd.exists(u.id):
            print("well")
            rd.set(u.id, pk)
            waiting_room_key="waiting_room_"+str(pk)
        
        # rd.rpush(waiting_room_key,u.username)
            rd.rpush(waiting_room_key,u.username)
        # rd.lpop(waiting_room_key)
            for item in rd.lrange(waiting_room_key,0,-1):
                print(item.decode())
            return JsonResponse({"code": 200, "message": "Matching Enroll"}) 
        else:
            return JsonResponse({"code": 200, "message": "You Already Enroll"}) 
        # rd.delete(waiting_room_key)        
        
                               
    else:
        return JsonResponse({"code": 200, "message": "Please Post"})                        
        

def matching_result(request):           
    con = pymysql.connect(host='database-1.<to_change>.ap-northeast-2.rds.amazonaws.com', user='admin', password='admin123',
                      db='BOARD', charset='utf8'
                     )
    cur = con.cursor()                     
                     
    access_token=request.headers.get('Authorization', None)
    ac=access_token
                
    user_info=requests.get("http://<to_change>/auth/my", headers={'Authorization': ac})
        
    json_user_info=json.loads(user_info.content.decode('utf-8'))
    # user_nickname=json_user_info["data"]["nickname"]
    user_nickname=json_user_info["data"]["characterName"]
        # print(user_nickname)
        
    
    if User.objects.filter(username=user_nickname).exists() is False:
        user = User.objects.create_user(username=user_nickname)
    u = User.objects.get(username=user_nickname)
    print(u)
    cur_party_q="SELECT * FROM obj_create_matching WHERE user_id_id="+str(u.id)
    cur.execute(cur_party_q)
    cur_party=cur.fetchall()
    print(cur_party)
    if cur_party:
        
        cur_party_id=cur_party[0][1]
        party_state_q="SELECT * FROM obj_create_party WHERE id="+str(cur_party_id)
        cur.execute(party_state_q)
        party_state_q=cur.fetchall()
        print(party_state_q)
        if party_state_q[0][2]==2:
        
            saved_json_name="party_"+str(cur_party_id)+".json"
            json_path=os.path.join("/var",saved_json_name)
            # json_path2=os.path.join('/home','ec2-user','nfs_json',saved_json_name)
        
            if os.path.exists(json_path):
                print("well")
                delete_user="SELECT * FROM obj_create_matching WHERE party_id="+str(cur_party_id)
                cur.execute(delete_user)
                target_user=cur.fetchall()
                for i in range(4):
                    rd.delete(target_user[i][2])
                
                delete_data="DELETE FROM obj_create_matching WHERE party_id="+str(cur_party_id)
                print(delete_data)
                cur.execute(delete_data)
                con.commit()
                cur.fetchall()
                res_data=""
                with open(json_path, 'r') as f:
                    print("too well")
                    json_data = json.load(f)
                    # res_data=json.dumps(json_data)
                return JsonResponse({"code": 200, "message": "MATCHING COMPLETED", 'data': json_data})                        
            else:
                return JsonResponse({"code": 200, "message": "Please Wait"})
        else:
            return JsonResponse({"code": 200, "message": "Not Ready"})
    else:
        return JsonResponse({"code": 200, "message": "No Party"})                        




