# Generated by Django 4.1.2 on 2022-12-03 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('model_user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='link',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
