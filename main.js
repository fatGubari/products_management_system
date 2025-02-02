let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100
  ) {
    if (mood == "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  } else {
    alert("Please fill in the required fields");
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
                <th>${i + 1}</th>
                <th>${dataPro[i].title}</th>
                <th>${dataPro[i].price}</th>
                <th>${dataPro[i].taxes}</th>
                <th>${dataPro[i].ads}</th>
                <th>${dataPro[i].discount}</th>
                <th>${dataPro[i].total}</th>
                <th>${dataPro[i].category}</th>
                <th><button onclick="updateData(${i})" id="update">update</button></th>
                <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
              </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()">delete All (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();

function deleteData(id) {
  dataPro.splice(id, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

function updateData(id) {
  title.value = dataPro[id].title;
  price.value = dataPro[id].price;
  taxes.value = dataPro[id].taxes;
  ads.value = dataPro[id].ads;
  discount.value = dataPro[id].discount;
  category.value = dataPro[id].category;
  getTotal();
  count.style.display = "none";

  submit.innerHTML = "update";
  mood = "update";
  tmp = id;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
                    <th>${i}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="updateData(${i})" id="update">update</button></th>
                    <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
                  </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
                      <th>${i}</th>
                      <th>${dataPro[i].title}</th>
                      <th>${dataPro[i].price}</th>
                      <th>${dataPro[i].taxes}</th>
                      <th>${dataPro[i].ads}</th>
                      <th>${dataPro[i].discount}</th>
                      <th>${dataPro[i].total}</th>
                      <th>${dataPro[i].category}</th>
                      <th><button onclick="updateData(${i})" id="update">update</button></th>
                      <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
                    </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
