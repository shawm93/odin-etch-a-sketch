const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const options = document.querySelectorAll('.option');
const clear = document.querySelector('.clear');
const opaque = document.querySelector('.opaque');
const color = document.querySelector('.colors');
const size_display = document.querySelector('.size_display');
const width = container.clientWidth;
const height = container.clientHeight;
let colorMode = true;
let rainbowMode = false;
let eraserMode = false;
let opaqueMode = false;
let resolution;
let size;
let grid_size;
let drag;

const setupGrid = (slider) => {
    resolution = slider.value;
    size = resolution * resolution;
    grid_size = 100 / resolution;
    size_display.innerHTML = `${resolution} x ${resolution}`;

    for (i=1; i<=size; i++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        grid.setAttribute('style', `width: ${grid_size}%; height: ${grid_size}%; margin: 0;`);
        grid.addEventListener('mousedown', () => {
            drag = true;
        })
        grid.addEventListener('mouseup', () => {
            drag = false;
        })
        grid.addEventListener('mouseover', () => {
            if (drag == true) {
                grid.style.setProperty('background-color', `${changeColor()}`);
                // console.log(opaqueMode);
                if (opaqueMode == false) {
                    grid.style.setProperty('opacity', `1`);
                } else {
                    let value = parseFloat(grid.style.opacity);
                    console.log(isNaN(value));
                    if (isNaN(value)) {
                        grid.style.setProperty('opacity', 0.1);
                    } else {
                        value = value + 0.1;
                        grid.style.setProperty('opacity', `${value}`);
                    }                    
                }
            }
        })
        container.appendChild(grid);
    }
}

options.forEach((option) => {
    option.addEventListener('click', () => {
        options.forEach((option) => {
            option.style.setProperty('background-color', `white`);
            option.style.setProperty('color', `black`);
        })
        option.style.setProperty('background-color', `black`);
        option.style.setProperty('color', `white`);
        if (option == options[2]) {
            colorMode = false;
            eraserMode = true;
            rainbowMode = false;
        } else if (option == options[1]) {
            colorMode = false;
            eraserMode = false;
            rainbowMode = true;
        } else {
            colorMode = true;
            eraserMode = false;
            rainbowMode = false;
        } 
    })
})

opaque.addEventListener('click', () => {
    if (opaqueMode == false) {
        opaque.style.setProperty('background-color', `black`);
        opaque.style.setProperty('color', `white`);
        opaqueMode = true;
    } else {
        opaque.style.setProperty('background-color', `white`);
        opaque.style.setProperty('color', `black`);
        opaqueMode = false;
    }
})

const changeColor = () => {
    if (colorMode == true) {
        colorPicked = color.value;
    } else if (eraserMode == true) {
        colorPicked = 'rgb(255,255,255)';
    } else if (rainbowMode == true) {
        let red = Math.floor(Math.random()*256);
        let green = Math.floor(Math.random()*256);
        let blue = Math.floor(Math.random()*256);
        colorPicked = 'rgb(' + red + ',' + green + ',' + blue + ')';
    }
    return colorPicked;
}

slider.addEventListener('mousemove', () => {
    resolution = slider.value;
    size_display.innerHTML = `${resolution} x ${resolution}`;
})

slider.addEventListener('change', () => {
    container.innerHTML = ``;
    setupGrid(slider);
})

clear.addEventListener('click', () => {
    container.innerHTML = ``;
    setupGrid(slider);
})

setupGrid(slider);