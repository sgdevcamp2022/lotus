import os
from django.conf import settings
# os.environ.setdefault("DJANGO_SETTINGS_MODULE","loatus_board")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'loatus_board.settings')
from django.contrib.auth.models import User
import json
import redis
import pymysql
from django.core.wsgi import get_wsgi_application
# print(1)
# from models import Raid, Matching, Party


# con = pymysql.connect(host='database-1.cdqrhabqhxkm.ap-northeast-2.rds.amazonaws.com', user='admin', password='admin123',
#                       db='BOARD', charset='utf8'
#                      )
# rd = redis.Redis(host='redis-test.aqrul0.ng.0001.apn2.cache.amazonaws.com', port=6379, db=0)
# print(rd.llen("waiting_room_1"))
# while(True):
#     for raid_id in range(1,20):
#         cur_waiting_room="waiting_room_"+str(raid_id)
#         cur_waiting_len=rd.llen(cur_waiting_len)
#         if cur_waiting_len>=4:
#             for _ in range(4):
#                 cur_user_name=rd.lpop(cur_waiting_room).decode()
# print(Raid.objects.get(id=1))
                
  
# rd.set("dho","dksehla")
# rd.set("t1","t1",60*60)
# rd.set("u1","r1")
# rd.set("u2","r2")
# rd.set("uu5","uu5")
# rd.set("uu7","uu7",60*60)
# rd.rpush("w2",1,2,3,4,5)
# k=rd.lpop("w2").decode()
# print(k)
# print(type(k))
# s=rd.get("u1").decode('utf-8')

# for item in rd.lrange('w2',0,-1):
#     print(item.decode(),end="")
# print(rd.lrange("w1",0,-1))
# print(s)

# dataDict = {
#     "key1": "1",
#     "key2": "2",
#     "key3": "3"
# }
# jsonDataDict = json.dumps(dataDict, ensure_ascii=False).encode('utf-8')
# rd.set("dict", jsonDataDict)

# resultData = rd.get("dict")
# resultData = resultData.decode('utf-8')

# result = dict(json.loads(resultData))
# print(result)