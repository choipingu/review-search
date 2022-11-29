import json
from django.http import JsonResponse
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Review
from .serializers import ReviewSerializer, ReviewPostSerializer
from rest_framework.viewsets import ModelViewSet


class ReviewPostSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class Search(APIView):

    def get(self, request, market):
        review = Review.objects.filter(
            market__contains=market) | Review.objects.filter(content__contains=market)
        serializer = ReviewSerializer(review, many=True)
        if serializer is not None:
            return Response(serializer.data)
        return Response({"message": "Failed"})
