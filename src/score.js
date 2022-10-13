function increaseScore() {
    //Help from: http://phaser.io/tutorials/making-your-first-phaser-3-game/part9
    
    score += 10;
    scoreText.setText('Score: '+score)
    

}

function endGame(t) {
    //Help to store array in localstorage
    var leaderboard = [];
    console.log(localStorage)
    var nameText = document.getElementById('name');
    let nameT = nameText.value;
    if((localStorage.hasOwnProperty('leaderboard2'))==false) {
        console.log('täällä')
        let initJson = [{name: "asd", score: -999}]
        localStorage.setItem('leaderboard2',JSON.stringify(initJson))
    }
    leaderboard = JSON.parse(localStorage.getItem('leaderboard2'));
    leaderboard.push({name: nameT, score: score})
    gameovertext = "GAME OVER!\nYOUR SCORE WAS:"+" "+score+"\nDo you want to play again?"
    t.add.text(100, 200, gameovertext, { fontSize: '50px', fill: '#000', background: '#445748' });
    localStorage.setItem("leaderboard2",JSON.stringify(leaderboard))
    t.scene.pause()
}

function setLeaderboard(t) {

    var leaderboardlist = document.getElementById('leaderboardlist');
    leaderboardlist.innerHTML = ''
    var leaderboard = JSON.parse(localStorage.getItem('leaderboard2'))
// help for sorting: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    var sortedleaderboard = leaderboard.sort((a,b) => b.score-a.score)
    //Help for list element creating: https://stackoverflow.com/questions/17773938/add-a-list-item-through-javascript
    for(let i = 0;i < 5; i++) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(sortedleaderboard[i].name+' '+sortedleaderboard[i].score))
        leaderboardlist.appendChild(entry)
    }

}

function restartGame() {
    score = 0;
    timevar = 0;
    speedupvar = 5;
    console.log(game)
    game.scene.scenes[0].scene.restart() //restart the game.
}