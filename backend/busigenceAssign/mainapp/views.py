from django.shortcuts import render
import mysql.connector

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .utils import DatabaseList,TableList,DataFetch,getDataFrame,SaveTable,randomString
from .main import Transform_join, Transform_sort
import pandas as pd	
from sqlalchemy import create_engine

class AllDatabase(APIView):
	
	def post(self,request,*args,**kwargs):
		dbList=DatabaseList(request.data)
		res=dbList.execute(request.data)
		if res[1]:
			return Response({"message":res[0]},status=status.HTTP_200_OK)
		else:
			return Response({"message":res[0]},status=status.HTTP_400_BAD_REQUEST)

class TableDetail(APIView):
	
	def post(self,request,*args,**kwargs):
		tbList=TableList(request.data)
		res=tbList.execute(request.data)
		if res[1]:
			return Response({"message":res[0]},status=status.HTTP_200_OK)
		else:   
			return Response({"message":res[0]},status=status.HTTP_400_BAD_REQUEST)

class MergeData(APIView):
	def post(self,request,*args,**kwargs):
		first_data=request.data.get("first")
		second_data=request.data.get("second")
		df1,df2,columnName,joinKey=None,None,None,None

		if 'host' in first_data:
			df1=getDataFrame(first_data)
		else:
			data=first_data.get("data")
			columnName=first_data.get("csvColName")
			df1 = pd.DataFrame(data[1:], columns =data[0] ) 

		if 'host' in second_data:
			df2=getDataFrame(second_data)

		else:
			columnName=second_data.get("csvColName")
			data=second_data.get("data")
			df2 = pd.DataFrame(data[1:], columns =data[0] ) 

		if joinKey is None:
			joinKey=first_data.get("colName")
		if joinKey is None:
			joinKey=first_data.get("csvColName")
		if joinKey is None:
			joinKey=second_data.get("colName")
		if joinKey is None:
			joinKey=second_data.get("csvColName")

		df_join=Transform_join(df1,df2,joinKey,request.data.get("join"))
		df_sort=Transform_sort(df_join,joinKey,int(request.data.get("trans")))
		
		engine = create_engine("mysql://root:Shubh@rsh1998@localhost/MYSQL_T")
		con = engine.connect()
		newTableName=joinKey+randomString()
		df_sort.to_sql(name=newTableName,con=con,if_exists='replace')
		fileName=df_sort.to_csv('./'+newTableName,index=None,header=True)
		
		return Response({"message":'''Your merged data is saved with file name "+str(newTableName)+" in the database MYSQL_T. 
			It's credential are username-:root; password-:Shubh@rsh1998; and host-:localhost ''',"file":df_sort.values.tolist(),"name":newTableName,"colheader":list(df_sort.columns.values)
			})


