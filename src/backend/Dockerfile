FROM python:3.7.7
RUN pip install django
RUN pip install django-cors-headers
RUN pip install mysqlclient
RUN pip install pymysql
RUN pip install PyJWT
RUN pip install requests
RUN pip install redis
RUN pip install django-redis
WORKDIR /usr/src/app
COPY . .
WORKDIR ./loatus_board
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["/bin/sh", "-ec", "while :; do echo 'Hello World'; sleep 5 ; done"]          
EXPOSE 8000
