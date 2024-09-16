let array = [];
let speed = 100; // Default speed

function generateArray() {
    const arraySize = parseInt(document.getElementById('array-size').value);
    array = [];
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 200) + 5;
        array.push(value);

        const arrayBar = document.createElement('div');
        arrayBar.classList.add('array-bar');
        arrayBar.style.height = `${value}px`;

        const barLabel = document.createElement('div');
        barLabel.classList.add('bar-label');
        barLabel.textContent = value;

        arrayBar.appendChild(barLabel);
        arrayContainer.appendChild(arrayBar);
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
            }

            bars[j].style.backgroundColor = 'teal';
            bars[j + 1].style.backgroundColor = 'teal';
        }
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'red';

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'red';
            await swap(j, j + 1);
            j--;

            bars[j + 1].style.backgroundColor = 'teal';
        }

        array[j + 1] = key;
        bars[i].style.backgroundColor = 'teal';
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        bars[i].style.backgroundColor = 'red';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'red';

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }

            bars[j].style.backgroundColor = 'teal';
        }

        if (minIdx !== i) {
            await swap(i, minIdx);
        }
        bars[i].style.backgroundColor = 'teal';
    }
}

function swap(i, j) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const arrayContainer = document.getElementById('array-container');
            const bars = document.getElementsByClassName('array-bar');

            // Swap the heights
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;

            // Update labels
            bars[i].querySelector('.bar-label').textContent = array[i];
            bars[j].querySelector('.bar-label').textContent = array[j];

            resolve();
        }, speed); // Use the speed variable for the delay
    });
}

// Update speed when slider value changes
document.getElementById('speed-slider').addEventListener('input', (event) => {
    speed = parseInt(event.target.value);
    document.getElementById('speed-value').textContent = speed;
});

// Generate array on page load with a default size
generateArray();
