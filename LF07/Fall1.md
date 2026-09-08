___
Bestandteil folgender docs:
- [[Nachschlagewerk.pdf]]
- [[Anwendungsfaelle_Mikrocontroller.pdf]]

Online-Links:
- 

Zugehörig zu:
#LF07 #LF07-Grundlagen
___

# Auswahl
## Systembeschreibung

<u>Industrielle Messwerterfassung</u>
Das System erfasst zyklisch analoge Messwerte (z. B. Temperatur, Druck, Stromaufnahme) an einer Produktionsmaschine über mehrere analoge Sensoren. Die Werte werden verarbeitet, lokal angezeigt und entweder dauerhaft gespeichert oder an ein übergeordnetes System (z. B. eine Leitstelle/SCADA) übertragen. Das System läuft dauerhaft im industriellen Umfeld, nicht batteriebetrieben.

## Anforderungsübersicht:

| Kategorie       | Anforderung                                                                         | Priorität |
| --------------- | ----------------------------------------------------------------------------------- | --------- |
| Sensoren        | Mehrere analoge Sensoren gleichzeitig anschließbar (Temperatur, Druck, Strom)       | Muss      |
| Ein-/Ausgänge   | Mehrere analoge Eingänge (ADC) mit ausreichender Auflösung                          | Muss      |
| Signalarten     | Analoge Signale (0–5 V bzw. 0–10 V oder 4–20 mA je nach Sensor)                     | Muss      |
| Schnittstellen  | Kommunikationsschnittstelle zu übergeordnetem System (z. B. RS-485, Ethernet, MQTT) | Muss      |
| Vernetzung      | Kabelgebundene oder drahtlose Anbindung an Leitsystem                               | Muss      |
| Stromversorgung | Stabile Netzversorgung (kein Batteriebetrieb notwendig)                             | Muss      |
| Schnittstellen  | Schnittstelle für Display (z. B. I2C/SPI)                                           | Soll      |
| Speicher        | Ausreichend nichtflüchtiger Speicher zur Zwischenspeicherung bei Verbindungsausfall | Soll      |
| Stromversorgung | Spannungsfestigkeit/Schutz gegen industrielle Störungen (EMV)                       | Soll      |
| Robustheit      | Betriebstemperaturbereich für industrielle Umgebung geeignet                        | Soll      |
| Baugröße        | Kompatibel mit Schaltschrank-Montage (z. B. Hutschiene)                             | Kann      |
| Aktoren         | Nicht zwingend erforderlich (reine Erfassung)                                       | Kann      |

## Begründung der Fallauswahl

Der Fall 1 unterscheidet sich in seinen zentralen Schwerpunkten deutlich von Fall 2:
- **Fall 1** benötigt vor allem **mehrere hochwertige analoge Eingänge** und eine **robuste, dauerhafte Stromversorgung** ohne Energiesparzwang – Vernetzung ist eher lokal/kabelgebunden zu einem Leitsystem.
- **Fall 2** benötigt vor allem **Funkvernetzung (WLAN)** und **Energieeffizienz im Batteriebetrieb**, während die Anzahl analoger Eingänge gering ist (meist digitale Sensormodule über I2C).


# Gewichtung
## Kriterien- und Gewichtungstabelle

| Kriterium                                        | Gewichtung | Begründung                                                                                              |
| ------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------- |
| Anzahl analoger Eingänge                         | **3**      | Kernfunktion scheitert, wenn nicht ausreichend Sensoren                                                 |
| ADC-Auflösung                                    | **3**      | präzise Messung von Druck/Strom --> ohne sind Werte unbrauchbar                                         |
| WLAN-/Funkfähigkeit                              | 0          |                                                                                                         |
| Kabelgebundene Schnittstelle (RS-485/Ethernet)   | **3**      | ohne Anbindung an übergeordnetes Leitsystem ist System unbrauchbar                                      |
| I2C/SPI-Schnittstelle                            | 2          |                                                                                                         |
| Energieeffizienz / Sleep-Modus                   | 0          |                                                                                                         |
| Batteriebetrieb möglich                          | 0          |                                                                                                         |
| Nichtflüchtiger Speicher                         | 2          |                                                                                                         |
| Displayanbindung                                 | 2          |                                                                                                         |
| Industrielle Robustheit (Temperaturbereich, EMV) | **3**      | da in Produktionshalle, muss elektromagnetische Störungen und Temperaturschwankungen ausgehalten werden |
| Gehäuse-/Wetterfestigkeit                        | 0          |                                                                                                         |
| Baugröße/Formfaktor                              | 1          |                                                                                                         |


## Prüfung auf Doppelungen/Abhängigkeiten

- **WLAN-Fähigkeit vs. Kommunikationsschnittstelle allgemein:** Bewusst getrennt gehalten, da in Produktionshalle zu viel Beeinträchtigungen sind, die die WLAN Nutzung störungsanfällig macht.
- **Industrielle Robustheit vs. Gehäuse-/Wetterfestigkeit:** Keine Überschneidung, da unterschiedliche Schutzarten adressiert werden und nur in einem Fall gewichtet wurde.

## Plausibilitätsfrage

Die Gewichtung bezieht sich rein auf den Anwendungsfall, nicht auf ein konkretes Board – z. B. bliebe "Industrielle Robustheit" auch dann mit 3 gewichtet, wenn noch kein Board feststeht, da es sich um eine reine Anwendungsanforderung handelt.


