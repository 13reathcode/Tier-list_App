'use strict';
let queuedImagesArray = [],
    queuedForm = document.querySelector('#queued-form'),
    queuedDiv = document.querySelector('.queued-div'),
    inputDiv = document.querySelector('.input-div'),
    input = document.querySelector('.input-div input');

// Queued Images

const displayQueuedImages = () => {
    let images = '';
    queuedImagesArray.forEach((image, index) => {
        images += `
        <div class="image">
            <img src="${URL.createObjectURL(image)}" alt="image" />
            <span style="color:black" onclick="deleteQueuedImage(${index})">&times;</span>
        </div>
        `;
    });

    queuedDiv.innerHTML = images;
};

const deleteQueuedImage = (index) => {
    queuedImagesArray.splice(index, 1);
    displayQueuedImages();
};

input.addEventListener('change', () => {
    const files = input.files;
    for (let i = 0; i < files.length; i++) {
        queuedImagesArray.push(files[i]);
    }

    queuedForm.reset();
    displayQueuedImages();
});

inputDiv.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match('image')) return;
        if (queuedImagesArray.every((image) => image.name !== files[i].name))
            queuedImagesArray.push(files[i]);
    }
    displayQueuedImages();
});
