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
let students = [];
async function getStudents(API) {
  let response = await axios(API);
  students = response.data;
}

function render(data) {
  studentList.html("");
  data.forEach((item) => {
    studentList.append(`
    <div class="card m-3" style="width: 18rem;">
    // <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text card-description">${item.lastname}</p>
        <h6>Дата выпуска: ${item.number}</h6>
        <h7>Цена: ${item.weekKpi} $</h7> <br>
        <a href="#" class="btn btn-primary">Show more...</a>
        <button class="btn-delete" id="${item.id}">
            <img src="https://cdn-icons.flaticon.com/png/512/2907/premium/2907762.png?token=exp=1638971303~hmac=b7ae44b11344da1f9f4b3227e81fcede">
        </button>
        <button id="${item.id}" class="btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="https://cdn-icons-png.flaticon.com/512/747/747994.png">
        </button>
    </div>
</div>
`);
  });
}

getStudents(API);
