"use strict";

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  services: {},
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  start: function () {
    this.asking();
    this.addPrices();
    this.getFullPrice();
    this.getServicePercentPrices();
    this.getTitle();
    this.logger();
  },
   isNum: function (num) {
    return !isNaN(num) && isFinite(num);
  },
    isString: function (str) {
      return typeof str === 'string' && str.trim() !== '' && isNaN(str);
  },
    asking: function() {
      do {
        this.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
      } while (!this.isString(this.title));
    
 
     for (let i = 0; i < 2; i++){
      let name;
      let price = 0;

      do {
        name = prompt ("Какие типы экранов нужно разработать?", "Простые, Сложные");
      } while ((!this.isString(name)));

      do {
      price = prompt("Сколько будет стоить эта работа?");
      } while (price === null || !this.isNum(+price));

      this.screens.push({id: i, name: name, price: price});
     }

    for (let i = 0; i < 2; i++) {
      let price;
      let name;

      do {
      name = prompt("Какой дополнительный тип услуги нужен?");
      if (name === null) return;
      } while (!this.isString(name));

      do {
        price = prompt("Сколько это будет стоить?");
      } while (price === null || !this.isNum(+price));
     
      if(this.services[name]){
        this.services[name].push(+price);
      } else {
        this.services[name] = [+price];
      }
    }

    this.screenPrice = parseFloat(this.screenPrice);
    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  addPrices: function () {
  this.screenPrice = this.screens.reduce((sum, screen) => {
    return sum + +screen.price;
  }, 0);

  this.allServicePrices = Object.values(this.services).reduce((sum, arr) => {
      return sum + arr.reduce((first, second) => first + second, 0);
    }, 0);
},
  
  getFullPrice: function () {
    this.fullPrice = this.screenPrice + this.allServicePrices;
  },
  getServicePercentPrices: function () {
    this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  getTitle: function () {
    let goodTitle = this.title.trim().toLowerCase();
    this.title = goodTitle[0].toUpperCase() + goodTitle.slice(1);
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price  >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price  >= 0  && price < 15000) {
      return "Скидка не предусмотрена.";
    } else if (price < 0) {
      return "Что-то пошло не так.";
    }
  },
  logger: function () {
    // for (let key in this) {. //for all info in the programm
    //     console.log(key, this[key]);
    // }
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(this.screens);
    
  }
};

appData.start();
