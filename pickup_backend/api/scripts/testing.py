from api.models import Game, Sport, Participation
from django.contrib.auth.models import User


def run():
    # User.objects.all().delete()

    # users = ['Sydney Wells', 'Mauricio Ortiz', 'Christian T', 'Gianpierre Terry']
    # for user in users:
    #     first, last = user.split()
    #     User.objects.create(
    #         first_name= f'{first}',
    #         last_name=f'{last}',
    #         username=f'{last}{first[0]}',
    #         password=f'{last}{first[0]}',
    #         email=f'{first}{last}@test.com',
            
    #     )
    
    User.objects.all().delete()
    
    