
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
            this.body.reset(1000,800);
            this.setActive(false);
            this.setVisible(false);
            var explosionSound = game.scene.scenes[0].sound.add('woodhit',{volume: 0.5});
            explosionSound.play()

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
    // player.invincible is used for the invincible powerup
    if(object1 == player && player.invincible == 0 && object2.active == true)
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
        var explosionSound
        if(object1.turret!=undefined){
        explosionSound = this.scene.sound.add('explosion',{volume: 0.5}); //play sound
        explosionSound.play()
        object1.body.setCollideWorldBounds(false);
        object1.body.reset(600,600);
        object1.setActive(false); //'Destroy' the object which was hit
        object1.setVisible(false);
        object1.turret.setActive(false)
        object1.turret.setVisible(false)
        increaseScore();
        }
    }


}