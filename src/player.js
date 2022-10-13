
function playerInit (t) {
    bulletgroup = new BulletGroup(t);
    bulletgroup.x = 50000;
    bulletgroup.y = 50000;
    player = t.physics.add.sprite(400, 350, "tankBase");
    player.health = 3;
    player.speed = 100;
    player.invincible = 0;

    playerturret = t.physics.add.sprite(400,350,'tankTurret');
    healthbar = t.physics.add.image(player.x,player.y-50,'Health3')

    t.physics.add.collider(enemygroup,bulletgroup,bulletHit,null,t.scene)

    player.setBounce(1);
    player.setCollideWorldBounds(true);
    return player;
}