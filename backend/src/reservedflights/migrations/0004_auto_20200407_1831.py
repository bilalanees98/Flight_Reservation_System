# Generated by Django 3.0.3 on 2020-04-07 13:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservedflights', '0003_auto_20200407_1828'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservedflight',
            old_name='dropabale',
            new_name='dropable',
        ),
    ]
