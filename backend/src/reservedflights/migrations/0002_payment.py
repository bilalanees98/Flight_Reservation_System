# Generated by Django 3.0.3 on 2020-03-25 10:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reservedflights', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('noOfAdults', models.SmallIntegerField()),
                ('noOfChildren', models.SmallIntegerField()),
                ('dateTime', models.DateTimeField(verbose_name=True)),
                ('amount', models.FloatField()),
                ('reservedFlightNo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reservedflights.ReservedFlight')),
            ],
        ),
    ]
