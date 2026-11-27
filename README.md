# Quakoo — Deutsch-Challenge

**Quakoo** ist eine Lernanwendung für den Deutschunterricht in der 6. Klasse. Sie wird im Schulprojekt **„Zeig, was du kannst“** zusammen mit einer Präsentation vorgestellt.

## Ziel und Ablauf

Zuerst erklärt die Gruppe das Thema **Wortarten** mit einer Präsentation. Danach wird Quakoo auf einem Tablet geöffnet. Die Klasse wählt eine Schwierigkeitsstufe. Das Quiz startet sofort, ohne zusätzliche Erklärungsseite.

1. Thema mit einer Präsentation vorstellen.
2. Quakoo auf einem Tablet öffnen.
3. **Leicht**, **Mittel** oder **Schwer** auswählen.
4. Sofort 10 Fragen beantworten.
5. Ergebnis und schwierige Fragen gemeinsam besprechen.

Es werden weder Namen noch Benutzerkonten benötigt. Ein Gerät reicht für die gemeinsame Vorführung.

## Inhalt der Lektion

Die Lektion behandelt drei Wortarten:

- **Nomen:** Namen für Menschen, Tiere, Dinge, Orte und Gefühle.
- **Verben:** Wörter, die sagen, was jemand tut oder was geschieht.
- **Adjektive:** Wörter, die beschreiben, wie etwas ist.

## Drei Schwierigkeitsstufen

| Level | Schwerpunkt |
|---|---|
| **Leicht** | Wortarten erkennen und einfache Beispiele zuordnen |
| **Mittel** | Wortarten in Sätzen bestimmen und Regeln anwenden |
| **Schwer** | Anspruchsvollere Beispiele und schwierigere Satzkontexte untersuchen |

Jede Stufe enthält genau 10 Fragen. In **Leicht** und **Mittel** gibt es jeweils drei offene Fragen mit Texteingabe; **Schwer** behält zwei. Die Auswahlfragen in Leicht und Mittel bieten vier Antwortmöglichkeiten, in Schwer drei. Bei offenen Suchaufgaben werden mehrere passende Antworten akzeptiert. Für jede der 30 Fragen gibt es eine eigene Illustration, die zum Wort oder zur beschriebenen Szene passt.

## Ablauf in der Anwendung

- Eine Schwierigkeitsstufe auswählen. Das Quiz startet sofort.
- 10 Fragen beantworten.
- Bei Auswahlfragen eine der drei oder vier Antworten auswählen.
- Bei Texteingaben das gesuchte Wort oder die Wortart selbst eintippen.
- Über die Schaltfläche **„Hilfe“** kann zu jeder Frage ein Tipp eingeblendet werden.
- Mit **„Antwort prüfen“** die Antwort auswerten lassen.
- Rückmeldung und Erklärung lesen.
- Am Ende Punkte, Abzeichen und die Übersicht falscher Antworten ansehen. Falsche Antworten können wiederholt werden.

Bei freien Antworten werden Groß- und Kleinschreibung sowie Satzzeichen am Ende nicht gewertet. Bei offenen Suchaufgaben sind mehrere passende Antworten hinterlegt; bei Aufgaben mit einem bestimmten Satz muss das gesuchte Wort stimmen.

## Technischer Aufbau

Das Projekt verwendet HTML, CSS und JavaScript. Die Website wird über GitHub Pages veröffentlicht. Es gibt kein Backend und keine Datenbank. Die Anwendung läuft direkt im Browser und muss nicht installiert werden.

## Bildnachweise

Die meisten Frage-Illustrationen verwenden **Twemoji 17.0.2** von [jdecked/twemoji](https://github.com/jdecked/twemoji). Die Grafiken stehen unter [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). Die Original-SVGs werden lokal verwendet und passend zu den Fragen zusammengestellt. Die Tisch-Illustration und die Positionsgrafik zu „neben“ wurden für Quakoo selbst erstellt.

## Datenschutz und Grenzen

Quakoo fragt keine Namen oder andere persönliche Angaben ab. Es gibt keine Konten, Passwörter oder Ranglisten. Antworten und Punktestand werden nur während des geöffneten Durchlaufs im Arbeitsspeicher des Browsers verarbeitet. Beim Neuladen der Seite wird der Durchlauf zurückgesetzt.

Die Anwendung ist für eine gemeinsame Vorführung mit einem Tablet gedacht. Sie bietet keine getrennten Spielerprofile und speichert keine Ergebnisse für spätere Sitzungen.

## Checkliste vor der Präsentation

- [ ] Die drei Level starten das Quiz direkt nach dem Antippen.
- [ ] Jedes Level enthält genau 10 Fragen.
- [ ] Bei jeder Frage funktionieren Auswahl oder Texteingabe passend zur Aufgabe.
- [ ] Eine Antwort wird erst nach „Antwort prüfen“ ausgewertet.
- [ ] Rückmeldungen und Erklärungen erscheinen korrekt.
- [ ] Ergebnis, Auszeichnungen und Fehlerübersicht werden richtig angezeigt.
- [ ] Die Illustrationen neben den Fragen passen zum behandelten Worttyp.
- [ ] Die Website ist auf dem verwendeten Tablet gut lesbar und bedienbar.

Ein automatischer technischer Test ersetzt nicht die inhaltliche Prüfung durch die Gruppe und die Lehrkraft.

## Veröffentlichung

Die Website wird über GitHub Pages veröffentlicht:

https://matviigit.github.io/Deutsch-Challenge/

Die laufende Entwicklung liegt im Branch content-audit. Der Branch main wird nicht ohne ausdrückliche Entscheidung verändert. Nach Änderungen werden die Projektprüfung und der Pages-Workflow kontrolliert. Eine Veröffentlichung gilt erst dann als erfolgreich, wenn der Deploy-Schritt abgeschlossen ist und die Website tatsächlich geöffnet wurde.

Bei Änderungen an index.html, script.js oder style.css müssen die Versionsparameter gegebenenfalls erhöht werden, damit der Browser keine alte Datei aus dem Cache lädt.

## Aktueller Umfang

**Enthalten:** eine Wortarten-Lektion, drei Schwierigkeitsstufen, 10 Fragen pro Stufe, drei Freitextfragen in Leicht und Mittel sowie zwei in Schwer, thematische Illustrationen, Ergebnis-Abzeichen, Feedback nach jeder Antwort und Wiederholung falscher Antworten.

**Bewusst nicht enthalten:** Namensgenerator, Spielprofile, Lernpfad, weitere Themen und Lektionen, allgemeine Prüfung, freies Training, Datenbank, Klassenkonto, Lehrer-Dashboard oder dauerhafte Ergebnisspeicherung.

## Änderungsverlauf

| Datum | Änderung |
|---|---|
| 27.11.2026 | Illustrationen zu Nomen, Verben und Adjektiven ergänzt und überarbeitet. Ergebnis-Abzeichen hinzugefügt, Quaki-Proportionen angepasst, Hilfstexte reduziert und rote Fehler-Markierungen neutral gestaltet. Freitextfragen enthalten jetzt Satzkontext. |
| 27.11.2026 | Startbildschirm auf die gesamte Bildschirmfläche erweitert. Jeder Frage eine eigene Hilfe-Schaltfläche mit passendem Tipp hinzugefügt. |
| 27.11.2026 | Fragen in Leicht und Mittel ersetzt. Vier Antwortmöglichkeiten, drei offene Fragen je Level und mehrere gültige Antworten für Suchaufgaben ergänzt. Fehler in Formulierungen korrigiert; Illustrationen angepasst. Schwer bleibt unverändert. |
| 27.11.2026 | 30 fragebezogene, lokale SVG-Illustrationen ergänzt. Die Motive passen direkt zu Gegenständen und Handlungen in den jeweiligen Sätzen. |
| 25.11.2026 | Jede Stufe auf 10 Fragen gekürzt. Nach der Levelauswahl startet das Quiz direkt. Zwei Freitextfragen pro Stufe ergänzt; Antworten werden ohne Beachtung der Groß- und Kleinschreibung geprüft. |
| 25.11.2026 | Umfang auf eine Präsentation mit anschließender Tablet-Demo reduziert. Eine Wortarten-Lektion und drei Schwierigkeitsstufen bleiben erhalten. |
| 25.11.2026 | Sichtbare Bezeichnungen der Schwierigkeitsstufen auf Leicht, Mittel und Schwer umgestellt. |
