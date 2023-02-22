from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Raid(models.Model):
    id=models.AutoField(primary_key=True)
    raid_name=models.CharField(max_length=50)
    req_item_lev=models.IntegerField()

class Party(models.Model):
    id=models.AutoField(primary_key=True)
    cur_raid_id=models.ForeignKey("Raid", related_name="raid", on_delete=models.CASCADE, db_column="raid_id")
    party_size=models.IntegerField()
    party_state=models.IntegerField()

class Matching(models.Model):
    cur_party_id=models.ForeignKey("Party", related_name="party", on_delete=models.CASCADE, db_column="party_id")
    user_id=models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id")