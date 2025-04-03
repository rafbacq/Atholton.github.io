from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Student, Announcement, Notification, ClassPeriod

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class StudentSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    teacher_period2 = UserSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = (
            'id', 'name', 'grade', 'hcpss_email', 'account_email',
            'phone_num', 'receive_notif', 'teacher', 'teacher_period2',
            'theme', 'temp_teacher'
        )

class ClassPeriodSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    available_seats = serializers.SerializerMethodField()
    
    class Meta:
        model = ClassPeriod
        fields = (
            'id', 'period', 'teacher', 'room_number', 'subject',
            'capacity', 'current_enrollment', 'available_seats'
        )
        
    def get_available_seats(self, obj):
        return obj.capacity - obj.current_enrollment

class AnnouncementSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    
    class Meta:
        model = Announcement
        fields = ('id', 'title', 'body', 'teacher', 'timestamp')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'message', 'timestamp')
