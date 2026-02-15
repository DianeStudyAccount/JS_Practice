"use strict";

const title = document.getElementsByTagName("h1")[0];
const add = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input[type=range]");
const rangeValue = document.querySelector(".rollback .range-value");

const handlerBtns = document.getElementsByClassName("handler_btn")[0];

const totalInputs = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  isCalculated: false,

  init: function () {
    this.addTitle();
    handlerBtns.disabled = true;

    handlerBtns.addEventListener("click", this.start.bind(this));
    add.addEventListener("click", this.addScreenBlock.bind(this));

    document.addEventListener("input", () => {
      handlerBtns.disabled = !this.addScreens();
    });

    inputRange.addEventListener("input", () => {
      if (!this.isCalculated) return; //before data is calculated - do nothing

      rangeValue.textContent = inputRange.value;
      this.rollback = +inputRange.value;

      this.servicePercentPrice =
        this.fullPrice - this.fullPrice * (this.rollback / 100);

      totalCountRollback.value = this.servicePercentPrice.toFixed(2);
    });

    document
      .querySelector("#reset")
      .addEventListener("click", this.reset.bind(this));
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    // this.logger();
    this.showResult();
    this.isCalculated = true;
    this.blockInputs();
  },
  reset: function () {
    totalInputs.value = "";
    totalCount.value = "";
    totalCountOther.value = "";
    fullTotalCount.value = "";
    totalCountRollback.value = "";

    const inputs = document.querySelectorAll(
      ".screen input, .screen select, .other-items input[type=text]",
    );
    inputs.forEach((item) => (item.disabled = false));

    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, idx) => {
      if (idx !== 0) screen.remove();
    });

    handlerBtns.style.display = "inline-block";
    document.querySelector("#reset").style.display = "none";

    this.isCalculated = false;
  },
  showResult: function () {
    totalInputs.value = this.screenPrice;
    totalCount.value = this.totalScreensCount;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    this.screens = [];
    let isValid = true; //flag

    screens.forEach((screen, idx) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      if (!select.value || !input.value || input.value <= 0) {
        isValid = false;
        return;
      }
      this.screens.push({
        id: idx,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
    return isValid;
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;

    this.totalScreensCount = this.screens.reduce((sum, screen) => {
      return sum + +screen.count;
    }, 0);

    this.screenPrice = this.screens.reduce((sum, screen) => {
      return sum + +screen.price;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  blockInputs: function () {
    const input = document.querySelectorAll(
      ".screen input, .screen select, .other-items input[type=text]",
    );
    input.forEach((item) => {
      item.disabled = true;
      handlerBtns.style.display = "none";
      document.querySelector("#reset").style.display = "inline-block";
    });
  },

  logger: function () {
    // for (let key in this) {. //for all info in the programm
    //     console.log(key, this[key]);
    // }
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
  },
};

appData.init();
