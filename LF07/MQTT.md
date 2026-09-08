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

# Anwendungsfall

## Beschreibung

Ein Temperatursensor ist ein **Publisher** und sendet die **Payload** `22.5 °C` an das **Topic** `temperatur`. Der **Broker** empfängt die Nachricht und verteilt sie an alle **Subscriber**, die dieses Topic abonniert haben. Sowohl Publisher als auch Subscriber sind **Clients** vom Broker

## Schaubild

![[MQTT_Klimabox.png]]

## Topics

### Topics für die Klimabox

| Topic                 | Hierachie                            |
| --------------------- | ------------------------------------ |
| Temperatur Fahrenheit | klimabox/standort/gerät/temperatur/f |
| Temperatur Celsius    | klimabox/standort/gerät/temperatur/c |
| Feuchtigkeit          | klimabox/standort/gerät/feuchtigkeit |

![[Topic_Tree_Klimabox.png]]

### Topic Abonnements

|Beschreibung|Abonnement|
|---|---|
|Die Temperatur in Celsius für alle Geräte an Standort 1|klimabox/lager1/+/temperatur/+|
|Alles von Gerät 1|klimabox/lager1/gerät1/#|


# Anwendungsfall aus der Arbeitsumgebung

Statt Schlüsseln werden in meiner Arbeitsumgebung Transponder genutzt. So kann unteranderem nachvollzogen werden, wer wann die Firma betreten hat. Die Daten können von Zuständigen überwacht werden. Für die Transponder gibt es an jeder Tür digitale Türschlösser. Diese haben einen RFID-Sensor sowie einen Motor um das Schloss zu öffnen als Aktor. Grenze des Systems ist beispielsweise der Diebstahl eines Transponders ohne die Sperrung dessen.

![[MQTT_Tueroeffner.png]]

## QoS und LWT

Für die Kommunikation der Türschlösser wird hauptsächlich QoS 1 verwendet, da Nachrichten wie erkannte Transponder, Zutrittsentscheidungen und Zutrittsprotokolle zuverlässig übertragen werden müssen. Mögliche Duplikate werden anhand einer Ereignis-ID bzw. der Kombination aus Transponder-ID und Zeitstempel erkannt. Für regelmäßig übertragene Statusmeldungen reicht QoS 0 aus, da der Verlust einer einzelnen Nachricht durch die nächste Statusmeldung ausgeglichen wird. Änderungen von Zugangsberechtigungen können aufgrund ihrer Sicherheitsrelevanz mit QoS 2 übertragen werden. Zusätzlich wird für jedes Türschloss ein LWT eingerichtet, das bei einem unerwarteten Verbindungsabbruch über das Topic `tuerschloss/<ID>/status` die Payload `offline` veröffentlicht. Dadurch kann die zentrale Überwachung erkennen, dass ein Türschloss nicht mehr erreichbar ist.

## Risiken

| Risiko                                            | Schutzmaßnahme                                               |
| ------------------------------------------------- | ------------------------------------------------------------ |
| Verlust vom Transponder                           | Schnelle Sperrung von Transpondern                           |
| Falsche Konfiguration von Zugangsberechtigungen   | Konfiguration von festen Zugangsgruppen                      |
| Schwachstellen um WLAN Netzwerk für die Schlösser | Regelmäßige Sicherheitsupdates und Überprüfung der Firewalls |
