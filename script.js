// question list can be used to store questions and answer lists as well as the good answer
// it is scallable : possible to add as many questions and answers as you want
// Each question will be randomly prompted to the user and responses will be diplayed in randomized order
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
        // Create answers button (scallable)
        this.resp.forEach((elmt) => {
            const answer = document.createElement("button");
            answer.innerHTML = elmt;
            tag.appendChild(answer);
        });
        // Select all answers buttons
        const buttons = document.querySelectorAll(".answers button");
        // Function that remove Listeners
        let removeListeners = (buttons) => {
            for (const key in buttons) {
                if (buttons.hasOwnProperty(key)) {
                    const element = buttons[key];
                    element.replaceWith(element.cloneNode(true));
                }
            }
        };
        // Loop and add Event Listeners
        for (const key in buttons) {
            if (buttons.hasOwnProperty(key)) {
                const element = buttons[key];
                element.addEventListener(
                    "click",
                    (e) => {
                        if (e.target.innerHTML == this.ga) {
                            e.target.style.background = "green";
                            score++;
                            removeListeners(buttons);
                        } else {
                            e.target.style.background = "red";
                            removeListeners(buttons);
                        }
                        console.log("Score :", score);
                    },
                    { once: true },
                );
            }
        }
    }
}

let score = 0;

// Selectors
const questionCard = document.querySelector(".questionCard");
const questionTitle = document.querySelector("h2");
const answers = document.querySelector(".answers");
const nextButton = document.querySelector(".next");
const finalScore = document.createElement("p");

// Click listener
let count = 0;

nextButton.addEventListener("click", () => {
    finalScore.remove();
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
        question.ask(answers);

        count++;
    } else {
        questionTitle.innerHTML = "Fin du Quizz, bien joué !";
        nextButton.innerHTML = "Recommencer";
        finalScore.innerHTML =
            "Score Final : " + score + "/" + questionsList.length;
        questionCard.appendChild(finalScore);
        count = 0;
        score = 0;
        shuffleArray(questionsList);
        questionsList.forEach((elmt) => {
            shuffleArray(elmt.resp);
        });
    }
});
