'use strict';
let queuedImagesArray = [],
    queuedForm = document.querySelector('#queued-form'),
    queuedDiv = document.querySelector('.queued-div'),
    inputDiv = document.querySelector('.input-div'),
    input = document.querySelector('.input-div input');

// Queued Images
input.addEventListener('change', () => {
    const files = input.files;
    console.log(files);
});
