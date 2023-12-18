const questionBox = document.querySelector('.old-questions');
const newQuestionBox = document.querySelector('#question');
const ans1 = document.querySelector('.answer1');
const ans2 = document.querySelector('.answer2');
const ans3 = document.querySelector('.answer3');
const ans4 = document.querySelector('.answer4');
const form = document.querySelector('.add-box');
const checkBoxes = Array.from(document.querySelectorAll('.ans-check'));
const addButton = document.querySelector('.add-btn');

let questions = [];
let totalQuestions = 0;
let newQuestion = {};


const loadAllQuestions = ()=>{
    questions = JSON.parse(localStorage.getItem('questions'));
    totalQuestions = questions.length;
    newQuestion.key = totalQuestions+1;
    newQuestion.question = "Sample Question";
    newQuestion.answers = [{},{},{},{}];
}
const saveAllQuestion=()=>{
    localStorage.setItem('questions',JSON.stringify(questions))
}
const showAllQuestions = ()=>{
    loadAllQuestions();
    let htmlContent = "";
    questions.map((q)=>{
        htmlContent += `
        <div class="question">
                    <h2 class="quest">${q.key + "- " + q.question}</h2>
                    <div class="answers">
                        <div class="ans">
                            <p>${q.answers[0].txt}</p>
                            <span style="color:${q.answers[0].correct==true?"green":"red"};">${q.answers[0].correct==true?"Correct":"Wrong"}</span>
                        </div>
                        <div class="ans">
                            <p>${q.answers[1].txt}</p>
                            <span style="color:${q.answers[1].correct==true?"green":"red"};">${q.answers[1].correct==true?"Correct":"Wrong"}</span>
                        </div>
                        <div class="ans">
                            <p>${q.answers[2].txt}</p>
                            <span style="color:${q.answers[2].correct==true?"green":"red"};">${q.answers[2].correct==true?"Correct":"Wrong"}</span>
                        </div>
                        <div class="ans">
                            <p>${q.answers[3].txt}</p>
                            <span style="color:${q.answers[3].correct==true?"green":"red"};">${q.answers[3].correct==true?"Correct":"Wrong"}</span>
                        </div>
                    </div>
                </div>
        `;
    })
    questionBox.innerHTML = htmlContent;
}
showAllQuestions();

newQuestionBox.addEventListener("change",()=>{
    newQuestion.question = newQuestionBox.value;
})
form.addEventListener("submit",(e)=>{
    e.preventDefault();
})
form.addEventListener("change",()=>{
    updateQuestion();
})
const updateQuestion = ()=>{
    newQuestion.key = totalQuestions+1;
    newQuestion.question = newQuestionBox.value;
    newQuestion.answers[0].txt = ans1.value;
    newQuestion.answers[1].txt = ans2.value;
    newQuestion.answers[2].txt = ans3.value;
    newQuestion.answers[3].txt = ans4.value;
}

form.addEventListener("click",(e)=>{
    if(e.target.tagName === "INPUT" && e.target.type === "checkbox"){
        checkBoxes.map((cb)=>{
            cb.checked = false;
        })
        console.log(e.target.checked);
        e.target.checked = true;
    }
})

const freeInputFields=()=>{
    newQuestionBox.value = " ";
    ans1.value = " ";
    ans2.value = " ";
    ans3.value = " ";
    ans4.value = " ";
    checkBoxes.map((cb)=>{
        cb.checked = false;
    })
}

addButton.addEventListener("click",()=>{
    updateQuestion();
    let checker = true;
    checkBoxes.map((cb,cb2)=>{
        if(cb.checked === true){checker=false;}
        newQuestion.answers[cb2].correct = cb.checked;
    })
    if(checker){
        alert("Please select the correct Answer first! ");
    }else{
        questions = [...questions,newQuestion];
        saveAllQuestion();
        freeInputFields();
        showAllQuestions();
    }
})