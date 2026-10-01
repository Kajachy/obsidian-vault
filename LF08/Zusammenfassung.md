___
Bestandteil folgender docs:
- [[docs/LF08/Nachschlagewerk.pdf|Nachschlagewerk]]

Online-Links:
- 

Zugehörig zu:
#LF08 #LF08-Grundlagen
___

# [[Normalisierung]]

- aufräumen unordentlicher Tabellen
- Duplikate vermeiden
- Abhängigkeiten sauber trennen
- 1. Normalform
	- Keine Listen/Mehrfachwerte in einer Zelle
- 2. Normalform
	- Alles muss vom gesamten Primärschlüssel abhängen
- 3. Normalform
	- Alles hängt nur vom Schlüssel ab


# [[Modellierung]]

## Begriffe
- Entitäten
	- Tabellen
- Attribute
	- Tabellen-Spalten
- Schlüssel
	- Stellt Verbindungen zwischen Datensätzen her
	- unterscheiden in Funktion (Primär und Fremd)
	- unterscheiden in Herkunft (natürlich und künstlich)

## Diagramm-Arten
- ER-Diagramm
	- zeigt Entitäten, Attribute & Beziehungen
	- beschreibt Aufbau einer Datenbank auf fachlicher Ebene
	- Chen-Notation
		- Elemente haben typische Formen
		- Rechteck = Entität
		- Raute = Beziehung
		- Ellipse = Attribut
		- Unterstrichenes Attribut = Primärschlüssel
		- Linie = Verbindung
- EER-Diagramm
	- Erweiterung des ER-Diagramms
	- zeigt zusätzlich Spezialisierungen, Vererbungen, Generalisierungen, Untertypen/Obertypen & komplexere Beziehungen


# [[DBMS]]

- Database Management System (DBMS)
- Software, die Datenbanken erstellt, verwaltet und Zugriff auf Daten ermöglicht
- Aufgaben
	- Daten speichern und abrufen
	- Daten ändern und löschen
	- Zugriffsrechte verwalten
	- Daten sichern
	- mehrere User zeitgleich verwalten


# [[SQL]]

## Datenbankstruktur

```sql
CREATE DATABASE DBName;
```

```sql
CREATE TABLE TableName (
Attribute1 DATATYPE NOT NULL AUTO_INCREMENT,
Attribute2 DATATYPE NOT NULL,
Attribute3 DATATYPE NOT NULL,
PRIMARY KEY (Attribute1),
CONSTRAINT fk_ThisTable_OtherTable
	FOREIGN KEY (Attribute2)
	REFERENCES OtherTable (AttributeFromOtherTable)
);
```


## Daten einfügen

```sql
INSERT INTO DBName.TableName
(Attribute2, Attribute3)
VALUES
(1, 'Deutschland'),
(2, 'Finnland'),
(3, 'Niederlande'),
```

## Daten abfragen

```sql
SELECT * FROM DBName.TableName ORDER BY Attribute1 desc WHERE Attribute3 = 'Test';
```
Folgende weitere Funktionen sind möglich:
- `AVG()` → Durchschnitt
- `SUM()` → Summe
- `MIN()` → kleinster Wert
- `MAX()` → größter Wert
- `COUNT()` → Anzahl

## Daten manipulieren

```sql
UPDATE DBName.TableName
SET Attribute2 = 2
WHERE Attribute1 = 1;
```

```sql
DELETE FROM DBName.TableName
WHERE Attribute1 = 1;
```


# [[Benutzer & Berechtigungen]]

## Benutzer anlegen

```sql
CREATE USER 'name'@'localhost' IDENTIFIED BY 'pasword';
```

## Benutzer anzeigen

```sql
SELECT User FROM mysql.user;
```

## Rechte vergeben

```sql
GRANT SELECT ON DBName.TableName TO 'name'@'localhost';
```

```sql
SHOW GRANTS FOR 'name'@'localhost';
```

## Rechte testen

```sql
SELECT CURRENT_USER();
```

```sql
SHOW GRANTS;
```

## Rechte entziehen

```sql
REVOKE SELECT ON DBName.TableName FROM 'name'@'localhost';
```

## Benutzer löschen

```sql
DROP USER 'name'@'localhost';
```