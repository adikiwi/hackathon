// ! CREATE

const API = "http://localhost:3000/students";

let inpName = $(".inp-name");
let inpLastname = $(".inp-lastname");
let inpNumber = $(".inp-number");
let inpWeekKpi = $(".inp-week-kpi");
let inpMonthKpi = $(".inp-month-kpi");
let addForm = $(".add-form");

async function addStudent(event) {
  event.preventDefault();
  let name = inpName.val().trim();
  let lastname = inpLastname.val().trim();
  let number = inpNumber.val().trim();
  let weekKpi = inpWeekKpi.val().trim();
  let monthKpi = inpMonthKpi.val().trim();
  let newStudent = {
    name,
    lastname,
    number,
    weekKpi,
    monthKpi,
  };
  for (let key in newStudent) {
    if (!newStudent[key]) {
      alert("Заполните все поля!");
      return;
    }
  }
  let response = await axios.post(API, newStudent);
  console.log(response);
  inpName.val("");
  inpLastname.val("");
  inpNumber.val("");
  inpWeekKpi.val("");
  inpMonthKpi.val("");
}

addForm.on("submit", addStudent);

// ! Search
let searchInp = $(".search-inp");

async function liveSearch(event) {
  let value = event.target.value;
  let newAPI = `${API}?q${value}`;
  //!  getStudent(newAPI) - включишь когда будет функция GETSTUDENTS
}

searchInp.on("input", liveSearch);
