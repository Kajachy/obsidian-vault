___
Bestandteil folgender docs:
- [[Nachschlagewerk.pdf]]

Online-Links:
- 

Zugehörig zu:
#LF07 #LF07-Grundlagen
___

 # Verschiedene Übertragungstechnologien

| Technologie   | Reichweite / Abdeckung                   | Datenrate      | Energiebedarf               | Infrastruktur              | Kosten         | Typische Anwendung                 |
| ------------- | ---------------------------------------- | -------------- | --------------------------- | -------------------------- | -------------- | ---------------------------------- |
| **WLAN**      | mittel, ca. 20–50 m                      | hoch           | hoch                        | Access Point/Router        | niedrig        | Smart Home, PCs, Kameras           |
| **Bluetooth** | kurz, ca. 10 m                           | mittel         | niedrig–mittel              | meist kein Gateway nötig   | niedrig        | Kopfhörer, Peripherie              |
| **BLE**       | kurz–mittel, ca. 10–50 m                 | niedrig–mittel | **sehr niedrig**            | Smartphone/Gateway möglich | niedrig        | Sensoren, Wearables                |
| **Zigbee**    | ca. 10–100 m pro Gerät, Mesh erweiterbar | niedrig        | **sehr niedrig**            | Zigbee-Hub/Gateway         | niedrig        | Smart Home, Sensoren               |
| **Z-Wave**    | ca. 30–100 m, Mesh                       | niedrig        | niedrig                     | Z-Wave-Hub                 | mittel         | Smart Home                         |
| **NFC**       | wenige cm                                | sehr niedrig   | sehr niedrig                | NFC-fähiges Gerät          | niedrig        | Bezahlen, Zugangskarten            |
| **RFID**      | cm bis mehrere Meter                     | niedrig        | sehr niedrig/passiv möglich | RFID-Lesegerät             | niedrig–mittel | Warenverfolgung, Identifikation    |
| **LoRaWAN**   | **mehrere km**                           | sehr niedrig   | **sehr niedrig**            | Gateways + Netzwerkserver  | niedrig–mittel | Smart City, Landwirtschaft         |
| **NB-IoT**    | **mehrere km**, Mobilfunknetz            | niedrig        | sehr niedrig                | Mobilfunknetz              | mittel         | Zähler, Sensoren                   |
| **LTE**       | mehrere km                               | hoch           | mittel–hoch                 | Mobilfunknetz              | mittel–hoch    | Fahrzeuge, Kameras                 |
| **5G**        | mehrere 100 m bis km                     | **sehr hoch**  | mittel                      | 5G-Mobilfunknetz           | hoch           | Industrie, Fahrzeuge, Echtzeit-IoT |


# Funktechnologien

| OSI-Schicht            | Beispiel                          | Aufgabe                                |
| ---------------------- | --------------------------------- | -------------------------------------- |
| **7 – Anwendung**      | **MQTT**                          | Kommunikation zwischen IoT-Anwendungen |
| **4 – Transport**      | **TCP / UDP**                     | Zuverlässige bzw. schnelle Übertragung |
| **3 – Vermittlung**    | **IPv4 / IPv6**                   | Adressierung und Routing               |
| **2 – Sicherung**      | WLAN, Bluetooth, Zigbee, Ethernet | Übertragung innerhalb eines Netzes     |
| **1 – Bitübertragung** | Funk/Radio, Kabel                 | Physikalische Übertragung              |

# Mögliche Szenarien 

| Szenario                     | Technologie | Hauptgrund                                            |
| ---------------------------- | ----------- | ----------------------------------------------------- |
| Smart-Home-Lampen            | **Zigbee**  | energiesparend + Mesh                                 |
| Landwirtschaftliche Sensoren | **LoRaWAN** | große Reichweite + geringer Energieverbrauch          |
| Vernetztes Fahrzeug          | **5G**      | hohe Datenrate + geringe Latenz                       |
| Fitnessarmband               | **BLE**     | sehr geringer Energieverbrauch + Smartphone-Anbindung |

# ToDo: A10 einfügen


