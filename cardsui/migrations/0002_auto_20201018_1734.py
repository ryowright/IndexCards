# Generated by Django 3.1.2 on 2020-10-18 17:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cardsui', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='card',
            options={'ordering': ['owner', '-created']},
        ),
        migrations.AlterModelOptions(
            name='cardset',
            options={'ordering': ['owner', '-created']},
        ),
    ]