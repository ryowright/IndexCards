# Generated by Django 3.1.2 on 2020-11-22 02:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cardsui', '0004_auto_20201112_0205'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='description',
            field=models.TextField(max_length=300),
        ),
        migrations.AlterField(
            model_name='cardset',
            name='description',
            field=models.TextField(blank=True, max_length=300),
        ),
    ]
