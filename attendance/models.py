from django.db import models
from django.conf import settings

# Create your models here.

class Student(models.Model):
    """Student model based on existing database structure"""
    name = models.CharField(max_length=255)
    grade = models.IntegerField()
    hcpss_email = models.EmailField(unique=True)
    account_email = models.EmailField(blank=True)
    phone_num = models.CharField(max_length=20, blank=True)
    receive_notif = models.BooleanField(default=False)
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='students'
    )
    teacher_period2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='period2_students'
    )
    theme = models.CharField(max_length=50, blank=True)
    temp_teacher = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = 'students'  # Match existing table name

    def __str__(self):
        return f"{self.name} (Grade {self.grade})"

class Announcement(models.Model):
    """Announcement model based on existing database structure"""
    timestamp = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='announcements'
    )

    class Meta:
        db_table = 'announcements'

    def __str__(self):
        return f"{self.title} by {self.teacher.get_full_name()}"

class Notification(models.Model):
    """Notification model based on existing database structure"""
    timestamp = models.DateTimeField(auto_now=True)
    message = models.TextField()

    class Meta:
        db_table = 'notifications'

    def __str__(self):
        return f"Notification from {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
