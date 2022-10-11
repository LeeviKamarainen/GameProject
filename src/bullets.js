
// Help for bullet generation from this video: https://www.youtube.com/watch?v=9wvlAzKseCo
class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene, x, y, 'bullet');
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
        console.log()
        if(this.body.blocked.none != true) {
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