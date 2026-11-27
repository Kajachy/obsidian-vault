___
Bestandteil folgender docs:
- [[packetTracer.pkt]]

Online-Links:
- 

Zugehörig zu:
#LF09 
___
# Einleitung

Die ITeam4U GmbH wurde von dem mittelständischen Logistikunternehmen _Sea Air and Land Logistics_ beauftragt, dessen veraltete IT-Infrastruktur zu sanieren und auf den aktuellen Stand der Technik zu bringen.

Im Mittelpunkt stehen ein neues IPv4-Adresskonzept und ein komplett überarbeitetes Switching im mehrgeschossigen Verwaltungsgebäude (KG bis 3. OG). Dazu gehören ein VLAN-Konzept mit Inter-VLAN-Routing, Zugriffsbeschränkungen zwischen den Abteilungsnetzen über ACLs, Link-Aggregation per EtherChannel und Spanning Tree zur Vermeidung von Schleifen.

| **Gruppe**     | _418_      |
| -------------- | ---------- |
| **Klasse**     | _FiB28_    |
| **Datum**      | 27.11.2026 |
| **Mitglieder** | Lasse, Tim |

# Topologie

![[topologie.png]]

## Verwendete Komponenten

Das Szenario wurde in Cisco Packet Tracer nachgebaut. Dabei wurden folgende Komponenten verwendet:

|Was?|Wofür?|
|---|---|
|Cisco 2960-24TT|Access-Switches im 1., 2. und 3. OG|
|Cisco 3650-24PS|Multilayer-Switch im EG (Routing), im KG wegen der Gigabit-Ports für den EtherChannel (nur Layer 2)|
|Copper Cross-Over Cable|Verbindung zwischen den Switches|
|Copper Straight-Through Cable|Verbindung zwischen Switches und Endgeräten|
|PCs|Endgeräte (Computer)|
|Server|Endgeräte (Server)|

## Switches

|Hostname|Modell|Standort|Funktion|Management-IP|
|---|---|---|---|---|
|SW-KG|Cisco 3650-24PS|Kellergeschoss|Access-Switch (Layer 2) für den Server, angebunden per EtherChannel (4 Links)|10.1.99.10|
|SW-EG|Cisco 3650-24PS|Erdgeschoss|Core-/Multilayer-Switch: Inter-VLAN-Routing, ACLs, DHCP für Gäste|10.1.99.1|
|SW-1OG|Cisco 2960-24TT|1. OG|Access-Switch, angebunden per EtherChannel (2 Links)|10.1.99.11|
|SW-2OG|Cisco 2960-24TT|2. OG|Access-Switch, **Root Bridge** (Spanning Tree)|10.1.99.12|
|SW-3OG|Cisco 2960-24TT|3. OG|Access-Switch|10.1.99.13|

## Endgeräte

|Gerät|Standort|VLAN|IP-Adresse|Subnetzmaske|Gateway|
|---|---|---|---|---|---|
|Server0|KG|40|10.1.40.10|255.255.255.0|10.1.40.1|
|PC4|EG|10|10.1.10.12|255.255.255.0|10.1.10.1|
|PC5|EG|20|10.1.20.12|255.255.255.0|10.1.20.1|
|PC6|EG|30|10.1.30.12|255.255.255.0|10.1.30.1|
|PC10|1. OG|10|10.1.10.14|255.255.255.0|10.1.10.1|
|PC11|1. OG|20|10.1.20.14|255.255.255.0|10.1.20.1|
|PC12|1. OG|30|10.1.30.14|255.255.255.0|10.1.30.1|
|PC7|2. OG|10|10.1.10.13|255.255.255.0|10.1.10.1|
|PC8|2. OG|20|10.1.20.13|255.255.255.0|10.1.20.1|
|PC9|2. OG|30|10.1.30.13|255.255.255.0|10.1.30.1|
|PC1|3. OG|10|10.1.10.11|255.255.255.0|10.1.10.1|
|PC2|3. OG|20|10.1.20.11|255.255.255.0|10.1.20.1|
|PC3|3. OG|30|10.1.30.11|255.255.255.0|10.1.30.1|
|PC13|3. OG|50|10.1.50.11|255.255.255.0|10.1.50.1|
|Gast-PC|EG|60|per DHCP|255.255.255.0|10.1.60.1|

# Verkabelung

## Switch -> Switch

|Switch|Port|Gegenstelle|Port Gegenstelle|Modus|VLANs|
|---|---|---|---|---|---|
|SW-EG|Gi1/0/1–4|SW-KG|Gi1/0/1–4|Trunk über Po1 (LACP)|alle, Native 999|
|SW-EG|Gi1/0/5–6|SW-1OG|Gi0/1–2|Trunk über Po2 (LACP)|alle, Native 999|
|SW-EG|Gi1/0/7|SW-3OG|Gi0/1|Trunk|alle, Native 999|
|SW-1OG|Fa0/1|SW-2OG|Fa0/1|Trunk|alle, Native 999|
|SW-2OG|Fa0/2|SW-3OG|Fa0/1|Trunk|alle, Native 999|

## Switch -> Endgerät

|Switch|Port|Gerät|Modus|VLAN|
|---|---|---|---|---|
|SW-KG|Gi1/0/5|Server0|Access|40|
|SW-EG|Gi1/0/10|PC4|Access|10|
|SW-EG|Gi1/0/9|PC5|Access|20|
|SW-EG|Gi1/0/8|PC6|Access|30|
|SW-EG|Gi1/0/11|Gast-PC|Access|60|
|SW-1OG|Fa0/2|PC10|Access|10|
|SW-1OG|Fa0/3|PC11|Access|20|
|SW-1OG|Fa0/4|PC12|Access|30|
|SW-2OG|Fa0/5|PC7|Access|10|
|SW-2OG|Fa0/4|PC8|Access|20|
|SW-2OG|Fa0/3|PC9|Access|30|
|SW-3OG|Fa0/2|PC1|Access|10|
|SW-3OG|Fa0/3|PC2|Access|20|
|SW-3OG|Fa0/4|PC3|Access|30|
|SW-3OG|Fa0/5|PC13|Access|50|

Alle übrigen Ports sind abgeschaltet und VLAN 998 zugewiesen (siehe Sicherheit).

# Adresskonzept

Das Unternehmen besitzt keinen öffentlichen IPv4-Adressbereich. Deshalb wird der private Bereich **10.0.0.0/8** (RFC 1918) verwendet, der ausreichend Platz für spätere Erweiterungen bietet.

Alle Adressen folgen diesem Schema: `10.<Gebäude>.<VLAN>.<Host>/24`

|Oktett|Bedeutung|Beispiel|
|---|---|---|
|1|immer 10 (privater Bereich)|10|
|2|Gebäude|1 = Verwaltung|
|3|VLAN-ID|30 = VLAN 30|
|4|Host|11 = erster Client im VLAN|

## Gebäude

|Nr.|Gebäude|Adressbereich|Status|
|---|---|---|---|
|1|Verwaltungsgebäude|10.1.0.0/16|umgesetzt|
|2|Bürogebäude (Neubau)|10.2.0.0/16|reserviert|
|3|Lagerhalle (Neubau)|10.3.0.0/16|reserviert|

Für neue Gebäude ändert sich nur das zweite Oktett, die VLAN-Struktur kann übernommen werden.

## VLANs und Subnetze

|VLAN|Name|Netz|Subnetzmaske|Gateway|Nutzbare Hosts|
|---|---|---|---|---|---|
|10|VLAN10|10.1.10.0/24|255.255.255.0|10.1.10.1|254|
|20|VLAN20|10.1.20.0/24|255.255.255.0|10.1.20.1|254|
|30|VLAN30|10.1.30.0/24|255.255.255.0|10.1.30.1|254|
|40|Server|10.1.40.0/24|255.255.255.0|10.1.40.1|254|
|50|VLAN50|10.1.50.0/24|255.255.255.0|10.1.50.1|254|
|60|Gäste|10.1.60.0/24|255.255.255.0|10.1.60.1|254|
|99|Management|10.1.99.0/24|255.255.255.0|10.1.99.1|254|
|998|Unused|–|–|–|–|
|999|Native|–|–|–|–|

## Host-Adressvergabe

|Bereich|Verwendung|
|---|---|
|.1|Gateway (SVI auf SW-EG)|
|.2 – .9|reserviert für Netzwerkgeräte|
|.10|Server|
|.11 – .99|Clients mit fester IP|
|.100 – .254|DHCP (bisher nur VLAN 60, Gäste)|

## Begründung

- **Skalierbarkeit:** Ein /24 pro VLAN bietet Platz für 254 Geräte. Jedes Gebäude hat einen eigenen /16-Bereich mit Platz für bis zu 256 VLAN-Subnetze.
- **Übersicht:** Die VLAN-ID steht direkt in der IP-Adresse, das macht Fehlersuche und ACL-Regeln leichter.
- **Sicherheit:** Die Switches werden über ein eigenes Management-VLAN (99) verwaltet, getrennt vom Nutzerverkehr. Das Native VLAN 999 wird nirgends benutzt und schützt damit vor VLAN-Hopping.
- **Benutzerfreundlichkeit:** Gäste bekommen ihre Adresse automatisch per DHCP. Später kann DHCP auch für alle anderen VLANs aktiviert werden.

# VLAN-Konzept

|VLAN|Name|Verwendung|Geräte|
|---|---|---|---|
|10|VLAN10|Abteilungsnetz|PC1, PC4, PC7, PC10|
|20|VLAN20|Abteilungsnetz|PC2, PC5, PC8, PC11|
|30|VLAN30|Abteilungsnetz|PC3, PC6, PC9, PC12|
|40|Server|Servernetz|Server0|
|50|VLAN50|Sondernetz mit Zugriff auf alle internen VLANs|PC13|
|60|Gäste|Gästenetz (v. a. WLAN für externe LKW-Fahrer)|wechselnde Geräte|
|99|Management|Verwaltung der Switches|Management-IPs aller Switches|
|998|Unused|Parkplatz für ungenutzte Ports|–|
|999|Native|Native VLAN auf allen Trunks|–|

## VLANs anlegen

Die VLANs wurden auf **allen fünf Switches** manuell angelegt. 
```
enable
conf t
! legt VLAN 10 an und gibt ihm einen Namen
vlan 10
 name VLAN10
vlan 20
 name VLAN20
vlan 30
 name VLAN30
vlan 40
 name Server
vlan 50
 name VLAN50
vlan 60
 name Gaeste
vlan 99
 name Management
vlan 998
 name Unused
vlan 999
 name Native
end
```

Anzeigen: `show vlan brief`

## Begründung für VLAN 99

- Die Verwaltung der Netzwerkgeräte ist vom normalen Datenverkehr getrennt.
- Nutzer und Gäste kommen nicht an die Management-Oberflächen der Switches.
- Standardmäßig liegt das Management auf VLAN 1. Das ist ein bekanntes Sicherheitsrisiko, weil auf VLAN 1 jeder Port hängt, der nicht konfiguriert wurde.

Jeder Switch hat eine Management-IP in VLAN 99 (siehe Switches). Die Layer-2-Switches benötigen zusätzlich ein Default-Gateway, damit sie aus anderen VLANs erreichbar sind:

```
interface vlan 99
 ip address 10.1.99.12 255.255.255.0
 no shutdown
 exit
ip default-gateway 10.1.99.1
```

## Wofür VLAN 998

Alle ungenutzten Ports sind abgeschaltet und VLAN 998 zugewiesen. Wird ein solcher Port versehentlich wieder aktiviert, landet das Gerät trotzdem in einem VLAN, das nirgendwohin führt.

## Begründung für VLAN 999

- **Schutz vor VLAN-Hopping (Double Tagging):** Ein Angreifer könnte sonst Frames mit zwei VLAN-Tags verschicken und so in fremde VLANs gelangen. Weil in VLAN 999 kein Gerät hängt, läuft dieser Angriff ins Leere.
- **Klare Trennung:** In VLAN 999 liegt kein Nutzerverkehr. Wenn dort doch Verkehr auftaucht, ist das ein Hinweis auf einen Fehler.
- Das Native VLAN muss auf beiden Seiten eines Trunks gleich sein, sonst gibt es einen „Native VLAN mismatch“. Deshalb ist es auf allen Trunks einheitlich gesetzt.

## Wer darf womit kommunizieren?

Vorgabe des Kunden (x = Zugriff erlaubt):

|von \ nach|10|20|30|40|50|60|
|---|---|---|---|---|---|---|
|**10**|x||x|x|x||
|**20**||x||x|x||
|**30**|x||x|x|x||
|**40**|x|x|x|x|x||
|**50**|x|x|x|x|x||
|**60**||||||x|

Umgesetzt wird die Matrix über ACLs auf SW-EG (siehe ACLs).

# Trunks

Alle Verbindungen zwischen den Switches sind als Trunk konfiguriert (IEEE 802.1Q) und transportieren alle VLANs. Als Native VLAN ist auf allen Trunks VLAN 999 gesetzt.

## Festlegen (Beispiel SW-3OG)

```
enable
conf t
interface range fa0/1, gi0/1
 switchport mode trunk
 switchport trunk native vlan 999
end
```

Auf dem 3650 (SW-EG) ist vor `switchport mode trunk` ggf. noch `switchport trunk encapsulation dot1q` nötig.

## Überprüfen

`show interfaces trunk`

# EtherChannel

Ein EtherChannel fasst mehrere physische Leitungen zwischen zwei Switches zu einer logischen Verbindung zusammen. Das bringt:

- **mehr Bandbreite**, da der Verkehr auf alle Leitungen verteilt wird
- **Ausfallsicherheit**, da beim Ausfall eines Kabels die übrigen weiterlaufen
- **keine STP-Blockaden** zwischen den parallelen Leitungen, da Spanning Tree den Channel als einen einzigen Link sieht

Als Protokoll wird **LACP** (IEEE 802.3ad, `mode active`) verwendet. Es ist ein offener Standard und nicht wie PAgP auf Cisco beschränkt.

|Channel|Verbindung|Ports SW-EG|Ports Gegenstelle|Bandbreite|
|---|---|---|---|---|
|Po1|SW-EG ↔ SW-KG|Gi1/0/1–4|Gi1/0/1–4|4 × 1 Gbit/s|
|Po2|SW-EG ↔ SW-1OG|Gi1/0/5–6|Gi0/1–2|2 × 1 Gbit/s|

## EtherChannel anlegen

**SW-EG**

```
enable
conf t
! --- zum KG ---
interface range gi1/0/1 - 4
 channel-group 1 mode active
 exit
interface port-channel 1
 switchport mode trunk
 switchport trunk native vlan 999
 exit
! --- zum 1. OG ---
interface range gi1/0/5 - 6
 channel-group 2 mode active
 exit
interface port-channel 2
 switchport mode trunk
 switchport trunk native vlan 999
end
```

**SW-KG**

```
enable
conf t
interface range gi1/0/1 - 4
 channel-group 1 mode active
 exit
interface port-channel 1
 switchport mode trunk
 switchport trunk native vlan 999
end
```

**SW-1OG**

```
enable
conf t
interface range gi0/1 - 2
 channel-group 2 mode active
 exit
interface port-channel 2
 switchport mode trunk
 switchport trunk native vlan 999
end
```

Trunk-Einstellungen werden immer am Port-Channel-Interface vorgenommen, die einzelnen Ports übernehmen sie automatisch.

## EtherChannel anzeigen

```
show etherchannel summary
```


# Inter-VLAN-Routing

## Problem

Geräte in verschiedenen VLANs liegen in getrennten Broadcast-Domänen und unterschiedlichen IP-Netzen. Ohne Router können sie nicht miteinander kommunizieren. Damit z. B. die PCs auf den Server in VLAN 40 zugreifen können, muss zwischen den VLANs geroutet werden.

## Umsetzung

Das Routing übernimmt der Multilayer-Switch **SW-EG (Cisco 3650)**. Für jedes VLAN gibt es dort ein **Switch Virtual Interface (SVI)**. Das ist eine virtuelle Layer-3-Schnittstelle, die als Default-Gateway für das jeweilige VLAN dient.

| SVI     | IP-Adresse   | Funktion                    |
| ------- | ------------ | --------------------------- |
| VLAN 10 | 10.1.10.1/24 | Gateway VLAN 10             |
| VLAN 20 | 10.1.20.1/24 | Gateway VLAN 20             |
| VLAN 30 | 10.1.30.1/24 | Gateway VLAN 30             |
| VLAN 40 | 10.1.40.1/24 | Gateway Server              |
| VLAN 50 | 10.1.50.1/24 | Gateway VLAN 50             |
| VLAN 60 | 10.1.60.1/24 | Gateway Gäste + DHCP-Server |
| VLAN 99 | 10.1.99.1/24 | Gateway Management          |

Die übrigen Switches arbeiten nur auf Layer 2 und leiten den Verkehr über die Trunks zu SW-EG weiter. Für ihre eigene Erreichbarkeit haben sie nur eine Management-IP in VLAN 99 und `ip default-gateway 10.1.99.1`.

Welche Zugriffe zwischen den VLANs erlaubt sind, regeln ACLs auf den SVIs (siehe ACLs).

## Konfiguration (SW-EG)

```
ip routing
interface vlan 10
 ip address 10.1.10.1 255.255.255.0
 no shutdown
! analog für VLAN 20, 30, 40, 50, 60, 99
```

## DHCP für Gäste

SW-EG vergibt im VLAN 60 automatisch Adressen von 10.1.60.100 bis .254.

```
ip dhcp excluded-address 10.1.60.1 10.1.60.99
ip dhcp pool GAESTE
 network 10.1.60.0 255.255.255.0
 default-router 10.1.60.1
```

## Begründung: Multilayer-Switch statt Router-on-a-Stick

| |Multilayer-Switch (SVIs)|Router-on-a-Stick|
|---|---|---|
|Geschwindigkeit|Routing in Hardware, sehr schnell|Routing in Software, langsamer|
|Engpass|keiner, Verkehr läuft über die Backplane|gesamter Verkehr über **ein** Kabel zum Router|
|Ausfallsicherheit|SW-EG ist zentral und per EtherChannel angebunden|zusätzlicher Router und Leitung als Fehlerquelle|
|Geräte|kein extra Router nötig|zusätzlicher Router nötig|

## Überprüfung

- `show ip interface brief`: alle VLAN-Interfaces sind up/up
- `show ip route`: alle Netze werden als **C** (connected) angezeigt
- Ping zwischen erlaubten VLANs funktioniert (siehe Testprotokoll)

# ACLs & Testprotokoll

## Konzept

![[ACL-Table.png]]

Für jedes VLAN gibt es eine eigene erweiterte ACL. Sie ist **eingehend** (`in`) am jeweiligen SVI auf SW-EG angewendet, sodass der Verkehr direkt dort gefiltert wird, wo er ins Routing kommt. Pro VLAN wird nur gesperrt, was laut VLAN-Matrix verboten ist, der Rest ist erlaubt.

Zusätzlich zur Matrix ist das Management-Netz (VLAN 99) nur aus VLAN 50 erreichbar. Normale Nutzer und Gäste können die Switches also nicht erreichen.

Hinweise:

- Am Ende jeder ACL steht implizit ein `deny any`, deshalb endet jede ACL mit einer permit-Regel.
- In VLAN 60 ist DHCP (`bootps`) ausdrücklich erlaubt, damit Gäste eine Adresse bekommen. Die abschließende `permit ip any any` ermöglicht später einen Internetzugang, intern ist vorher alles gesperrt.
- Verkehr innerhalb eines VLANs wird nur geswitcht und nicht geroutet, daher greifen die ACLs dort nicht.

## Einrichten (SW-EG)

```
enable
conf t

ip access-list extended VLAN10_IN
 deny ip 10.1.10.0 0.0.0.255 10.1.20.0 0.0.0.255
 deny ip 10.1.10.0 0.0.0.255 10.1.60.0 0.0.0.255
 deny ip 10.1.10.0 0.0.0.255 10.1.99.0 0.0.0.255
 permit ip 10.1.10.0 0.0.0.255 any
 exit

ip access-list extended VLAN20_IN
 deny ip 10.1.20.0 0.0.0.255 10.1.10.0 0.0.0.255
 deny ip 10.1.20.0 0.0.0.255 10.1.30.0 0.0.0.255
 deny ip 10.1.20.0 0.0.0.255 10.1.60.0 0.0.0.255
 deny ip 10.1.20.0 0.0.0.255 10.1.99.0 0.0.0.255
 permit ip 10.1.20.0 0.0.0.255 any
 exit

ip access-list extended VLAN30_IN
 deny ip 10.1.30.0 0.0.0.255 10.1.20.0 0.0.0.255
 deny ip 10.1.30.0 0.0.0.255 10.1.60.0 0.0.0.255
 deny ip 10.1.30.0 0.0.0.255 10.1.99.0 0.0.0.255
 permit ip 10.1.30.0 0.0.0.255 any
 exit

ip access-list extended VLAN40_IN
 deny ip 10.1.40.0 0.0.0.255 10.1.60.0 0.0.0.255
 deny ip 10.1.40.0 0.0.0.255 10.1.99.0 0.0.0.255
 permit ip 10.1.40.0 0.0.0.255 any
 exit

ip access-list extended VLAN50_IN
 deny ip 10.1.50.0 0.0.0.255 10.1.60.0 0.0.0.255
 permit ip 10.1.50.0 0.0.0.255 any
 exit

ip access-list extended VLAN60_IN
 permit udp any any eq bootps
 deny ip any 10.0.0.0 0.255.255.255
 permit ip any any
 exit

interface vlan 10
 ip access-group VLAN10_IN in
interface vlan 20
 ip access-group VLAN20_IN in
interface vlan 30
 ip access-group VLAN30_IN in
interface vlan 40
 ip access-group VLAN40_IN in
interface vlan 50
 ip access-group VLAN50_IN in
interface vlan 60
 ip access-group VLAN60_IN in
end
```

## Anzeigen

`show access-lists` 

## Testprotokoll

Getestet am 26.11.2026 mittels `ping` bzw. `ssh` aus dem Command Prompt der Endgeräte.

|Nr.|Von|Nach|Ziel-IP|Erwartet|Ergebnis|
|---|---|---|---|---|---|
|1|PC1 (VLAN 10)|PC4 (VLAN 10)|10.1.10.12|✅|✅|
|2|PC1 (VLAN 10)|PC2 (VLAN 20)|10.1.20.11|❌|❌|
|3|PC1 (VLAN 10)|PC3 (VLAN 30)|10.1.30.11|✅|✅|
|4|PC1 (VLAN 10)|Server0 (VLAN 40)|10.1.40.10|✅|✅|
|5|PC1 (VLAN 10)|PC13 (VLAN 50)|10.1.50.11|✅|✅|
|6|PC2 (VLAN 20)|PC3 (VLAN 30)|10.1.30.11|❌|❌|
|7|PC2 (VLAN 20)|Server0 (VLAN 40)|10.1.40.10|✅|✅|
|8|PC2 (VLAN 20)|PC13 (VLAN 50)|10.1.50.11|✅|✅|
|9|PC3 (VLAN 30)|Server0 (VLAN 40)|10.1.40.10|✅|✅|
|10|PC3 (VLAN 30)|PC13 (VLAN 50)|10.1.50.11|✅|✅|
|11|Server0 (VLAN 40)|PC13 (VLAN 50)|10.1.50.11|✅|✅|
|12|Gast (VLAN 60)|IP per DHCP|–|✅ IP ab .100|✅|
|13|Gast (VLAN 60)|PC1 (VLAN 10)|10.1.10.11|❌|❌|
|14|Gast (VLAN 60)|Server0 (VLAN 40)|10.1.40.10|❌|❌|
|15|PC1 (VLAN 10)|Gast (VLAN 60)|10.1.60.100|❌|❌|
|16|PC13 (VLAN 50)|Gast (VLAN 60)|10.1.60.100|❌|❌|
|17|PC13 (VLAN 50)|SSH auf SW-2OG|10.1.99.12|✅ Login|✅|
|18|PC1 (VLAN 10)|SW-2OG (Mgmt)|10.1.99.12|❌|❌|
|19|PC2 (VLAN 20)|SW-2OG (Mgmt)|10.1.99.12|❌|❌|



# Spanning Tree

Im Netz gibt es eine physische Schleife über SW-EG → SW-1OG → SW-2OG → SW-3OG → SW-EG. Damit keine Broadcast-Stürme entstehen, läuft auf allen Switches **PVST** (Per-VLAN Spanning Tree). Er sperrt eine Verbindung logisch und gibt sie bei einem Ausfall automatisch wieder frei.

## Root Bridge

Die Root Bridge, also der Ausgangspunkt des Spanning Tree, ist laut Kundenvorgabe in allen VLANs **SW-2OG**.

```
enable
conf t
spanning-tree vlan 1,10,20,30,40,50,60,99,998,999 root primary
end
```

Dadurch sinkt die Priority von SW-2OG auf 24576. Alle anderen Switches behalten den Standardwert 32768. Da die Konfiguration für alle VLANs gleich ist, ergibt sich in jedem VLAN derselbe Baum. Die folgenden Werte stammen aus VLAN 10.

## Bridge-IDs und Pfadkosten

|Switch|Priority|MAC-Adresse|Rolle|Root-Port|Pfadkosten zur Root|
|---|---|---|---|---|---|
|**SW-2OG**|**24586**|00D0.BCAD.0738|**Root Bridge**|–|0|
|SW-1OG|32778|00E0.A363.1DAD|Non-Root|Fa0/1|19|
|SW-3OG|32778|00D0.FF13.5990|Non-Root|Fa0/1|19|
|SW-EG|32778|000D.BD1D.B819|Non-Root|Po2|22|
|SW-KG|32778|0050.0F6D.A0E3|Non-Root|Po1|25|

## Warum Gi1/0/7 auf SW-EG blockiert ist

SW-EG hat zwei Wege zur Root Bridge:

- über SW-1OG: Po2 (3) + Fa0/1 (19) = **22**
- über SW-3OG: Gi1/0/7 (4) + Fa0/1 (19) = **23**

Der günstigere Weg über Po2 wird zum Root-Port. Auf der Leitung zwischen SW-EG und SW-3OG gewinnt SW-3OG, weil es mit Kosten 19 näher an der Root liegt als SW-EG mit 22. Gi0/1 auf SW-3OG wird deshalb Designated Port, und **Gi1/0/7 auf SW-EG wird blockiert**. Fällt die Verbindung über SW-1OG aus, schaltet STP diesen Port automatisch frei.

## Anzeigen

- `show spanning-tree vlan 10`: auf SW-2OG steht „This bridge is the root“
- `show spanning-tree root`: zeigt auf jedem Switch die Root Bridge aller VLANs

# Sicherheit

Zusätzlich zu Management-VLAN, Native VLAN 999 und ACLs wurden folgende Maßnahmen umgesetzt.

## PortFast & BPDU Guard

Auf allen Access-Ports zu Endgeräten sind PortFast und BPDU Guard aktiviert.

```
enable
conf t
interface gi1/0/5
 switchport mode access
 switchport access vlan 40
 spanning-tree portfast
 spanning-tree bpduguard enable
end
```

- **PortFast:** Der Port überspringt die Listening- und Learning-Phase und geht sofort in den Forwarding-Zustand. Endgeräte sind damit direkt nach dem Einstecken erreichbar statt erst nach etwa 30 Sekunden.
- **BPDU Guard:** Sobald an dem Port BPDUs empfangen werden, wird er sofort abgeschaltet (err-disabled), da BPDUs nur von Switches gesendet werden. Das schützt vor Schleifen durch unerlaubt angeschlossene Switches und vor Manipulation der Root Bridge.

PortFast und BPDU Guard sind nur auf Access-Ports gesetzt, nie auf Trunks.

## Ungenutzte Ports abschalten

Alle ungenutzten Ports sind abgeschaltet und VLAN 998 zugewiesen (Beispiel SW-KG):

```
enable
conf t
interface range gi1/0/6 - 24, gi1/1/1 - 4
 switchport mode access
 switchport access vlan 998
 shutdown
end
```

Soll ein Port wieder genutzt werden, wird er dem passenden VLAN zugewiesen und aktiviert (Beispiel Gast-PC):

```
enable
conf t
interface gi1/0/11
 switchport access vlan 60
 spanning-tree portfast
 spanning-tree bpduguard enable
 no shutdown
end
```

## SSH

Die Switches werden per SSH aus der Ferne gewartet. Durch die ACLs ist das nur aus VLAN 50 (PC13) möglich. Telnet ist durch `transport input ssh` deaktiviert, da es Passwörter unverschlüsselt überträgt.

Benutzer: `admin`, Passwort: `Admin123!`

Auf allen Switches:

```
enable
conf t
ip domain-name sall.local
username admin secret Admin123!
crypto key generate rsa general-keys modulus 1024
ip ssh version 2
line vty 0 4
 login local
 transport input ssh
end
```

Auf den 2960 zusätzlich:

```
enable
conf t
line vty 5 15
 login local
 transport input ssh
end
```

Verbinden von PC13 aus: `ssh -l admin 10.1.99.12`

## Passwörter für Konsole und enable

In der Testumgebung wurde darauf verzichtet, damit die Switches bei der Bewertung ohne Zugangsdaten geprüft werden können. Im Echtbetrieb müssten folgende Befehle ausgeführt werden:

```
enable
conf t
enable secret Cisco123!
service password-encryption
banner motd #Zugriff nur fuer autorisierte Personen!#
line con 0
 password Konsole123!
 login
end
```

# Konfiguration speichern

Änderungen in der Konfiguration müssen immer wie folgt gespeichert werden:

`copy running-config startup-config`

# Fazit

Das Netz der Sea Air and Land Logistics wurde vollständig in Packet Tracer umgesetzt und getestet. Die VLANs sind über einen Multilayer-Switch geroutet, und die Zugriffe zwischen den VLANs entsprechen laut Testprotokoll der Vorgabe des Kunden. EtherChannel und Spanning Tree sorgen für Ausfallsicherheit, die Root Bridge liegt wie gefordert im 2. OG. Zusätzlich wurde das Netz durch ein eigenes Management-VLAN, ein ungenutztes Native VLAN, abgeschaltete Ports, PortFast/BPDU Guard und SSH abgesichert.

Durch das Adressschema mit eigenem /16-Bereich pro Gebäude können das neue Bürogebäude und die Lagerhalle später ohne Umbau angebunden werden.
