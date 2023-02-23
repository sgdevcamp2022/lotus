sudo docker build -t django_test -f ./test/Dockerfile . &&
sudo docker tag django_test hyeonseong0917/django_test &&
sudo docker push hyeonseong0917/django_test