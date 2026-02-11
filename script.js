"use strict";

function getCurrentDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth(); //0 - 11
  const year = today.getFullYear();

  const hours = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  const weekDay = today.getDay();

  const weekdays = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return {                //easier to get access to resources via objects - instead of day + " " + month ...
    day,
    month: months[month],
    year,
    hours,
    min,
    sec,
    weekDay: weekdays[weekDay],
  };
}

function changeEnding(num, forms) { //to calcualte 
  num = Math.abs(num) % 100;
  const n1 = num % 10;

  if (num > 10 && num < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}
const d = getCurrentDate(); // toISOString() часто применяют при работе с API и сохранении дат в БД, поскольку он независим от часового пояса. нужно ли использовать? 
const getDateVar1 = `Сегодня ${d.weekDay}, ${d.day} ${d.month} ${d.year} года, ${d.hours} ${changeEnding(d.hours, ["час", "часа", "часов"])} ${d.min} ${changeEnding(d.min, ["минута", "минуты", "минут"])} ${d.sec} ${changeEnding(d.sec, ["секунда", "секунды", "секунд"])}`;


//  function getCurrentDateNum() {        //classical variant?
//   function pad(num) {
//   return num < 10 ? '0' + num : String(num);
// }
//   const now = new Date();

//   const day = pad(now.getDate());
//   const month = pad(now.getMonth() + 1);
//   const year = now.getFullYear();

//   const hours = pad(now.getHours());
//   const minutes = pad(now.getMinutes());
//   const seconds = pad(now.getSeconds());

//   return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
// }

function getCurrentDateNum() {
  const today = new Date();

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return formatter.format(today).replace(',', ' -');
}

setInterval(()=> {
  console.log(getCurrentDateNum(), 1000)
});

console.log(getDateVar1);