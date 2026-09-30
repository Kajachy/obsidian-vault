___
Bestandteil folgender docs:
- [[docs/LF08/Nachschlagewerk.pdf|Nachschlagewerk]]
- [[Aufgabenpaket_1_Normalisierung.pdf]]

Online-Links:
- 

Zugehörig zu:
#LF08 #LF08-Grundlagen
___

# Rohdaten

Unbereinigte Daten, Mehrere Attribute in einer Zelle, Teilweise Schreibfehler

| **Kunde**       | **Anschrift**                                    | **Geburtsdatum Kunde** | **Artikel**                                                                            | **Gesamtpreis**    | **Verkaufsabteilung**         |
| :-------------- | :----------------------------------------------- | :--------------------- | :------------------------------------------------------------------------------------- | :----------------- | :---------------------------- |
| Blotzek, Ulrich | 59823 Arnsberg, Großkopf 4 - Deutschland         | 05.10.60               | 1x Tastatur - Logitech - Schweiz á 20 €                                                | 20,00 €            | Lars Kramer - Deutschland     |
| Peter Schatter  | 89176 Augsburg, Försterstrasse 56 - Deutschland  | 01.01.80               | 3x Maus - Logitech - Schweiz á 10 €                                                    | 30,00 €            | Sabine Hellberg - Deutschland |
| Albert Wojack   | 12234 Berlin, Westendstrasse 92, Deutschland     | 15.06.55               | 1x Drucker - Hawlett Packard - USA á 300 Euro                                          | 300,00 €           | Kramer, Lars                  |
| Veera Virtanen  | 2150 Espoo, Oyi Keilasatama 21 - Finnland        | 30.12.92               | 2x Maus - Logitech - Schweiz je 10,00 €                                                | 20,00 €            | Alwin Sommer, Finnland        |
| Ahvo Hämäläinen | 30100 Forssa, Tapulikuja 56 - Finnland           | 23.04.77               | 2x Monitor - Sony - Japan - Stückpreis 500,00                                          | 1.000,00 €         | Sommer, Alwin - Finnland      |
| Fenna Huisman   | 1315 Almere, Spoordreef 87 - Niederlande         | 17.08.71               | 2x Festplatte - Maxtor - USA á 400,00<br>1x Tastatur - Logitech - Schweiz für 20 Euro  | 820,00 €           | Kaufhold, Sabine - Holland    |
| Lieke Prins     | 4600 Bergen op Zoom, Noordgeest 21 - Niederlande | 08.05.87               | 1x Notebook - Medion - Deutschland Stück für je 2.500 Euro                             | 2.500,00 €         | Peter Michel - Niederlande    |
| Paula David     | 9020 Klagenfurt, Murielstrasse 47 - Österreich   | 21.01.70               | 5x Monitor - SONY - Japan - á 500.00 €                                                 | 2.500,00 €         | Pranzner, Alois - Östereich   |
| Joseph Hardiff  | 9020 Klagenfurt, Bahnhofstrasse 139 - Österreich | 09.08.62               | 2x Maus - Logitech - Schweiz je 10 Euro<br>2x Tastatur - Logitech - Schweiz je 20 Euro | 20,00 €<br>40,00 € | Lesser, Martin, Österreich    |

# 1. Normalform

Aufgeräumt, pro Zelle ein Wert, Teilweise redundante und wiederholende Daten

| **Kunde Name** | **Kunde Vorname** | **Land** | **Ort** | **Straße** | **Geburtsdatum Kunde** | **Menge** | **Artikel** | **Gesamtpreis** | **Verkaufsabteilung Standort** | **Verkaufsabteilung Leiter** |
| :--- | :--- | :--- | :--- | :--- | :--- | ---: | :--- | ---: | :--- | :--- |
| Blotzek | Ulrich | Deutschland | 59823 Arnsberg  | Großkopf 4 | 05.10.60 | 1 | Tastatur - Logitech - Schweiz á 20 € | 20,00 € | Deutschland | Lars Kramer |
| Schatter | Peter | Deutschland | 89176 Augsburg | Försterstrasse 56 | 01.01.80 | 3 | Maus - Logitech - Schweiz á 10 € | 30,00 € | Deutschland | Sabine Hellberg |
| Wojack | Albert | Deutschland | 12234 Berlin | Westendstrasse 92 | 15.06.55 | 1 | Drucker - Hewlett Packard - USA á 300 € | 300,00 € | Deutschland | Lars Kramer |
| Virtanen | Veera | Finnland | 2150 Espoo | Oyi Keilasatama 21 | 30.12.92 | 2 | Maus - Logitech - Schweiz je 10 € | 20,00 € | Finnland | Alwin Sommer |
| Hämäläinen | Ahvo  | Finnland | 30100 Forssa | Tapulikuja 56 | 23.04.77 | 2 | Monitor - Sony - Japan á 500 € | 1.000,00 € | Finnland | Alwin Sommer |
| Huisman | Fenna  | Niederlande | 1315 Almere | Spoordreef 87 | 17.08.71 | 2 | Festplatte - Maxtor - USA á 400 € | 800,00 € | Niederlande | Sabine Kaufhold |
| Huisman | Fenna  | Niederlande | 1315 Almere | Spoordreef 87 | 17.08.71 | 1 | Tastatur - Logitech - Schweiz á 20 € | 20,00 € | Niederlande | Sabine Kaufhold |
| Prins | Lieke  | Niederlande | 4600 Bergen op Zoom | Noordgeest 21 | 08.05.87 | 1 | Notebook - Medion - Deutschland á 2.500 € | 2.500,00 € | Niederlande | Peter Michel |
| Paula  | David | Österreich | 9020 Klagenfurt | Murielstrasse 47 | 21.01.70 | 5 | Monitor - Sony - Japan á 500 € | 2.500,00 € | Österreich | Alois Pranzner |
| Hardiff | Joseph  | Österreich | 9020 Klagenfurt | Bahnhofstrasse 139 | 09.08.62 | 2 | Maus - Logitech - Schweiz á 10 € | 20,00 € | Österreich | Martin Lesser |
| Hardiff | Joseph  | Österreich | 9020 Klagenfurt | Bahnhofstrasse 139 | 09.08.62 | 2 | Tastatur - Logitech - Schweiz á 20 € | 40,00 € | Österreich | Martin Lesser |

# 2. Normalform

Gesplittet in mehrere Tabellen, Verhinderung von mehreren Zeilen mit gleichen Werten
## Kundentabelle
| **KundenID (PK)** | **Name**   | **Vorname** | **Land**    | **Ort**             | **Straße**         | **Geburtstag** |
| :---------------- | :--------- | :---------- | :---------- | :------------------ | :----------------- | :------------- |
| 1                 | Blotzek    | Ulrich      | Deutschland | 59823 Arnsberg      | Großkopf 4         | 05.10.60       |
| 2                 | Schatter   | Peter       | Deutschland | 89176 Augsburg      | Försterstrasse 56  | 01.01.80       |
| 3                 | Wojack     | Albert      | Deutschland | 12234 Berlin        | Westendstrasse 92  | 15.06.55       |
| 4                 | Virtanen   | Veera       | Finnland    | 2150 Espoo          | Oyi Keilasatama 21 | 30.12.92       |
| 5                 | Hämäläinen | Ahvo        | Finnland    | 30100 Forssa        | Tapulikuja 56      | 23.04.77       |
| 6                 | Huisman    | Fenna       | Niederlande | 1315 Almere         | Spoordreef 87      | 17.08.71       |
| 7                 | Prins      | Lieke       | Niederlande | 4600 Bergen op Zoom | Noordgeest 21      | 08.05.87       |
| 8                 | Paula      | David       | Österreich  | 9020 Klagenfurt     | Murielstrasse 47   | 21.01.70       |
| 9                 | Hardiff    | Joseph      | Österreich  | 9020 Klagenfurt     | Bahnhofstrasse 139 | 09.08.62       |
## Artikeltabelle
| **ArtikelID (PK)** | **Artikelart** | **Hersteller**  | **Land**    |  **Preis** |
| :----------------- | :------------- | :-------------- | :---------- | ---------: |
| 1                  | Tastatur       | Logitech        | Schweiz     |    20,00 € |
| 2                  | Maus           | Logitech        | Schweiz     |    10,00 € |
| 3                  | Drucker        | Hewlett Packard | USA         |   300,00 € |
| 4                  | Monitor        | Sony            | Japan       |   500,00 € |
| 5                  | Festplatte     | Maxtor          | USA         |   400,00 € |
| 6                  | Notebook       | Medion          | Deutschland | 2.500,00 € |
## Verkaufsabteilungen
| **VerkaufsabteilungsID (PK)** | **Leiter**      | **Standort** |
| :---------------------------- | :-------------- | :----------- |
| 1                             | Lars Kramer     | Deutschland  |
| 2                             | Sabine Hellberg | Deutschland  |
| 3                             | Alwin Sommer    | Finnland     |
| 4                             | Sabine Kaufhold | Niederlande  |
| 5                             | Peter Michel    | Niederlande  |
| 6                             | Alois Pranzner  | Österreich   |
| 7                             | Martin Lesser   | Österreich   |
## Bestellungen
| **KundenID (FK)** | **ArtikelID (FK)** | **Menge** | **VerkaufsabteilungsID (FK)** | **Gesamtkosten** |
| :---------------- | :----------------- | --------: | ----------------------------: | ---------------: |
| 1                 | 1                  |         1 |                             1 |          20,00 € |
| 2                 | 2                  |         3 |                             2 |          30,00 € |
| 3                 | 3                  |         1 |                             1 |         300,00 € |
| 4                 | 2                  |         2 |                             3 |          20,00 € |
| 5                 | 4                  |         2 |                             3 |       1.000,00 € |
| 6                 | 5                  |         2 |                             4 |         800,00 € |
| 6                 | 1                  |         1 |                             4 |          20,00 € |
| 7                 | 6                  |         1 |                             5 |       2.500,00 € |
| 8                 | 4                  |         5 |                             6 |       2.500,00 € |
| 9                 | 2                  |         2 |                             7 |          20,00 € |
| 9                 | 1                  |         2 |                             7 |          40,00 € |


# 3. Normalform

entfernen von transitiven Abhängigkeiten
## Kundentabelle
| **KundenID (PK)** | **Name**   | **Vorname** | **LandID (FK)** | **Ort**             | **Straße**         | **Geburtstag** |
| :---------------- | :--------- | :---------- | --------------: | :------------------ | :----------------- | :------------- |
| 1                 | Blotzek    | Ulrich      |               1 | 59823 Arnsberg      | Großkopf 4         | 05.10.60       |
| 2                 | Schatter   | Peter       |               1 | 89176 Augsburg      | Försterstrasse 56  | 01.01.80       |
| 3                 | Wojack     | Albert      |               1 | 12234 Berlin        | Westendstrasse 92  | 15.06.55       |
| 4                 | Virtanen   | Veera       |               2 | 2150 Espoo          | Oyi Keilasatama 21 | 30.12.92       |
| 5                 | Hämäläinen | Ahvo        |               2 | 30100 Forssa        | Tapulikuja 56      | 23.04.77       |
| 6                 | Huisman    | Fenna       |               3 | 1315 Almere         | Spoordreef 87      | 17.08.71       |
| 7                 | Prins      | Lieke       |               3 | 4600 Bergen op Zoom | Noordgeest 21      | 08.05.87       |
| 8                 | Paula      | David       |               5 | 9020 Klagenfurt     | Murielstrasse 47   | 21.01.70       |
| 9                 | Hardiff    | Joseph      |               5 | 9020 Klagenfurt     | Bahnhofstrasse 139 | 09.08.62       |
## Artikeltabelle
| **ArtikelID (PK)** | **Artikelart** | **HerstellerID (FK)** |  **Preis** |
| :----------------- | :------------- | --------------------: | ---------: |
| 1                  | Tastatur       |                     1 |    20,00 € |
| 2                  | Maus           |                     1 |    10,00 € |
| 3                  | Drucker        |                     3 |   300,00 € |
| 4                  | Monitor        |                     4 |   500,00 € |
| 5                  | Festplatte     |                     2 |   400,00 € |
| 6                  | Notebook       |                     5 | 2.500,00 € |
## Verkaufsabteilung
| **VerkaufsabteilungsID (PK)** | **Leiter**      | **LandID** |
| :---------------------------- | :-------------- | ---------: |
| 1                             | Lars Kramer     |          1 |
| 2                             | Sabine Hellberg |          1 |
| 3                             | Alwin Sommer    |          2 |
| 4                             | Sabine Kaufhold |          3 |
| 5                             | Peter Michel    |          3 |
| 6                             | Alois Pranzner  |          5 |
| 7                             | Martin Lesser   |          5 |
## Bestellungen
| **KundenID (FK)** | **ArtikelID (FK)** | **Menge** | **VerkaufsabteilungsID (FK)** | **Gesamtkosten** |
| :---------------- | :----------------- | --------: | ----------------------------: | ---------------: |
| 1                 | 1                  |         1 |                             1 |          20,00 € |
| 2                 | 2                  |         3 |                             2 |          30,00 € |
| 3                 | 3                  |         1 |                             1 |         300,00 € |
| 4                 | 2                  |         2 |                             3 |          20,00 € |
| 5                 | 4                  |         2 |                             3 |       1.000,00 € |
| 6                 | 5                  |         2 |                             4 |         800,00 € |
| 6                 | 1                  |         1 |                             4 |          20,00 € |
| 7                 | 6                  |         1 |                             5 |       2.500,00 € |
| 8                 | 4                  |         5 |                             6 |       2.500,00 € |
| 9                 | 2                  |         2 |                             7 |          20,00 € |
| 9                 | 1                  |         2 |                             7 |          40,00 € |
## Länder
| **LandID (PK)** | **Land**    |
| :-------------- | :---------- |
| 1               | Deutschland |
| 2               | Finnland    |
| 3               | Niederlande |
| 4               | Schweiz     |
| 5               | Österreich  |
| 6               | USA         |
| 7               | Japan       |

## Hersteller

| **HerstellerID (PK)** | **Herstellername** | **LandID (FK)** |
| --------------------- | ------------------ | --------------- |
| 1                     | Logitech           | 4               |
| 2                     | Maxtor             | 6               |
| 3                     | Hewlett Packard    | 6               |
| 4                     | Sony               | 7               |
| 5                     | Medion             | 1               |

