//Help for the enemy behaviour (movement, shooting etc.) from: https://docs.idew.org/video-game/project-references/phaser-coding/enemy-behavior


class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y) {
        super(scene, x, y, 'tankBase');
    }

    create(x,y,sc) {
        this.body.reset(x+Math.random()*50,y+Math.random()*50);
        this.body.bounce = 1;
        this.tint = 0xda2525
        this.setActive(true);
        this.setVisible(true);
        this.body.setCollideWorldBounds(true);
        console.log(sc)
        let turret = new Turret(sc)
        turret.create(x,y)
    }
    

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
    }

}

class Turret extends Phaser.Physics.Arcade.Sprite {

    constructor(scene,x,y) {
        super(scene, x, y, 'tankTurret');
    }
    create(x,y) {
        console.log(this)
        this.body.reset(x,y);
        this.tint = 0xda2525
        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
        turret.setPosition(x,y)
    }

}
class EnemyGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
        super(scene.physics.world,scene);
    

   this.createMultiple({
        classType: Enemy,
        frameQuantity: 2,
        active: false,
        visible: false,
        key: 'tankBase'
    })
    }  

    createEnemy(x,y,sc) {
        const enemy = this.getFirstDead(false)

        if(enemy) {
            enemy.create(x,y,sc)
        }
    }

    moveEnemy(player,game) {
        const enemies= this;
       for(let i = 0; i<enemies.children.entries.length;i++) {
        let enemy = enemies.children.entries[i]
        let dist = Phaser.Math.Distance.BetweenPoints(enemy, player)
        if (dist < 200 &&  dist > 50) {
            // rotate enemy to face towards player
            enemy.rotation = Phaser.Math.Angle.BetweenPoints(enemy, player);
            // move enemy towards player at 150px per second
            game.physics.velocityFromRotation(enemy.rotation, 50, enemy.body.velocity);
            // could add other code - make enemy fire weapon, etc.
        } else {
            enemy.setVelocity(0);
        }
    }
    }

    
}

