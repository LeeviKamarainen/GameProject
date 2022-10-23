var endGamevar = 0; // This variable controls so that the pause button can not be pressed if the game run has ended

function increaseScore() {
    //Help from: http://phaser.io/tutorials/making-your-first-phaser-3-game/part9
    
    score += 10;
    scoreText.setText('Score: '+score)
    

}

function endGame(t) {
    //Help to store array in localstorage
    var leaderboard = []; //initialize the leaderboard variable
    var nameText = document.getElementById('name');
    let nameT = nameText.value;
    if((localStorage.hasOwnProperty('leaderboard2'))==false) { //If the localstorages leaderboard is empty then initalize it with -999 value
        console.log('Leaderboard initialized')
        let initJson = [{name: "init", score: -999}]
        localStorage.setItem('leaderboard2',JSON.stringify(initJson))
    }
    leaderboard = JSON.parse(localStorage.getItem('leaderboard2')); //Parse the localstorages item to leaderboard variable
    leaderboard.push({name: nameT, score: score})
    gameovertext = "GAME OVER!\nYOUR SCORE WAS:"+" "+score+"\nDo you want to play again?"
    t.add.text(100, 200, gameovertext, { fontSize: '50px', fill: '#000', background: '#445748' });
    localStorage.setItem("leaderboard2",JSON.stringify(leaderboard))

    //Pause game and music 
    endGamevar = 1;   
    music.pause();
    t.scene.pause()
}

function setLeaderboard(t) {

    var leaderboardlist = document.getElementById('leaderboardlist');
    leaderboardlist.innerHTML = ''
    if((localStorage.hasOwnProperty('leaderboard2'))) {
    var leaderboard = JSON.parse(localStorage.getItem('leaderboard2'))
    // help for sorting the leaderboard: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    var sortedleaderboard = leaderboard.sort((a,b) => b.score-a.score)
    //Help for list element creating: https://stackoverflow.com/questions/17773938/add-a-list-item-through-javascript
    for(let i = 0;i < 5; i++) { //You can take the top 5 values from the sorted list to get top 5 values
        if(i>=sortedleaderboard.length){ //break if the length is not over 5
            break
        }
        if(sortedleaderboard[i].score == -999) { //continue next iteration if the score is -999 (the initialization locastorages JSON object)
            continue
        }
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(sortedleaderboard[i].name+' '+sortedleaderboard[i].score))
        leaderboardlist.appendChild(entry)
        }
    }

}

function pauseGame() {
    var informationText = document.getElementById("information")
    var pauseButton = document.getElementById('pausebutton')
    if(endGamevar == 0 ) {
        if(startPausedFlag == 1) {
        pauseButton.innerHTML = 'Resume Game'
        music.pause();
        startPausedFlag = 0;
        informationText.hidden = false;
        game.scene.scenes[0].scene.pause();
        } else if(startPausedFlag == 0) {
            music.play();
            pauseButton.innerHTML = 'Pause Game'
            startPausedFlag = 1;
            informationText.hidden = true;
            game.scene.scenes[0].scene.resume();
        }
    }
}

function restartGame() { 
    endGamevar = 0;
    var informationText = document.getElementById("information")
    music.pause();
    startPausedFlag = 1; // Flag for pausing the game
    informationText.hidden = true;
    //Reset the variables and the scene
    score = 0;
    timevar = 0;
    updatevar = 0;
    speedupvar = 5;
    game.scene.scenes[0].scene.restart() //restart the game.
}