/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll, maxScore, currentVal, defaultVal;

init();



//dice = Math.floor(Math.random() * 6) + 1;


//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML ='<b>' + dice + '</b>'


//var x = document.querySelector('#score-0').textContent;
//console.log(x);


// Roll Button Event
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        
    // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('#dice-2');
    
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'

    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png'

    // 3. Update the round scor IF the rolled number was NOT a 1


    if(dice !== 1 && dice2 !== 1) {
        
        //Add score
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore

        //Store the last value
        prevRoll.push(dice, dice2) 
            
        //Check if the last 2 rolls are 6
       if ( prevRoll[prevRoll.length - 2] == 6 && dice == 6 ) { // Losing all score if the player rolled 2 x 6 consecutive
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore
            scores[activePlayer] = roundScore
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            
        }
        
        
    } else {
        //Next player
        nextPlayer();
        prevRoll = [];
        
        }

    
        
    


    }
    
});


    




    // Pressing HOLD Button
    document.querySelector('.btn-hold').addEventListener('click', function () {

        
        if (gamePlaying) {
             // Add current score to global score
        scores[activePlayer] += roundScore;
         
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game

        if ( scores[activePlayer] >= maxScore) {
            document.querySelector('#name-' + activePlayer).innerHTML = '<b>' + 'Winner' + '</b>';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        } else {
         // Next Player
            nextPlayer();   

        }
        }

                   

    } )


    // NEW MAX SCORE BUTTON

    document.querySelector('.btn-set').addEventListener('click', function () {
        
        maxScore = document.getElementById('maxScore').value; // gets the new value of the input form when the button is clicked

    } )

//////////////////////////////////////////////////////////////


    function nextPlayer () {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        //Toggle html class
        document.querySelector('.player-0-panel').classList.toggle('active')
        document.querySelector('.player-1-panel').classList.toggle('active')
    
        document.querySelector('.dice').style.display='none';
        document.querySelector('#dice-2').style.display='none';
    }


    document.querySelector('.btn-new').addEventListener('click', init);

    function init() {
        scores = [0,0];
        activePlayer = 0;
        roundScore = 0;
        prevRoll = [];
        gamePlaying = true;
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('#dice-2').style.display = 'none'

        maxScore = document.getElementById('maxScore').value = '100' 

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0'
        document.getElementById('current-1').textContent = '0'

        document.getElementById('name-0').textContent = 'Player 1'
        document.getElementById('name-1').textContent = 'Player 2'

        document.querySelector('.player-' + 0 + '-panel').classList.remove('winner');
        document.querySelector('.player-' + 1 + '-panel').classList.remove('winner');
        document.querySelector('.player-' + 0 + '-panel').classList.remove('active');
        document.querySelector('.player-' + 0 + '-panel').classList.add('active');
        document.querySelector('.player-' + 1 + '-panel').classList.remove('active');

    }