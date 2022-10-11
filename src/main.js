

// Lots of help from this video: https://www.youtube.com/watch?v=88DS3Z8nOdY
// and https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config)
  
  let player;
  let walls;
  let turret;
  let cursors;
  let pointer;
  let bulletgroup;
  let spacebar;
  let flag = false;
  let enemygroup;

  function preload () {

    this.load.image("tankBase", "../assets/tankBase.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("tankTurret", "../assets/tankTurret.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("bullet", "../assets/bullet.png", { frameWidth: 16, frameHeight: 16 }); 
    this.load.image("ground", "../assets/wood.png");
    this.load.image("wall", "../assets/wall.png");
    this.load.spritesheet
  }
  
  function create () {
    
    this.add.image(400, 300, "ground");

    // Initialization of the enemygroups and bulletgroups
    bulletgroup = new BulletGroup(this)
    enemygroup = new EnemyGroup(this) 
    walls = this.physics.add.staticGroup();
    walls.create(400, 200, 'wall').setScale(1).refreshBody();
    for(let i = 1; i<5; i++) {
        for(let j=1;j<5;j++) {
        walls.create(0+j*100,0+i*100,'wall')
        }
    }

    //creating variables for controlling the keyboard keys (cursors) and the pointer (pointer)
    cursors = this.input.keyboard.createCursorKeys();
    pointer = this.input.activePointer;

    console.log(this.physics)
    player = this.physics.add.image(400, 350, "tankBase");
    turret = this.physics.add.image(400,350,'tankTurret');
    
    enemygroup.createEnemy(player.x+50,player.y+50)
    
    enemygroup.createEnemy(player.x+100,player.y+100)
    player.setBounce(1);
    player.setCollideWorldBounds(true);
   // this.sys.canvas.style.cursor = 'none' If you want to hide cursor
  }
  


  function update () {
    //The angle of the players turret and your cursor
    angle = Phaser.Math.Angle.BetweenPoints(turret,pointer)+90
    //Movement of the turret:
    moveTurret(this,angle)
    moveTank(this)
   
    //When you click once the turret shoots once, the flag controls that the turret wont shoot continously when the left click is pressed down
    if(pointer.primaryDown) {
        if(flag==false) {
        shootBullet(this,angle)
        flag = true;
        }
    }
    if (pointer.leftButtonReleased()) {
        flag = false;
    }
    
    enemygroup.moveEnemy(player,this)
    this.physics.collide(player,walls)
    this.physics.collide(bulletgroup,walls)

    
   
  }


  
 
  