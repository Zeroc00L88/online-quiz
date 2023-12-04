const questionsList = [
    {
        question: "Combien font 2+2",
        a: "3",
        b: "4",
        c: "42",
        d: "La réponse D",
        ga: "b",
    },

    {
        question: "De quel couleur est le ciel",
        a: "vert",
        b: "bleu",
        c: "rouge",
        d: "la réponse D",
        ga: "b",
    },

    {
        question: "Quel est le meilleur éditeur de code ? ",
        a: "vscode",
        b: "kate",
        c: "sublimetext",
        d: "neovim",
        ga: "d",
    },

    {
        question:
            "Quelle position occupe la terre en terme de proximité au Soleil ? ",
        a: "3",
        b: "8",
        c: "4",
        d: "12",
        ga: "a",
    },

    {
        question: "Qui a inventé l'école ? ",
        a: "Charlemagne",
        b: "George Lucas",
        c: "William Sauvage",
        d: "Mireille Mathieu",
        ga: "a",
    },
];

class Question {
    constructor(question, a, b, c, d, ga) {
        this.question = question;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.ga = ga;
    }
    ask(tag) {
        const tagToInsert = document.querySelector(tag);
        const answerA = document.createElement("button");
        const answerB = document.createElement("button");
        const answerC = document.createElement("button");
        const answerD = document.createElement("button");
        answerA.innerHTML = this.a;
        answerB.innerHTML = this.b;
        answerC.innerHTML = this.c;
        answerD.innerHTML = this.d;
        tagToInsert.appendChild(answerA);
        tagToInsert.appendChild(answerB);
        tagToInsert.appendChild(answerC);
        tagToInsert.appendChild(answerD);
    }
}

const nextButton = document.querySelector(".next");
let count = 0;
nextButton.addEventListener("click", () => {
    count++;
    const answers = document.querySelector(".answers");
    let child = answers.lastElementChild;
    while (child) {
        answers.removeChild(child);
        child = answers.lastElementChild;
    }
    let question = new Question(
        questionsList[count].question,
        questionsList[count].a,
        questionsList[count].b,
        questionsList[count].c,
        questionsList[count].d,
        questionsList[count].ga,
    );
    question.ask(".answers");
});
