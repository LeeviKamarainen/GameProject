
function playerInit (t) {
    bulletgroup = new BulletGroup(t); // Bullet group for the player
    
    player = t.physics.add.sprite(400, 550, "tankBase"); //Base sprite
    player.health = 3;
    player.speed = 100;
    player.invincible = 0;

    playerturret = t.physics.add.sprite(400,550,'tankTurret'); //Turret sprite
    healthbar = t.physics.add.image(player.x,player.y-50,'Health3')

    t.physics.add.collider(enemygroup,bulletgroup,bulletHit,null,t.scene)

    player.setBounce(1);
    player.setCollideWorldBounds(true);
    return player;
}