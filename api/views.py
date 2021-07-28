from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import BlogSerializer, CommentSerializer
from .models import Blog, Category, Comment
# from rest_framework.pagination import PageNumberPagination
from .mypagination import MyPagination
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def home(request):
    return render(request, "build/index.html")

@api_view()
def postdata(request):
    paginator = MyPagination()
    paginator.page_size = 2
    result = Blog.objects.all()
    data = paginator.paginate_queryset(result, request)
    serializer = BlogSerializer(data, many=True, context = {"request": request})
    return paginator.get_paginated_response(serializer.data)

@api_view()
def singlepost(request, id):
    data = Blog.objects.get(id=id)
    comment_data = Comment.objects.filter(post_id=id)
    data_serializer = BlogSerializer(data, context = {"request" : request})
    comment_serializer = CommentSerializer(comment_data, many=True)
    return Response({'data': data_serializer.data, 'comment': comment_serializer.data})

@api_view()
def categoryposts(request, category):
    paginator = MyPagination()
    paginator.page_size = 2
    category_data = Category.objects.filter(name=category)
    result = Blog.objects.filter(category_id=category_data[0].id)
    data = paginator.paginate_queryset(result, request)
    serializer = BlogSerializer(data, many=True, context = {"request": request})
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
@csrf_exempt
def comment(request):
    if request.method =='POST':
        print(request.data)
        serializer = CommentSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message" : "Comment successfully save."})
        return Response(serializer.errors)

