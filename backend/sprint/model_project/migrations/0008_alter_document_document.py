# Generated by Django 4.1.2 on 2022-12-05 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('model_project', '0007_alter_task_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='document',
            field=models.CharField(default='', max_length=100),
        ),
    ]
