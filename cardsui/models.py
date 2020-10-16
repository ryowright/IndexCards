from django.db import models

# Create your models here.
class Card(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    value = models.CharField(max_length=100, blank=True)
    # cardset = models.CharField()
    private = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.User', related_name='cards', on_delete=models.CASCADE)

    class Meta:
        ['owner', '-created']