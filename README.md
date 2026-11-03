# Deutsch-Challenge

**Ein interaktives Lernquiz für Deutsch in der 5. Klasse**  
Schulprojekt im Rahmen von **„Zeig, was du kannst“**.

| Information | Stand |
|---|---|
| Projekt | Deutsch-Challenge |
| Zielgruppe | Schülerinnen und Schüler der 5. Klasse |
| Sprache der Anwendung | Deutsch |
| Technische Basis | HTML, CSS und JavaScript |
| Hosting | GitHub Pages |
| Repository | [MatviiGIT/Deutsch-Challenge](https://github.com/MatviiGIT/Deutsch-Challenge) |
| Öffentliche Website | [matviigit.github.io/Deutsch-Challenge](https://matviigit.github.io/Deutsch-Challenge/) |
| Dokumentationsstand | 3. November 2026 |

---

## 1. Projekt in Kürze

Deutsch-Challenge ist eine kleine, browserbasierte Lernplattform. Kinder der 5. Klasse können damit ausgewählte Inhalte des Deutschunterrichts selbstständig wiederholen und ihr Wissen überprüfen.

Die Website bietet drei Schwierigkeitsstufen. Jede Frage hat drei Antwortmöglichkeiten. Nach einer Antwort zeigt das Programm, ob die Auswahl richtig war, und erklärt die Lösung in einfachen Worten. Am Ende erhalten die Lernenden eine Auswertung und Hinweise darauf, welche Inhalte sie noch üben können.

**Die zentrale Idee:** Ein Quiz soll nicht nur richtige und falsche Antworten zählen. Es soll beim Verstehen helfen.

## 2. Ausgangslage und Projektziel

### Ausgangslage

Grammatik, Rechtschreibung und Textverständnis brauchen regelmäßige Übung. Bei klassischen Arbeitsblättern erhalten Lernende eine Rückmeldung häufig erst später. Eine kurze digitale Übung kann dagegen direkt nach jeder Antwort erklären, warum eine Lösung richtig ist.

### Ziel

Wir entwickeln und erproben ein leicht zugängliches, verständliches und kostenlos nutzbares Lernquiz für die 5. Klasse.

Die Anwendung soll:

1. wichtige Grundlagen des Deutschunterrichts wiederholen;
2. Aufgaben mit unterschiedlichen Anforderungen anbieten;
3. nach jeder Antwort eine verständliche Erklärung geben;
4. selbstständiges Üben in der Schule und zu Hause ermöglichen;
5. durch Rückmeldungen von Lernenden und Lehrkräften verbessert werden.

### Was als Erfolg gelten soll

Ein veröffentlichter Link allein ist noch kein Nachweis für den Lernerfolg. Das Projekt ist dann besonders überzeugend, wenn die Aufgaben fachlich geprüft wurden, Kinder die Anwendung tatsächlich ausprobieren konnten und ihre Rückmeldungen zu konkreten Verbesserungen geführt haben.

## 3. Zielgruppe und Umfang

**Primäre Zielgruppe:** Schülerinnen und Schüler der 5. Klasse.

**Weitere mögliche Nutzer:** Deutschlehrkräfte, die das Quiz als kurze Wiederholung oder zusätzliche Übung einsetzen möchten.

Die aktuelle Version ist bewusst klein gehalten: Sie benötigt kein Benutzerkonto, keine Installation und keine Registrierung. Die Website kann über einen normalen Browser auf einem Computer, Tablet oder Smartphone geöffnet werden.

Die Aufgaben sind ein erster Entwurf für die 5. Klasse. Vor einem Einsatz im Unterricht sollten die Formulierungen, Themen und Schwierigkeitsgrade mit einer Lehrkraft abgeglichen werden.

## 4. Pädagogisches Konzept

Die drei Stufen orientieren sich an drei Arten des Lernens:

| Level | Schwerpunkt | Ziel |
|---|---|---|
| **Leicht — Wissen** | Grundlagen erkennen | Begriffe und einfache Regeln wiedererkennen |
| **Mittel — Anwenden** | Regeln benutzen | Wissen in Sätzen und kurzen Situationen anwenden |
| **Schwer — Analysieren** | Zusammenhänge verstehen | Informationen aus Sätzen und kurzen Texten erschließen |

### Themen in der aktuellen Fragensammlung

- Wortarten
- Artikel und grammatische Formen
- Rechtschreibung und Großschreibung
- Mehrzahlbildung und Wortschatz
- Satzglieder und Satzbau
- Satzzeichen
- Lese- und Textverständnis

### Lernablauf

1. Das Kind wählt ein Level oder die gesamte Challenge.
2. Die Website zeigt eine Frage mit drei Antwortmöglichkeiten.
3. Das Kind wählt eine Antwort.
4. Die richtige Lösung wird markiert und kurz erklärt.
5. Das Kind geht zur nächsten Frage.
6. Am Ende sieht es Punkte, Prozentwert, Ergebnisse nach Level und eine Liste der falsch beantworteten Fragen.

Die Fragen werden innerhalb des ausgewählten Levels zufällig sortiert. Bei „Alle Level“ bleibt die Reihenfolge der Level Leicht → Mittel → Schwer erhalten; die Fragen innerhalb jedes Levels werden gemischt.

## 5. Aktueller Funktionsumfang

Die aktuelle Fragensammlung enthält **30 Aufgaben: zehn pro Level**.

| Funktion | Aktueller Stand |
|---|---|
| Auswahl eines Levels | Vorhanden |
| Gesamte Challenge mit 30 Fragen | Vorhanden |
| Drei Antwortmöglichkeiten pro Frage | Vorhanden |
| Rückmeldung nach der Antwort | Vorhanden |
| Kurze Erklärung der richtigen Lösung | Vorhanden |
| Fortschrittsanzeige | Vorhanden |
| Punkte und Prozentwert | Vorhanden |
| Auswertung nach Level mit Trefferbalken und Prozentwert | Vorhanden |
| Liste falsch beantworteter Fragen mit eigener Antwort, richtiger Lösung und Erklärung | Vorhanden |
| Wiederholung eines Levels | Vorhanden |
| Rückkehr zum Menü | Vorhanden |
| Registrierung oder Login | Nicht erforderlich |
| Speicherung eines persönlichen Ergebnisses | Nicht implementiert |
| Lehrer-Dashboard oder Klassenstatistik | Noch nicht implementiert |
| Datenbank oder Benutzerkonten | Nicht vorhanden |

**Wichtige Einschränkung:** Die Website speichert die Ergebnisse nicht dauerhaft. Ein Neuladen oder Schließen der Seite beendet die aktuelle Sitzung und setzt den Quizstand zurück.

## 6. Gestaltung und Bedienung

Die Gestaltung soll wie ein eigenständiges Lernprodukt wirken und nicht wie eine technische Demo.

### Gestaltungsprinzipien

- ruhiger, heller Hintergrund;
- dunkles Grün als Hauptfarbe;
- Terrakotta und warmes Gelb als sparsame Akzentfarben;
- gut lesbare Überschriften mit Serifenschrift;
- klare, einfache Navigation;
- sichtbare Rückmeldung bei richtigen und falschen Antworten;
- keine unnötigen Animationen, Leuchteffekte oder dekorativen Verläufe.

### Responsive Design

Die Oberfläche passt sich an unterschiedliche Bildschirmgrößen an. Besonders wichtig sind Schul-Tablets und Smartphones. Die Darstellung muss sowohl im Hoch- als auch im Querformat überprüft werden.

### Barrierearme Bedienung

Die Anwendung enthält bereits einige grundlegende Maßnahmen:

- native HTML-Buttons für auswählbare Antworten;
- sichtbare Tastatur-Fokusmarkierung;
- Statusmeldung für die Antwort-Rückmeldung;
- eine beschriftete Fortschrittsanzeige mit ARIA-Attributen;
- reduzierte Übergänge, wenn das Betriebssystem weniger Bewegung bevorzugt.

Das ist eine Grundlage für bessere Zugänglichkeit, aber keine Aussage über eine vollständige WCAG-Konformität. Die Bedienbarkeit muss zusätzlich praktisch getestet werden.

## 7. Technischer Aufbau

Das Projekt verwendet bewusst einfache Webtechnologien. Es ist kein Framework und kein Build-System für die eigentliche Quiz-Anwendung erforderlich.

| Datei | Aufgabe |
|---|---|
| `index.html` | Seitenstruktur, Texte, Menüs und Quiz-Bereiche |
| `style.css` | Farben, Layout, Typografie und Anpassung an verschiedene Bildschirme |
| `script.js` | Fragen, Zufallssortierung, Antwortprüfung, Punkte und Auswertung |
| `README.md` | Projektbeschreibung, Bedienung, Tests und Entwicklungsnotizen |

### Wie die Website funktioniert

1. Der Browser lädt `index.html`.
2. Die HTML-Datei bindet `style.css` für das Aussehen und `script.js` für die Funktionen ein.
3. JavaScript lädt die Fragen aus einer Liste im Skript.
4. Die Antwortprüfung, Punkteberechnung und Auswertung finden direkt im Browser statt.
5. GitHub Pages stellt die statischen Dateien bereit.

**Es gibt aktuell keinen eigenen Anwendungsserver und keine Datenbank.** Das bedeutet auch, dass die Antworten nicht zwischen Geräten synchronisiert werden und die Lehrkraft keine individuellen Ergebnisse online abrufen kann.

## 8. Website lokal öffnen

Für die normale Nutzung reicht der öffentliche Website-Link:

[https://matviigit.github.io/Deutsch-Challenge/](https://matviigit.github.io/Deutsch-Challenge/)

Für Entwicklungsarbeiten kann das Repository lokal gestartet werden.

### Schritt 1 — Repository herunterladen

Auf GitHub die Schaltfläche **Code** öffnen und **Download ZIP** auswählen. Danach das ZIP-Archiv entpacken.

Alternativ kann das Repository mit Git geklont werden:

```bash
git clone https://github.com/MatviiGIT/Deutsch-Challenge.git
cd Deutsch-Challenge
```

### Schritt 2 — Lokalen Webserver starten

Mit Python:

```bash
python -m http.server 8000
```

Unter manchen Windows-Installationen lautet der Befehl:

```bash
py -m http.server 8000
```

### Schritt 3 — Website öffnen

Im Browser diese Adresse öffnen:

```text
http://localhost:8000
```

Zum Beenden des lokalen Servers im Terminal **Ctrl + C** drücken.

## 9. Eine neue Frage hinzufügen

Alle Quizfragen befinden sich am Anfang von `script.js` im Array `questions`.

### Aufbau einer Frage

```javascript
{
  level: "Leicht",
  category: "WORTARTEN",
  prompt: "Welches Wort ist ein Nomen?",
  choices: ["laufen", "die Schule", "schnell"],
  answer: 1,
  explanation: "„Die Schule“ ist ein Nomen. Nomen werden großgeschrieben."
}
```

### Bedeutung der Felder

| Feld | Bedeutung |
|---|---|
| `level` | Genau einer der Werte `Leicht`, `Mittel` oder `Schwer` |
| `category` | Kurzer Themenname, zum Beispiel `WORTARTEN` |
| `prompt` | Frage oder Aufgabenstellung |
| `choices` | Drei Antwortmöglichkeiten |
| `answer` | Position der richtigen Antwort, beginnend bei **0** |
| `explanation` | Kurze Erklärung, warum die Antwort richtig ist |

**Achtung beim Feld `answer`:** Die Zählung beginnt bei null. `answer: 0` bedeutet die erste Antwort, `answer: 1` die zweite und `answer: 2` die dritte.

### Qualitätsregeln für neue Fragen

1. Die Aufgabe muss zum Lernstand der 5. Klasse passen.
2. Es muss genau eine eindeutig richtige Antwort geben.
3. Alle drei Antworten müssen zur Frage passen und verständlich formuliert sein.
4. Die Erklärung soll die Regel oder den Gedankengang erklären, nicht nur die Lösung wiederholen.
5. Sprache, Rechtschreibung und fachliche Richtigkeit müssen überprüft werden.
6. Bei neuen Aufgaben muss die Anzahl pro Level kontrolliert werden. Das aktuelle Ziel sind zehn Fragen je Level.
7. Bei Unsicherheit sollte eine Deutschlehrkraft die Aufgabe prüfen.

Keine Namen, Fotos oder anderen persönlichen Informationen von Kindern in die Fragen aufnehmen.

## 10. Testplan vor einer Veröffentlichung

Jede größere Änderung sollte vor der Präsentation mindestens mit dieser Checkliste geprüft werden.

### Funktionstest

- [ ] Startseite wird ohne sichtbare Fehler geladen.
- [ ] Level „Leicht“ startet mit zehn Fragen.
- [ ] Level „Mittel“ startet mit zehn Fragen.
- [ ] Level „Schwer“ startet mit zehn Fragen.
- [ ] „Die ganze Challenge“ enthält 30 Fragen.
- [ ] Bei einer richtigen Antwort wird die richtige Lösung angezeigt.
- [ ] Bei einer falschen Antwort werden die richtige Lösung und eine Erklärung angezeigt.
- [ ] Der Fortschritt wird nach jeder Frage aktualisiert.
- [ ] Die Punkte stimmen mit den richtigen Antworten überein.
- [ ] Die Ergebnisansicht zeigt korrekte Zahlen und Prozentwerte.
- [ ] Die Liste der falsch beantworteten Fragen zeigt die gewählte Antwort, die richtige Lösung und die Erklärung.
- [ ] Die Auswertung zeigt pro gespieltem Level den richtigen Punktestand und einen Fortschrittsbalken.
- [ ] „Noch einmal spielen“ startet das gewählte Level erneut.
- [ ] „Zurück zum Menü“ führt zur Startseite.

### Automatische Codeprüfung

Am 3. November 2026 wurden die Quelldateien zusätzlich technisch geprüft:

- JavaScript-Syntaxprüfung erfolgreich.
- 30 Fragen gefunden, davon zehn pro Level.
- Jede Frage hat genau drei Antwortmöglichkeiten.
- Alle Antwortindizes liegen im gültigen Bereich von 0 bis 2.
- Alle Fragen haben eine Aufgabenstellung und eine Erklärung.
- Die von JavaScript verwendeten HTML-IDs sind vorhanden und nicht doppelt vergeben.
- CSS- und JavaScript-Dateien sind in der HTML-Datei eingebunden.

Diese Prüfungen kontrollieren den Quellcode. Sie ersetzen keinen vollständigen manuellen Test im Browser und auf echten Schulgeräten.

### Darstellungstest

- [ ] Desktop-Browser
- [ ] Schul-Tablet im Hochformat
- [ ] Schul-Tablet im Querformat
- [ ] Smartphone
- [ ] Schmale Bildschirmbreite
- [ ] Tastaturbedienung mit Tab und Enter
- [ ] Lesbarkeit und ausreichende Größe der Antwortflächen

### Praxistest

Vor einem Test mit einer Klasse sollte die Erlaubnis beziehungsweise Absprache mit der zuständigen Lehrkraft eingeholt werden. Zuerst kann ein kurzer Funktionstest mit wenigen Geräten durchgeführt werden. Danach kann die Anwendung mit einer größeren Gruppe getestet werden.

Zusätzlich sollte der Zugriff über das Schul-WLAN geprüft werden. Ein erfolgreicher Test zu Hause beweist nicht automatisch, dass jede Schulnetzwerk-Konfiguration die Website zulässt.

## 11. Datenschutz und technische Grenzen

Die aktuelle Anwendung ist so einfach wie möglich aufgebaut:

- keine Anmeldung;
- keine Benutzernamen oder Passwörter;
- keine Formulare zur Erhebung persönlicher Daten;
- keine Datenbank;
- keine Quiz-Statistik, die an einen eigenen Server gesendet wird;
- keine dauerhafte Speicherung der Antworten durch die Quiz-Anwendung.

Die Antworten und der Punktestand werden nur während der aktuellen Nutzung im Arbeitsspeicher des Browsers verarbeitet. Beim Neuladen der Seite gehen sie verloren.

Die Website wird über GitHub Pages bereitgestellt. GitHub ist damit der Hosting-Anbieter. Für den schulischen Einsatz sollten die geltenden Regeln der Schule und die Datenschutzinformationen des Hosting-Anbieters berücksichtigt werden.

### Was die aktuelle Technik nicht leisten kann

Ohne Backend kann die Anwendung keine Klassenkonten, geräteübergreifenden Lernstände, Lehrer-Dashboards oder zentralen Ergebnislisten bereitstellen. Solche Funktionen wären ein eigenes späteres Entwicklungsvorhaben und müssten besonders sorgfältig hinsichtlich Datenschutz und Zugriffsschutz geplant werden.

## 12. Veröffentlichung mit GitHub Pages

Die öffentliche Website wird aus diesem Repository bereitgestellt:

`https://matviigit.github.io/Deutsch-Challenge/`

### Veröffentlichungsprinzip

1. Änderungen werden in den Branch `main` des Repositories übernommen.
2. GitHub Actions startet den Workflow **pages build and deployment**.
3. Der Build-Schritt erstellt das veröffentlichbare Paket.
4. Der Deploy-Schritt veröffentlicht das Paket über GitHub Pages.
5. Der Status des Workflows kann im Tab **Actions** kontrolliert werden.

Die Veröffentlichung gilt erst als erfolgreich, wenn der Workflow abgeschlossen ist und der Deploy-Schritt den Status **Success** zeigt.

### Nach Änderungen CSS oder JavaScript

Browser können ältere Dateien aus dem Cache verwenden. Deshalb enthält `index.html` Versionsparameter an den Datei-Links, zum Beispiel:

```html
<link rel="stylesheet" href="style.css?v=4">
<script src="script.js?v=4" defer></script>
```

Wenn sich eine dieser Dateien ändert und der Browser weiterhin eine alte Version zeigt, den entsprechenden Parameter erhöhen, zum Beispiel von `v=4` auf `v=5`. Danach erneut veröffentlichen und die Seite mit einem Hard-Refresh testen.

## 13. Entwicklungsplan

Die folgenden Phasen helfen, die Arbeit zu strukturieren und den Projektfortschritt nachvollziehbar zu dokumentieren.

| Phase | Inhalt | Ergebnis |
|---|---|---|
| **1. Ziel und Planung** | Lernproblem, Zielgruppe, Lernziele und Umfang festlegen | Klarer Projektauftrag |
| **2. Inhalt** | Themen auswählen, Fragen erstellen und fachlich prüfen | Geprüfte Fragensammlung |
| **3. Gestaltung** | Navigation, Farben, Typografie und mobile Darstellung entwickeln | Einheitliches Interface |
| **4. Programmierung** | Quiz-Ablauf, Zufallsauswahl, Auswertung und Rückmeldungen | Funktionierende Anwendung |
| **5. Interner Test** | Fragen, Antworten, Darstellung und Bedienung prüfen | Fehlerliste und Korrekturen |
| **6. Praxistest** | Nutzung mit einer vereinbarten Lerngruppe und Feedback | Beobachtungen und Rückmeldungen |
| **7. Verbesserung** | Häufige Probleme priorisieren und beheben | Überarbeitete Version |
| **8. Präsentation** | Ziel, Vorgehen, Produkt, Testergebnisse und Grenzen vorstellen | Nachvollziehbare Projektdokumentation |
| **9. Reflexion** | Erfolge, Schwierigkeiten und nächste Schritte auswerten | Ehrliche Bewertung des Projekts |

### Prioritäten für die nächste Entwicklungsrunde

1. Die neue Gestaltung auf Desktop, Tablet und Smartphone prüfen.
2. Die Abstände und Lesbarkeit auf der Startseite und im Fragebildschirm fertigstellen.
3. Alle 30 Aufgaben sprachlich und fachlich überprüfen lassen.
4. Einen kurzen Feedbackbogen für den Praxistest vorbereiten.
5. Den Test mit der Lehrkraft abstimmen und durchführen.
6. Die Ergebnisse anonymisiert auswerten und die Anwendung verbessern.

Neue technische Funktionen sollten erst ergänzt werden, wenn sie einen klaren Nutzen für die Lernenden haben.

## 14. Auswertung des Praxistests

Ein Praxistest sollte nicht nur fragen, ob Kindern die Farben gefallen. Er soll herausfinden, ob die Anwendung verständlich und nützlich ist.

Mögliche anonyme Fragen:

- War klar, wie man ein Level auswählt?
- Waren die Fragen gut verständlich?
- Haben die Erklärungen nach den Antworten geholfen?
- War die Schrift auf dem verwendeten Gerät gut lesbar?
- Welche Aufgabe war besonders schwierig oder unklar?
- Was sollte als Erstes verbessert werden?

### Möglicher Lernvergleich

Mit Zustimmung der Lehrkraft kann vor und nach der Nutzung eine kleine Auswahl vergleichbarer Aufgaben bearbeitet werden. Die Ergebnisse werden nur zusammengefasst betrachtet, ohne Namen oder persönliche Lernprofile zu speichern.

Ein solcher kurzer Vergleich kann Hinweise geben, ob die Übung hilfreich war. Er beweist allein noch nicht, dass die Website einen langfristigen Lernerfolg verursacht hat. Diese Grenze gehört zur ehrlichen Auswertung dazu.

## 15. Aktueller Projektstand

**Bereits umgesetzt**

- [x] Öffentliches GitHub-Repository eingerichtet
- [x] GitHub Pages veröffentlicht
- [x] Startseite und drei Schwierigkeitsstufen
- [x] 30 Fragen mit drei Antwortmöglichkeiten
- [x] Zufällige Sortierung innerhalb der Level
- [x] Erklärungen zu den Antworten
- [x] Punkte, Fortschritt und Ergebnisansicht
- [x] Wiederholung und Rückkehr zum Menü
- [x] Responsive Grundgestaltung
- [x] Überarbeitung in einem ruhigen, redaktionellen Gestaltungsstil
- [x] Fortschrittsanzeige mit ARIA-Attributen
- [x] Korrektur des Abstands zwischen „30“ und der Beschriftung im Titelbereich
- [x] Fragebildschirm optisch und strukturell überarbeitet
- [x] Punktestand im Fragebildschirm mit stabiler eigener Textanzeige
- [x] Ergebnisansicht mit Trefferbalken für jedes gespielte Level
- [x] Fortschrittswerte in der Ergebnisansicht mit ARIA-Attributen
- [x] Falsch beantwortete Fragen zeigen gewählte Antwort, richtige Lösung und Erklärung

**Noch offen**

- [ ] Fachliche Prüfung aller Fragen durch eine Lehrkraft
- [ ] Vollständiger manueller Test auf mehreren Geräten
- [ ] Test über das Schul-WLAN
- [ ] Praxistest mit einer Lerngruppe der 5. Klasse
- [ ] Anonyme Auswertung des Feedbacks
- [ ] Dokumentation der tatsächlichen Projektergebnisse
- [ ] Vorbereitung der Abschlusspräsentation und Reflexion

Der Status wird nach jedem größeren Entwicklungsschritt aktualisiert. Noch nicht durchgeführte Tests dürfen nicht als abgeschlossen dargestellt werden.

## 16. Arbeitsübergabe für die Fortsetzung des Projekts

Dieses Kapitel dient als kompakte technische und inhaltliche Übergabe, damit die Arbeit auch in einem neuen Chat oder durch eine andere Person ohne unnötige Wiederholung fortgesetzt werden kann.

### Verbindliche Projektentscheidungen

- Projektname: **Deutsch-Challenge**
- Schulischer Rahmen: **„Zeig, was du kannst“**
- Zielgruppe: **5. Klasse**
- Inhalt: **Deutsch — Grammatik, Rechtschreibung, Wortschatz und Textverständnis**
- Drei Level: **Leicht / Mittel / Schwer**
- Zielumfang der aktuellen Version: **10 Fragen pro Level**
- Kein Login und keine Registrierung
- Keine Speicherung individueller Antworten oder Ergebnisse
- Technische Basis bleibt zunächst HTML, CSS und JavaScript
- Hosting bleibt GitHub Pages
- Gestaltung: warmes Papierweiß, dunkles Grün, Terrakotta, gelbe Akzente und klare Typografie
- Vorhandene Quiz-Funktionen sollen bei Designänderungen erhalten bleiben.

### Regeln für künftige Änderungen

1. **Zuerst den aktuellen Stand lesen.** Vor einer Änderung die betroffenen Dateien aus dem Branch `main` abrufen. Diese Dateien sind die maßgebliche Version, nicht alte Textausschnitte aus einem früheren Chat.
2. **Bestehende Funktionen erhalten.** Bei Änderungen an `index.html` müssen die IDs erhalten bleiben, auf die `script.js` zugreift, sofern die JavaScript-Logik nicht gleichzeitig angepasst wird.
3. **Keine blinden Überschreibungen.** Beim Aktualisieren einer GitHub-Datei die aktuelle Datei und ihren aktuellen SHA verwenden.
4. **Änderungen prüfen.** JavaScript-Syntax, Anzahl der Fragen, Level-Verteilung, Antwortindizes, HTML-IDs und Versionsparameter kontrollieren.
5. **Keine Veröffentlichung behaupten, bevor sie geprüft wurde.** Erst nach einem erfolgreichen GitHub-Pages-Workflow und einem tatsächlichen Seitenaufruf von einer veröffentlichten Version sprechen.
6. **Dokumentation aktuell halten.** Nach jeder größeren Änderung den Projektstand, den Teststatus, die Roadmap und den Änderungsverlauf in diesem README aktualisieren.
7. **Datenschutz nicht nachträglich vernachlässigen.** Keine unnötigen persönlichen Daten von Kindern sammeln. Ein Backend oder eine Statistikfunktion nicht ohne klaren Zweck und Datenschutzkonzept hinzufügen.
8. **Schulischen Nutzen priorisieren.** Neue Funktionen müssen das Üben, Verstehen oder die Zugänglichkeit verbessern. Komplexität allein ist kein Projektziel.

### Checkliste für eine neue Entwicklungssitzung

- [ ] README vollständig lesen.
- [ ] Dateien aus `main` abrufen und den aktuellen Commit feststellen.
- [ ] Ziel der nächsten Änderung festlegen.
- [ ] Änderungen möglichst in kleinen, überprüfbaren Schritten vornehmen.
- [ ] Funktion und Darstellung testen.
- [ ] README und Änderungsverlauf aktualisieren.
- [ ] GitHub-Actions-Ergebnis prüfen.
- [ ] Veröffentlichte Website öffnen und die Änderung kontrollieren.

## 17. Änderungsverlauf

| Datum | Änderung |
|---|---|
| 02.11.2026 | Repository und erste technische Testseite eingerichtet; GitHub Pages aktiviert. |
| 02.11.2026 | Erste Quiz-Version mit 30 Fragen, drei Levels, Rückmeldungen und Auswertung erstellt. |
| 03.11.2026 | Visuelle Gestaltung auf ein helles, redaktionelles Layout umgestellt. |
| 03.11.2026 | Hero-Abstand korrigiert, Fortschrittsanzeige zugänglicher gemacht und Dokumentation erweitert. |
| 03.11.2026 | Fragebildschirm und Ergebnisansicht verfeinert; Level-Trefferbalken und ausführliche Fehlerwiederholung ergänzt. |

---

**Leitgedanke:** Deutsch-Challenge soll nicht möglichst viele Funktionen besitzen. Sie soll Kindern beim Deutschlernen konkret helfen — verständlich, zugänglich und nachweisbar verbessert durch echtes Feedback.
