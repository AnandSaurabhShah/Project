from rest_framework import serializers
from .models import Autism

class AutismSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autism
        fields = '__all__'