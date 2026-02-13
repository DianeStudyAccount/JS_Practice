"use strict";

const button = document.querySelector('#btn');
const input = document.querySelector('#text');
const square = document.querySelector('#square')
const circle = document.querySelector('#circle');
const innerBtn = document.querySelector('#e_btn');
const range = document.querySelector('#range');

button.addEventListener('click', (e) => {
   square.style.backgroundColor = input.value.trim();
   input.value = '';
   innerBtn.style.display = 'none';
})

range.addEventListener('input', () => {
    const value = range.value;

    circle.style.width = value + "%";
    circle.style.height = value + "%";
})