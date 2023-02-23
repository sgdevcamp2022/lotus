import pymysql

con = pymysql.connect(host='database-1.cdqrhabqhxkm.ap-northeast-2.rds.amazonaws.com', user='admin', password='admin123',
                      db='BOARD', charset='utf8'
                     )
cur = con.cursor()
sql = "SELECT * FROM post_post" 
cur.execute(sql)
rows=cur.fetchall()

print(rows[0][0])
print(type(rows))