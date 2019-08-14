import mysql.connector
from mysql.connector import Error
from abc import abstractmethod
import random
import string
import pandas as pd
from sqlalchemy import create_engine

class ManageDatabase():
    
  def __init__(self,data):
    self.host=data.get("host")
    self.user=data.get("username")
    self.password=data.get("password")
    self.connection=None
    self.cursor=None

  def closeDb(self):
    if self.connection and self.connection.is_connected():
      if self.cursor:
        self.cursor.close()
      self.connection.close()

  def initiate_connection(self):
    self.connection = mysql.connector.connect(host=self.host,user=self.user,password=self.password)
    #connection = mysql.connector.connect(host="localhost",user="root",password="Shubh@rsh1998")
    if self.connection and self.connection.is_connected():
      self.cursor = self.connection.cursor()
    
  @abstractmethod
  def runquery(self,exData): 
    pass

  def get_cursor(self):
    return self.cursor
  
  def get_conn(self):
    return self.connection

  def template_method(self,exData):
    self.initiate_connection()
    self.runquery(exData)
    self.closeDb()


class DatabaseList(ManageDatabase):

  def __init__(self,data):
    ManageDatabase.__init__(self, data) 
    self.resdata=None

  def runquery(self,exData):
    cursor=self.get_cursor()
    cursor.execute("use INFORMATION_SCHEMA")
    cursor.execute('''SELECT table_schema, table_name
                    FROM INFORMATION_SCHEMA.tables
                    ORDER BY table_schema, table_name;''')
    self.resdata=cursor.fetchall()

  def execute(self,exData):
    try:
      self.template_method(exData)
      return self.resdata,True
    except Error as e:
      self.closeDb()
      return str(e),False

class TableList(ManageDatabase):

  def __init__(self,data):
    ManageDatabase.__init__(self, data) 
    self.resdata=None

  def runquery(self,exData):
    cursor=self.get_cursor()
    cursor.execute("use "+str(exData.get("dbName")))
    cursor.execute("desc "+str(exData.get("tableName")))
    self.resdata=cursor.fetchall()

  def execute(self,exData):
    try:
      self.template_method(exData)
      return self.resdata,True
    except Error as e:
      self.closeDb()
      return str(e),False

class DataFetch(ManageDatabase):

  def __init__(self,data):
    ManageDatabase.__init__(self, data) 
    self.resdata=None

  def runquery(self,exData):
    cursor=self.get_cursor()
    cursor.execute("use "+str(exData.get("dbName")))
    cursor.execute("select * from "+str(exData.get("tableName")))
    self.resdata=cursor.fetchall()

  def execute(self,exData):
    try:
      self.template_method(exData)
      return self.resdata,True
    except Error as e:
      self.closeDb()
      return str(e),False

class SaveTable(ManageDatabase):

  def __init__(self,data):
    ManageDatabase.__init__(self, data) 
    self.resdata=None

  def runquery(self,exData):
    cursor=self.get_cursor()
    cursor.execute("use MYSQL_T")
    con=self.get_conn()
    exData.get("df").to_sql(name=exData.get("name"),con= con, if_exists='replace')
    self.resdata=cursor.fetchall()

  def execute(self,exData):
    try:
      self.template_method(exData)
      return self.resdata,True
    except Error as e:
      self.closeDb()
      return str(e),False

def randomString(stringLength=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))

def getDataFrame(data):
  tbData=DataFetch(data )
  tbList=TableList(data)

  res=tbList.execute(data)
  tbDataRes=tbData.execute(data)
  colNames=[i[0] for i in res[0]]
  columnName=data.get("colName")
  df1=pd.DataFrame(tbDataRes[0],columns=colNames)
  return df1
