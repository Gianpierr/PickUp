from api.models import Game, Sport, Participation
from django.contrib.auth.models import User


def run():
    User.objects.filter(first_name='gianpierre').update(
        username = 'gian_pierre314'
    )
    
    
    