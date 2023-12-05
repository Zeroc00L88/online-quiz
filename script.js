const questionsList = [
    {
        question: "Combien font 2+2",
        resp: ["3", "4", "42", "La réponse D"],
        ga: "4",
    },

    {
        question: "De quel couleur est le ciel",
        resp: ["vert", "bleu", "rouge", "la réponse D"],
        ga: "bleu",
    },

    {
        question: "Quel est le meilleur éditeur de code ? ",
        resp: ["vscode", "kate", "sublimetext", "neovim"],
        ga: "neovim",
    },

    {
        question:
            "Quelle position occupe la terre en terme de proximité au Soleil ? ",
        resp: ["3", "8", "4", "12"],
        ga: "3",
    },

    {
        question: "Qui a inventé l'école ? ",
        resp: [
            "Charlemagne",
            "George Lucas",
            "William Sauvage",
            "Mireille Mathieu",
        ],
        ga: "Charlemagne",
    },
];

// Fisher-Yates algorith to randomize an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

shuffleArray(questionsList);
questionsList.forEach((elmt) => {
    shuffleArray(elmt.resp);
});

// Class for initializing questions
class Question {
    /*
     * question : question to ask
     * resp : resp list in an array
     * ga : the good answer
     */
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
        tagToInsert.addEventListener(
            "click",
            (e) => {
                if (e.target.innerHTML == this.ga) {
                    e.target.style.background = "green";
                    score++;
                } else {
                    e.target.style.background = "red";
                }
                console.log("Score :", score);
            },
            { once: true },
        );
    }
}

let score = 0;

// Selectors
const questionTitle = document.querySelector("h2");
const answers = document.querySelector(".answers");
const nextButton = document.querySelector(".next");

// Click listener
let count = 0;

nextButton.addEventListener("click", () => {
    nextButton.innerHTML = "Suivant";
    let child = answers.lastElementChild;
    while (child) {
        answers.removeChild(child);
        child = answers.lastElementChild;
    }
    if (count < questionsList.length) {
        let question = new Question(
            questionsList[count].question,
            questionsList[count].resp,
            questionsList[count].ga,
        );
        questionTitle.innerHTML = question.question;
        question.ask(".answers");

        count++;
    } else {
        questionTitle.innerHTML = "Fin du Quizz, bien joué !";
        nextButton.innerHTML = "Recommencer";
        count = 0;
    }
});
