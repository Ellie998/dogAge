const backgroundElement = document.getElementById("background");
const body = document.querySelector("body");
const formElement = document.getElementById("form");
const ageElement = document.getElementById("age");
const ageToHumanElement = document.getElementById("ageToHuman");

const buttonElement = document.querySelector("button");
const titleElement = document.getElementById("title");
const weightLabelElement = document.getElementById("weightLabel");
const dateLabelElement = document.getElementById("dateLabel");

const data = [
  {
    size: "s",
    age: [0, 15, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80],
  },
  {
    size: "m",
    age: [0, 15, 24, 28, 32, 36, 42, 47, 51, 56, 60, 65, 69, 74, 78, 83, 87],
  },
  {
    size: "l",
    age: [0, 15, 24, 28, 32, 36, 45, 50, 55, 61, 66, 72, 77, 82, 88, 93, 99],
  },
  {
    size: "g",
    age: [
      0, 12, 22, 31, 38, 45, 49, 56, 64, 71, 79, 86, 93, 100, 107, 114, 121,
    ],
  },
];

const langs = {
  ko: {
    title: "강아지 사람 나이 계산기",
    weightLabel: "강아지 몸무게 선택",
    dateLabel: "강아지 몸무게 선택",
    button: "계산하기",
  },
  en: {
    title: "Dog age Calculator",
    weightLabel: "Dog's weight",
    dateLabel: "Dog's Birthday",
    button: "Calculate",
  },
};

function getLanguage() {
  return navigator.language || navigator.userLanguage;
}

function calDogAge(enteredDate) {
  const current = new Date();
  const birthday = new Date(enteredDate);

  var time = (current.getTime() - birthday.getTime()) / 1000;
  var year = Math.abs(Math.round(time / (60 * 60 * 24) / 365.25));
  var month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4))) - year * 12;

  return { year: year, month: month };
}

function dogAgeToHuman(size, age) {
  let result;
  let arrayNum = 0;
  const year = age.year;
  const month = age.month;

  switch (size) {
    case "s":
      arrayNum = 0;
      break;
    case "m":
      arrayNum = 0;
      break;
    case "l":
      arrayNum = 0;
      break;
    case "g":
      arrayNum = 0;
      break;
    default:
      console.log(`Sorry, we are out of ${size}.`);
  }

  if (month !== "0") {
    const tempAge =
      ((data[arrayNum].age[year + 1] - data[arrayNum].age[year]) / 12) * month;
    result = Math.round(data[arrayNum].age[year] + tempAge);
  } else {
    result = data[arrayNum].age[year];
  }

  return result;
}
const language = getLanguage();

if (language === "ko-KR" || language === "ko") {
  titleElement.innerText = langs.ko.title;
  weightLabelElement.innerText = langs.ko.weightLabel;
  dateLabelElement.innerText = langs.ko.dateLabel;
  buttonElement.innerText = langs.ko.button;
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const size = event.target[0].value;
  const birth = event.target[1].value;
  const age = calDogAge(birth);
  const result = dogAgeToHuman(size, age);
  if (language === "ko-KR" || language === "ko") {
    ageElement.innerHTML = `강아지의 나이는 <strong>${
      age.year
    }</strong>살 <strong>${+age.month}</strong> 개월입니다.`;
    ageToHumanElement.innerHTML = `강아지의 사람 나이는 <strong>${result}</strong>살 입니다.`;
  } else {
    ageElement.innerHTML = `Your dog is <strong>${+age.year}</strong> years and <strong>${
      age.month
    }</strong> months of age.`;
    ageToHumanElement.innerHTML = `The result of Dog's human age is <strong>${result}</strong> years old.`;
  }
});

// window.addEventListener("load", () => {
//   fetch(
//     "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       body.style.background = `url(${data[0].url})`;
//     });
// });
