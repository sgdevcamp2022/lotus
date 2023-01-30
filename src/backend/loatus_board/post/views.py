from django.shortcuts import render,redirect,get_object_or_404
from .models import Post, Comment
from .forms import RegistForm
from django.core.paginator import Paginator
from django.utils import timezone
# Create your views here.
def index(request):
    page=request.GET.get('page', '1')
    board_list=Post.objects.all().order_by('-id')

    paginator=Paginator(board_list, 10)
    page_obj=paginator.get_page(page)

    context={'board_list': page_obj}
    return render(request, 'post/index.html', context)

def regist(request):
    if request.method=='POST':
        form=RegistForm(request.POST)
        if form.is_valid():
            post=form.save()
            return redirect('post:index')
    else:
        form=RegistForm()
    context={'form': form}
    return render(request, 'post/regist_form.html', context)

def detail(request, pk):
    board_list=get_object_or_404(Post, id=pk)
    comments=Comment.objects.filter(post=pk)
    if request.method=='POST':
        comment=Comment()
        comment.post=board_list
        comment.user=request.POST['user_name']
        comment.text=request.POST['body']
        comment.created_at=timezone.now()
        comment.save()
    context={'board_list': board_list, 'comments': comments}
    return render(request, 'post/detail.html', context)

def edit(request, pk):
    post = get_object_or_404(Post, id=pk)
    if request.method == 'POST':
        form = RegistForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save()
            return redirect('post:index')
    else:
        form = RegistForm(instance=post)
    context = {'form': form}
    return render(request, 'post/edit.html', context)

def delete(request, pk):
    post=get_object_or_404(Post, id=pk)    
    post.delete()
    return redirect('post:index')
