from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import instaloader
import urllib.parse

bot = instaloader.Instaloader()

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def get_info(request):
    if request.method == 'GET':
        try:
            username = request.GET.get('username')
            if username:
                username = urllib.parse.unquote(username)

            if not username:
                return JsonResponse({'error': 'Missing username'}, status=400)
            profile = instaloader.Profile.from_username(bot.context, username)
        
            data = {
                'username': profile.username,
                'userid': profile.userid,
                'mediacount': profile.mediacount,
                'followers': profile.followers,
                'followees': profile.followees,
                'biography': profile.biography
            }
        
            return JsonResponse(data, status=200)
        except instaloader.ProfileNotExistsException:
            return JsonResponse({'error': 'Profile not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
