# Generated by Django 3.2.5 on 2021-07-14 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_blog_thumbnail'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_id', models.IntegerField()),
                ('name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=256)),
                ('comments', models.CharField(max_length=256)),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
