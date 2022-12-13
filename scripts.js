//module is just wrapper exposing limited public code (ie only what is necessary)

//player factory

const newPlayer = (name, mark) => {
    return { name, mark };
};

//game board set up - player 1 info, player 2 info

const gameSet = (() => {
    
    //player 1 info pull when start game pushed
    const playerOne = newPlayer('', '');


    //player 2 info pull when start game pushed
    const playerTwo = newPlayer('', ''); 

    //add event listener for mark buttons and logic to add to player 1 and 2

    const markSelect = document.querySelectorAll('.marks > button');

    markSelect.forEach((btn) => {
        btn.addEventListener('click', () => {
        if (btn.id === 'x') {
            playerOne.mark = 'x';
            playerTwo.mark = 'o';
        }else if (btn.id === 'o'){
            playerOne.mark = 'o';
            playerTwo.mark = 'x';
        }
    })

});

    //add event listener for start game and add logic to add names to player 1 and 2

    const start = document.querySelector('.new-game');

    const playerOneName = document.querySelector('.one-name');
    const playerTwoName = document.querySelector('.two-name');
    const startScreen = document.querySelector('.start-game');
    const gameScreen = document.querySelector('.game-set');

    
    return {
        playerOne,
        playerTwo,
    };
})();

//game board render - create board, set turns (turn=1, turn=2), set marks per turn (if turn =1, tile.innertext=x, etc), identify winner

const renderGame = (() => {
    let boardArray = ['', '', '', '', '', '', '', '', ''];
    const playerOneMark = gameSet.playerOne.mark;
    const gameBoard = document.querySelector('.game-board');
    gameBoard.textContent = '';
// set up board - loop to add 9 divs - unique id

function makeBoard(){
for (let i = 0; i < 9; i++) {
    const boardTile = document.createElement('div');
    boardTile.classList.add('game-tile');
    boardTile.setAttribute("id", i);
    boardTile.addEventListener('click', boardPlay);
    gameBoard.appendChild(boardTile);
}
};

//event listeners for click on each ('for each')
//set up mark logic - visual and push to array - inner text either O or X based on turn (turn +=1 and turn -=1)

const start = document.querySelector('.new-game');

const playerOneName = document.querySelector('.one-name');
const playerTwoName = document.querySelector('.two-name');
const startScreen = document.querySelector('.start-game');
const gameScreen = document.querySelector('.game-set');
const gameGrid = document.querySelector('.game-board');

start.addEventListener('click', () => {
gameSet.playerOne.name = playerOneName.value;
gameSet.playerTwo.name = playerTwoName.value;
startScreen.style.display = 'none';
gameScreen.style.display = 'flex';
gameGrid.style.display = 'grid';
makeBoard();
});

const tiles = document.querySelectorAll('.game-board > div');
let turn = 1;
let moveCounter = 0;

const boardPlay = (e) => {
    let markAdd = document.createElement('div');
        if (turn === 1 && !e.target.hasChildNodes()){
            markAdd.classList.add('game-mark')
            markAdd.textContent = 'X';
            e.target.appendChild(markAdd);
            turn += 1;
            moveCounter += 1;
            boardArray[e.target.id] = 'x'; 
        } else if (turn === 2 && !e.target.hasChildNodes()){
            markAdd.classList.add('game-mark');
            markAdd.textContent = 'O';
            e.target.appendChild(markAdd);
            turn -= 1;
            moveCounter += 1;
            boardArray[e.target.id] = 'o'; 
        } else {
            return;
        }
        winnerValidation();
    };

/*function addListener(){
    tiles.forEach((tile) => tile.addEventListener('click', boardPlay))
};

addListener();

function removeListener(){
    tiles.forEach((tile) => tile.removeEventListener('click', boardPlay))
};*/

const resetButton = document.querySelector('.reset-btn');

resetButton.addEventListener('click', () => {
    /*renderGame.boardArray = ['', '', '', '', '', '', '', '', ''];
    boardArray = ['', '', '', '', '', '', '', '', ''];
    const tileParent = document.querySelector('.game-board');
    tileParent.innerHTML = '';*/
    const tileInner = document.querySelectorAll('div.game-tile');
    for (let i = 0; i < 9; i++) {
        tileInner[i].innerHTML = '';
        boardArray[i] = ''
      }
    if (winner === true){
        tileInner.forEach((tile) => tile.addEventListener('click', boardPlay));
        winner = false;
    };
    const result = document.querySelector('.result-text');
    result.textContent = '';
    result.style.display = 'none';
    moveCounter = 0;
    turn = 1;
    //makeBoard();
});

//set up winner logic - winning scenarios and end game. Scenarios 0-2, 3-5, 6-8, 0-3-6, 1-4-5, 2-5-8, 0-4-8, 2-4-6


winner = false;
function winnerValidation() {
    const result = document.querySelector('.result-text'); 
    if ((boardArray[0] === 'x' && boardArray[1] ==='x' && boardArray[2] === 'x')
    || (boardArray[3] === 'x' && boardArray[4] ==='x' && boardArray[5] ==='x')
    || (boardArray[6] === 'x' && boardArray[7] ==='x' && boardArray[8] ==='x')
    || (boardArray[1] === 'x' && boardArray[4] ==='x' && boardArray[7] ==='x')
    || (boardArray[0] === 'x' && boardArray[3] ==='x' && boardArray[6] ==='x')
    || (boardArray[2] === 'x' && boardArray[5] ==='x' && boardArray[8] ==='x')
    || (boardArray[0] === 'x' && boardArray[4] ==='x' && boardArray[8] ==='x')
    || (boardArray[2] === 'x' && boardArray[4] ==='x' && boardArray[6] ==='x')){
        if (gameSet.playerOne.mark ==='x'){
            result.textContent = `${gameSet.playerOne.name} wins!`;
            result.style.display = 'block';
        }else {
            result.textContent = `${gameSet.playerTwo.name} wins!`;
            result.style.display = 'block';
        }
        winner = true;
        document.querySelector('.game-board').outerHTML = document.querySelector('.game-board').outerHTML;
    }else if ((boardArray[0] === 'o' && boardArray[1] ==='o' && boardArray[2] === 'o')
    || (boardArray[3] === 'o' && boardArray[4] ==='o' && boardArray[5] ==='o')
    || (boardArray[6] === 'o' && boardArray[7] ==='o' && boardArray[8] ==='o')
    || (boardArray[1] === 'o' && boardArray[4] ==='o' && boardArray[7] ==='o')
    || (boardArray[0] === 'o' && boardArray[3] ==='o' && boardArray[6] ==='o')
    || (boardArray[2] === 'o' && boardArray[5] ==='o' && boardArray[8] ==='o')
    || (boardArray[0] === 'o' && boardArray[4] ==='o' && boardArray[8] ==='o')
    || (boardArray[2] === 'o' && boardArray[4] ==='o' && boardArray[6] ==='o')){
        if (gameSet.playerOne.mark ==='o'){
            result.textContent = `${gameSet.playerOne.name} wins!`
            result.style.display = 'block';
        }else {
            result.textContent = `${gameSet.playerTwo.name} wins!`
            result.style.display = 'block';
        }
        winner = true;
        document.querySelector('.game-board').outerHTML = document.querySelector('.game-board').outerHTML;
    } else if (moveCounter === 9){
        result.textContent = 'Tie game!'
        result.style.display = 'block';
        winner = true;
        document.querySelector('.game-board').outerHTML = document.querySelector('.game-board').outerHTML;
    }
};
    return{
        makeBoard,
        winnerValidation,
        boardPlay,
        boardArray
    }

})();


//event listeners & function calls

 //does this need to be in next module? Or at end?
    /*const start = document.querySelector('.new-game');

    const playerOneName = document.querySelector('.one-name');
    const playerTwoName = document.querySelector('.two-name');
    const startScreen = document.querySelector('.start-game');
    const gameScreen = document.querySelector('.game-set');
 
 start.addEventListener('click', () => {
    gameSet.playerOne.name = playerOneName.value;
    gameSet.playerTwo.name = playerTwoName.value;
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    renderGame.makeBoard();
});*/


//Computer logic (need to also add comp selector)

//easy mode

//impossible mode