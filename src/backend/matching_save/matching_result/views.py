from django.shortcuts import render
from .models import Raid, Matching, Party
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
import time
import pymysql
import redis



def loop():
    
    # sql = "SELECT * FROM obj_create_matching" 
    
    
    while(1):
        con = pymysql.connect(host='database-1.cdqrhabqhxkm.ap-northeast-2.rds.amazonaws.com', user='admin', password='admin123',
                      db='BOARD', charset='utf8'
                     )
        rd = redis.Redis(host='redis-test.aqrul0.ng.0001.apn2.cache.amazonaws.com', port=6379, db=0)
    
        cur = con.cursor()
        sql="SELECT * FROM obj_create_party WHERE party_state=1"
        cur.execute(sql)
        rows=cur.fetchall()
        print(rows)
        empty_tuple=()    
        i=0
        
        # print()
        if rows is not empty_tuple:
            party_id=rows[0][0]
            user_sql="SELECT * FROM obj_create_matching WHERE party_id="+str(party_id)
            cur.execute(user_sql)
            user_rows=cur.fetchall()
            
            username_list=[]
            raid_name=""
            item_lev=""
            p_id=0
            
            for index in range(4):
                # party_id=rows[index][1]
                user_id=user_rows[index][2]
                get_raid_id="SELECT * FROM obj_create_party WHERE id="+str(party_id)
                k=cur.execute(get_raid_id)
                k_rows=cur.fetchall()
                # print(k_rows)
                raid_id=k_rows[0][3]
                
                get_raid_name="SELECT * FROM obj_create_raid WHERE id="+str(raid_id)
                s=cur.execute(get_raid_name)
                s_rows=cur.fetchall()
                cur_raid_name=s_rows[0][1]
                req_item_lev=s_rows[0][2]
                item_lev=req_item_lev
                
                u=User.objects.get(id=user_id)
                
                # cur_user_name=user_rows[0][4]
                username_list.append(u.username)
                # username_list.append(user_id)
                raid_name=cur_raid_name
                p_id=party_id
                
                
            dict_data={
                    "userid_list": username_list,
                    "raid_name": raid_name,
                    "item_lev": item_lev
            }    
                
            res_data={
                "code": 200,
                "message": "New Party Matching",
                "data": dict_data
            }
            
            update_party_state="UPDATE obj_create_party SET party_state=2 WHERE id="+str(p_id)
            cur.execute(update_party_state)
            cur.fetchall()
            res_json_data=json.dumps(res_data)
            saved_json_name="party_"+str(p_id)+".json"
            print("saved_json_name")
            print(saved_json_name)
            if os.path.isfile(os.path.join('/var',saved_json_name)) is False:
                print("well")
                with open(os.path.join('/var',saved_json_name), 'w') as f:
                    f.write(res_json_data)
            
            # if os.path.isfile(os.path.join('/home','ec2-user','nfs_json',saved_json_name)) is False:
            #     with open(os.path.join('/home','ec2-user','nfs_json',saved_json_name), 'w') as f:
            #         f.write(res_json_data)
        con.commit()                    
        time.sleep(5)
                    # print(cur_user_name)
                        
        
