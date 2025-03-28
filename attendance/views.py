from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Student, Announcement, Notification
from .serializers import StudentSerializer, AnnouncementSerializer, NotificationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_list(request):
    """API endpoint for listing students"""
    # Get filters from query params
    grade = request.GET.get('grade')
    teacher = request.GET.get('teacher')
    search = request.GET.get('search')
    
    # Start with all students
    students = Student.objects.all()
    
    # Apply filters
    if grade:
        students = students.filter(grade=grade)
    if teacher:
        students = students.filter(teacher=teacher)
    if search:
        students = students.filter(name__icontains=search)
    
    # Paginate results
    page_size = int(request.GET.get('page_size', 25))
    paginator = Paginator(students, page_size)
    page = request.GET.get('page', 1)
    students = paginator.get_page(page)
    
    # Serialize data
    data = {
        'results': StudentSerializer(students, many=True).data,
        'total_pages': paginator.num_pages,
        'current_page': page,
        'has_next': students.has_next(),
        'has_previous': students.has_previous()
    }
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_detail(request, student_id):
    """API endpoint for student details"""
    student = get_object_or_404(Student, pk=student_id)
    announcements = Announcement.objects.filter(teacher=student.teacher)
    
    data = {
        'student': StudentSerializer(student).data,
        'announcements': AnnouncementSerializer(announcements, many=True).data
    }
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def announcement_list(request):
    """API endpoint for listing announcements"""
    announcements = Announcement.objects.all().order_by('-timestamp')
    
    # Paginate results
    page_size = int(request.GET.get('page_size', 10))
    paginator = Paginator(announcements, page_size)
    page = request.GET.get('page', 1)
    announcements = paginator.get_page(page)
    
    data = {
        'results': AnnouncementSerializer(announcements, many=True).data,
        'total_pages': paginator.num_pages,
        'current_page': page,
        'has_next': announcements.has_next(),
        'has_previous': announcements.has_previous()
    }
    return Response(data)
