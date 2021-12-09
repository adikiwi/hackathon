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
  getStudents(API);
  console.log(response);
  inpName.val("");
  inpLastname.val("");
  inpNumber.val("");
  inpWeekKpi.val("");
  inpMonthKpi.val("");
}

addForm.on("submit", addStudent);

// ! Read

let tableBody = $(".t-body");
async function getStudents(API) {
  let response = await axios(API);
  tableBody.html("");
  response.data.forEach((item) => {
    tableBody.append(`
    <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.lastname}</td>
      <td>${item.number}</td>
      <td>${item.weekKpi}</td>
      <td>${item.monthKpi}</td>
      <td><button class="btn btn-delete btn-danger delete-user" id="${item.id}">DELETE</button></td>
      <td><button id="${item.id}" class="btn btn-edit btn-warning edit-user" data-bs-toggle="modal" data-bs-target="#exampleModal2">EDIT</button></td>
    </tr>
`);
  });
}

getStudents(API);

// ! Delete

async function deleteStudent(event) {
  let id = event.target.id;
  await axios.delete(`${API}/${id}`);
  alert("Deleted successfully");
  getStudents(API);
}

$(document).on("click", ".btn-delete", deleteStudent);

// ! Update

let updateForm = $(".update-form");
let editName = $(".edit-name");
let editLastname = $(".edit-lastname");
let editNumber = $(".edit-number");
let editWeekKpi = $(".edit-week-kpi");
let editMonthKpi = $(".edit-month-kpi");

async function editStudent(event) {
  let id = event.currentTarget.id;
  let response = await axios(`${API}/${id}`);
  editName.val(response.data.name);
  editLastname.val(response.data.lastname);
  editNumber.val(response.data.number);
  editWeekKpi.val(response.data.weekKpi);
  editMonthKpi.val(response.data.monthKpi);
  console.log(event);
  updateForm.attr("id", id);
}

$(document).on("click", ".btn-edit", editStudent);

async function saveEditedStudent(event) {
  event.preventDefault();
  let id = event.currentTarget.id;
  let name = editName.val();
  let lastname = editLastname.val();
  let number = editNumber.val();
  let weekKpi = editWeekKpi.val();
  let monthKpi = editMonthKpi.val();
  let editedStudent = {
    id,
    name,
    lastname,
    number,
    weekKpi,
    monthKpi,
  };
  for (let key in editedStudent) {
    if (!editedStudent[key]) {
      alert("Заполните все поля!");
      return;
    }
  }
  await axios.patch(`${API}/${id}`, editedStudent);
  getStudents(API);
  $(".modal").modal("hide");
}

updateForm.on("submit", saveEditedStudent);

// ! Search

let searchInp = $(".search-inp");

async function liveSearch(event) {
  let value = event.target.value;
  let newAPI = `${API}?q=${value}`;
  !getStudents(newAPI); //- включишь когда будет функция GETSTUDENTS
}

searchInp.on("input", liveSearch);
