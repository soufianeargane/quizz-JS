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
let currentIndex  = 0;
let right_answers = 0;
let countdowninterval;

function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // console.log(this.responseText);
            let myData = JSON.parse(this.responseText);
            let questionsCount = myData.length;

            //make questions random
            let randomQuestions = [];
            for (let i = 0; i < questionsCount; i++) {
                let randomIndex = Math.floor(Math.random() * myData.length);
                randomQuestions.push(myData[randomIndex]);
                myData.splice(randomIndex, 1);
            }
            
            //Create Bullets + set questions count
            createBullets(questionsCount);
            //fetch the questions
            fetchQuestions(randomQuestions[currentIndex], questionsCount);

            //start countdown
            countdown(5, questionsCount);
            // click on submit button
            submit_button.onclick = function(){
                // get right answer
                let right_answer = randomQuestions[currentIndex].correct_answer;
                
                // get user answer
                checkAnswer(right_answer,questionsCount );
                
                //increment the current question
                currentIndex++;

                //remove the old question
                quizz_area.innerHTML = '';
                answers_area.innerHTML = '';

                //fetch next questions
                fetchQuestions(randomQuestions[currentIndex], questionsCount);

                //handle bullets class on
                handleBullets();

                //start countdown again
                clearInterval(countdowninterval);
                countdown(5, questionsCount);

                //show results
                showResults(questionsCount);
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

if (currentIndex < count){
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

}
var user_answers = [];
function checkAnswer(correct ,count ){
    let answers = document.getElementsByName('question');
    let chosen_answer;
    for (let i = 0; i < answers.length; i++) {
        if(answers[i].checked){
            user_answers.push(answers[i].dataset.answer);
            chosen_answer = answers[i].dataset.answer;
        }
        
    }
    // console.log(`right anser is: ${correct}`)
    // console.log(`your right answer is: ${chosen_answer}`)

    if(correct === chosen_answer){
        right_answers++;
        console.log("Good Answer");
    }
    // console.log(right_answers);

}

function handleBullets(){
    let bullets = document.querySelectorAll('.bullets .spans span');
    let arrayOfBullets = Array.from(bullets);
    arrayOfBullets.forEach((span, index)=>{
        if(index === currentIndex){
            span.className = 'on';
        }
    })
}

const bullet_and_time = document.querySelector('.bullets');
const result = document.querySelector('.result');
const quiz_app = document.querySelector('.quiz-app');
function showResults(count){
    let theResults;
    if (currentIndex == count){
        
        quiz_app.remove();
        if (right_answers > (count / 2) && (right_answers < count)) {
            theResults = `<span class="good">GOOD</span>. You got ${right_answers} from ${count} questions`;
        }else if(right_answers == count){
            theResults = `<span class="perfect">PERFECT</span>. You Answered ALL questions Correctly`;   
        }else{
            theResults = `<span class="bad">BAD</span>. You got ${right_answers} from ${count} questions`;
        }
        result.innerHTML = theResults;
        spans[1].classList.add('step-item-active');
        spans[2].classList.add('step-item-active');
        let quiz_icon = document.getElementById("quiz_icon");
        quiz_icon.innerHTML = `<i class="bi bi-check-circle"></i>`;
        let result_icon = document.getElementById("result_icon");
        result_icon.innerHTML = `<i class="bi bi-check-circle"></i>`;

        console.log(user_answers);
    }
}

// countdown timer
let countdownElement = document.querySelector('.countdown');
function countdown(duration, count){
    if (currentIndex < count){
        let minutes, seconds;
        countdowninterval = setInterval(function(){
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
    
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
    
            countdownElement.innerHTML = minutes + ':' + seconds;
    
            if (--duration < 0) {
                clearInterval(countdowninterval);
                submit_button.click();
            }
        }, 1000)
    }
}

// add sound when seconds are less than
