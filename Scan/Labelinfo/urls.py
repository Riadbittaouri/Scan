from django.urls import path
from .views import LabelinfoListCreate, LabelinfoDetailView, LabelinfoList

urlpatterns = [
    path('create-labelinfo/', LabelinfoListCreate.as_view(),
         name='labelinfo-list-create'),
    path('get-labelinfo/<str:handling_unit>/',
         LabelinfoDetailView.as_view(), name='labelinfo-detail'),
    path('delete-labelinfo/<str:handling_unit>/',
         LabelinfoDetailView.as_view(), name='labelinfo-delete'),
    path('get-all-labelinfo/', LabelinfoList.as_view(), name='labelinfo-list'),
]
