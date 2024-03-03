const questions = [
    {
        qustion: "Which is large animal in the world?",
        answers:[
            { text:"Shark",  correct:false },
            { text:"Blue whale",  correct: true },
            { text:"Elephant",  correct:false },
            { text:"Giraffe",  correct:false },
        ]
    },
    {
        qustion: "Which is largest desert in the world?",
        answers : [
            { text:"Kalahari",  correct:false },
            { text:"Gobi",  correct:false },
            { text:"Sahara",  correct:false },
            { text:"Antrantica",  correct:true },
        ]
    },
    {
        qustion: "Which is smallest continent in the world?",
        answers:[
            { text:"Aisa",  correct:false },
            { text:"Australia",  correct:true },
            { text:"Arctic",  correct:false },
            { text:"Africa",  correct:false },
        ]
    }


];

const questionElement= document.getElementById("question");
const answersButton= document.getElementById("answers-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuetionIndex = 0;
let score= 0;
function startquiz(){
    resetState();
    currentQuetionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuetion = questions[currentQuetionIndex];
    let questionNo = currentQuetionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuetion.qustion;

    currentQuetion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersButton.appendChild(button);
        if(answer.correct){    
            button.dataset.correct= answer.correct;
        }   
        button.addEventListener("click", selectAnswer);
    });
} function resetState(){
    nextButton.style.display="none";
    while(answersButton.firstChild){
        answersButton.removeChild(answersButton.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");  
    }
    Array.from(answersButton.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored $${score}/${questions.length}`;
    nextButton.innerHTML = 'Play Again' ; 
    nextButton.style.display='block';

}
function handleNextButton(){
    currentQuetionIndex++;
    if(currentQuetionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuetionIndex < questions.length){
        handleNextButton();
    }else{
        startquiz();
    }
});
startquiz();

