const firebaseConfig = {
  apiKey: "AIzaSyDfSye-673JUDn92uUeHOpmjtE_i2-QzUU",
  authDomain: "quiz-app-8aa5a.firebaseapp.com",
  projectId: "quiz-app-8aa5a",
  storageBucket: "quiz-app-8aa5a.appspot.com",
  messagingSenderId: "450472899521",
  appId: "1:450472899521:web:88335b5d4c1f46577df540",
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
console.log(app);

// function Question(question, a, b, c, d, correct) {
//   this.question = question;
//   this.a = a;
//   this.b = b;
//   this.c = c;
//   this.d = d;
//   this.correct = correct;
// }
// let ques1 = new Question(
//   "Inside which HTML element do we put the JavaScript?",
//   "script",
//   "body",
//   "head",
//   "link",
//   "a"
// );
// let ques2 = new Question(
//   "What is the correct syntax for referring to an external script called 'xxx.js'?",
//   "script hrf='xxx.js'",
//   "script link='xxx.js'",
//   "script src='xxx.js'",
//   "script  a='xxx.js'",
//   "c"
// );
// let ques3 = new Question(
//   "Javascript is _________ language",
//   "structure",
//   "styling",
//   "tag",
//   "programming",
//   "d"
// );
// let ques4 = new Question(
//   "HTML full form",
//   "hyper text markup lang",
//   "hyper tag markup lang",
//   "hyper text markup language",
//   "hyper tag markup language",
//   "a"
// );

// let ques5 = new Question(
//   "how to initailized the Arry in javaScript?",
//   "{}",
//   "[]",
//   "()",
//   "(){}",
//   "b"
// );
// let ques6 = new Question(
//   "how to initailized the object in javaScript ?",
//   "{}",
//   "[]",
//   "()",
//   "(){}",
//   "a"
// );
// let ques7 = new Question(
//   "who we show the alert pop in window?",
//   "alert''",
//   "alert('')",
//   "alert.window()",
//   "alert",
//   "b"
// );
// let ques8 = new Question(
//   "function syntax?",
//   "myfunction function (){}",
//   "myfunction function{} ()",
//   "function myfunction() {} ",
//   "myfunction() {}",
//   "c"
// );

// // push quiz data in firebase dataBase in arry form

// let quizQues = [ques1, ques2, ques3, ques4, ques5, ques6, ques7, ques8];
// app.database().ref("/").child("quizData/").push(quizQues);
// console.log(quizQues);

let currentIndex = 0;
let result = "";
let scoor = 0;
let questionOfTest = document.getElementById("question");
let optionA = document.getElementById("opta");
let optionB = document.getElementById("optb");
let optionC = document.getElementById("optc");
let optionD = document.getElementById("optd");
let inputChecked = document.getElementsByTagName("input");
let olele = document.getElementById("datac");
// console.log(inputChecked);

// first time render question on screen through database
let arr;
function firstTimeQus() {
  app
    .database()
    .ref("/")
    .child("quizData/")
    .on("child_added", function (data) {
      console.log(data.key, data.val());
      let valueFromDatabase = data.val();
      console.log(valueFromDatabase);
      olele.setAttribute("id", valueFromDatabase);
      console.log(olele.id);
      questionOfTest.innerHTML = valueFromDatabase[currentIndex].question;
      optionA.innerHTML = valueFromDatabase[currentIndex].a;
      optionB.innerHTML = valueFromDatabase[currentIndex].b;
      optionC.innerHTML = valueFromDatabase[currentIndex].c;
      optionD.innerHTML = valueFromDatabase[currentIndex].d;
    });
}

function changeQuestion() {
  for (let i = 0; i < inputChecked.length; i++) {
    if (inputChecked[i].checked) {
      result = inputChecked[i].id;
    }
  }
  console.log(result);
  return result;
}

function nowCheckInput() {
  let ccc = olele.id;
  console.log(JSON.stringify(ccc));
  let correctOption = changeQuestion();
  // console.log(ccc);
  // console.log(correctOption);
  if (correctOption == ccc.correct) {
    scoor++;
  }
  currentIndex++;
  for (let i = 0; i < inputChecked.length; i++) {
    if (inputChecked[i].checked) {
      inputChecked[i].checked = false;
    }
  }
  if (currentIndex < ccc.length) {
    firstTimeQus();
  } else {
    let div = document.getElementById("main-div");
    div.innerHTML = `<h1>your score is ${scoor} Out of 8 </h1>
        <button onclick="location.reload()">Retake Quiz</button>
        `;
  }
  console.log(currentIndex);
  console.log(scoor);
}
