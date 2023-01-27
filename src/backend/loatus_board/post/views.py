from django.shortcuts import render,redirect,get_object_or_404
from .models import Post
from .forms import RegistForm

# Create your views here.
def index(request):
    board_list=Post.objects.all().order_by('-id')
    context={'board_list': board_list}
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
    context={'board_list': board_list}
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
