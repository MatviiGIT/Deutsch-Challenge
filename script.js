const questions = [
  // LEICHT — WISSEN
  {
    level: "Leicht", category: "WORTARTEN",
    prompt: "Welches Wort ist ein Nomen?",
    choices: ["springen", "Freund", "freundlich"],
    answer: 1,
    explanation: "„Freund“ ist ein Nomen. Nomen bezeichnen zum Beispiel Menschen, Tiere, Dinge oder Gefühle und werden großgeschrieben."
  },
  {
    level: "Leicht", category: "WORTARTEN",
    prompt: "Welches Wort ist das Verb im Satz: „Der Hund bellt laut.“?",
    choices: ["Hund", "bellt", "laut"],
    answer: 1,
    explanation: "„Bellt“ ist das Verb. Es sagt, was der Hund tut."
  },
  {
    level: "Leicht", category: "WORTARTEN",
    prompt: "Welches Wort ist ein Adjektiv?",
    choices: ["kleine", "Maus", "findet"],
    answer: 0,
    explanation: "„Kleine“ ist ein Adjektiv. Adjektive beschreiben, wie jemand oder etwas ist."
  },
  {
    level: "Leicht", category: "RECHTSCHREIBUNG",
    prompt: "Welcher Satz ist richtig geschrieben?",
    choices: [
      "Am Montag besucht Emma ihre Oma.",
      "Am montag besucht Emma ihre Oma.",
      "Am Montag besucht Emma ihre oma."
    ],
    answer: 0,
    explanation: "Am Satzanfang schreibt man groß. Auch Nomen wie „Montag“ und „Oma“ werden großgeschrieben."
  },
  {
    level: "Leicht", category: "WORTSCHATZ",
    prompt: "Wie lautet die Mehrzahl von „das Buch“?",
    choices: ["die Buchs", "die Bücher", "die Buche"],
    answer: 1,
    explanation: "Die Mehrzahl von „das Buch“ lautet „die Bücher“."
  },
  {
    level: "Leicht", category: "GRAMMATIK",
    prompt: "Welcher Artikel passt? „___ Sonne scheint.“",
    choices: ["Der", "Das", "Die"],
    answer: 2,
    explanation: "Es heißt „die Sonne“. Das Nomen „Sonne“ ist weiblich."
  },
  {
    level: "Leicht", category: "RECHTSCHREIBUNG",
    prompt: "Welches Wort ist richtig geschrieben?",
    choices: ["Sone", "Sonne", "Sonnee"],
    answer: 1,
    explanation: "„Sonne“ schreibt man mit doppeltem n. Der betonte Vokal o wird kurz gesprochen; das doppelte n zeigt die Kürze an."
  },
  {
    level: "Leicht", category: "SATZZEICHEN",
    prompt: "Welches Satzzeichen fehlt? „Wo ist mein Heft___“",
    choices: [".", "?", "!"],
    answer: 1,
    explanation: "Bei einer direkten Frage steht am Ende ein Fragezeichen."
  },
  {
    level: "Leicht", category: "WORTSCHATZ",
    prompt: "Welches Wort bedeutet ungefähr dasselbe wie „fröhlich“?",
    choices: ["flink", "glücklich", "müde"],
    answer: 1,
    explanation: "„Glücklich“ und „fröhlich“ haben eine ähnliche Bedeutung."
  },
  {
    level: "Leicht", category: "RECHTSCHREIBUNG",
    prompt: "Welcher Satz ist richtig?",
    choices: ["Wir spielen im garten.", "Wir spielen im Gartten.", "Wir spielen im Garten."],
    answer: 2,
    explanation: "„Garten“ ist ein Nomen und wird großgeschrieben. Außerdem schreibt man es nur mit einem t."
  },

  // MITTEL — ANWENDEN
  {
    level: "Mittel", category: "GRAMMATIK",
    prompt: "Welches Verb passt? „Du ___ sehr schnell.“",
    choices: ["läufst", "läuft", "laufen"],
    answer: 0,
    explanation: "Zu „du“ gehört die Verbform „läufst“: du läufst."
  },
  {
    level: "Mittel", category: "GRAMMATIK",
    prompt: "Welcher Artikel passt? „Ich sehe ___ Vogel.“",
    choices: ["der", "dem", "den"],
    answer: 2,
    explanation: "„Sehen“ fragt hier nach dem Akkusativ: Wen sehe ich? Den Vogel."
  },
  {
    level: "Mittel", category: "SATZGLIEDER",
    prompt: "Wer fährt im Satz mit dem Bus? „Morgen fährt Paul mit dem Bus zur Schule.“",
    choices: ["Morgen", "Paul", "mit dem Bus"],
    answer: 1,
    explanation: "Paul ist die Person, die fährt. „Paul“ ist das Subjekt des Satzes."
  },
  {
    level: "Mittel", category: "RECHTSCHREIBUNG",
    prompt: "Wie schreibt man „Regen + Jacke“ als zusammengesetztes Nomen?",
    choices: ["Regen Jacke", "Regenjacke", "Regenjake"],
    answer: 1,
    explanation: "Zusammengesetzte Nomen schreibt man im Deutschen normalerweise zusammen: die Regenjacke."
  },
  {
    level: "Mittel", category: "ADJEKTIVE",
    prompt: "Welche Form ergänzt die Steigerungsreihe richtig? „warm – wärmer – ___“",
    choices: ["am wärmsten", "wärmste", "wärmer"],
    answer: 0,
    explanation: "Die drei Steigerungsstufen lauten: warm (Grundform), wärmer (Vergleichsform), am wärmsten (Höchstform)."
  },
  {
    level: "Mittel", category: "WORTSCHATZ",
    prompt: "Welches Wort gehört zum Wortfeld „sagen“?",
    choices: ["erzählen", "laufen", "essen"],
    answer: 0,
    explanation: "„Erzählen“ gehört zum Wortfeld „sagen“. Beide Wörter haben mit dem Sprechen zu tun."
  },
  {
    level: "Mittel", category: "GRAMMATIK",
    prompt: "Welche Verbform passt? „Gestern ___ wir einen Ausflug.“",
    choices: ["machen", "macht", "machten"],
    answer: 2,
    explanation: "„Gestern“ zeigt, dass es um die Vergangenheit geht. Die passende Form lautet hier „machten“."
  },
  {
    level: "Mittel", category: "LESEVERSTEHEN",
    prompt: "Tom stellt seine Schuhe vor die Tür, nimmt einen Regenschirm und zieht eine Jacke an. Wie ist das Wetter wahrscheinlich?",
    choices: ["Es regnet.", "Es ist sehr heiß.", "Es schneit stark."],
    answer: 0,
    explanation: "Regenschirm und Jacke sind Hinweise darauf, dass es wahrscheinlich regnet."
  },
  {
    level: "Mittel", category: "SATZGLIEDER",
    prompt: "Welches Wort ist das Prädikat? „Die Kinder spielen nach der Schule im Park.“",
    choices: ["Die Kinder", "spielen", "im Park"],
    answer: 1,
    explanation: "Das Prädikat sagt, was jemand tut oder was geschieht. Hier ist es „spielen“."
  },
  {
    level: "Mittel", category: "SATZZEICHEN",
    prompt: "Welcher Satz setzt die Satzzeichen der wörtlichen Rede richtig?",
    choices: [
      "Mia sagt: „Ich bin fertig.“",
      "Mia sagt: Ich bin fertig.“",
      "Mia sagt: „Ich bin fertig“."
    ],
    answer: 0,
    explanation: "Vor der wörtlichen Rede steht hier ein Doppelpunkt. Der gesprochene Satz wird von Anführungszeichen eingerahmt; sein Punkt steht innerhalb des schließenden Anführungszeichens."
  },

  // SCHWER — ANALYSIEREN
  {
    level: "Schwer", category: "LESEVERSTEHEN",
    prompt: "Lies den Text: „Lena leiht sich jede Woche ein Buch aus der Schulbibliothek. Zu Hause liest sie jeden Abend ein paar Seiten. Am Monatsende hat sie drei Bücher beendet.“ Welche Aussage fasst den Text am besten zusammen?",
    choices: [
      "Lena liest regelmäßig und beendet mehrere Bücher.",
      "Lena sammelt Bücher, ohne sie zu lesen.",
      "Lena liest nur in der Schule."
    ],
    answer: 0,
    explanation: "Die drei Sätze zeigen gemeinsam, dass Lena regelmäßig liest und mehrere Bücher schafft. Eine Hauptaussage fasst die wichtigsten Informationen zusammen."
  },
  {
    level: "Schwer", category: "SATZBAU",
    prompt: "Welche Satzstellung ist in einem Aussagesatz richtig?",
    choices: [
      "Am frühen Morgen Sara kontrolliert ihren Stundenplan.",
      "Sara ihren Stundenplan kontrolliert am frühen Morgen.",
      "Am frühen Morgen kontrolliert Sara ihren Stundenplan."
    ],
    answer: 2,
    explanation: "In einem Aussagesatz steht das gebeugte Verb an zweiter Stelle. „Am frühen Morgen“ steht hier im Vorfeld, danach folgt das Verb „kontrolliert“."
  },
  {
    level: "Schwer", category: "NEBENSÄTZE",
    prompt: "Welche Aussage zum Satz „Der Hund bellte laut, weil jemand an der Tür stand.“ ist richtig?",
    choices: [
      "Der Nebensatz beginnt mit „weil“ und das Verb „stand“ steht am Ende.",
      "Im Nebensatz muss das Verb an erster Stelle stehen.",
      "Ein Nebensatz hat kein Verb."
    ],
    answer: 0,
    explanation: "„Weil jemand an der Tür stand“ ist ein Nebensatz. Das Wort „weil“ leitet ihn ein; das gebeugte Verb „stand“ steht am Ende."
  },
  {
    level: "Schwer", category: "SATZGLIEDER",
    prompt: "Bestimme das Subjekt: „Die Kinder brachte der Vater nach Hause.“",
    choices: ["Die Kinder", "der Vater", "nach Hause"],
    answer: 1,
    explanation: "Wer brachte die Kinder nach Hause? Der Vater. „Die Kinder“ steht zwar am Satzanfang, ist hier aber das Akkusativobjekt."
  },
  {
    level: "Schwer", category: "PRONOMEN",
    prompt: "Lena legt das Heft auf den Tisch. Danach öffnet sie es. Worauf bezieht sich „es“?",
    choices: ["auf Lena", "auf das Heft", "auf den Tisch"],
    answer: 1,
    explanation: "„Es“ bezieht sich auf „das Heft“. Das erkennt man am grammatischen Geschlecht: „das Heft“ ist sächlich. „Lena“ ist weiblich und „der Tisch“ männlich."
  },
  {
    level: "Schwer", category: "KONJUNKTIONEN",
    prompt: "Welche Umformung gibt denselben Grund wieder? „Nora nimmt eine Trinkflasche mit, denn es ist sehr warm.“",
    choices: [
      "Weil es sehr warm ist, nimmt Nora eine Trinkflasche mit.",
      "Obwohl es sehr warm ist, nimmt Nora eine Trinkflasche mit.",
      "Bevor es sehr warm wird, nimmt Nora eine Trinkflasche mit."
    ],
    answer: 0,
    explanation: "„Denn“ und „weil“ drücken einen Grund aus. Im Nebensatz mit „weil“ steht das gebeugte Verb am Ende: „ist“."
  },
  {
    level: "Schwer", category: "RECHTSCHREIBUNG",
    prompt: "Welcher Satz ist richtig geschrieben?",
    choices: [
      "Das Haus ist gros.",
      "Das Haus ist groß.",
      "Das Haus ist grooss."
    ],
    answer: 1,
    explanation: "„Groß“ schreibt man mit ß. Nach dem langen betonten Vokal o steht in diesem Wort ß."
  },
  {
    level: "Schwer", category: "LESEVERSTEHEN",
    prompt: "Nach dem Regen glänzten die Steine auf dem Weg. Amir ging langsam und hielt sich am Geländer fest. Was lässt sich daraus am besten schließen?",
    choices: [
      "Der Weg könnte glatt sein.",
      "Amir hat es besonders eilig.",
      "Die Steine sind sehr warm."
    ],
    answer: 0,
    explanation: "Nasse Steine können glatt sein. Amirs vorsichtige Bewegung ist ein Hinweis darauf, dass er nicht ausrutschen möchte."
  },
  {
    level: "Schwer", category: "TEXTVERSTÄNDNIS",
    prompt: "Lies: „Lea liest zuerst alle Aufgaben. Danach markiert sie wichtige Wörter und beantwortet die Fragen.“ Welche Lernstrategie nutzt Lea?",
    choices: [
      "Sie beginnt sofort mit dem Schreiben, ohne zu lesen.",
      "Sie sucht wichtige Informationen und nutzt sie für ihre Antworten.",
      "Sie lässt schwierige Aufgaben einfach aus."
    ],
    answer: 1,
    explanation: "Lea liest genau und markiert wichtige Wörter. So findet sie Informationen, die ihr beim Beantworten helfen."
  },
  {
    level: "Schwer", category: "INFORMATIONEN AUSWERTEN",
    prompt: "Im Aushang steht: Montag 8–12 Uhr, Dienstag 8–16 Uhr, Mittwoch 8–12 Uhr. Ben kann nur nach 13 Uhr in die Schulbibliothek. An welchem Tag kann er sie besuchen?",
    choices: [
      "Am Montag.",
      "Am Dienstag.",
      "Am Mittwoch."
    ],
    answer: 1,
    explanation: "Nur am Dienstag ist die Bibliothek nach 13 Uhr noch geöffnet. Der Aushang nennt dafür die Öffnungszeit bis 16 Uhr."
  }
];

const levelOrder = ["Leicht", "Mittel", "Schwer"];
const letters = ["A", "B", "C"];

let currentMode = "Alle";
let pathMode = false;
let questionQueue = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let wrongAnswers = [];
let levelStats = {};

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const answerGrid = document.getElementById("answer-grid");
const feedbackPanel = document.getElementById("feedback-panel");
const nextButton = document.getElementById("next-button");

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(screen) {
  startScreen.hidden = screen !== "start";
  quizScreen.hidden = screen !== "quiz";
  resultScreen.hidden = screen !== "result";
}

function showMenu() {
  showScreen("start");
}

function startQuiz(mode, usePath = false) {
  currentMode = mode;
  pathMode = usePath;
  currentIndex = 0;
  score = 0;
  answered = false;
  wrongAnswers = [];
  levelStats = {};

  const selectedLevels = mode === "Alle" ? levelOrder : [mode];
  questionQueue = selectedLevels.flatMap((level) =>
    shuffle(questions.filter((question) => question.level === level))
  );

  selectedLevels.forEach((level) => {
    levelStats[level] = { correct: 0, total: questions.filter((question) => question.level === level).length };
  });

  document.getElementById("quiz-mode-label").textContent = pathMode
    ? "LERNPFAD"
    : mode === "Alle" ? "ALLE LEVEL" : mode.toUpperCase() + " LEVEL";

  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questionQueue[currentIndex];
  answered = false;

  const number = currentIndex + 1;
  const percent = Math.round((number / questionQueue.length) * 100);
  const levelNumber = String(levelOrder.indexOf(question.level) + 1).padStart(2, "0");

  document.getElementById("question-counter").textContent = number + " / " + questionQueue.length;
  document.getElementById("progress-level").textContent = pathMode
    ? "ETAPPE " + levelNumber + " VON 3 · " + question.level.toUpperCase()
    : "LEVEL " + levelNumber + " · " + question.level.toUpperCase();
  document.getElementById("progress-percent").textContent = percent + " %";
  document.getElementById("progress-fill").style.width = percent + "%";
  const progressBar = document.getElementById("quiz-progress");
  progressBar.setAttribute("aria-valuemax", String(questionQueue.length));
  progressBar.setAttribute("aria-valuenow", String(number));
  document.getElementById("question-number").textContent = "FRAGE " + String(number).padStart(2, "0");
  document.getElementById("question-category").textContent = question.category;
  document.getElementById("question-text").textContent = question.prompt;
  document.getElementById("score-value").textContent = score + " Punkte";

  answerGrid.replaceChildren();
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.innerHTML = '<span class="answer-letter">' + letters[index] + '</span><span></span>';
    button.lastElementChild.textContent = choice;
    button.addEventListener("click", () => selectAnswer(index));
    answerGrid.appendChild(button);
  });

  feedbackPanel.hidden = true;
  feedbackPanel.className = "feedback-panel";
  document.getElementById("feedback-title").textContent = "";
  document.getElementById("feedback-text").textContent = "";
  nextButton.disabled = true;
  nextButton.innerHTML = currentIndex === questionQueue.length - 1
    ? 'Ergebnis ansehen <span>→</span>'
    : 'Weiter <span>→</span>';
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const question = questionQueue[currentIndex];
  const isCorrect = selectedIndex === question.answer;
  const buttons = [...answerGrid.querySelectorAll(".answer-option")];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("is-correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("is-wrong");
  });

  if (isCorrect) {
    score += 1;
    levelStats[question.level].correct += 1;
    feedbackPanel.classList.add("feedback-good");
    document.getElementById("feedback-title").textContent = "Richtig! +1 Punkt";
  } else {
    wrongAnswers.push({ question, selectedIndex });
    feedbackPanel.classList.add("feedback-bad");
    document.getElementById("feedback-title").textContent =
      "Noch nicht ganz. Richtig ist: " + question.choices[question.answer];
  }

  document.getElementById("feedback-text").textContent = question.explanation;
  feedbackPanel.hidden = false;
  document.getElementById("score-value").textContent = score + " Punkte";
  nextButton.disabled = false;
}

function renderResults() {
  showScreen("result");

  const total = questionQueue.length;
  const percentage = Math.round((score / total) * 100);
  const wrong = total - score;

  document.getElementById("score-fraction").textContent = score + "/" + total;
  document.getElementById("score-percent").textContent = percentage + " %";
  document.getElementById("result-correct").textContent = score;
  document.getElementById("result-wrong").textContent = wrong;
  document.getElementById("result-progress-fill").style.width = percentage + "%";
  document.getElementById("result-subheading").textContent =
    "Du hast " + score + " von " + total + " Fragen richtig beantwortet.";

  document.querySelector(".result-header .eyebrow").textContent =
    pathMode ? "ETAPPE ABGESCHLOSSEN" : "RUNDE ABGESCHLOSSEN";

  let heading = "Guter Anfang!";
  let medal = "✦";
  if (percentage >= 90) {
    heading = "Hervorragend!";
    medal = "★";
  } else if (percentage >= 70) {
    heading = "Gut gemacht!";
    medal = "✦";
  } else if (percentage >= 50) {
    heading = "Weiter so!";
    medal = "◆";
  }
  if (pathMode && currentMode === "Schwer") {
    heading = "Lernpfad geschafft!";
  }
  document.getElementById("result-heading").textContent = heading;
  document.getElementById("result-medal").textContent = medal;

  if (pathMode && currentMode === "Schwer") {
    document.getElementById("result-subheading").textContent =
      "Du hast alle drei Etappen des Lernpfads abgeschlossen.";
  }

  const levelResults = document.getElementById("level-results");
  levelResults.replaceChildren();
  levelOrder.filter((level) => levelStats[level]).forEach((level) => {
    const stats = levelStats[level];
    const levelPercent = Math.round((stats.correct / stats.total) * 100);
    const card = document.createElement("div");
    card.className = "level-result";

    const header = document.createElement("div");
    header.className = "level-result-head";

    const label = document.createElement("span");
    label.textContent = level;

    const value = document.createElement("strong");
    value.textContent = stats.correct + " / " + stats.total;

    const percent = document.createElement("span");
    percent.className = "level-result-percent";
    percent.textContent = levelPercent + " %";

    header.append(label, value, percent);

    const track = document.createElement("div");
    track.className = "level-result-track";
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", level + ": " + stats.correct + " von " + stats.total + " richtig");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", String(stats.total));
    track.setAttribute("aria-valuenow", String(stats.correct));

    const fill = document.createElement("span");
    fill.className = "level-result-fill";
    fill.style.width = levelPercent + "%";
    track.appendChild(fill);

    card.append(header, track);
    levelResults.appendChild(card);
  });

  const recommendationTitle = document.getElementById("recommendation-title");
  const recommendationText = document.getElementById("recommendation-text");
  if (percentage >= 90) {
    recommendationTitle.textContent = "Du beherrschst schon sehr viel!";
    recommendationText.textContent = "Du hast fast alle Fragen richtig gelöst. Versuche als Nächstes ein anderes Level oder spiele die komplette Challenge.";
  } else if (percentage >= 70) {
    recommendationTitle.textContent = "Eine starke Leistung!";
    recommendationText.textContent = "Viele Grundlagen sitzen bereits. Schau dir die Erklärungen zu deinen Fehlern an und versuche es danach noch einmal.";
  } else if (percentage >= 50) {
    recommendationTitle.textContent = "Mit Übung wirst du sicherer.";
    recommendationText.textContent = "Lies die Erklärungen in Ruhe durch. Wiederhole besonders die Themen, bei denen du Fragen falsch beantwortet hast.";
  } else {
    recommendationTitle.textContent = "Schritt für Schritt.";
    recommendationText.textContent = "Jeder Versuch hilft dir beim Lernen. Starte mit dem leichten Level und achte besonders auf die Erklärungen nach jeder Antwort.";
  }

  const weakestLevel = Object.entries(levelStats)
    .filter(([, stats]) => stats.correct < stats.total)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))[0];

  if (weakestLevel) {
    recommendationText.textContent += " Dein nächster Übungsschwerpunkt: " + weakestLevel[0] + ".";
  }

  const mistakesSection = document.getElementById("mistakes-section");
  const mistakesList = document.getElementById("mistakes-list");
  mistakesList.replaceChildren();
  mistakesSection.hidden = wrongAnswers.length === 0;

  wrongAnswers.forEach(({ question, selectedIndex }) => {
    const item = document.createElement("article");
    item.className = "mistake-item";

    const meta = document.createElement("div");
    meta.className = "mistake-meta";
    meta.textContent = question.level + " · " + question.category;

    const prompt = document.createElement("h3");
    prompt.className = "mistake-question";
    prompt.textContent = question.prompt;

    const selected = document.createElement("p");
    selected.className = "mistake-selected";
    selected.textContent = "Deine Antwort: " + question.choices[selectedIndex];

    const answer = document.createElement("p");
    answer.className = "mistake-answer";
    answer.textContent = "Richtige Antwort: " + question.choices[question.answer];

    const explanation = document.createElement("p");
    explanation.className = "mistake-explanation";
    explanation.textContent = question.explanation;

    item.append(meta, prompt, selected, answer, explanation);
    mistakesList.appendChild(item);
  });

  const nextLevelButton = document.getElementById("next-level-button");
  const nextLevel = levelOrder[levelOrder.indexOf(currentMode) + 1];
  nextLevelButton.hidden = !pathMode || !nextLevel;
  if (nextLevel) {
    nextLevelButton.innerHTML = nextLevel + " starten <span aria-hidden=\"true\">→</span>";
  }

  document.getElementById("retry-button").innerHTML = pathMode
    ? 'Etappe wiederholen <span aria-hidden="true">↻</span>'
    : 'Noch einmal spielen <span aria-hidden="true">↻</span>';

}

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => startQuiz(button.dataset.mode));
});

document.getElementById("path-start-button").addEventListener("click", () => {
  startQuiz("Leicht", true);
});

document.getElementById("next-level-button").addEventListener("click", () => {
  const nextLevel = levelOrder[levelOrder.indexOf(currentMode) + 1];
  if (pathMode && nextLevel) startQuiz(nextLevel, true);
});

nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (currentIndex < questionQueue.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    renderResults();
  }
});

document.getElementById("back-to-menu").addEventListener("click", showMenu);
document.getElementById("result-menu-button").addEventListener("click", showMenu);
document.getElementById("retry-button").addEventListener("click", () => startQuiz(currentMode, pathMode));
document.getElementById("brand-home").addEventListener("click", (event) => {
  event.preventDefault();
  showMenu();
});
