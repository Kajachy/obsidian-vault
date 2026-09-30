___
Bestandteil folgender docs:
- [[docs/LF07/Nachschlagewerk.pdf]]
- [[MQTT]]

Online-Links:
- 

Zugehörig zu:
#LF07 #LF07-Grundlagen
___

# QoS Level

|                             | **QoS 0**                    | **QoS 1**             | **QoS 2**                               |
| --------------------------- | ---------------------------- | --------------------- | --------------------------------------- |
| Bezeichnung                 | At most once                 | At least once         | Exactly once                            |
| Zustellung                  | höchstens einmal             | mindestens einmal     | genau einmal                            |
| Bestätigung                 | ❌ Nein                       | ✅ PUBACK              | ✅ Mehrstufiges Verfahren                |
| Duplikate möglich?          | ❌ praktisch keine durch MQTT | ✅ Ja                  | ❌ Nein                                  |
| Nachrichtenverlust möglich? | ✅ Ja                         | ❌ normalerweise nicht | ❌ normalerweise nicht                   |
| Netzwerkaufwand             | gering                       | mittel                | hoch                                    |
| Geschwindigkeit             | hoch                         | mittel                | niedriger                               |
| Geeignet für                | häufige Messwerte            | wichtige Nachrichten  | besonders wichtige, seltene Nachrichten |
|                             |                              |                       |                                         |
**Merksatz:**
> **QoS 0:** Egal, wenn eine Nachricht verloren geht.  
> **QoS 1:** Lieber doppelt als verloren.  
> **QoS 2:** MQTT soll die Nachricht genau einmal übertragen.


# QoS Situationszuordnungen

| Situation                                              |   QoS | Begründung                                                                                                      |
| ------------------------------------------------------ | ----: | --------------------------------------------------------------------------------------------------------------- |
| 🌡️ Temperaturmessung alle 5 Sekunden                  | **0** | Wenn ein Messwert verloren geht, kommt kurz darauf der nächste.                                                 |
| 💡 Status einer Smart-Home-Lampe                       | **1** | Ein verlorener Schaltbefehl wäre problematisch, ein mögliches Duplikat kann die Anwendung verkraften.           |
| 🚨 Einbruchsalarm                                      | **1** | Die Nachricht soll zuverlässig ankommen. Ein Duplikat des Alarms ist weniger schlimm als ein verlorener Alarm.  |
| 📊 Häufige Sensordaten einer Maschine                  | **0** | Sehr viele Daten; einzelne verlorene Messwerte sind akzeptabel und QoS 0 spart Ressourcen.                      |
| 💳 Übermittlung einer wichtigen Abrechnungsinformation | **2** | Die Nachricht ist selten und besonders wichtig; zusätzlicher Kommunikationsaufwand ist vertretbar.              |
| ⚙️ Konfigurationsänderung eines IoT-Geräts             | **2** | Eine doppelte Übermittlung könnte problematisch sein; die Nachricht ist wichtiger als maximale Geschwindigkeit. |
# Duplikatprobleme bei QoS 1

Bei **QoS 1** gilt:
> **At least once**

Das heißt, dass die Nachricht mindestens einmal zugestellt wird, aber auch mehrmals die Gleiche beim Empfänger ankommen kommen.

## Beispiel

Ein Sensor sendet:
```
Topic: haus/heizung
Payload: "AN"
```

Der Broker liefert die Nachricht an den Empfänger. Der Empfänger verarbeitet sie, aber die Bestätigung geht verloren.

Der Sender weiß deshalb nicht, ob die Nachricht angekommen ist und sendet sie erneut.

Der Empfänger erhält:
```
"AN"
"AN"
```


## Wie geht die Anwendung damit um?

Die Anwendung muss **Duplikate erkennen bzw. idempotent arbeiten**.

Mögliche Methoden:

- Nachrichten-ID verwenden
- Sequenznummer verwenden
- Zeitstempel prüfen
- bereits verarbeitete Nachrichten speichern
- Aktionen idempotent gestalten

**QoS 1 bedeutet also nicht „genau einmal“.**

# LWT - Last Will and Testament

Eine Nachricht (Will-Message) wird vom MQTT-Client beim Verbindungsaufbau beim Broker hinterlegt. Diese wird veröffentlicht, sobald die Verbindung unterbricht.

## Beispiel: Überwachung einer Produktionsmaschine

**Topic:**
```
factory/maschine-01/status
```

**LWT-Payload:**
```
offline
```

**Normale Nachricht:**
```
online
```

**Ablauf:**
```
Maschine
   │
   │ Verbindung herstellen
   ▼
 MQTT-Broker
   │
   │ LWT hinterlegen
   ▼
"factory/maschine-01/status"
"offline"
```

Solange die Verbindung aufrecht ist, wird die Nachricht übergeben: "online".
Sobald die Verbindung abbricht, wird die Nachricht übergeben: "offline".

# Warum garantiert QoS2 alleine keine sichere Geschäftsaktion?

MQTT mit QoS 2 garantiert, dass die Nachricht auf einer MQTT-Ebene genau einmal verarbeitet wird. Sollte aber während des Prozesses die Application abstürzen oder ähnliches, kann MQTT nicht für eine einmalige Datenverarbeitung garantieren. Deshalb sollte man zusätzlich noch Anwendungssicherheit einbauen, wie eindeutige Transaktions-IDs oder Duplikat-Erkennung.