// Récupère les ID des images des portes
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

// Récupère les path des images caché qu'on injecte dans une variable{}
const botDoorPath = "https://content.codecademy.com/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://content.codecademy.com/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://content.codecademy.com/projects/chore-door/images/space.svg";
const closedDoorPath = "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";

//Variables pour randomisé le jeu 
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

//Button de start
let startButton = document.getElementById('start');

//Variable qui vérifie si on joue encore
let currentlyPlaying = true;

const isBot = (door) =>{
    if(door.src === botDoorPath){
        return true;
    } else {
        return false;
    }
}

//Anti-cheat
const isClicked = (door) =>{
    if(door.src === closedDoorPath){
        return false;
    } else {
        return true;
    }
};

//Fonction qui détermine si la partie est gagné ou pas 
const playDoor = (door) => {
    numClosedDoors--;
    if(numClosedDoors === 0){
        gameOver('win');
    } else if (isBot(door)){
        gameOver();
    }
}

//Fonction pour créer une porte random
const randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random()*numClosedDoors);
    if(choreDoor === 0) {
        openDoor3 = spaceDoorPath;
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
    } else if(choreDoor === 1) {
        openDoor1 = botDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = beachDoorPath;
    } else {
        openDoor2 = beachDoorPath;
        openDoor3 = botDoorPath;
        openDoor1 = spaceDoorPath;
    };
};

// Évènement quand on clique sur une des trois portes
doorImage1.onclick = () =>{
    if(currentlyPlaying && !isClicked(doorImage1)){
        doorImage1.src= openDoor1;
        playDoor(doorImage1);
    };
};


doorImage2.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage2)){
        doorImage2.src= openDoor2;
        playDoor(doorImage2);
    };
};


doorImage3.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage3)){
        doorImage3.src= openDoor3;
        playDoor(doorImage3);
    };
};

const startRound = () => {
    numClosedDoors = 3;
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    startButton.innerHTML = 'Good Luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
};

startButton.onclick = () => {
    if(!currentlyPlaying)
    {
        startRound();
    };
}

const gameOver = (status) => {
    if(status === 'win'){
        startButton.innerHTML = 'You Win! Play again ?';
    } else {
        startButton.innerHTML = 'Game Over! Play again?'
    };
    currentlyPlaying = false;
};

startRound();