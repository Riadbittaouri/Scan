# Generated by Django 5.0.3 on 2024-03-28 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Labelinfo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='labelinfo',
            name='id',
        ),
        migrations.AlterField(
            model_name='labelinfo',
            name='HandlingUnit',
            field=models.CharField(max_length=100, primary_key=True, serialize=False, unique=True),
        ),
    ]
