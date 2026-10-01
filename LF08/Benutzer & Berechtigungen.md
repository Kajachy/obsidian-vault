___
Bestandteil folgender docs:
- [[docs/LF08/Nachschlagewerk.pdf|Nachschlagewerk]]
- [[Aufgabenpaket_5_Benutzer_und_Rechte.pdf]]

Online-Links:
- 

Zugehörig zu:
#LF08 #LF08-Grundlagen
___
# Konzept

| Aufgabenbereich | SELECT | INSERT | UPDATE | DELETE | CREATE | ALTER | DROP |
| --------------- | :----: | :----: | :----: | :----: | :----: | :---: | :--: |
| Lesen           |   ✅    |   ❌    |   ❌    |   ❌    |   ❌    |   ❌   |  ❌   |
| Daten Pflege    |   ✅    |   ✅    |   ✅    |   ✅    |   ❌    |   ❌   |  ❌   |
| DB-Struktur     |   ✅    |   ✅    |   ✅    |   ✅    |   ✅    |   ✅   |  ✅   |
DCL (Zugriffsrechte) werden bewusst nicht vergeben, da sie die Befugnisse der Aufgabenbereiche übersteigen.

# Benutzer anlegen

`CREATE USER 'name'@'localhost' IDENTIFIED BY 'pasword';`
--> User erstellen

`SELECT User FROM mysql.user;`
--> Alle User anzeigen

```sql
mysql> CREATE USER 'TWOne_read'@'localhost' IDENTIFIED BY 'xxxx';
Query OK, 0 rows affected (0,01 sec)

mysql> CREATE USER 'TWOne_mgmt'@'localhost' IDENTIFIED BY 'xxxx';
Query OK, 0 rows affected (0,00 sec)

mysql> CREATE USER 'TWOne_structure'@'localhost' IDENTIFIED BY 'xxxx';
Query OK, 0 rows affected (0,00 sec)

mysql> SELECT User, Host FROM mysql.user;
+------------------+-----------+
| User             | Host      |
+------------------+-----------+
| TWOne_mgmt       | localhost |
| TWOne_read       | localhost |
| TWOne_structure  | localhost |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
7 rows in set (0,00 sec)
```


# Rechte vergeben

`GRANT SELECT ON db.table TO 'name'@'localhost';`
--> User die Berechtigung SELECT auf db.table geben

`SHOW GRANTS FOR 'name'@'localhost';`
--> Berechtigungen eines Users anzeigen

```sql
mysql> GRANT SELECT ON TWOne.* TO 'TWOne_read'@'localhost';
Query OK, 0 rows affected (0,00 sec)

mysql> GRANT SELECT,INSERT,UPDATE,DELETE ON TWOne.* TO 'TWOne_mgmt'@'localhost';
Query OK, 0 rows affected (0,00 sec)

mysql> GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,ALTER,DROP ON TWOne.* TO 'TWOne_structure'@'localhost';
Query OK, 0 rows affected (0,00 sec)

mysql> SHOW GRANTS FOR 'TWOne_read'@'localhost'; 
+-------------------------------------------------------+
| Grants for TWOne_read@localhost                       |
+-------------------------------------------------------+
| GRANT USAGE ON *.* TO `TWOne_read`@`localhost`        |
| GRANT SELECT ON `twone`.* TO `TWOne_read`@`localhost` |
+-------------------------------------------------------+
2 rows in set (0,00 sec)

mysql> SHOW GRANTS FOR 'TWOne_mgmt'@'localhost';
+------------------------------------------------------------------------+
| Grants for TWOne_mgmt@localhost                                        |
+------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO `TWOne_mgmt`@`localhost`                         |
| GRANT SELECT, INSERT, UPDATE, DELETE ON `twone`.* One_mgmt`@`localhost`|
+------------------------------------------------------------------------+
2 rows in set (0,01 sec)

mysql> SHOW GRANTS FOR 'TWOne_structure'@'localhost';
+------------------------------------------------------------------------+
| Grants for TWOne_structure@localhost                                   |
+------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO `TWOne_structure`@`localhost`                    |
| GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER ON `twone`.* | TO `TWOne_structure`@`localhost`                                       |
+------------------------------------------------------------------------+
2 rows in set (0,00 sec)
```


# Rechte testen

`SELECT CURRENT_USER();`
--> gibt aktuellen User zurück

`SHOW GRANTS;`
--> gibt Berechtigungen des aktuellen Users zurück

## TWOne_read
```sql
mysql> SELECT CURRENT_USER();
+----------------------+
| CURRENT_USER()       |
+----------------------+
| TWOne_read@localhost |
+----------------------+
1 row in set (0,00 sec)

mysql> SHOW GRANTS;
+-------------------------------------------------------+
| Grants for TWOne_read@localhost                       |
+-------------------------------------------------------+
| GRANT USAGE ON *.* TO `TWOne_read`@`localhost`        |
| GRANT SELECT ON `twone`.* TO `TWOne_read`@`localhost` |
+-------------------------------------------------------+
2 rows in set (0,00 sec)

mysql> SELECT * FROM TWOne.Customers WHERE CustomerId = 3;
+------------+--------+-----------+-----------+--------------+
| CustomerId | Name   | FirstName | CountryId | City         |
+------------+--------+-----------+-----------+--------------+
|          3 | Wojack | Albert    |         1 | 12234 Berlin |
+------------+--------+-----------+-----------+--------------+
1 row in set (0,01 sec)

mysql> INSERT INTO TWOne.Countrys (CountryName) VALUES ("Neu Seeland");
ERROR 1142 (42000): INSERT command denied to user 'TWOne_read'@'localhost' for table 'countrys'

mysql> UPDATE TWOne.Countrys SET CountryName = "Deutschland 2" WHERE CountryName ="Deutschland";
ERROR 1142 (42000): UPDATE command denied to user 'TWOne_read'@'localhost' for table 'countrys'
```

## TWOne_mgmt
```sql
mysql> SELECT CURRENT_USER();
+----------------------+
| CURRENT_USER()       |
+----------------------+
| TWOne_mgmt@localhost |
+----------------------+
1 row in set (0,00 sec)

mysql> SHOW GRANTS;
+------------------------------------------------------------------------+
| Grants for TWOne_mgmt@localhost                                        |
+------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO `TWOne_mgmt`@`localhost`                         |
| GRANT SELECT, INSERT, UPDATE, DELETE ON `twone`.* TO                   | `TWOne_mgmt`@`localhost`                                               |
+------------------------------------------------------------------------+
2 rows in set (0,00 sec)

mysql> INSERT INTO TWOne.Countrys (CountryName) VALUES ("Neu Seeland");
Query OK, 1 row affected (0,01 sec)

mysql> SELECT * FROM TWOne.Countrys;
+-----------+-------------+
| CountryId | CountryName |
+-----------+-------------+
|         1 | Deutschland |
|         2 | Finnland    |
|         3 | Niederlande |
|         4 | Schweiz     |
|         5 | Österreich  |
|         6 | USA         |
|         7 | Japan       |
|         8 | Neu Seeland |
+-----------+-------------+
8 rows in set (0,00 sec)

mysql> UPDATE TWOne.Countrys SET CountryName = "test land" WHERE CountryName ="Neu Seeland";
Query OK, 1 row affected (0,00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> CREATE TABLE TWOne.TestTable;
ERROR 1142 (42000): CREATE command denied to user 'TWOne_mgmt'@'localhost' for table 'testtable'

mysql> DROP TABLE TWOne.Countrys;
ERROR 1142 (42000): DROP command denied to user 'TWOne_mgmt'@'localhost' for table 'countrys'
```

## TWOne_structure
```sql
mysql> SELECT CURRENT_USER();
+---------------------------+
| CURRENT_USER()            |
+---------------------------+
| TWOne_structure@localhost |
+---------------------------+
1 row in set (0,00 sec)

mysql> SHOW GRANTS;
+------------------------------------------------------------------------+
| Grants for TWOne_structure@localhost                                   |
+------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO `TWOne_structure`@`localhost`                    |
| GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER ON `twone`.* | TO `TWOne_structure`@`localhost`                                       |
+------------------------------------------------------------------------+
2 rows in set (0,00 sec)

mysql> CREATE TABLE TWOne.TestTable(TestId INT);
Query OK, 0 rows affected (0,01 sec)

mysql> DROP TABLE TWOne.TestTable;
Query OK, 0 rows affected (0,01 sec)
```


# Rechte entziehen

`REVOKE SELECT ON db.table FROM 'name'@'localhost';`
--> entzieht User Berechtigung SELECT

```sql
mysql> SHOW GRANTS FOR 'test'@'localhost';
+------------------------------------------------------------------------+
| Grants for test@localhost                                              |
+------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO `test`@`localhost`                               |
| GRANT SELECT, INSERT, UPDATE, DELETE ON `twone`.* TO `test`@`localhost`|
+------------------------------------------------------------------------+
2 rows in set (0,00 sec)

mysql> REVOKE DELETE ON TWOne.* FROM 'test'@'localhost';
Query OK, 0 rows affected (0,01 sec)

mysql> SHOW GRANTS FOR 'test'@'localhost';
+-----------------------------------------------------------------+
| Grants for test@localhost                                       |
+-----------------------------------------------------------------+
| GRANT USAGE ON *.* TO `test`@`localhost`                        |
| GRANT SELECT, INSERT, UPDATE ON `twone`.* TO `test`@`localhost` |
+-----------------------------------------------------------------+
2 rows in set (0,00 sec)
```

# User entfernen

`DROP USER 'name'@'localhost';`
--> User löschen

```sql
mysql> SELECT User, Host FROM mysql.user;
+------------------+-----------+
| User             | Host      |
+------------------+-----------+
| TWOne_mgmt       | localhost |
| TWOne_read       | localhost |
| TWOne_structure  | localhost |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+

mysql> DROP USER 'TWOne_read'@'localhost';
Query OK, 0 rows affected (0,01 sec)

mysql> DROP USER 'TWOne_mgmt'@'localhost';
Query OK, 0 rows affected (0,00 sec)

mysql> DROP USER 'TWOne_structure'@'localhost';
Query OK, 0 rows affected (0,01 sec)

mysql> SELECT User, Host FROM mysql.user;
+------------------+-----------+
| User             | Host      |
+------------------+-----------+
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
4 rows in set (0,00 sec)
```