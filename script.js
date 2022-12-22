const title         = document.getElementById("title");
const name          = document.getElementById("name-input");
const button        = document.getElementById("submit-name");
const welcome       = document.querySelector(".welcome");
const validate      = document.querySelector(".valid-input");
const progress_bar  = document.querySelector(".progress-bar");
const info_list     = document.querySelector(".info_list");
const submit_button = document.querySelector('.submit-answer');

function changeName(){
    //validate the name and make sure the user has entered a name
    if(name.value == ""){
        validate.style.display = "block";
    }else{
        // Change the welcome message to include the name of the user
        welcome.innerHTML = "Hello " + name.value + "!";
        name.style.display = "none";
        title.style.display = "none";
        button.style.display = "none";
        validate.style.display = "none";
        progress_bar.style.display = "block";
        info_list.style.display = "block";
    }
} 
//accepting rules

// adding the check icon
const spans = document.querySelectorAll('.step-item');
const luck_P = document.querySelector('.good-luck');
function check(){
    let rules = document.getElementById("rules");
    rules.innerHTML = `<i class="bi bi-check-circle"></i>`;
    info_list.style.display = "none";
    spans[1].classList.add('step-item-active');
    welcome.style.display= 'none';
    luck_P.style.display = 'block';
}

//set Options
let currentIndex = 0;

function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // console.log(this.responseText);
            let myData = JSON.parse(this.responseText);
            let questionsCount = myData.length;
            
            //Create Bullets + set questions count
            createBullets(questionsCount);
            //fetch the questions
            fetchQuestions(myData[currentIndex], questionsCount);

            // click on submit button
            submit_button.onclick = function(){
                // get right answer
                let right_answer = myData[currentIndex].correct_answer;
                // get user answer
                checkAnswer(right_answer,questionsCount );
                //increment the current question
                currentIndex++;
            }
        }
    };
    myRequest.open('GET', './questions.json', true);
    myRequest.send();
}
getQuestions();


let countSpan = document.getElementById('questions-num');
let bulletsContainer = document.querySelector('.bullets .spans');

function createBullets(num){
    countSpan.innerHTML = num;
    //create the bullets or spans
    for(let i = 0; i < num; i++){
        let bullet = document.createElement('span');
        bulletsContainer.appendChild(bullet);
        if(i == 0){
            bullet.className = 'on';
        }
    }
}


let quizz_area = document.querySelector('.quiz');
let answers_area = document.querySelector('.answers-area');
//get questions from json file
function fetchQuestions(obj, count){

    //set the question title
    let questionTitle = document.createElement('h2');
    //set the question title text
    let questionText = document.createTextNode(obj['title']);
    //append the text to the title
    questionTitle.appendChild(questionText);
    //append the title to the quizz area
    quizz_area.appendChild(questionTitle);

    //create the answers
    for (let i = 1; i <=4 ; i++) {
        //create the main div
        let answerDiv = document.createElement('div');
        //add class to the main div
        answerDiv.className = 'answer';
        //create the radio input
        let answerRadio = document.createElement('input');
        answerRadio.type = 'radio';
        answerRadio.name = 'question';
        answerRadio.id = 'answer_' + i;
        answerRadio.dataset.answer = obj['answer_' + i];

        if (i == 1) {
            answerRadio.checked = true;
        }

        //create the label
        let answerLabel = document.createElement('label');
        answerLabel.htmlFor = 'answer_' + i;
        //create the label text
        let answerLabelText = document.createTextNode(obj['answer_' + i]);
        //append the text to the label
        answerLabel.appendChild(answerLabelText);

        //append the radio and label to the main div
        answerDiv.appendChild(answerRadio);
        answerDiv.appendChild(answerLabel);
        
        //append the main div to the answers area
        answers_area.appendChild(answerDiv);
    }

}

function checkAnswer(correct ,count ){
    console.log(correct);
    console.log(count);
}