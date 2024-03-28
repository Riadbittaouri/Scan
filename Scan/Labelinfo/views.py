from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Labelinfo
from rest_framework import generics
from .serializers import LabelInfoSerializer


class LabelinfoListCreate(generics.ListCreateAPIView):
    queryset = Labelinfo.objects.all()
    serializer_class = LabelInfoSerializer


class LabelinfoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Labelinfo.objects.all()
    serializer_class = LabelInfoSerializer


class LabelinfoDetailView(APIView):
    def get(self, request, handling_unit, format=None):
        try:
            labelinfo = Labelinfo.objects.get(HandlingUnit=handling_unit)
            serializer = LabelInfoSerializer(labelinfo)
            return Response(serializer.data)
        except Labelinfo.DoesNotExist:
            return Response({"error": "Labelinfo not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, handling_unit, format=None):
        try:
            labelinfo = Labelinfo.objects.get(HandlingUnit=handling_unit)
            labelinfo.delete()
            return Response({"message": "Labelinfo deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Labelinfo.DoesNotExist:
            return Response({"error": "Labelinfo not found"}, status=status.HTTP_404_NOT_FOUND)


class LabelinfoList(APIView):
    def get(self, request, format=None):
        labelinfos = Labelinfo.objects.all()
        serializer = LabelInfoSerializer(labelinfos, many=True)
        return Response(serializer.data)
