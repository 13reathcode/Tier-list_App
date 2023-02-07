'use strict';

const colors = ['#FF7F7F', '#FFBF7F', '#FFDF7F', '#BFFF7F', '#7FFF7F', '#7FBFFF', '#7F7FFF'];
const rows = document.querySelectorAll('.content__row');

const cards = document.querySelectorAll('.content__card');
const addCard = document.getElementById('addCard');

const bank = document.getElementById('bank');

// Adding card logic
const addCardToBank = (event) => {
    const card = createCard();
    const Bank = document.querySelector('.bank');
    bank.appendChild(card);
};

addCard.onclick = addCardToBank;

// Card logic

const createCard = () => {
    const card = document.createElement('div');
    card.classList.add('content__card');
    card.setAttribute('draggable', 'true');
    card.id = (Date.now() + '').slice(-10);

    card.ondragstart = onDragStart;
    card.ondragend = onDragEnd;
    card.onclick = deleteCard;
    insertImage(card);
    return card;
};

const insertImage = (card) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/x-png,image/gif,image/jpeg,image/svg');
    input.style.visibility = 'hidden';
    input.onchange = () => {
        const image = new Image(85, 85);
        const file = input.files[0];
        console.log(file);

        const reader = new FileReader();
        reader.onload = (event) => {
            image.src = event.target.result;
            image.style.pointerEvents = 'none';
            card.appendChild(image);
        };
        reader.readAsDataURL(file);
    };
    input.click();
};

const deleteCard = (event) => {
    event.target.remove();
};

const onDragStart = (event) => {
    
    console.log('Dragging');
    event.dataTransfer.setData('id', event.target.id);

    setTimeout(() => {
        event.target.style.visibility = 'hidden';
    }, 100);
};

const onDragEnd = (event) => {
    console.log('Ended dragging');
    event.target.style.visibility = 'visible';
};

cards.forEach((card) => {
    card.ondragstart = onDragStart;
    card.ondragend = onDragEnd;
});

// Row logic

const onDrag = (event) => {
    event.preventDefault();
};

const onDrop = (event) => {
    event.preventDefault();
    const draggedCardId = event.dataTransfer.getData('id');
    const draggedCard = document.getElementById(draggedCardId);
    event.target.appendChild(draggedCard);
};

rows.forEach((row, index) => {
    const label = row.querySelector('.content__label');
    label.style.backgroundColor = colors[index];
    row.ondragover = onDrag;
    row.ondrop = onDrop;
});

// Bank logic

const onDropCard = (event) => {
    const id = event.dataTransfer.getData('id');
    bank.appendChild(document.getElementById(id));
};

bank.ondragover = (event) => {
    event.preventDefault();
};

bank.ondrop = onDropCard;
