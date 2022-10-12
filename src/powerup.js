

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
        this.body.setCollideWorldBounds(true);
    }
    preUpdate(time,delta) {
        super.preUpdate(time,delta);
        //powerUpAnimation(this.scene);
        //this.anims.load('powerup')
    }
}

function speedUp (powerup,player) {
    currenttime = this.time.now;
    console.log(this)
    player.speed = 200;
    player.tint = 0xfc8c03
    playerturret.tint = 0xfc8c03
    powerup.destroy();
    this.time.delayedCall(5000,function() {player.speed = 100
        player.tint = 0xffffff;
        playerturret.tint = 0xffffff;
    
    }, null,this) //set speed back to original after 5 seconds
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