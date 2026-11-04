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
const levelInfo = {
  Leicht: { label: "Grundlagen", short: "Wissen", symbol: "1" },
  Mittel: { label: "Anwenden", short: "Üben", symbol: "2" },
  Schwer: { label: "Knobeln", short: "Analysieren", symbol: "3" }
};

const topics = [
  {
    id: "wortarten",
    title: "Wortarten",
    description: "Nomen, Verben und Adjektive erkennen.",
    icon: "A·Z",
    tint: "#e8f6df",
    categories: ["WORTARTEN"]
  },
  {
    id: "artikel-grammatik",
    title: "Artikel & Grammatik",
    description: "Artikel, Verbformen und Pronomen richtig verwenden.",
    icon: "Aa",
    tint: "#e4f2fb",
    categories: ["GRAMMATIK", "PRONOMEN"]
  },
  {
    id: "wortschatz",
    title: "Wortschatz & Adjektive",
    description: "Wörter verstehen, ordnen und treffend steigern.",
    icon: "✎",
    tint: "#fff1ce",
    categories: ["WORTSCHATZ", "ADJEKTIVE"]
  },
  {
    id: "rechtschreibung",
    title: "Rechtschreibung",
    description: "Wörter und Sätze sicher schreiben.",
    icon: "Ü",
    tint: "#fce9df",
    categories: ["RECHTSCHREIBUNG"]
  },
  {
    id: "satzzeichen",
    title: "Satzzeichen",
    description: "Fragen und wörtliche Rede richtig markieren.",
    icon: "?!",
    tint: "#f0eafb",
    categories: ["SATZZEICHEN"]
  },
  {
    id: "satzbau",
    title: "Satzbau & Satzglieder",
    description: "Sätze untersuchen und ihre Teile verstehen.",
    icon: "☷",
    tint: "#e1f2ee",
    categories: ["SATZGLIEDER", "SATZBAU", "NEBENSÄTZE", "KONJUNKTIONEN"]
  },
  {
    id: "lesen",
    title: "Lesen & Verstehen",
    description: "Hinweise finden und Texte erschließen.",
    icon: "▤",
    tint: "#fce9ed",
    categories: ["LESEVERSTEHEN", "TEXTVERSTÄNDNIS", "INFORMATIONEN AUSWERTEN"]
  }
];

const lessons = topics.flatMap((topic) =>
  levelOrder.flatMap((level) => {
    const lessonQuestions = questions.filter(
      (question) => topic.categories.includes(question.category) && question.level === level
    );
    if (lessonQuestions.length === 0) return [];
    return [{
      id: topic.id + "-" + level.toLowerCase(),
      topic,
      level,
      questions: lessonQuestions
    }];
  })
);

const letters = ["A", "B", "C"];
const completedLessons = new Set();
let currentLesson = null;
let questionQueue = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let wrongAnswers = [];

const mapScreen = document.getElementById("map-screen");
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

function showScreen(name) {
  mapScreen.hidden = name !== "map";
  quizScreen.hidden = name !== "quiz";
  resultScreen.hidden = name !== "result";
  window.scrollTo({ top: 0, behavior: "auto" });
}

function firstOpenLessonIndex() {
  return lessons.findIndex((lesson) => !completedLessons.has(lesson.id));
}

function isLessonUnlocked(lesson) {
  if (completedLessons.has(lesson.id)) return true;
  const openIndex = firstOpenLessonIndex();
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  return openIndex !== -1 && lessonIndex <= openIndex;
}

function addTextElement(parent, tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function renderMap() {
  const topicMap = document.getElementById("topic-map");
  topicMap.replaceChildren();

  const completedQuestionCount = lessons
    .filter((lesson) => completedLessons.has(lesson.id))
    .reduce((sum, lesson) => sum + lesson.questions.length, 0);
  const completedCount = completedLessons.size;
  const totalQuestions = questions.length;
  const percentage = Math.round((completedQuestionCount / totalQuestions) * 100);

  document.getElementById("overall-progress-number").textContent = percentage + "%";
  document.getElementById("overall-progress-label").textContent =
    completedCount + " von " + lessons.length + " Lektionen geschafft";
  document.getElementById("overall-progress-fill").style.width = percentage + "%";
  const progress = document.getElementById("overall-progress");
  progress.setAttribute("aria-valuemax", String(lessons.length));
  progress.setAttribute("aria-valuenow", String(completedCount));
  document.getElementById("lesson-count-label").textContent =
    completedCount + " / " + lessons.length + " abgeschlossen";

  topics.forEach((topic, topicIndex) => {
    const topicLessons = lessons.filter((lesson) => lesson.topic.id === topic.id);
    const doneCount = topicLessons.filter((lesson) => completedLessons.has(lesson.id)).length;
    const isComplete = doneCount === topicLessons.length;
    const isCurrent = topicLessons.some((lesson) => isLessonUnlocked(lesson) && !completedLessons.has(lesson.id));
    const isLocked = !isComplete && !isCurrent;

    const card = document.createElement("article");
    card.className = "topic-card" + (isComplete ? " is-complete" : "") +
      (isCurrent ? " is-current" : "") + (isLocked ? " is-locked" : "");

    const header = document.createElement("div");
    header.className = "topic-header";

    const icon = addTextElement(header, "span", "topic-icon", topic.icon);
    icon.style.setProperty("--topic-tint", topic.tint);

    const copy = document.createElement("div");
    copy.className = "topic-head-copy";
    addTextElement(copy, "span", "topic-index", "THEMA " + String(topicIndex + 1).padStart(2, "0"));
    addTextElement(copy, "h3", "topic-title", topic.title);
    addTextElement(copy, "p", "topic-description", topic.description);
    header.appendChild(copy);

    const progressText = isComplete ? "Abgeschlossen" : doneCount + " / " + topicLessons.length;
    addTextElement(header, "span", "topic-progress", progressText);
    card.appendChild(header);
    addTextElement(card, "div", "topic-divider", "");

    const track = document.createElement("div");
    track.className = "lesson-track" + (topicLessons.length > 1 ? " has-connector" : "");
    track.style.setProperty("--node-count", String(topicLessons.length));

    topicLessons.forEach((lesson) => {
      const isDone = completedLessons.has(lesson.id);
      const unlocked = isLessonUnlocked(lesson);
      const info = levelInfo[lesson.level];
      const node = document.createElement("button");
      node.type = "button";
      node.className = "lesson-node node-" + lesson.level.toLowerCase() +
        (isDone ? " is-done" : "") + (!unlocked ? " is-locked" : "");
      node.disabled = !unlocked;
      node.setAttribute("aria-label", topic.title + ", " + info.label + ", " +
        lesson.questions.length + " Fragen" + (isDone ? ", abgeschlossen" : unlocked ? ", starten" : ", gesperrt"));

      const ring = addTextElement(node, "span", "node-ring", isDone ? "✓" : unlocked ? info.symbol : "🔒");
      ring.setAttribute("aria-hidden", "true");
      addTextElement(node, "span", "node-title", info.label);
      addTextElement(node, "span", "node-detail", lesson.questions.length + " " +
        (lesson.questions.length === 1 ? "Frage" : "Fragen"));
      addTextElement(node, "span", "node-status", isDone ? "Fertig" : unlocked ? "Starten" : "Gesperrt");

      if (unlocked) node.addEventListener("click", () => startLesson(lesson.id));
      track.appendChild(node);
    });

    card.appendChild(track);
    topicMap.appendChild(card);
  });
}

function showMap() {
  renderMap();
  showScreen("map");
}

function startLesson(lessonId) {
  const lesson = lessons.find((item) => item.id === lessonId);
  if (!lesson || !isLessonUnlocked(lesson)) return;

  currentLesson = lesson;
  questionQueue = shuffle(lesson.questions);
  currentIndex = 0;
  score = 0;
  answered = false;
  wrongAnswers = [];

  document.getElementById("quiz-topic-label").textContent = lesson.topic.title.toUpperCase();
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questionQueue[currentIndex];
  answered = false;

  const number = currentIndex + 1;
  const percent = Math.round((number / questionQueue.length) * 100);
  const levelNumber = levelOrder.indexOf(currentLesson.level) + 1;

  document.getElementById("question-counter").textContent = number + " / " + questionQueue.length;
  document.getElementById("progress-level").textContent =
    "LEVEL " + levelNumber + " · " + levelInfo[currentLesson.level].short.toUpperCase();
  document.getElementById("progress-percent").textContent = percent + " %";
  document.getElementById("progress-fill").style.width = percent + "%";

  const progressBar = document.getElementById("quiz-progress");
  progressBar.setAttribute("aria-valuemax", String(questionQueue.length));
  progressBar.setAttribute("aria-valuenow", String(number));

  document.getElementById("question-number").textContent =
    "FRAGE " + String(number).padStart(2, "0");
  document.getElementById("question-category").textContent = question.category;
  document.getElementById("question-text").textContent = question.prompt;
  document.getElementById("score-value").textContent = score + " Punkte";

  answerGrid.replaceChildren();
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    const letter = addTextElement(button, "span", "answer-letter", letters[index]);
    letter.setAttribute("aria-hidden", "true");
    addTextElement(button, "span", "", choice);
    button.addEventListener("click", () => selectAnswer(index));
    answerGrid.appendChild(button);
  });

  feedbackPanel.hidden = true;
  feedbackPanel.className = "feedback-panel";
  document.getElementById("feedback-title").textContent = "";
  document.getElementById("feedback-text").textContent = "";
  nextButton.disabled = true;
  nextButton.innerHTML = currentIndex === questionQueue.length - 1
    ? 'Lektion abschließen <span aria-hidden="true">→</span>'
    : 'Weiter <span aria-hidden="true">→</span>';
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
  completedLessons.add(currentLesson.id);
  const total = questionQueue.length;
  const percentage = Math.round((score / total) * 100);
  const wrong = total - score;
  const isCourseComplete = completedLessons.size === lessons.length;
  const nextLesson = lessons.find((lesson) => !completedLessons.has(lesson.id));

  showScreen("result");
  document.getElementById("result-kicker").textContent =
    isCourseComplete ? "KURS ABGESCHLOSSEN" : "LEKTION ABGESCHLOSSEN";
  document.getElementById("result-medal").textContent = isCourseComplete ? "★" : "✦";
  document.getElementById("result-heading").textContent = isCourseComplete
    ? "Du hast es geschafft!"
    : percentage >= 80 ? "Stark gemacht!" : percentage >= 50 ? "Guter Fortschritt!" : "Ein Schritt weiter!";
  document.getElementById("result-subheading").textContent = isCourseComplete
    ? "Du hast alle sieben Themenwelten erkundet."
    : "Du hast " + score + " von " + total + " Fragen richtig beantwortet. Der nächste Lernschritt ist jetzt frei.";
  document.getElementById("score-fraction").textContent = score + "/" + total;
  document.getElementById("score-percent").textContent = percentage + " %";
  document.getElementById("result-correct").textContent = score;
  document.getElementById("result-wrong").textContent = wrong;
  document.getElementById("result-progress-fill").style.width = percentage + "%";
  const resultProgress = document.getElementById("result-progress-track");
  resultProgress.setAttribute("aria-valuemax", String(total));
  resultProgress.setAttribute("aria-valuenow", String(score));

  const recommendationTitle = document.getElementById("recommendation-title");
  const recommendationText = document.getElementById("recommendation-text");
  recommendationTitle.textContent = percentage >= 80
    ? "Das sitzt schon richtig gut!"
    : percentage >= 50 ? "Du wirst Schritt für Schritt sicherer."
      : "Übung macht den Unterschied.";
  recommendationText.textContent = percentage >= 80
    ? "Du hast viele Aufgaben richtig gelöst. Lies dir die Erklärungen trotzdem durch — so festigst du die Regeln."
    : "Schau dir die Erklärungen zu den Fragen an. Du kannst jede Lektion wiederholen; falsche Antworten halten dich nicht auf.";
  if (isCourseComplete) {
    recommendationTitle.textContent = "Sieben Themenwelten geschafft!";
    recommendationText.textContent = "Du hast den gesamten Lernweg abgeschlossen. Du kannst jede Lektion auf der Themenkarte noch einmal üben.";
  }

  const mistakesSection = document.getElementById("mistakes-section");
  const mistakesList = document.getElementById("mistakes-list");
  mistakesList.replaceChildren();
  mistakesSection.hidden = wrongAnswers.length === 0;

  wrongAnswers.forEach(({ question, selectedIndex }) => {
    const item = document.createElement("article");
    item.className = "mistake-item";
    addTextElement(item, "div", "mistake-meta", currentLesson.topic.title + " · " + question.category);
    addTextElement(item, "h3", "mistake-question", question.prompt);
    addTextElement(item, "p", "mistake-selected", "Deine Antwort: " + question.choices[selectedIndex]);
    addTextElement(item, "p", "mistake-answer", "Richtige Antwort: " + question.choices[question.answer]);
    addTextElement(item, "p", "mistake-explanation", question.explanation);
    mistakesList.appendChild(item);
  });

  const continueButton = document.getElementById("continue-button");
  continueButton.hidden = !nextLesson;
  continueButton.textContent = nextLesson
    ? nextLesson.topic.title + " starten →"
    : "Themenkarte öffnen →";
  renderMap();
}

function nextStep() {
  const nextLesson = lessons.find((lesson) => !completedLessons.has(lesson.id));
  if (nextLesson) startLesson(nextLesson.id);
  else showMap();
}

document.getElementById("back-to-map").addEventListener("click", showMap);
document.getElementById("brand-home").addEventListener("click", (event) => {
  event.preventDefault();
  showMap();
});
document.getElementById("result-map-button").addEventListener("click", showMap);
document.getElementById("continue-button").addEventListener("click", nextStep);
document.getElementById("retry-button").addEventListener("click", () => {
  if (currentLesson) startLesson(currentLesson.id);
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

const mappedQuestionCount = lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0);
if (mappedQuestionCount !== questions.length) {
  console.error("Nicht alle Fragen sind einer Themenlektion zugeordnet.");
}
renderMap();
