function increaseScore() {
    //Help from: http://phaser.io/tutorials/making-your-first-phaser-3-game/part9
    
    score += 10;
    scoreText.setText('Score: '+score)
    

}

function endGame(t) {
    var restartbutton = document.getElementById('restartbutton')
    gameovertext = "GAME OVER!\nYOUR SCORE WAS:"+" "+score+"\nDo you want to play again?"
    t.add.text(100, 200, gameovertext, { fontSize: '50px', fill: '#000', background: '#445748' });
    t.scene.pause()
    restartbutton.hidden = false;
    restartbutton.addEventListener("click", function () {
        score = 0;
        timevar = 0;
        t.scene.restart()
        restartbutton.hidden = true;
    });

}