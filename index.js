'use strict'

const MAX = 20,

em = id => document.getElementById(id),

form = em('form'),
input = em('guess'),
img = em('img'),
output = em('no-tries'),
title = em('title'),
range = em('range'),

clear = () => {
  img.className = '';
  tries = 0;
  output.textContent = '';
  answer = Math.ceil(MAX * Math.random());
  for (let i = 0; i < MAX; i++) {
    range.children[i].className = '';
  }
},

guess = value => {
  tries++;
  input.value = '';

  if (value === answer) {
    img.className = 'correct';
    output.textContent = tries.toString() + ' turns';
    for (let i = 0; i < MAX; i++) {
      range.children[i].className = MAX - i === value ? 'correct' : 'dim';
    }
  } else if (value < answer) {
    img.className = 'too-low';
    for (let i = 0; i < value; i++) {
      range.children[MAX - i - 1].className = 'dim';
    }
  } else {
    img.className = 'too-high';
    for (let i = value - 1; i < MAX; i++) {
      range.children[MAX - i - 1].className = 'dim';
    }
  }
};

[...Array(MAX)].forEach((e, i) => {
  const value = MAX - i,

  li = document.createElement('li'),
  span = document.createElement('span');

  li.onclick = () => {
    guess(value);
  }

  li.append(span);
  span.innerText = value;
  range.append(li);
});

var tries, answer;

clear();

title.innerText = 'Guess a number between 1 and ' + MAX;

form.onsubmit = e => {
  e.preventDefault();
  guess(Number(input.value));
};

form.onreset = clear;