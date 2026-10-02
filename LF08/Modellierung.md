___
Bestandteil folgender docs:
- [[docs/LF08/Nachschlagewerk.pdf|Nachschlagewerk]]
- [[Aufgabenpaket_2_Modellierung.pdf]]

Online-Links:
- 

Zugehörig zu:
#LF08 #LF08-Grundlagen
___

# Entitäten, Attribute & Schlüssel

## Customer
- CustomerId (PK)
- Name
- FirstName
- CountryId (FK)
- City
- Street
- Birthday

## Article
- ArticleId (PK)
- ArticleType
- ProducerId (FK)
- Price

## SalesDepartment
- SalesDepartmentId (PK)
- Director
- CountryId (FK)

## Order
- OrderId (PK)
- CustomerId (FK)
- ArticleId (FK)
- Quantity
- SalesDepartmentId (FK)
- TotalCosts

## Country
- CountryId (PK)
- CountryName

## Producer
- ProducerId (PK)
- ProducerName
- CountryId (FK)


# ER-Diagramm

![[ER-Diagramm.png]]

## Prüfsatz 1

> **Der Kunde mit der CustomerId 1 gibt eine Bestellung auf, die den Artikel mit der ArticleId 101 enthält und von der Verkaufsabteilung mit der SalesDepartmentId 1 bearbeitet wird.**

## Prüfsatz 2

> **Der Kunde mit der CustomerId 2 kann mehrere Bestellungen aufgeben, und eine Bestellung kann mehrere Artikel enthalten.**



# EER-Diagramm

![[EER-Diagramm.png]]

| Kriterium                 | Übereinstimmung | Abweichung |
| ------------------------- | --------------- | ---------- |
| 6 Tabellen                |                 | X          |
| N:M-Beziehungen           |                 | X          |
| Alle Attribute inklodiert | X               |            |


Info:
Dieses EER-Diagramm stellt nicht das restliche Projekt dar. Aufgrund von einem Fehler wurde es im nach hinein angepasst.