"use strict";
const polishBookLibrary = function() {
  let books = document.querySelectorAll(".book");
  const misprint = books[4].querySelector('h2 a');
  const addChapter = document.createElement('li');
  
const restoreOrder = function () {
  const book6 = books[2].querySelector('ul').append(addChapter);
  const chapters2 = books[0].querySelectorAll("li");
  const chapters5 = books[5].querySelectorAll("li");
  const chapters6 = books[2].querySelectorAll("li");

  books[0].before(books[1]);
  books[3].before(books[4]);
  books[5].after(books[2]);

  chapters2[3].after(chapters2[6]);
  chapters2[6].after(chapters2[8]);
  chapters2[9].after(chapters2[2]);

  chapters5[2].before(chapters5[9]);
  chapters5[4].after(chapters5[2]);
  chapters5[7].after(chapters5[5]);


  console.log(chapters6[10])
  chapters6[8].after(chapters6[10]);
};
restoreOrder();
  document.querySelector('.adv').remove();
  misprint.innerHTML = 'Книга 3. this и Прототипы Объектов';
  document.body.style.backgroundImage = 'url("image/you-dont-know-js.jpg")';
  addChapter.textContent = 'Глава 8: За пределами ES6';

}
polishBookLibrary();


 
