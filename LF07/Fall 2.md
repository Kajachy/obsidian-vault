___
Bestandteil folgender docs:
- [[docs/LF07/Nachschlagewerk.pdf]]
- [[Anwendungsfaelle_Mikrocontroller.pdf]]

Online-Links:
- [devboarddb.com](https://devboarddb.com)

Zugehörig zu:
#LF07 #LF07-Grundlagen 
___

# Auswahl
## Systembeschreibung:
Das System erfasst regelmäßig Umweltdaten wie Temperatur, Luftfeuchtigkeit, Luftdruck, Helligkeit und ggf. Niederschlag über verschiedene Sensoren. Die Messwerte werden verarbeitet und drahtlos (WLAN oder andere Funkverbindung) an einen Server übertragen. Das Gerät ist im Außenbereich installiert und soll energieeffizient, ggf. batteriebetrieben, arbeiten.

## Anforderungsübersicht:

|Kategorie|Anforderung|Priorität|
|---|---|---|
|Sensoren|Sensoren für Temperatur, Luftfeuchtigkeit, Luftdruck, Helligkeit|Muss|
|Sensoren|Niederschlagssensor|Kann|
|Ein-/Ausgänge|Mind. ein digitaler/I2C-Bus für kombinierte Sensormodule|Muss|
|Signalarten|Überwiegend digitale Sensor-Signale (I2C/SPI), ggf. ein analoger Eingang (z. B. Lichtsensor)|Soll|
|Schnittstellen|I2C- oder SPI-Schnittstelle für Sensoranbindung|Muss|
|Vernetzung|WLAN-Modul oder andere Funkschnittstelle zur Serverübertragung|Muss|
|Speicher|Geringer Zwischenspeicher für kurzzeitige Pufferung bei Verbindungsabbruch|Kann|
|Stromversorgung|Batteriebetrieb mit langer Laufzeit (Energieeffizienz, Standby-/Sleep-Modi)|Muss|
|Stromversorgung|Optional Solarpanel zur Nachladung|Kann|
|Baugröße|Kompakt und wetterfest gehäust (Outdoor-Einsatz)|Soll|
|Robustheit|Schutz gegen Feuchtigkeit/Witterung (Gehäuse, nicht Board selbst)|Soll|
|Aktoren|Keine erforderlich (reine Erfassung und Übertragung)|Kann|

## Begründung der Fallauswahl

Der Fall 2 unterscheidet sich in seinen zentralen Schwerpunkten deutlich von Fall 1:
- **Fall 2** benötigt vor allem **Funkvernetzung (WLAN)** und **Energieeffizienz im Batteriebetrieb**, während die Anzahl analoger Eingänge gering ist (meist digitale Sensormodule über I2C).
- **Fall 1** benötigt vor allem **mehrere hochwertige analoge Eingänge** und eine **robuste, dauerhafte Stromversorgung** ohne Energiesparzwang – Vernetzung ist eher lokal/kabelgebunden zu einem Leitsystem.


# Gewichtung

## Kriterien- und Gewichtungstabelle

| Kriterium                                        | Gewichtung | Begründung                                   |
| ------------------------------------------------ | ---------- | -------------------------------------------- |
| I/O-Pins / Anzahl analoger Eingänge              | 2          | genug Anschlüsse für Sensoren                |
| ADC-Auflösung                                    | 3          | Kompatibilität für Sensoren                  |
| WLAN-/Funkfähigkeit                              | 3          | Daten müssen an den Server übertragen werden |
| Kabelgebundene Schnittstelle (RS-485/Ethernet)   | 0          |                                              |
| I2C/SPI-Schnittstelle                            | 3          | Erfassung von Daten digitaler Sensormodule   |
| Energieeffizienz / Sleep-Modus                   | 1          | Für Notbetrieb bei Stromausfällen wichtig    |
| Batteriebetrieb möglich                          | 2          | Sicherung gegen Stromausfälle                |
| Nichtflüchtiger Speicher                         | 1          |                                              |
| Displayanbindung                                 | 0          |                                              |
| Industrielle Robustheit (Temperaturbereich, EMV) | 1          |                                              |
| Gehäuse-/Wetterfestigkeit                        | 2          | Outdoor-Einsatz                              |
| Baugröße/Formfaktor                              | 2          | kompakt für Außenmontage                     |

## Prüfung auf Dopplungen

- Baugröße/Formfaktor und Gehäuse-/Wetterfestigkeit sind beides Kriterien zur bewertung des Gehäuses. Der Formfaktor beurteilt aber die Größe, die Gehäusefestigkeit aber die Robustheit.
- Die Anzahl der analogen Pins beschreibt deren Menge während die ADC-Auflösung deren Genauigkeit bescheibt.

## Plausibilitätsfrage

Die Gewichtung bezieht sich rein auf den Anwendungsfall, nicht auf ein konkretes Board – z. B. bliebe "WLAN-/Funkfähigkeit" auch dann mit 3 gewichtet, wenn noch kein Board feststeht, da es sich um eine reine Anwendungsanforderung handelt.

# Boards

## Ausgewählte Microcontroller

1. [Arduino Nano RP2040 Connect](https://docs.arduino.cc/resources/datasheets/ABX00053-datasheet.pdf "https://docs.arduino.cc/resources/datasheets/abx00053-datasheet.pdf")
2. [Heltec HTIT-WS_V3](https://resource.heltec.cn/download/Wireless_Stick_V3/HTIT-WS_V3\(Rev1.0\).pdf "https://resource.heltec.cn/download/wireless_stick_v3/htit-ws_v3(rev1.0).pdf")
3. [Adafruit ESP32 Feather V2](https://devboarddb.com/details/l9hGPB5-Ls52zoFS7XKsc "https://devboarddb.com/details/l9hgpb5-ls52zofs7xksc")

## Technische Vergleichstabelle

| Parameter / Feature        | Arduino Nano RP2040 Connect               | Heltec HTIT-WS_V3 (Wireless Stick Lite V3) | Adafruit ESP32 Feather V2                                                  |
| -------------------------- | ----------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| **Mikrocontroller**        | Raspberry Pi RP2040                       | ESP32-S3FN8                                | ESP32 (Dual-Core Xtensa LX6, 600 DMIPS)                                    |
| **Taktung** (Chip)         | 133 MHz                                   | 240 MHz                                    | 240 MHz                                                                    |
| **Arbeitsspeicher** (Chip) | 264 kB (intern)                           | 512 kB (intern)                            | 520 kB (intern) + 2 MB PSRAM (extern)¹                                     |
| **Flash-Speicher** (Chip)  | 16 MB                                     | 8 MB                                       | 8 MB                                                                       |
| **Spannung**               | **3,3 V**                                 | **3,3 V**                                  | **3,3 V**                                                                  |
| **Max. Stromabgabe**       | 800 mA bei 3,3 V                          | 3.3V Pin: 500 mA, Vext Pin: 350 mA         | 3,3V-Regler: 500 mA Peak (≈250 mA für Peripherie, Rest durch ESP32 selbst) |
| **Schnittstellen**         | 14 Digital-Pins, 8 Analog-Pins, Micro-USB | 29 GPIO-Pins (9 Analog) , Type-C USB       | 12x ADC-Kanäle, 3x UART, 3x SPI, 2x I2C (STEMMA QT), USB-C¹                |
| **Funkfunktionen**         | Wi-Fi, Bluetooth                          | Wi-Fi, Bluetooth, LoRa                     | Wi-Fi, Bluetooth                                                           |

## Vorteile &Einschränkungen

|Board|Vorteil|Nachteil|
|---|---|---|
|Nano RP2040|Viel Flash Speicher zum weiteren speichern von Daten im Falle eines Stromausfalls|Langsamer Chip, wenig Arbeitsspeicher und wenige Pins|
|Heltec HTIT-WS_V3|Viele Pins und LoRa als Redundanz im Falle eines Internet Ausfalls|Mittelmäßiger Arbeitsspeicher|
|ESP32 Feather V2|Dual-Core mit viel Arbeitsspeicher, viele Analoge Pins|Mittelmäßige Pin-Anzahl, wegen Dual-Core und viel RAM vermutlich erhöhter Stromverbrauch|

# Entscheidung

## Dokumentierte KI-Anfrage

**Anfrage an die KI (Claude):**

> Fülle unter Aufgabe 3 für Adafruit ESP32 Feather V2 die Tabelle aus.

**Antwort der KI (Auszug):**

> **Microcontroller:** ESP32 with "Xtensa LX6" architecture  
> **Processor:** Dual-core design operating at "240MHZ"  
> **Memory:** Flash: "8MB", PSRAM: "2MB", Quiescent Current: "100uA"  
> **Voltage:** "3v" logic level  
> **GPIO Pins:** Total: "21", Analog: "14", Digital: "21"  
> **Interfaces:** USB: "USB-C"; Multiple UART, I2C, and SPI interfaces available  
> **Wireless Capabilities:** WiFi: Supported (built-in); Bluetooth: Supported (built-in)  
> **Note:** The page content does not specify exact maximum current output values, Bluetooth version number, or detailed WiFi specifications.

## Faktencheck

Vergleicht man Teile der Ergebnisse in der Tabelle mit der Originalspezifikation auf der Adafruit Seite [adafruit.com/product/5400](https://www.adafruit.com/product/5400 "https://www.adafruit.com/product/5400").

|#|Aussage der KI|Ergebnis|
|---|---|---|
|1|„GPIO Analog: 14"|Falsch|
|2|„Flash: 8MB, PSRAM: 2MB"|Richtig|
|3|„Processor: Dual-core 240MHz Xtensa LX6"|✅ **Korrekt** (Tensilica LX6 = Xtensa-LX6-Kern, nur andere Markenbezeichnung).|

## Entscheidungsmatrix

Bewertungsskala: 1 (schlecht) – 5 (sehr gut). Kriterien mit Gewichtung 0 (Kabelgebundene Schnittstelle, Displayanbindung) fließen nicht in die Summe ein.

|Kriterium|Gewichtung|Nano RP2040 Connect (Bew. / gew.)|Heltec HTIT-WS_V3 (Bew. / gew.)|ESP32 Feather V2 (Bew. / gew.)|
|---|---|---|---|---|
|I/O-Pins / Anzahl analoger Eingänge|2|3 / 6|5 / 10|4 / 8|
|ADC-Auflösung|3|3 / 9|3 / 9|3 / 9|
|WLAN-/Funkfähigkeit|3|4 / 12|5 / 15|4 / 12|
|Kabelgebundene Schnittstelle|0|1 / 0|1 / 0|1 / 0|
|I2C/SPI-Schnittstelle|3|3 / 9|3 / 9|5 / 15|
|Energieeffizienz / Sleep-Modus|1|2 / 2|5 / 5|4 / 4|
|Batteriebetrieb möglich|2|1 / 2|5 / 10|5 / 10|
|Nichtflüchtiger Speicher|1|5 / 5|3 / 3|3 / 3|
|Displayanbindung|0|1 / 0|5 / 0|1 / 0|
|Industrielle Robustheit|1|2 / 2|2 / 2|2 / 2|
|Gehäuse-/Wetterfestigkeit|2|2 / 4|2 / 4|2 / 4|
|Baugröße/Formfaktor|2|5 / 10|4 / 8|3 / 6|
|**Summe (von max. 100)**||**61**|**75**|**73**|

## Kritische Prüfung des Rechenergebnisses

- **Schwere Abwägung:** Der Feather V2 und der HTIT-WS_V3 liegen Punkttechnisch sehr nahe beieinander. Durch die mögliche LoRa Anbindung lässt den HTIT-WS_V3 etwas herausstechen.
- **Verrechnung verdeckt K.-o.-Kriterien:** Der Nano RP2040 Connect bekommt für „Batteriebetrieb möglich" nur 1 Punkt, weil keine Ladeschaltung dokumentiert ist und diese nachgerüstet werden müsste. Das wird durch gute Werte bei Flash-Speicher und Formfaktor rechnerisch teilweise ausgeglichen, obwohl ein fehlender Akkubetrieb das Board für den Outdoor-Einsatz eigentlich disqualifizieren könnte. Die Matrix behandelt alle Kriterien als gegeneinander aufrechenbar, was bei „Muss"-Kriterien fachlich falsch ist.
- **Subjektive Gewichtung:** Die Gewichte beruhen auf Einschätzung, nicht auf einer messbaren Herleitung – unterschiedliche Teams kämen zu anderen Gewichten und damit anderen Ergebnissen.
- **Nicht abgebildete Faktoren:** Liefertreue/Verfügbarkeit, Software-/Community-Support (Arduino-IDE, CircuitPython, ESP-IDF) und Dokumentationsqualität fließen nicht in die Matrix ein, beeinflussen die reale Eignung aber erheblich.

## Boardwahl

Gewählt: Heltec HTIT-WS_V3

**Begründung:**

- **Höchste Punktzahl:** Mit 75 von 100 Punkten liegt der HTIT-WS_V3 knapp vor dem Feather V2 (73) und deutlich vor dem Nano RP2040 Connect (61).
- **LoRa als Redundanz:** Die zusätzliche LoRa-Schnittstelle ermöglicht eine alternative Datenübertragung, falls die WLAN-Verbindung am Aufstellort ausfällt oder gestört ist – wichtig für einen zuverlässigen Außeneinsatz.
- **Erfüllt die Muss-Kriterien:** Gute Bewertung bei Energieeffizienz/Sleep-Modus und Batteriebetrieb passt zur in Aufgabe 1 geforderten energieeffizienten, ggf. batteriebetriebenen Versorgung.
- **Ausreichend Pins:** 29 GPIO-Pins (davon 9 analog) bieten genug Reserve für die geforderten Sensoren sowie mögliche Erweiterungen wie den optionalen Niederschlagssensor.
- **Vertretbarer Kompromiss:** Der nur mittelmäßige Arbeitsspeicher fällt nicht ins Gewicht, da das System laut Systembeschreibung nur Sensordaten erfasst und überträgt, ohne rechenintensive Verarbeitung.