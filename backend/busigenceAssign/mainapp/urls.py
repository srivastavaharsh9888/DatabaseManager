from django.conf.urls import url
from .views import AllDatabase,TableDetail,MergeData

urlpatterns=[
	url('showDatabase/$',AllDatabase.as_view(),name='db'),
	url('tableDetail/$',TableDetail.as_view(),name='table'),
	url('mergeData/$',MergeData.as_view(),name='merge')	
]