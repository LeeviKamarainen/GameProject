//Help for the enemy behaviour (movement, shooting etc.) from: https://docs.idew.org/video-game/project-references/phaser-coding/enemy-behavior


class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y) {
        super(scene, x, y, 'tankBase');
        this.timer = 0;
        this.bulletgroup = new BulletGroup(scene)
    }

    create(x,y,sc) {
        this.body.reset(x+Math.random()*50,y+Math.random()*50);
        console.log(player)
        this.scene.physics.add.collider(this.bulletgroup,player,bulletHit,null,this.scene)
        this.scene.physics.add.collider(this.bulletgroup,walls)
        this.tint = 0xda2525
        this.setActive(true);
        this.setVisible(true);
        this.body.setCollideWorldBounds(true);
        this.turret = new Turret(sc,x,y)
        this.turret.create(x,y)
    }
    

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
        // Update the specific enemy turrets positions and angle
        this.turret.x = this.x 
        this.turret.y = this.y
        let enemyTurretangle = Phaser.Math.Angle.BetweenPoints(player,this)
        this.turret.rotation = enemyTurretangle -1.5708// Approximately 90 degrees in radian so the enemy turrets follows the player
        //Event to shoot one bullet per second (help from: https://gamedev.stackexchange.com/questions/182242/phaser-3-how-to-trigger-an-event-every-1-second)
        
        this.timer += delta;
        while (this.timer > 1000) {
            //1.0472 is 60 degrees
            this.bulletgroup.fireBullet(this.x,this.y,enemyTurretangle-1.0472)
            this.timer -= 1000;
        }

    }

}

class Turret extends Phaser.Physics.Arcade.Sprite {

    constructor(scene,x,y) {
        super(scene, x, y, 'tankTurret');
        scene.add.existing(this)
        this.setTexture('tankTurret')
        this.setPosition(x,y)
    }
    create(x,y) {
        this.tint = 0xda2525
        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
        
    }

}
class EnemyGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
        super(scene.physics.world,scene);
    

   this.createMultiple({
        classType: Enemy,
        frameQuantity: 1,
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
        if (dist < 400 &&  dist > 50) {
            // rotate enemy to face towards player
            // 1.5708 is approximately 90 degrees in radians and we use this to turn the enemy towards the player
            enemy.rotation = Phaser.Math.Angle.BetweenPoints(enemy, player)+1.5708; 
            // move enemy towards player at 150px per second
            // we need to reduce the 1.5708 from the rotation to get the correct velocity
            game.physics.velocityFromRotation(enemy.rotation-1.5708, 50, enemy.body.velocity);
        } else {
            enemy.setVelocity(0);
        }
    }
    }

    
}

