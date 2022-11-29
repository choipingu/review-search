from rest_framework import serializers

from .models import Review, ReviewImage
from account.models import User


class ReviewImageSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ReviewImage
        fields = ['image']


class ReviewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    nickname = serializers.CharField(source='user.nickname')
    profileImage = serializers.ImageField(
        source="user.profileImage", use_url=True)

    class Meta:
        model = User
        fields = ['email', 'nickname', 'profileImage']


class ReviewSerializer(serializers.ModelSerializer):

    images = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    def get_images(self, obj):
        image = obj.image.all()
        return ReviewImageSerializer(instance=image, many=True, context=self.context).data

    def get_author(self, obj):
        author = obj.user.user_uniq_id.filter(user_id=obj.user.id)[0]
        return UserSerializer(instance=author).data

    class Meta:
        model = Review
        fields = '__all__'

    def create(self, validated_data):
        instance = Review.objects.create(**validated_data)
        image_set = self.context['request'].FILES
        for image_data in image_set.getlist('image'):
            ReviewImage.objects.create(review=instance, image=image_data)
        return instance
