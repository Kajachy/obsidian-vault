___
Bestandteil folgender docs:
- [[docs/LF08/Nachschlagewerk.pdf|Nachschlagewerk]]
- [[Aufgabenpaket_4_SQL.pdf]]

Online-Links:
- 

Zugehörig zu:
#LF08 #LF08-Grundlagen
___

# Befehlsgruppen

| Gruppe  | Befehle                      | Zweck                                         | Beispiel                       |
| ------- | ---------------------------- | --------------------------------------------- | ------------------------------ |
| **DDL** | `CREATE`, `ALTER`, `DROP`    | Datenbankstruktur erstellen/verändern/löschen | `CREATE TABLE Customers (...)` |
| **DML** | `INSERT`, `UPDATE`, `DELETE` | Datensätze einfügen/verändern/löschen         | `INSERT INTO Customers ...`    |
| **DQL** | `SELECT`                     | Daten abfragen                                | `SELECT * FROM Customers;`     |
| **DCL** | `GRANT`, `REVOKE`            | Zugriffsrechte vergeben/entziehen             | `GRANT SELECT ...`             |
| **TCL** | `COMMIT`, `ROLLBACK`         | Transaktionen bestätigen/rückgängig machen    | `ROLLBACK;`                    |


- **Datenbankstruktur** → Tabellen, Spalten, Schlüssel usw.
- **Datensätze** → die tatsächlich gespeicherten Kunden, Artikel usw.
- **Zugriffsrechte** → wer welche Daten lesen/verändern darf.


# Datenbankstruktur erstellen

```sql

USE `TWOne`;

  

CREATE TABLE `Countrys` (

`CountyId` INT NOT NULL AUTO_INCREMENT,

`CountryName` VARCHAR(100) NOT NULL,

PRIMARY KEY (`CountyId`)

);

CREATE TABLE `Customers` (

`CustomerId` INT NOT NULL AUTO_INCREMENT,

`Name` VARCHAR(100) NOT NULL,

`FirstName` VARCHAR(100) NOT NULL,

`CountryId` INT NOT NULL,

`City` VARCHAR(150) NOT NULL,

`Street` VARCHAR(150) NOT NULL,

`Birthday` DATE NOT NULL,

PRIMARY KEY (`CustomerId`),

CONSTRAINT `fk_customer_country`

FOREIGN KEY (`CountryId`)

REFERENCES `Countrys` (`CountryId`)

);

  

CREATE TABLE `Producers` (

`ProducerId` INT NOT NULL AUTO_INCREMENT,

`ProducerName` VARCHAR(100) NOT NULL,

CountryId INT NOT NULL,

PRIMARY KEY (`ProducerId`),

CONSTRAINT `fk_producer_country`

FOREIGN KEY (`CountryId`)

REFERENCES TWOne.Countrys (`CountryId`)

);

  

CREATE TABLE Articles (

ArticleId INT NOT NULL AUTO_INCREMENT,

ArticleType VARCHAR(100) NOT NULL,

ProducerId INT NOT NULL,

Price DECIMAL(10,2) NOT NULL,

PRIMARY KEY (ArticleId),

CONSTRAINT fk_article_producer

FOREIGN KEY (ProducerId)

REFERENCES TWOne.Producers (ProducerId)

);

  

CREATE TABLE SalesDepartments (

SalesDepartmentId INT NOT NULL AUTO_INCREMENT,

Director VARCHAR(100) NOT NULL,

CountryId INT NOT NULL,

PRIMARY KEY (SalesDepartmentId),

CONSTRAINT fk_salesdepartment_country

FOREIGN KEY (SalesDepartmentId)

REFERENCES TWOne.Countrys (CountryId)

);

  

CREATE TABLE Orders (

CustomerId INT NOT NULL,

ArticleId INT NOT NULL,

Quantity INT NOT NULL,

SalesDepartmentId INT NOT NULL,

TotalCosts DECIMAL(15,2),

CONSTRAINT fk_order_customer

FOREIGN KEY (CustomerId)

REFERENCES TWOne.Customers (CustomerId),

CONSTRAINT fk_order_article

FOREIGN KEY (ArticleId)

REFERENCES TWOne.Articles (ArticleId),

CONSTRAINT fk_order_salesdepartment

FOREIGN KEY (SalesDepartmentId)

REFERENCES TWOne.SalesDepartments (SalesDepartmentId)

);

```


# Testdaten einfügen

```sql

USE `TWOne`;

START TRANSACTION;

-- Falschen Fremdschlüssel korrigieren

ALTER TABLE TWOne.`SalesDepartments`

DROP FOREIGN KEY `fk_salesdepartment_country`;

ALTER TABLE TWOne.`SalesDepartments`

ADD CONSTRAINT `fk_salesdepartment_country`

FOREIGN KEY (`CountryId`)

REFERENCES TWOne.`Countrys` (`CountryId`);

-- Länder

INSERT INTO TWOne.`Countrys`

(`CountryId`, `CountryName`)

VALUES

(1, 'Deutschland'),

(2, 'Finnland'),

(3, 'Niederlande'),

(4, 'Schweiz'),

(5, 'Österreich'),

(6, 'USA'),

(7, 'Japan');

-- Hersteller

INSERT INTO TWOne.`Producers`

VALUES

(1, 'Logitech', 4),

(2, 'Maxtor', 6),

(3, 'Hewlett Packard', 6),

(4, 'Sony', 7),

(5, 'Medion', 1);

-- Kunden

INSERT INTO TWOne.`Customers`

(`CustomerId`, `Name`, `FirstName`, `CountryId`, `City`, `Street`, `Birthday`)

VALUES

(1, 'Blotzek', 'Ulrich', 1, '59823 Arnsberg', 'Großkopf 4', '1960-10-05'),

(2, 'Schatter', 'Peter', 1, '89176 Augsburg', 'Försterstrasse 56', '1980-01-01'),

(3, 'Wojack', 'Albert', 1, '12234 Berlin', 'Westendstrasse 92', '1955-06-15'),

(4, 'Virtanen', 'Veera', 2, '2150 Espoo', 'Oyi Keilasatama 21', '1992-12-30'),

(5, 'Hämäläinen', 'Ahvo', 2, '30100 Forssa', 'Tapulikuja 56', '1977-04-23'),

(6, 'Huisman', 'Fenna', 3, '1315 Almere', 'Spoordreef 87', '1971-08-17'),

(7, 'Prins', 'Lieke', 3, '4600 Bergen op Zoom', 'Noordgeest 21', '1987-05-08'),

(8, 'Paula', 'David', 5, '9020 Klagenfurt', 'Murielstrasse 47', '1970-01-21'),

(9, 'Hardiff', 'Joseph', 5, '9020 Klagenfurt', 'Bahnhofstrasse 139', '1962-08-09');

-- Artikel

INSERT INTO TWOne.`Articles`

(`ArticleId`, `ArticleType`, `ProducerId`, `Price`)

VALUES

(1, 'Tastatur', 1, 20.00),

(2, 'Maus', 1, 10.00),

(3, 'Drucker', 3, 300.00),

(4, 'Monitor', 4, 500.00),

(5, 'Festplatte', 2, 400.00),

(6, 'Notebook', 5, 2500.00);

-- Verkaufsabteilungen

INSERT INTO TWOne.`SalesDepartments`

(`SalesDepartmentId`, `Director`, `CountryId`)

VALUES

(1, 'Lars Kramer', 1),

(2, 'Sabine Hellberg', 1),

(3, 'Alwin Sommer', 2),

(4, 'Sabine Kaufhold', 3),

(5, 'Peter Michel', 3),

(6, 'Alois Pranzner', 5),

(7, 'Martin Lesser', 5);

-- Bestellungen

INSERT INTO TWOne.`Orders`

(`CustomerId`, `ArticleId`, `Quantity`, `SalesDepartmentId`, `TotalCosts`)

VALUES

(1, 1, 1, 1, 20.00),

(2, 2, 3, 2, 30.00),

(3, 3, 1, 1, 300.00),

(4, 2, 2, 3, 20.00),

(5, 4, 2, 3, 1000.00),

(6, 5, 2, 4, 800.00),

(6, 1, 1, 4, 20.00),

(7, 6, 1, 5, 2500.00),

(8, 4, 5, 6, 2500.00),

(9, 2, 2, 7, 20.00),

(9, 1, 2, 7, 40.00);

COMMIT;

```


# Datenbank abfragen

```sql

SELECT * FROM TWOne.Articles;

SELECT *
FROM TWOne.Customers
INNER JOIN TWOne.Country
ON TWOne.Customers.CountryId = TWOne.Country.CountryId
WHERE TWOne.Customers.CustomerId = 1;

SELECT * FROM TWOne.Orders WHERE CustomerId = 4;

SELECT *
FROM TWOne.Articles
WHERE ProducerId = 1;

SELECT *
FROM TWOne.Customers
WHERE CountryId = 1;

SELECT
    Orders.CustomerId,
    Customers.Name,
    Customers.FirstName,
    Orders.ArticleId,
    Orders.Quantity,
    Orders.TotalCosts
FROM TWOne.Orders
INNER JOIN TWOne.Customers
    ON Orders.CustomerId = Customers.CustomerId;

```


# Datenbank Manipulation

```sql

UPDATE TWOne.Articles
SET Price = 29.99
WHERE ArticleId = 1;

DELETE FROM TWOne.Articles
WHERE ArticleId = 5;

```

# Typische SQL-Fehler

## Fehler 1: Falscher Tabellenname

**Fehlerhafte Anweisung:**

```sql
SELECT * FROM TWOne.Articless;
```

**Ursache:**  
Die Tabelle heißt `Articles`, nicht `Articless`.

**Korrektur:**

```
SELECT * FROM TWOne.Articles;
```


## Fehler 2: Fehlendes Semikolon

**Fehlerhafte Anweisung:**

```
SELECT * FROM TWOne.Articles
```

In der MySQL-Konsole erscheint zunächst der Fortsetzungsprompt `->`. Die Anweisung wurde noch nicht abgeschlossen.

**Korrektur:**

```
SELECT * FROM TWOne.Articles;
```


## Fehler 3: Ungültiger Datentyp

Zum Beispiel versuchen wir, Text in ein Preisfeld zu schreiben:

```
UPDATE TWOne.Articles
SET Price = 'Hallo'
WHERE ArticleId = 1;
```

**Ursache:**  
`Price` ist als numerischer Datentyp vorgesehen. Ein Textwert passt nicht dazu.

Zur Kontrolle des SQL-Modus:

```
SELECT @@SESSION.sql_mode;
```

Nach dem Test:

```
SHOW WARNINGS;
```

Je nach SQL-Modus kann MySQL/MariaDB dabei einen Fehler oder eine Warnung ausgeben. 

**Korrektur:**

```
UPDATE TWOne.Articles
SET Price = 29.99
WHERE ArticleId = 1;
```

# Vergleich mit Anderen

ToDo: noch erledigen (letzte bei AP 4)