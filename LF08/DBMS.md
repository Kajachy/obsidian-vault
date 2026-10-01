___
Bestandteil folgender docs:
- [[docs/LF08/Nachschlagewerk.pdf|Nachschlagewerk]]
- [[Aufgabenpaket_3_DBMS.pdf]]

Online-Links:
- 

Zugehörig zu:
#LF08 #LF08-Grundlagen
___

# Version prüfen & Datenbanken

`SELECT VERSION();`
--> gibt mySQL Version zurück

`SHOW DATABASES;`
--> zeigt alle Datenbanken

`CREATE DATABASE name;`
--> Erstellt Datenbank

`DROP DATABASE name;`
--> Löscht Datenbank

``` sql

mysql> SELECT VERSION();
+-----------+
| VERSION() |
+-----------+
| 8.0.44    |
+-----------+
1 row in set (0,00 sec)

mysql> 
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| TWOne              |
+--------------------+
5 rows in set (0,00 sec)

mysql> 
mysql> CREATE DATABASE db_probe;
Query OK, 1 row affected (0,00 sec)

mysql> 
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| db_probe           |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| TWOne              |
+--------------------+
6 rows in set (0,00 sec)

mysql> 
mysql> DROP DATABASE db_probe;
Query OK, 0 rows affected (0,00 sec)

mysql> 
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| TWOne              |
+--------------------+
5 rows in set (0,00 sec)


```
