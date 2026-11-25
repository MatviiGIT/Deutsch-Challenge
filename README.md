# Quakoo — Deutsch-Challenge

**Quakoo** ist eine Lernanwendung für den Deutschunterricht in der 6. Klasse. Sie wird im Schulprojekt **„Zeig, was du kannst“** zusammen mit einer Präsentation vorgestellt.

## Ziel und Ablauf

Zuerst erklärt die Gruppe das Thema **Wortarten** mit einer Präsentation. Danach wird Quakoo auf einem Tablet geöffnet. Die Klasse wählt gemeinsam eine Schwierigkeitsstufe und löst die Aufgaben.

1. Thema mit einer Präsentation vorstellen.
2. Quakoo auf einem Tablet öffnen.
3. **Leicht**, **Mittel** oder **Schwer** auswählen.
4. Eine Lektion mit 18 Fragen bearbeiten.
5. Ergebnis und schwierige Fragen gemeinsam besprechen.

Es werden weder Namen noch Benutzerkonten benötigt. Ein Gerät reicht für die gemeinsame Vorführung.

## Inhalt der Lektion

Die Lektion heißt **„Wortdetektive“** und behandelt drei Wortarten:

- **Nomen:** Namen für Menschen, Tiere, Dinge, Orte und Gefühle.
- **Verben:** Wörter, die sagen, was jemand tut oder was geschieht.
- **Adjektive:** Wörter, die beschreiben, wie etwas ist.

## Drei Schwierigkeitsstufen

| Level | Schwerpunkt |
|---|---|
| **Leicht** | Wortarten erkennen und einfache Beispiele zuordnen |
| **Mittel** | Wortarten in Sätzen bestimmen und Regeln anwenden |
| **Schwer** | Anspruchsvollere Beispiele und schwierigere Satzkontexte untersuchen |

Jede Stufe enthält 18 eigene Aufgaben. Insgesamt sind 54 Aufgabenvarianten vorbereitet. Pro Durchlauf wird nur eine Stufe ausgewählt.

## Ablauf in der Anwendung

- Eine der drei Schwierigkeitsstufen auswählen.
- Die kurze Erklärung zu Nomen, Verben und Adjektiven lesen.
- 18 Fragen beantworten. Jede Frage hat drei Antwortmöglichkeiten.
- Eine Antwort zuerst auswählen und danach mit **„Antwort prüfen“** bewerten.
- Rückmeldung und Erklärung lesen.
- Am Ende Punkte und Prozentwert ansehen. Falsche Antworten können wiederholt werden.
- Die Lektion wiederholen oder eine andere Schwierigkeitsstufe wählen.

## Technischer Aufbau

Das Projekt verwendet:
- **HTML** für den Seitenaufbau;
- **CSS** für Gestaltung und verschiedene Bildschirmgrößen;
- **JavaScript** für Fragen, Antworten, Rückmeldungen und Auswertung;
- **GitHub Pages** für die Veröffentlichung.

Es gibt kein Backend und keine Datenbank. Die Anwendung läuft direkt im Browser und muss nicht installiert werden.

## Datenschutz und Grenzen

Quakoo fragt keine Namen oder andere persönliche Angaben ab. Es gibt keine Konten, Passwörter oder Ranglisten. Antworten und Punktestand werden nur während des geöffneten Durchlaufs im Arbeitsspeicher des Browsers verarbeitet. Beim Neuladen der Seite wird der Durchlauf zurückgesetzt.

Die Anwendung ist für eine gemeinsame Vorführung mit einem Tablet gedacht. Sie bietet keine getrennten Spielerprofile und speichert keine Ergebnisse für spätere Sitzungen.

## Checkliste vor der Präsentation

- [ ] Die drei Level lassen sich auswählen.
- [ ] Nach der Auswahl öffnet sich die Erklärung zu Wortarten.
- [ ] Die Lektion startet und zeigt 18 Fragen.
- [ ] Jede Frage hat genau drei Antwortmöglichkeiten.
- [ ] Eine Antwort wird erst nach „Antwort prüfen“ ausgewertet.
- [ ] Rückmeldungen und Erklärungen erscheinen korrekt.
- [ ] Ergebnis und Fehlerübersicht werden richtig angezeigt.
- [ ] Die Website ist auf dem verwendeten Tablet gut lesbar und bedienbar.
- [ ] Präsentation und App-Demonstration passen in den geplanten Zeitrahmen.

Ein automatischer technischer Test ersetzt nicht die inhaltliche Prüfung durch die Gruppe und die Lehrkraft.

## Veröffentlichung

Die Website wird über GitHub Pages veröffentlicht:

https://matviigit.github.io/Deutsch-Challenge/

Die laufende Entwicklung liegt im Branch `content-audit`. Der Branch `main` wird nicht ohne ausdrückliche Entscheidung verändert. Nach Änderungen werden die Projektprüfung und der Pages-Workflow kontrolliert. Eine Veröffentlichung gilt erst dann als erfolgreich, wenn der Deploy-Schritt abgeschlossen ist und die Website tatsächlich geöffnet wurde.

Bei Änderungen an `index.html`, `script.js` oder `style.css` müssen die Versionsparameter gegebenenfalls erhöht werden, damit der Browser keine alte Datei aus dem Cache lädt.

## Aktueller Umfang

**Enthalten:** eine Wortarten-Lektion, drei Schwierigkeitsstufen, 18 Fragen pro Stufe, kurze Erklärungen, Feedback nach jeder Antwort, Ergebnisanzeige und Wiederholung falscher Antworten.

**Bewusst nicht enthalten:** Namensgenerator, Spielprofile, Lernpfad, weitere Themen und Lektionen, allgemeine Prüfung, freies Training, Datenbank, Klassenkonto, Lehrer-Dashboard oder dauerhafte Ergebnisspeicherung.

## Änderungsverlauf

| Datum | Änderung |
|---|---|
| 25.11.2026 | Umfang auf eine Präsentation mit anschließender Tablet-Demo reduziert. Namensabfrage, Namensgenerator, Lernpfad, allgemeine Prüfung, freie Übung und weitere Lektionen entfernt. Eine Wortarten-Lektion und drei Schwierigkeitsstufen mit je 18 Fragen bleiben erhalten. |
| 25.11.2026 | Sichtbare Bezeichnungen der Schwierigkeitsstufen auf Leicht, Mittel und Schwer umgestellt. |
| 06.11.2026 | Pilotlektion „Wortdetektive“ mit 18 Aufgaben je Niveau vorbereitet. |
| 02.11.2026 | Repository eingerichtet und erste Quiz-Version erstellt. |
