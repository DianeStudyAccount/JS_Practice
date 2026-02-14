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
    appData.addTitle();
    handlerBtns.disabled = true;

    handlerBtns.addEventListener("click", appData.start);
    add.addEventListener("click", appData.addScreenBlock);

    document.addEventListener("input", () => {
      handlerBtns.disabled = !appData.addScreens();
    });

    inputRange.addEventListener("input", () => {
      if (!appData.isCalculated) return; //before data is calculated - do nothing

      rangeValue.textContent = inputRange.value;
      appData.rollback = +inputRange.value;

      appData.servicePercentPrice = appData.fullPrice - appData.fullPrice * (appData.rollback / 100);

      totalCountRollback.value = appData.servicePercentPrice.toFixed(2);
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    // this.logger();
    appData.showResult();
    appData.isCalculated = true;
  },
  showResult: function () {
    totalInputs.value = appData.screenPrice;
    totalCount.value = appData.totalScreensCount;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    appData.screens = [];
    let isValid = true; //flag

    screens.forEach((screen, idx) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      if (!select.value || !input.value || input.value <= 0) {
        isValid = false;
        return;
      }
      appData.screens.push({
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
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
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

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  logger: function () {
    // for (let key in this) {. //for all info in the programm
    //     console.log(key, this[key]);
    // }
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(this.screens);
  },
};

appData.init();
