
// Lots of help from this video: https://www.youtube.com/watch?v=88DS3Z8nOdY
// and https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    parent: 'phaser-game',
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
  let bulletwallcollider;

  var timevar = 0;
  var timetext;
  var score = 0;
  var scoreText;

  var gameovertext;


  let updatevar = 1; // variable to use in the update function
  let speedupvar = 5 // variable to speed up the spawning of the enemies
  function preload () {

    this.load.image("tankBase", "../assets/tankBase.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("tankTurret", "../assets/tankTurret.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("bullet", "../assets/bullet.png", { frameWidth: 16, frameHeight: 16 }); 
    this.load.image("ground", "../assets/Dirt 6 .png");
    this.load.image("wall", "../assets/wall.png");

    //Loading of the Healthbars
    this.load.image('Health3','../assets/Healthbar/Health6.png')
    this.load.image('Health2','../assets/Healthbar/Health4.png')
    this.load.image('Health1','../assets/Healthbar/Health2.png')
    this.load.image('Health0','../assets/Healthbar/Health0.png')

    //Loading of the Powerups

    this.load.image('pup1','../assets/Powerup/frame 1.png')
    this.load.image('pup2','../assets/Powerup/frame 2.png')
    this.load.image('pup3','../assets/Powerup/frame 3.png')
    this.load.image('pup4','../assets/Powerup/frame 4.png')
    this.load.image('pup5','../assets/Powerup/frame 5.png')
    this.load.image('pup6','../assets/Powerup/frame 6.png')
  }
  
  function create () {
    //Representing the current scene as t on the functions (sending this)

    //Help to get tiled background from here: http://www.netexl.com/blog/repeating-or-tiled-background-in-phaser/
    this.add.tileSprite(0, 0, this.game.width, this.game.height, "ground");
    scoreText = this.add.text(700, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    timeText = this.add.text(400, 16, 'Time: 0', { fontSize: '32px', fill: '#000' });
    // Initialization of the enemygroups and the player
    
    enemygroup = new EnemyGroup(this) 
    
    
    walls = this.physics.add.staticGroup();
    walls.create(400, 200, 'wall').setScale(1).refreshBody();
    
    for(let i = 1; i<7; i++) {
        for(let j=1;j<10;j++) {
        walls.create(0+j*100,0+i*100,'wall')
        }
    }
    powerup = new Powerup(this);
    powerup.create(50,50,this)
    player = playerInit(this);
    console.log(player)
    console.log(player.speed)
    //creating variables for controlling the keyboard keys (cursors) and the pointer (pointer)
    cursors = this.input.keyboard.createCursorKeys();
    pointer = this.input.activePointer;

    bulletwallcollider = this.physics.add.collider(bulletgroup,walls)

   // this.sys.canvas.style.cursor = 'none' If you want to hide cursor
  }
  




  function update () {

    updatevar +=1;
    timevar +=1;
    timeText.setText('Time: '+Math.round((timevar/60)*100)/100)

    if (updatevar==(Math.round(speedupvar*60)+2)) {
        
        speedupvar = speedupvar-0.1;
        if (speedupvar<1) {
            speedupvar = 1
        }
        enemygroup.createEnemy(Math.random()*1000,Math.random()*800,this)
        updatevar=1;
    }
    if ((timevar/60)%30 == 0) {
        console.log('New Powerup')
        powerup = new Powerup(this);
        let locationmat = [50,150,250,350,450,550,650,750] // Vector for spawnpoints of the powerups
        let randlocindx = Math.floor(Math.random()*8)
        let randlocindy = Math.floor(Math.random()*8)
        powerup.create(locationmat[randlocindx],locationmat[randlocindy],this)  
        this.physics.add.collider(powerup,player,randomPower,null,this)
    }
    //The angle of the players turret and your cursor
    angle = Phaser.Math.Angle.BetweenPoints(playerturret,pointer)+90
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
    
    this.physics.collide(bulletgroup,player)
    this.physics.collide(enemygroup,walls)
    this.physics.collide(enemygroup,player)
    this.physics.collide(enemygroup,bulletgroup)
    
   
  }


  
 
  