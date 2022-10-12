function moveTank (t) {
    //Help from: https://stackoverflow.com/questions/32070772/how-do-you-rotate-the-player-in-a-phaser-game
    // and https://phaser.io/examples/v3/view/physics/arcade/velocity-from-angle
    if (cursors.up.isDown ) {
        t.physics.velocityFromAngle(player.angle-90,player.speed,player.body.velocity)
        } else if (cursors.down.isDown) {
        t.physics.velocityFromAngle(player.angle-90,-1*(player.speed),player.body.velocity)
    } else {
        player.setVelocity(0,0);
    }
    if(cursors.left.isDown) {
        player.setAngularVelocity(-150)
    } else if (cursors.right.isDown) {
        player.setAngularVelocity(150)
    } else {
        player.setAngularVelocity(0)
    }
    healthbar.setPosition(player.x,player.y-50)
  }

  function shootBullet (t,angle) {
    bulletgroup.fireBullet(player.x,player.y,angle)
  }


  function moveTurret (t,angle) {
    //Help from: https://phaser.io/examples/v3/view/physics/arcade/velocity-from-angle
    // and https://phaser.io/examples/v3/view/input/pointer/down-event on how to get the turret to follow the mouse pointer
    playerturret.setPosition(player.x,player.y)
    playerturret.rotation = angle
  }
