___
Bestandteil folgender docs:
- [[docs/LF08/Nachschlagewerk.pdf|Nachschlagewerk]]

Online-Links:
- 

Zugehörig zu:
#LF08 #LF08-Grundlagen
___

# Einstieg

## What To Do?

| Nummer | Thema              | Verlinkung                    | Zeit       | Ready? |
| ------ | ------------------ | ----------------------------- | ---------- | ------ |
| 01     | Normalisierung     | [[Normalisierung]]            | Montag     | ✅      |
| 02     | Modellierung       | [[Modellierung]]              | Montag     | ✅      |
| 03     | DBMS               | [[DBMS]]                      | Dienstag   | ✅      |
| 04     | DB aufbauen        | [[SQL]]                       | Dienstag   | ✅      |
| 05     | Mit Daten arbeiten | [[SQL]]                       | Dienstag   | ✅      |
| 06     | Rechte             | [[Benutzer & Berechtigungen]] | Donnerstag | ✅      |
|        | Zusammenfassung    | [[Zusammenfassung]]           | x          | ✅      |



## BBK Eigen-Bewertung

| Kriterium                                                                                                                                                                                                                       | Eigenbewertung Anfang (0-3) | Eigenbewertung Danach (0-3) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | --------------------------- |
| Normalformen 1NF bis 3NF, funktionale Abhängigkeiten, Schlüssel und Datenanomalien.                                                                                                                                             | 2                           | 3                           |
| Chen-Notation, Kardinalitäten und Teilnahmebedingungen; Unterschiede zwischen ER/EER und relationalem Modell; schwache Entitäten mit partiellem Schlüssel und Eindeutigkeitsannahme.                                            | 1                           | 2                           |
| Tabellenstruktur, Datentypen, Längen, NULL-Regeln, Standardwerte, Indizes und Erstellreihenfolge.                                                                                                                               | 2                           | 3                           |
| Rechtebedarf für Lesen, Datenpflege und Schemaentwicklung; Benutzer@Host; Systemobjekte für Konten und Rechte sowie Gründe gegen direkte Änderungen daran.                                                                      | 1                           | 3                           |
| Primär- und Fremdschlüssel, n:m-Detailtabellen und referenzielle Integrität; Einsatzbedingungen von RESTRICT, ON DELETE CASCADE und SET NULL.                                                                                   | 2                           | 2                           |
| SQL-Befehlsaufbau und Befehlsgruppen DDL, DML, DQL, DCL und TCL mit Zweck und Anwendungsbeispielen.                                                                                                                             | 2                           | 3                           |
| DBMS- und Werkzeugwahl; Server, Client, Port, Verbindung und typische Fehler.                                                                                                                                                   | 2                           | 3                           |
| Sichere Datenänderungen und gezielte Datenauswahl mit WHERE, ORDER BY sowie COUNT oder AVG mit Alias.                                                                                                                           | 2                           | 2                           |
| Ich kann Rohdaten sichern, bis zur 3NF normalisieren und auf Vollständigkeit und Anomalien prüfen sowie Schlüssel, Korrekturen und offene Annahmen begründen.                                                                   | 2                           | 3                           |
| Ich kann ein Chen-Modell erstellen und prüfen, über EER-Erweiterungen begründet entscheiden und ein relationales Schema ableiten sowie mindestens drei Übereinstimmungen oder Abweichungen zur Vorlage dokumentieren.           | 1                           | 3                           |
| Ich kann ein DBMS einrichten, Version, Port, Verbindung, Testdatenbank und Start/Stopp prüfen, mit tee protokollieren sowie Fehlerprüfungen, Serverprotokolle und einen Rückfallweg erläutern.                                  | 2                           | 3                           |
| Ich kann fünf Testartikel anlegen, sechs SELECT-Abfragen mit COUNT oder AVG prüfen, UPDATE/DELETE durch Vorher-Nachher-Vergleiche belegen sowie drei Fehlerfälle analysieren und die Anweisungen korrigieren.                   | 2                           | 3                           |
| Ich kann ein Schema mit CREATE/ALTER TABLE umsetzen, fünf Rohskriptbefunde prüfen, Daten geordnet importieren und Testdaten entfernen sowie Zeilenzahlen, drei Verkaufsfälle und gültige und ungültige Integritätsfälle prüfen. | 2                           | 3                           |
| Ich kann drei Rollen mit CREATE USER, GRANT, REVOKE und DROP USER umsetzen, Konten und Rechte mit SHOW GRANTS, SHOW CREATE USER und Systemabfragen prüfen sowie je Rolle zwei erlaubte und zwei verbotene Befehle testen.       | 1                           | 3                           |


# Fazit der Woche

**Gut lief:**

- Die **Normalisierung bis zur 3NF** hat gut funktioniert.
- **Entitäten, Attribute, Primärschlüssel und Beziehungen** konnte ich im Modell erkennen.
- Die Unterschiede zwischen **ER und EER** sowie die **Chen-Notation** konnte ich nachvollziehen.
- **1:n- und n:m-Beziehungen** und deren Umsetzung mit Fremdschlüsseln bzw. Zwischentabellen wurden verständlicher.
- Bei der aktuellen SQL-Prüfung konnte ich bereits sinnvolle Punkte wie **Primärschlüssel, Fremdschlüssel und Datentypen** erkennen.
    

**Schwierig lief:**

- Bei **JOINs** fehlte zunächst das Wissen.
- Bei EER-Diagrammen kamen Missverständnisse auf, die sich nachträglich auf das Datenbank Design auswirkten.
    

**Nächstes Mal würde ich:**

1. Zuerst **Entitäten und Beziehungen eindeutig festlegen**.
2. Bei jeder Beziehung bewusst prüfen: **1:1, 1:n oder n:m?**
3. Bei SQL besonders auf **`JOIN ... ON`**, Datentypen, `NOT NULL`, PKs und FKs achten.
4. Das fertige Modell anschließend noch einmal gegen die **fachlichen Anforderungen** prüfen, bevor ich SQL daraus erstelle.