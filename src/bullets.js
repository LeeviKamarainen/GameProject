
// Help for bullet generation from this video: https://www.youtube.com/watch?v=9wvlAzKseCo
class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene, x, y, 'bullet')
    }
    fire(x,y,angle) {
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.body.setCollideWorldBounds(true);
        this.setVelocity(Math.cos(angle-90)*200,Math.sin(angle-90)*200)
    }

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
        if(this.body.blocked.none != true | this.body.touching.none != true) {
            //reset the bullets position and make them visible
            //essentially removing them without actually destroying the object references
            this.body.reset(super.x,super.y);
            this.setActive(false);
            this.setVisible(false);

        }
    }
}

class BulletGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
        super(scene.physics.world,scene);
    this.createMultiple({
        classType: Bullet,
        frameQuantity: 10,
        active: false,
        visible: false,
        key: 'bullet'
    })
    }

    fireBullet(x,y,velocity) {
        const bullet = this.getFirstDead(false)
        if(bullet) {
            bullet.fire(x,y,velocity)
        }

    }

}

function bulletHit (object1,object2) {
    //Special case for if the object hit by bullet is the player
    // flag is used for the invincible powerup
    if(object1 == player && player.invincible == 0)
    {
        console.log("Player hit")
        player.health -= 1;
        if (player.health == -1) {
            console.log(this.scene)
            player.health = 0;
            endGame(this)
            }
        healthbar.setTexture('Health'+player.health)
    } else if (object1 != null) {
        if(object1.turret!=undefined){
        object1.body.reset(5000,5000);
        object1.setActive(false);
        object1.setVisible(false);
        object1.turret.setActive(false)
        object1.turret.setVisible(false)
        increaseScore();
        }
    }


}