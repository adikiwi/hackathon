// ! CREATE

const API = "http://localhost:8000/students";

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
  getStudents(API);
  console.log(response);
}

addForm.on("submit", addStudent);

// ! READ

let studentList = $(".students-list");
async function getStudents(API) {
  let response = await axios(API);
  studentList.html("");
  response.data.forEach((item) => {
    studentList.append(`
    <div class="card m-3" style="width: 19rem;">
        <div class="card-body">
        <h4>Name:${item.name}</h4>
        <h4>Lastname:${item.lastname}</h4>
        <h6>Phone number: ${item.number}</h6>
        <h7>Week KPI:: ${item.weekKpi}</h7> <br>
        <h8>Month KPI:: ${item.monthKpi}</h8> <br>
        <a href="#" class="btn btn-primary">Show more...</a>
        <button class="btn btn-delete" id="${item.id}">
            <img src="https://cdn-icons-png.flaticon.com/512/565/565491.png">
        </button>
        <button id="${item.id}" class="btn btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="https://cdn-icons-png.flaticon.com/512/860/860814.png">
        </button>
    </div>
</div>
`);
  });
}

getStudents(API);
