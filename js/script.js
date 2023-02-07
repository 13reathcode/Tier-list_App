'use strict';

const rows = document.querySelectorAll('.content__row');
const cards = document.querySelectorAll('.content__card');
const colors = ['#FF7F7F', '#FFBF7F', '#FFDF7F', '#BFFF7F', '#7FFF7F', '#7FBFFF', '#7F7FFF'];

// Row logic

const onDrag = (ev) => {
    ev.preventDefault();
};

const onDrop = (ev) => {
    ev.preventDefault();
    const draggedCardId = ev.dataTransfer.getData('id');
    const draggedCard = document.getElementById(draggedCardId);
    ev.target.appendChild(draggedCard);
};

rows.forEach((row, index) => {
    const label = row.querySelector('.content__label');
    label.style.backgroundColor = colors[index];
    row.ondragover = onDrag;
    row.ondrop = onDrop;
});

// Card logic

const onDragStart = (ev) => {
    console.log('Dragging');
    ev.dataTransfer.setData('id', ev.target.id);

    setTimeout(() => {
        ev.target.style.visibility = 'hidden';
    }, 100);
};

const onDragEnd = (ev) => {
    console.log('Ended dragging');
    ev.target.style.visibility = 'visible';
};

cards.forEach((card) => {
    card.ondragstart = onDragStart;
    card.ondragend = onDragEnd;
});
