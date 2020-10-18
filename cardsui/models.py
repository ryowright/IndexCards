from django.db import models

# Create your models here.
class Card(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    value = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    # cardset = models.CharField()
    private = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.User', related_name='cards', on_delete=models.CASCADE)

    class Meta:
        ['owner', '-created']