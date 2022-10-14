

class Powerup extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y) {
        super(scene, x, y, 'pup1');
        
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setScale(0.1)
        this.setTexture('pup1')

    }

    create(x,y,sc,player) {
        this.x = x;
        this.y = y;
        this.setActive(true);
        this.setVisible(true);
        if (this.powerupind == 1) {
            this.tint = 0x036bfc;
        } else if (this.powerupind == 2) { 
            this.tint = 0x03fcba;
        }
        else if (this.powerupind == 3) {
            this.tint = 0x55566b;
         }

        this.body.setCollideWorldBounds(true);
    }
    preUpdate(time,delta) {
        super.preUpdate(time,delta);
        //powerUpAnimation(this.scene);
        //this.anims.load('powerup')
    }
}

function randomPower(powerup,player) {
    let randindex = powerup.powerupind;
    console.log(randindex)
    if(randindex == 1) {
        console.log("speedup")
        speedUp(powerup,player,this)
    }
    else if (randindex == 2) {
        
        console.log("pierce")
        pierceShot(powerup,player,this)
    }
    else if (randindex == 3) {
        console.log("invincible")
        invinciblePower(powerup,player,this)
    }

}


function speedUp (powerup,player,t) {
    currenttime = t.time.now;
    console.log(this)
    player.speed = 200;
    player.tint = 0x036bfc
    playerturret.tint = 0x036bfc
    powerup.destroy();
    t.time.delayedCall(5000,function() {player.speed = 100
        player.tint = 0xffffff;
        playerturret.tint = 0xffffff;
    
    }, null,t) //set speed back to original after 5 seconds
}

function pierceShot (powerup,player,t) {
    t.physics.world.removeCollider(bulletwallcollider) // remove the collision checker between walls and player bullets 
    player.tint = 0x03fcba
    playerturret.tint = 0x03fcba
    powerup.destroy();
    t.time.delayedCall(10000,function() {
        bulletwallcollider = t.physics.add.collider(bulletgroup,walls)
        player.tint = 0xffffff;
        playerturret.tint = 0xffffff;
    
    }, null,t) //set shots back to original after 10 seconds
}

function invinciblePower(powerup, player,t) {
     // remove the collision checker between walls and player bullets 
    player.tint = 0x55566b
    playerturret.tint = 0x55566b
    powerup.destroy();
    player.invincible=1;
    t.time.delayedCall(10000,function() {
        player.invincible = 0;
        player.tint = 0xffffff;
        playerturret.tint = 0xffffff;
    
    }, null,t) //set speed back to original after 5 seconds



}
/*function powerUpAnimation (t) {
    t.anims.create({
        key: 'powerup',
        frames: [
            { key: 'pup1' },
            { key: 'pup2' },
            { key: 'pup3' },
            { key: 'pup4' },
            { key: 'pup5' }
        ],
        frameRate: 5,
        repeat: 1
    });
}*/