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
    con = pymysql.connect(host='database-1.cdqrhabqhxkm.ap-northeast-2.rds.amazonaws.com', user='admin', password='admin123',
                      db='BOARD', charset='utf8'
                     )
    rd = redis.Redis(host='redis-test.aqrul0.ng.0001.apn2.cache.amazonaws.com', port=6379, db=0)
    
    cur = con.cursor()
    sql = "SELECT * FROM matching_matching" 
    cur.execute(sql)
    rows=cur.fetchall()
    
    raid_list=[("Vartan_normal",1415),("Vartan_hard",1445),("Biakiss_normal",1430),("Biakiss_hard",1460),("Kouku_rehearsal",1385),
     ("Kouku_normal",1475),("Abrelshud_dejavu",1430),("Abrelshud_normal_1_2",1490),("Abrelshud_normal_3_4",1500),("Abrelshud_normal_5_6",1520),
     ("Abrelshud_hard_1_2",1490),("Abrelshud_hard_3_4",1500),("Abrelshud_hard_5_6",1520),("Illiakan_epidemic",1500),("Illiakan_normal",1580),("Illiakan_epidemic",1600)]
    # print(raid_list[0][0])
    for r_id in range(1,15):
        if not Raid.objects.filter(id=r_id).exists():
            Raid.objects.create(id=r_id, raid_name=raid_list[r_id][0], req_item_lev=raid_list[r_id][1])
            
    # print(rd.llen("waiting_room_1"))
    # r=Raid.objects.get(id=1)
    # print(rows)
    # print(rows[0][0])
    # print(type(rows))
    # s=1
    # rd.rpush("waiting_room_1",1,2,3,4,5)
    # print(rd.llen("waiting_room_1"))
    # time.sleep(5)
    while(1):
        time.sleep(5)
        print("rkskek")
        for r_id in range(1,20):
            cur_waiting_room="waiting_room_"+str(r_id)
            # cur_waiting_len=rd.llen(cur_waiting_room)
            # print(r_id)
            # print(rd.llen(cur_waiting_room))
            while rd.llen(cur_waiting_room)>=4:
                print("4444")
                cur_raid=Raid.objects.get(id=r_id)
                # print(cur_raid)
                cur_party=Party.objects.create(cur_raid_id=cur_raid,party_size=1,party_state=1)
                cur_party.save()
                # print(cur_party.id)
                for _ in range(4):
                    cur_user_name=rd.lpop(cur_waiting_room).decode()
                    print(_)
                    
                    cur_matching=Matching.objects.create(cur_party_id=cur_party, user_id=User.objects.get(username=cur_user_name))
                    cur_matching.save()
                    if _ is 3:
                        cur_party.party_size=4
                        cur_party.save()
                    # print(cur_user_name)
                        
        # print(rd.llen("waiting_room_1"))                    
        # time.sleep(5)
        # s+=1
        # print(s)
        
        

# def main():
#      print ("Hello World!")

# if __name__ == "__main__":
#     main()

# Create your views here.
