___
Bestandteil folgender docs:
- [[docs/LF07/Nachschlagewerk.pdf]]
- [[Anwendungsfaelle_Mikrocontroller.pdf]]

Online-Links:
- [devboarddb.com](https://devboarddb.com)
- [espressif.com](https://docs.espressif.com/projects/esp-idf/en/v4.4.1/api-reference/peripherals/adc.html)
- [riot-os.org](https://doc.riot-os.org/boards/nucleo-f767zi)
- [sparkfun.com](https://www.sparkfun.com/arduino-opta-rs485.html)
- [microcontrollerslab.com](https://microcontrollerslab.com/?p=101)

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
| ADC-Auflösung                                    | **3**      | präzise Messung von Druck/Strom --> ohne sind Werte unbrauchbar                                         |
| I/O-Pins                                         | 2          |                                                                                                         |
| Anzahl analoger Eingänge                         | **3**      | Kernfunktion scheitert, wenn nicht ausreichend Sensoren                                                 |
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


# Boards

## Vergleichstabelle

| Merkmal                     | ESP32 DevKitC                                                                                                                                                                                                            | Arduino Opta RS485                                       | STM32 Nucleo-144 (F767ZI)                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Betriebsspannung (Logik)    | 3,3 V                                                                                                                                                                                                                    | intern (Eingänge 0–10 V konfigurierbar)                  | 3,3 V                                                                                       |
| Eingangsspannung            | 5 V über USB, alternativ VIN                                                                                                                                                                                             | 12–24 V DC                                               | über USB (5 V) oder ST-Zio/Morpho-Header                                                    |
| Analoge Eingänge            | Bis zu 18 ADC-Kanäle, 12-Bit (praktisch meist nur 8 nutzbare Kanäle über ADC1, da ADC2 sich mit WLAN überschneidet)                                                                                                      | 8 konfigurierbar analog/digital (0–10 V)                 | 3x 12-Bit-ADC, bis zu 24 Kanäle (nicht alle Kanäle zwingend auf Boardpins herausgeführt)    |
| Kommunikationsschnittstelle | 3x UART, 3x SPI, 2x I2C– **kein natives Ethernet**, aber per externem Modul nachrüstbar                                                                                                                                  | Ethernet (10/100, Modbus TCP), RS485 (halbduplex), USB-C | Ethernet (10/100), 4x UART, 6x SPI, 4x I2C, 3x CAN                                          |
| RS485 nativ vorhanden?      | Nein                                                                                                                                                                                                                     | Ja, onboard                                              | Nein                                                                                        |
| Funkfunktionen              | WLAN 802.11 b/g/n, Bluetooth Classic + BLE                                                                                                                                                                               | Keine                                                    | Keine                                                                                       |
| Speicher                    | 4–16 MB Flash je nach Variante                                                                                                                                                                                           | 2 MB internes Flash + 16 MB QSPI-Flash, 1 MB RAM         | 2 MB Flash, 512 KB RAM                                                                      |
| Zusätzlicher Speicher       | Kein SD-Kartenslot standardmäßig auf gängigen DevKit-Boards                                                                                                                                                              | –                                                        | –                                                                                           |
| Robustheit / Zertifizierung | Keine Angabe zu erweitertem Temperaturbereich oder Industriezertifizierung gefunden                                                                                                                                      | -20 °C bis +50 °C, CE, cULus, IP20, DIN-Schiene          | Keine Angabe zu Industriezertifizierung                                                     |
| Vorteil                     | Sehr günstig, riesige Community/Bibliotheken, ausreichend viele analoge Kanäle für die drei geforderten Messgrößen (Temperatur, Druck, Strom)                                                                            | Erfüllt alle Muss-Kriterien ohne Zusatzhardware          | Höchste ADC-Auflösung bei vielen Kanälen, natives Ethernet, sehr leistungsfähiger Prozessor |
| Einschränkung               | ADC gilt als nichtlinear/rauschanfällig – kritisch bei präzisen Druck-/Strommessungen; kein natives Ethernet/RS485; WLAN/BT unnötiger Overhead für eine rein kabelgebundene Anwendung; keine industrielle Zertifizierung | Kein natives Display-Interface, höherer Preis            | RS485 nur mit externem Transceiver, keine Industriezertifizierung/-gehäuse vorhanden        |
|                             |                                                                                                                                                                                                                          |                                                          |                                                                                             |

## uneindeutiger/chipbezogener Angaben

- **ESP32 – Analoge Eingänge:** Die "18 ADC-Kanäle" sind eine **Chip-Eigenschaft** des Espressif-SoCs. Auf dem gängigen ESP32-DevKitC-Board ist davon nur ein Teil frei nutzbar, da einige Pins als Boot-/Strapping-Pins reserviert sind (z. B. GPIO0) und ADC2 durch aktive WLAN-Nutzung blockiert werden kann – die Chipzahl darf also **nicht 1:1 als praktisch nutzbare Kanalzahl** übernommen werden.
- **ESP32 – Funkfunktionen:** WLAN und Bluetooth sind fest im SoC integriert und lassen sich nicht deaktivieren/entfernen – für diesen Fall (rein kabelgebundene Anwendung) ist das ein nicht benötigtes, aber stets vorhandenes Merkmal (potenzielle Störquelle in industrieller Umgebung).
- **STM32 Nucleo-F767ZI – ADC-Kanäle:** wie zuvor – die 24 Kanäle gelten für den Chip, nicht zwangsläufig für alle Board-Pinheader.
- **Arduino Opta – Eingangsspannungsangabe:** "12→24 V" bezieht sich auf die **Versorgungsspannung des Geräts**, nicht auf den Signalpegel der Analogeingänge (separat mit 0–10 V spezifiziert).



# Entscheidung

## Dokumentierte KI-Anfrage

**Anfrage an die KI (Claude):**

> "Welches Mikrocontroller-Board eignet sich am besten für eine industrielle Messwerterfassung mit mehreren analogen Sensoren (Temperatur, Druck, Stromaufnahme), die per Ethernet oder RS485 an ein Leitsystem angebunden werden soll und robust im Dauerbetrieb laufen muss? Vergleiche ESP32, Arduino Opta RS485 und STM32 Nucleo-F767ZI."

**Auszug der KI-Antwort:**

> "Für diesen Anwendungsfall ist der **Arduino Opta RS485** die beste Wahl, da er sowohl RS485 als auch Ethernet nativ integriert hat und für Industrieumgebungen mit einem Betriebstemperaturbereich von -20 °C bis +50 °C zertifiziert ist (CE, cULus). Der **ESP32** bietet zwar ebenfalls RS485- und Ethernet-Anschlüsse direkt auf dem Board sowie WLAN als Backup-Verbindung, ist aber weniger für raue Industrieumgebungen ausgelegt. Der **STM32 Nucleo-F767ZI** punktet mit einem präzisen 12-Bit-ADC mit bis zu 24 Kanälen und nativem Ethernet, hat jedoch keine Industriezertifizierung."

## 20. Prüftabelle: KI-Aussagen vs. Herstellerquellen

| #   | KI-Aussage                                                                                                   | bestätigt/widerlegt/unklar | Korrektur                                                                                                                                                                                                                                                                                                                                |
| --- | ------------------------------------------------------------------------------------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | "Arduino Opta RS485 hat RS485 und Ethernet nativ integriert, zertifiziert für -20 °C bis +50 °C (CE, cULus)" | **bestätigt**              | Keine Korrektur nötig – deckt sich mit den in A3 recherchierten Werten.                                                                                                                                                                                                                                                                  |
| 2   | "ESP32 bietet RS485- und Ethernet-Anschlüsse direkt auf dem Board"                                           | **widerlegt**              | Der ESP32-Chip selbst hat **kein natives Ethernet- oder RS485-Interface**. Beides ist nur über zusätzliche externe Bausteine (RS485-Transceiver am UART, W5500-Ethernet-Modul über SPI) realisierbar. Dies ist ein typisches Beispiel für eine KI-Halluzination, die durch den Herstellerdatenblatt-Abgleich (Hilfe 1) aufgedeckt wurde. |
| 3   | "STM32 Nucleo-F767ZI hat einen 12-Bit-ADC mit bis zu 24 Kanälen"                                             | **bestätigt**              | Korrekt für den Chip; ob alle 24 Kanäle auf dem Nucleo-144-Board tatsächlich über Pinheader zugänglich sind, bleibt laut A3 weiterhin ungeklärt (siehe dortige Anmerkung).                                                                                                                                                               |
| 4   | "STM32 Nucleo-F767ZI hat keine Industriezertifizierung"                                                      | **bestätigt**              | Keine Korrektur nötig.                                                                                                                                                                                                                                                                                                                   |

## 21. Entscheidungsmatrix (Gewichtung × Bewertung)

Bewertungsskala: 0 = ungeeignet, 
1 = eingeschränkt geeignet, 
2 = gut geeignet, 
3 = sehr gut geeignet für das jeweilige Kriterium

| Kriterium                                     | Gewicht | ESP32 Bewertung | ESP32 Punkte | Opta Bewertung | Opta Punkte | Nucleo Bewertung | Nucleo Punkte |
| --------------------------------------------- | ------- | --------------- | ------------ | -------------- | ----------- | ---------------- | ------------- |
| Anzahl analoger Eingänge                      | 3       | 2               | 6            | 2              | 6           | 3                | 9             |
| ADC-Auflösung                                 | 3       | 1               | 3            | 1              | 3           | 3                | 9             |
| Kabelgebundene Schnittstelle (RS485/Ethernet) | 3       | 0               | 0            | 3              | 9           | 2                | 6             |
| I2C/SPI-Schnittstelle                         | 2       | 3               | 6            | 0              | 0           | 3                | 6             |
| Nichtflüchtiger Speicher                      | 2       | 3               | 6            | 3              | 6           | 2                | 4             |
| Displayanbindung                              | 2       | 3               | 6            | 0              | 0           | 3                | 6             |
| Industrielle Robustheit                       | 3       | 0               | 0            | 3              | 9           | 0                | 0             |
| Baugröße/Formfaktor                           | 1       | 3               | 3            | 1              | 1           | 1                | 1             |
| **Summe**                                     | **19**  |                 | **30**       |                | **34**      |                  | **41**        |

**Rein rechnerisches Ergebnis:** Nucleo-F767ZI (41) > Opta (34) > ESP32 (30).

## 22. Kritische Prüfung des Rechenergebnisses

**Ausschlusskriterium:** Trotz der höchsten Gesamtpunktzahl **scheidet der Nucleo-F767ZI aus**, da er bei "Industrielle Robustheit" (Muss-Kriterium, Gewicht 3) mit **0 Punkten** bewertet wurde – als reines Entwicklungsboard ohne Schutzgehäuse oder Zertifizierung erfüllt er eine der vier Muss-Anforderungen nicht.

Ebenso fällt der **ESP32** durch zwei Muss-Kriterien mit 0 Punkten (Kabelgebundene Schnittstelle, Industrielle Robustheit) – auch er scheidet trotz brauchbarer Gesamtpunktzahl aus.

**Nur der Arduino Opta** erreicht bei **keinem** der vier Muss-Kriterien (Gewicht 3) eine Bewertung von 0 – er ist damit das einzige Board, das die Grundvoraussetzungen von Fall 1 vollständig erfüllt, obwohl er nicht die höchste Rohpunktzahl hat.

**Stabilitätsprüfung:** Testweise Änderung der Gewichtung "Baugröße" von 1 auf 2 Punkte:
- ESP32: +3 Punkte → 33
- Opta: +1 Punkt → 35
- Nucleo: +1 Punkt → 42

Die Rangfolge der reinen Zahlen bleibt stabil, ändert aber nichts am Ausschlusskriterium – Nucleo und ESP32 scheiden weiterhin wegen der 0-Punkte-Muss-Kriterien aus. Das zeigt: **kleinere Gewichtungsänderungen beeinflussen das Ergebnis kaum**, solange die Muss-Kriterien-Prüfung konsequent angewendet wird.

**Grenzen der Matrix:**

- Die additive Punktesumme **verschleiert kritische Nullen** – ein Board mit einer 0 bei einem Muss-Kriterium kann durch hohe Werte bei unwichtigeren Kriterien trotzdem oben landen (siehe Nucleo). Ohne die separate Ausschlussprüfung wäre das Ergebnis der Matrix allein irreführend.
- Einzelne Bewertungen (z. B. ADC-Auflösung des Opta) beruhen auf **unvollständigen Herstellerangaben** und sind daher unsicher – die Matrix suggeriert eine Präzision (einzelne Punktwerte), die die zugrunde liegenden Daten nicht immer hergeben.
- Die Bewertungsskala 0–3 ist **subjektiv interpretiert**; zwei Teammitglieder könnten z. B. die ADC-Rauschanfälligkeit des ESP32 unterschiedlich streng bewerten.
- Mögliche Doppelzählung: "I2C/SPI-Schnittstelle" und "Displayanbindung" hängen technisch zusammen (Displays werden meist über I2C/SPI angebunden) – das wurde in A2 bereits als Prüfpunkt notiert und beeinflusst hier tendenziell zugunsten von Boards mit vielen Kommunikationsschnittstellen.
- In der Bewertung werden keine Erweiterungsmodule beachtet, dass heißt, dass der ESP32 beispielsweise ein Ethernet-Adapter nachgerüstet werden könnte, wodurch dieser in der Bewertung steigen würde.

## Entscheidung

**Gewähltes Board: Arduino Opta RS485**

**Eignung:** Der Opta ist das einzige der drei geprüften Boards, das alle vier Muss-Kriterien (analoge Eingänge, ADC-Erfassung, kabelgebundene Schnittstelle, industrielle Robustheit) nativ ohne Ausschluss erfüllt. Er bietet Ethernet und RS485 nativ, ist für den Dauerbetrieb an einer Produktionsmaschine zertifiziert (CE, cULus, -20 °C bis +50 °C) und deckt die geforderte Übertragung an ein übergeordnetes System direkt ab.

**Einschränkungen:** Keine native Display-Anbindung, kein dokumentierter I2C/SPI-Zugang für externe Sensor-Erweiterungen, höherer Anschaffungspreis, ADC-Bit-Tiefe der Analogeingänge nicht öffentlich spezifiziert (Unsicherheit aus Punkt 20/21).

**Gründe gegen die Alternativen:**

- **ESP32** scheidet trotz niedrigerem Preis und großer Community aus, da er zwei Muss-Kriterien (Robustheit, kabelgebundene Schnittstelle) nur mit erheblichem Zusatzaufwand (externe Module) und ohne jede Industriezertifizierung erfüllen würde.
- **STM32 Nucleo-F767ZI** scheidet trotz höchster Rohpunktzahl aus, weil er als offenes Entwicklungsboard keine industrielle Zertifizierung oder Schutzklasse besitzt – ein Ausschlusskriterium für den Dauerbetrieb an einer Produktionsmaschine.

**Selbstkontrolle:** Die Entscheidung folgt **nicht** der höchsten Rechenpunktzahl (die hätte den Nucleo begünstigt) und **nicht** unkritisch der KI-Empfehlung (die fälschlich native RS485/Ethernet-Fähigkeit beim ESP32 behauptete), sondern der Kombination aus Matrixergebnis und Muss-Kriterien-Prüfung.
