from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Card(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    value = models.CharField(max_length=100, blank=True)
    description = models.TextField(max_length=300)
    owner = models.ForeignKey(User, related_name='cards', on_delete=models.CASCADE)
    cardset = models.ForeignKey('CardSet', related_name='cards', on_delete=models.CASCADE)

    class Meta:
        ordering = ['owner', '-created']

    def __str__(self):
        return self.value

class CardSet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name='cardsets', on_delete=models.CASCADE, default="")
    title = models.CharField(max_length=100, default="Untitled", blank=True)
    description = models.TextField(blank=True, max_length=300)
    private = models.BooleanField(default=False)

    class Meta:
        ordering = ['owner', '-created']

    def __str__(self):
        return self.title