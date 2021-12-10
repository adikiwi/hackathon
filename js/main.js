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
  $(".modal").modal("hide");
}
// addPagination(pagesCount)
addForm.on("submit", addStudent);

// ! Read

let tableBody = $(".t-body");
let students = [];
async function getStudents(API) {
  let response = await axios(API);
   students = response.data
  handlePagination()
}

function render(data){
    tableBody.html("");
    data.forEach((item) => {
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
  getStudents(newAPI);
}

searchInp.on("input", liveSearch);

// //! Pagination

const studentsPerPage = 2;
let pagesCount = 1;
let currentPage = 1;
let totalStudentsCount = 0;

function handlePagination() {

    let indexOfLastStudent = currentPage * studentsPerPage
    let indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    const currentStudents = students.slice(
        indexOfFirstStudent,
        indexOfLastStudent
    );
    totalStudentsCount = students.length;
    console.log(totalStudentsCount);
    pagesCount = Math.ceil(totalStudentsCount / studentsPerPage)
    addPagination(pagesCount);
    render(currentStudents)
}

let pagination = $(".pagination");
function addPagination(pagesCount) {
  pagination.html("");

  // Previos button
  pagination.append(`
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
<a class="page-link prev-item" href="#" aria-label="Previous">
  <span aria-hidden="true">&laquo;</span>
</a>
</li>
    `);

  // Page number button
  for (let i = 1; i <= pagesCount; i++) {
    if (i == currentPage) {
      pagination.append(`
          <li class="page-item active">
          <a class="page-link pagination-item" href="#">${i}</a>
          </li>
        `);
    } else {
      pagination.append(`
      <li class="page-item">
          <a class="page-link pagination-item" href="#">${i}</a>
      </li>
      `);
    }
  }

  // Next button
  pagination.append(`
      <li class="page-item ${currentPage == pagesCount ? "disabled" : ""}">
    <a class="page-link next-item" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
      `);
}

function paginate(event) {
  let newPage = event.target.innerText;
  currentPage = +newPage;
  handlePagination();
}

$(document).on("click", ".pagination-item", paginate);

function nextPage() {
    currentPage++;
    handlePagination()
    
  }
  function prevPage() {
    currentPage--;
    handlePagination()
  }
  
  $(document).on("click", ".next-item", nextPage)
  $(document).on("click", ".prev-item", prevPage)
