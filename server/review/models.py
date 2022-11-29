from django.db import models


class Review(models.Model):
    market = models.CharField(max_length=20)
    user = models.ForeignKey('account.User', related_name='user_uniq_id',
                             on_delete=models.DO_NOTHING, db_column='author')
    content = models.TextField(default='')
    bookmarkCount = models.IntegerField(default=0)
    commentCount = models.IntegerField(default=0)
    likeCount = models.IntegerField(default=0)
    viewCount = models.IntegerField(default=0)
    satisfaction = models.CharField(max_length=20)


class ReviewImage(models.Model):
    review = models.ForeignKey(
        'Review', on_delete=models.CASCADE, related_name='image')
    image = models.ImageField(upload_to='images')
