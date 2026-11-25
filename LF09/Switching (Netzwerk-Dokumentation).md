___
Bestandteil folgender docs:
- 

Online-Links:
- 

Zugehörig zu:
#LF09 
___

# Einleitung

Die ITeam4U GmbH wurde von dem mittelständischen Logistikunternehmen _Sea Air and Land Logistics_ beauftragt, dessen veraltete IT-Infrastruktur zu sanieren und auf den aktuellen Stand der Technik zu bringen.

Im Mittelpunkt stehen ein neues IPv4-Adresskonzept und ein komplett überarbeitetes Switching im mehrgeschossigen Verwaltungsgebäude (KG bis 3. OG). Dazu gehören ein VLAN-Konzept mit Inter-VLAN-Routing, Zugriffsbeschränkungen zwischen den Abteilungsnetzen über ACLs, Link-Aggregation per EtherChannel und Spanning Tree zur Vermeidung von Schleifen.

| **Gruppe** | _418_      |
| ---------- | ---------- |
| **Klasse** | _FiB28_    |
| **Datum**  | 27.11.2026 |
| Mitglieder | Lasse, Tim |

# Topologie

ToDo: hier bitte Screenshot aus dem Packet Tracer

## Switches

| Hostname | Modell          | Standort       | Funktion                                                                      |
| -------- | --------------- | -------------- | ----------------------------------------------------------------------------- |
| SW-KG    | Cisco 3650-24PS | Kellergeschoss | Access-Switch (Layer 2) für den Server, angebunden per EtherChannel (4 Links) |
| SW-EG    | Cisco 3650-24PS | Erdgeschoss    | Core-/Multilayer-Switch: Inter-VLAN-Routing, ACLs, DHCP für Gäste             |
| SW-1OG   | Cisco 2960-24TT | 1. OG          | Access-Switch, angebunden per EtherChannel (2 Links)                          |
| SW-2OG   | Cisco 2960-24TT | 2. OG          | Access-Switch, **Root Bridge** (Spanning Tree)                                |
| SW-3OG   | Cisco 2960-24TT | 3. OG          | Access-Switch                                                                 |


## Endgeräte

| Gerät   | Standort | VLAN |
| ------- | -------- | ---- |
| Server0 | KG       | 40   |
| PC4     | EG       | 10   |
| PC5     | EG       | 20   |
| PC6     | EG       | 30   |
| PC10    | 1. OG    | 10   |
| PC11    | 1. OG    | 20   |
| PC12    | 1. OG    | 30   |
| PC7     | 2. OG    | 10   |
| PC8     | 2. OG    | 20   |
| PC9     | 2. OG    | 30   |
| PC1     | 3. OG    | 10   |
| PC2     | 3. OG    | 20   |
| PC3     | 3. OG    | 30   |
| PC13    | 3. OG    | 50   |

# Verkabelung

## Switch -> Switch
| Switch | Port      | Gegenstelle | Port Gegenstelle | Modus                 | VLANs            |
| ------ | --------- | ----------- | ---------------- | --------------------- | ---------------- |
| SW-EG  | Gi1/0/1–4 | SW-KG       | Gi1/0/1–4        | Trunk über Po1 (LACP) | alle, Native 999 |
| SW-EG  | Gi1/0/5–6 | SW-1OG      | Gi0/1–2          | Trunk über Po2 (LACP) | alle, Native 999 |
| SW-EG  | Gi1/0/7   | SW-3OG      | Gi0/1            | Trunk                 | alle, Native 999 |
| SW-1OG | Fa0/1     | SW-2OG      | Fa0/1            | Trunk                 | alle, Native 999 |
| SW-2OG | Fa0/2     | SW-3OG      | Fa0/1            | Trunk                 | alle, Native 999 |

## Switch -> Endgerät
| Switch | Port     | Gerät   | Modus  | VLAN |
| ------ | -------- | ------- | ------ | ---- |
| SW-KG  | Gi1/0/5  | Server0 | Access | 40   |
| SW-EG  | Gi1/0/10 | PC4     | Access | 10   |
| SW-EG  | Gi1/0/9  | PC5     | Access | 20   |
| SW-EG  | Gi1/0/8  | PC6     | Access | 30   |
| SW-1OG | Fa0/2    | PC10    | Access | 10   |
| SW-1OG | Fa0/3    | PC11    | Access | 20   |
| SW-1OG | Fa0/4    | PC12    | Access | 30   |
| SW-2OG | Fa0/5    | PC7     | Access | 10   |
| SW-2OG | Fa0/4    | PC8     | Access | 20   |
| SW-2OG | Fa0/3    | PC9     | Access | 30   |
| SW-3OG | Fa0/2    | PC1     | Access | 10   |
| SW-3OG | Fa0/3    | PC2     | Access | 20   |
| SW-3OG | Fa0/4    | PC3     | Access | 30   |
| SW-3OG | Fa0/5    | PC13    | Access | 50   |


# Adresskonzept

Alle Adressen folgen diesem Schema:
`10.<Gebäude>.<VLAN>.<Host>/24`

|Oktett|Bedeutung|Beispiel|
|---|---|---|
|1|immer 10 (privater Bereich)|10|
|2|Gebäude|1 = Verwaltung|
|3|VLAN-ID|30 = VLAN 30|
|4|Host|12 = PC12|

## VLANs und Subnetze

| VLAN | Name       | Netz         | Subnetzmaske  | Gateway   | Nutzbare Hosts |
| ---- | ---------- | ------------ | ------------- | --------- | -------------- |
| 10   | VLAN10     | 10.1.10.0/24 | 255.255.255.0 | 10.1.10.1 | 254            |
| 20   | VLAN20     | 10.1.20.0/24 | 255.255.255.0 | 10.1.20.1 | 254            |
| 30   | VLAN30     | 10.1.30.0/24 | 255.255.255.0 | 10.1.30.1 | 254            |
| 40   | Server     | 10.1.40.0/24 | 255.255.255.0 | 10.1.40.1 | 254            |
| 50   | VLAN50     | 10.1.50.0/24 | 255.255.255.0 | 10.1.50.1 | 254            |
| 60   | Gäste      | 10.1.60.0/24 | 255.255.255.0 | 10.1.60.1 | 254            |
| 99   | Management | 10.1.99.0/24 | 255.255.255.0 | 10.1.99.1 | 254            |
| 998  | Unused     | -            | -             | -         | -              |
| 999  | Native     | –            | –             | –         | –              |

## Host-Adressvergabe
| Bereich     | Verwendung                       |
| ----------- | -------------------------------- |
| .1          | Gateway (SVI auf SW-EG)          |
| .2 – .9     | reserviert für Netzwerkgeräte    |
| .10         | Server                           |
| .11 – .99   | Clients mit fester IP            |
| .100 – .254 | DHCP (bisher nur VLAN 60, Gäste) |

## Begründung

- **Skalierbarkeit:** Ein /24 pro VLAN bietet Platz für 254 Geräte. Jedes Gebäude hat einen eigenen /16-Bereich mit Platz für bis zu 256 VLAN-Subnetze.
- **Übersicht:** Die VLAN-ID steht direkt in der IP-Adresse, das macht Fehlersuche und ACL-Regeln leichter.
- **Sicherheit:** Die Switches werden über ein eigenes Management-VLAN (99) verwaltet, getrennt vom Nutzerverkehr. Das Native VLAN 999 wird nirgends benutzt und schützt damit vor VLAN-Hopping.
- **Benutzerfreundlichkeit:** Gäste bekommen ihre Adresse automatisch per DHCP. Später kann DHCP auch für alle anderen VLANs aktiviert werden.



# VLAN-Konzept

| VLAN | Name       | Verwendung                                     | Geräte                        |
| ---- | ---------- | ---------------------------------------------- | ----------------------------- |
| 10   | VLAN10     | Abteilungsnetz                                 | PC1, PC4, PC7, PC10           |
| 20   | VLAN20     | Abteilungsnetz                                 | PC2, PC5, PC8, PC11           |
| 30   | VLAN30     | Abteilungsnetz                                 | PC3, PC6, PC9, PC12           |
| 40   | Server     | Servernetz                                     | Server0                       |
| 50   | VLAN50     | Sondernetz mit Zugriff auf alle internen VLANs | PC13                          |
| 60   | Gäste      | Gästenetz (v. a. WLAN für externe LKW-Fahrer)  | wechselnde Geräte             |
| 99   | Management | Verwaltung der Switches                        | Management-IPs aller Switches |
| 998  | Unused     | Parkplatz für ungenutzte Ports                 | –                             |
| 999  | Native     | Native VLAN auf allen Trunks                   | –                             |

## Begründung für VLAN 99

- Die Verwaltung der Netzwerkgeräte ist vom normalen Datenverkehr getrennt.
- Nutzer und Gäste kommen nicht an die Management-Oberflächen der Switches.
- Standardmäßig liegt das Management auf VLAN 1. Das ist ein bekanntes Sicherheitsrisiko, weil auf VLAN 1 jeder Port hängt, der nicht konfiguriert wurde.


## Wofür VLAN 998

Alle ungenutzten Ports sind abgeschaltet und VLAN 998 zugewiesen. Wird ein solcher Port versehentlich wieder aktiviert, landet das Gerät trotzdem in einem VLAN, das nirgendwohin führt.


## Begründung für 999

- **Schutz vor VLAN-Hopping (Double Tagging):** Ein Angreifer könnte sonst Frames mit zwei VLAN-Tags verschicken und so in fremde VLANs gelangen. Weil in VLAN 999 kein Gerät hängt, läuft dieser Angriff ins Leere.
- **Klare Trennung:** In VLAN 999 liegt kein Nutzerverkehr. Wenn dort doch Verkehr auftaucht, ist das ein Hinweis auf einen Fehler.
- Das Native VLAN muss auf beiden Seiten eines Trunks gleich sein, sonst gibt es einen „Native VLAN mismatch“. Deshalb ist es auf allen Trunks einheitlich gesetzt.


## Wer darf womit kommunizieren?

| von \ nach | 10  | 20  | 30  | 40  | 50  | 60  |
| ---------- | --- | --- | --- | --- | --- | --- |
| **10**     | x   |     | x   | x   | x   |     |
| **20**     |     | x   |     | x   | x   |     |
| **30**     | x   |     | x   | x   | x   |     |
| **40**     | x   | x   | x   | x   | x   |     |
| **50**     | x   | x   | x   | x   | x   |     |
| **60**     |     |     |     |     |     | x   |

