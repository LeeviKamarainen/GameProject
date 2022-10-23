

class Powerup extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture) {
        super(scene, x, y, texture);
        
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setScale(0.1)
        this.setTexture(texture)
    }

    create(x,y,sc,player) {
        this.x = x;
        this.y = y;
        this.setActive(true);
        this.setVisible(true);
       sc.anims.create({ //Animation for the powerup
            key: 'powerup',
            frames: [
                { key: 'pup1' },
                { key: 'pup2' },
                { key: 'pup3' },
                { key: 'pup4' },
                { key: 'pup5' }
            ],
            frameRate: 5,
            repeat: Infinity
        });
        this.play('powerup')
        if (this.powerupind == 1) { //Index for different powerups. Used here to control the tints of the powerups
            this.tint = 0x036bfc;
        } else if (this.powerupind == 2) { 
            this.tint = 0x03fcba;
        }
        else if (this.powerupind == 3) {
            this.tint = 0x55566b;
         }

        this.body.setCollideWorldBounds(true);
    }

    createHealth(x,y,sc,player) { //Extra health creation
        this.x = x;
        this.y = y;
        this.setActive(true);
        this.setVisible(true);
        this.setTexture('Healthsingle')
        this.setScale(2)
        this.body.setCollideWorldBounds(true);
    }

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
    }
}

function randomPower(powerup,player) {
    let randindex = powerup.powerupind; //Index for choosing which powerup spawns
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
    console.log(this)
    player.speed = 200;
    player.tint = 0x036bfc
    playerturret.tint = 0x036bfc
    powerup.destroy();
    t.time.delayedCall(5000,function() {player.speed = 100 //Delayed call controls how long the powerup lasts
        player.tint = 0xffffff;
        playerturret.tint = 0xffffff;
    
    }, null,t) //set speed back to original after 5 seconds
}

function pierceShot (powerup,player,t) {
    t.physics.world.removeCollider(bulletwallcollider) // remove the collision checker between walls and player bullets 
    player.tint = 0x03fcba
    playerturret.tint = 0x03fcba
    powerup.destroy();
    t.time.delayedCall(10000,function() { //Delayed call controls how long the powerup lasts
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
    t.time.delayedCall(10000,function() { //Delayed call controls how long the powerup lasts
        player.invincible = 0;
        player.tint = 0xffffff;
        playerturret.tint = 0xffffff;
    
    }, null,t) //set speed back to original after 5 seconds
}

function healUp(powerup,player,t) {
    if(player.health < 3) {
    player.health += 1
    healthbar.setTexture('Health'+player.health)
    }
    powerup.destroy()
}
