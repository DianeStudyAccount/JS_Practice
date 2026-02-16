"use strict";

const plantForm = document.querySelector("#plantForm");
const inputName = document.querySelector("#name");
const inputDescription = document.querySelector("#description");
const inputSpecies = document.querySelector("#species");
const inputAge = document.querySelector("#age");
const selectType = document.querySelector("#plantType");

const inputDanger = document.querySelector("#dangerClass");
const inputArea = document.querySelector("#area");
const inputUsage = document.querySelector("#usage");

const tableBody = document.querySelector("#tableBody");

let plants = [];

class Plant {
  constructor(name, description, age, usage) {
    this._name = name;
    this._description = description;
    this._age = age;
    this._usage = usage;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }

  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }

  get usage() {
    return this._usage;
  }
  set usage(value) {
    this._usage = value;
  }

  removeFrom(array) {
    const index = array.indexOf(this);
    array.splice(index, 1);
  }
}

class Fern extends Plant {
  constructor(name, description, age, usage, dispersalArea) {
    super(name, description, age, usage);
    this._dispersalArea = dispersalArea;
  }

  get dispersalArea() {
    return this._dispersalArea;
  }
  set dispersalArea(value) {
    this._dispersalArea = value;
  }
}

class Firtree extends Plant {
  constructor(
    name,
    description,
    age,
    usage,
    species,
    dispersalArea,
    dangerClass,
  ) {
    super(name, description, age, usage);
    this._species = species;
    this._dispersalArea = dispersalArea;
    this._dangerClass = dangerClass;
  }

  get species() {
    return this._species;
  }
  set species(value) {
    this._species = value;
  }

  get dispersalArea() {
    return this._dispersalArea;
  }
  set dispersalArea(value) {
    this._dispersalArea = value;
  }
  get dangerClass() {
    return this._dangerClass;
  }
  set dangerClass(value) {
    this._dangerClass = value;
  }
}

plantForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = selectType.value;
  let plant;

  if (type === "fern") {
    plant = new Fern(
      inputName.value,
      inputDescription.value,
      inputAge.value,
      inputUsage.value,
      inputArea.value,
    );
  }

  if (type === "firtree") {
    plant = new Firtree(
      inputName.value,
      inputDescription.value,
      inputAge.value,
      inputUsage.value,
      inputSpecies.value,
      inputArea.value,
      inputDanger.value,
    );
  }

  plants.push(plant);
  saveToLocalStorage();
  renderFunction();
  plantForm.reset();
  handleTypeChange();
});

selectType.addEventListener("change", handleTypeChange);

function handleTypeChange() {
  const type = selectType.value;

  if (type === "fern") {
    inputSpecies.disabled = true;
    inputDanger.disabled = true;

    inputArea.disabled = false;
  }

  if (type === "firtree") {
    inputSpecies.disabled = false;
    inputDanger.disabled = false;

    inputArea.disabled = false;
  }

  if (type === "") {
    inputSpecies.disabled = true;
    inputDanger.disabled = true;
    inputArea.disabled = true;
  }
}

const renderFunction = () => {
  tableBody.innerHTML = "";

  plants.forEach((plant, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${plant.name}</td>
        <td>${plant.description}</td>
        <td>${plant.species ?? "-"}</td>
        <td>${plant.age}</td>
        <td>${plant.constructor.name}</td>
        <td>${plant._dangerClass ?? "-"}</td>
        <td>${plant.dispersalArea}</td>
        <td>${plant.usage}</td>
        <td>
          <button class="delete-btn" data-index="${index}">
            Delete
          </button>
        </td>
  `;
    tableBody.append(row);
  });
};

const saveToLocalStorage = () => {
  localStorage.setItem("plants", JSON.stringify(plants));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("plants");
  if (data) {
    plants = JSON.parse(data);
    renderFunction();
  }
};

loadFromLocalStorage();

tableBody.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const index = +e.target.dataset.index;
  plants.splice(index, 1);

  saveToLocalStorage();
  renderFunction();
  handleTypeChange();
});
