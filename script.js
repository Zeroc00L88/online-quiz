const questionsList = [
    {
        question: "Combien font 2+2",
        resp: ["3", "4", "42", "La réponse D"],
        ga: "b",
    },

    {
        question: "De quel couleur est le ciel",
        resp: ["vert", "bleu", "rouge", "la réponse D"],
        ga: "b",
    },

    {
        question: "Quel est le meilleur éditeur de code ? ",
        resp: ["vscode", "kate", "sublimetext", "neovim"],
        ga: "d",
    },

    {
        question:
            "Quelle position occupe la terre en terme de proximité au Soleil ? ",
        resp: ["3", "8", "4", "12"],
        ga: "a",
    },

    {
        question: "Qui a inventé l'école ? ",
        resp: [
            "Charlemagne",
            "George Lucas",
            "William Sauvage",
            "Mireille Mathieu",
        ],
        ga: "a",
    },
];

class Question {
    constructor(question, resp, ga) {
        this.question = question;
        this.resp = resp;
        this.ga = ga;
    }
    ask(tag) {
        const tagToInsert = document.querySelector(tag);
        this.resp.forEach((elmt) => {
            const answer = document.createElement("button");
            answer.innerHTML = elmt;
            tagToInsert.appendChild(answer);
        });
    }
}

const nextButton = document.querySelector(".next");
let count = 0;
nextButton.addEventListener("click", () => {
    const answers = document.querySelector(".answers");
    let child = answers.lastElementChild;
    while (child) {
        answers.removeChild(child);
        child = answers.lastElementChild;
    }
    let question = new Question(
        questionsList[count].question,
        questionsList[count].resp,
        questionsList[count].ga,
    );
    question.ask(".answers");
    count++;
});
