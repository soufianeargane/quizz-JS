const title = document.getElementById("title");
const name = document.getElementById("name-input");
const button = document.getElementById("submit-name");
const welcome = document.querySelector(".welcome");
const validate = document.querySelector(".valid-input");
const progress_bar = document.querySelector(".progress-bar");
const info_list = document.querySelector(".info_list");

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
// const accept = document.getElementById("accept");
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


//fetch from JSON

    // fetch(('./questions.json')).then((response) => {
    //     let myData = response.json();
    //     // console.log(myData);
    //     return myData;
    // }).then((data) => {
    //     // console.log(data);
    //     let questions = data;
    //     console.log(questions);
    //     return questions;
    // });



//fetch metjod

function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // console.log(this.responseText);
            let myData = JSON.parse(this.responseText);
            console.log(myData);
            // return myData;
        }
    };
    myRequest.open('GET', './questions.json', true);
    myRequest.send();
}
getQuestions();


