/**
 * This is where you will apply your DOM manipulation magic!
 *
 * An example has been set up for you that renders an <h1> element containing the text, "Hello World!"
 *
 * */

const body = document.querySelector('body');

const title = document.createElement('h1');
title.innerText = 'Hello World!';

body.appendChild(title);

/** Simple CRUD App stuff logic here! */
