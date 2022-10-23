
// Lots of help from this video: https://www.youtube.com/watch?v=88DS3Z8nOdY
// and https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
var config = {
    type: Phaser.AUTO,
    width: 1000, 
    height: 700,
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.CENTER,
    },
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

  // Variables for the scores and time
  var timevar = 0;
  var timetext;
  var score = 0;
  var scoreText;
  var startPausedFlag = 0;

  var gameovertext;
  var initLeaderboard = 'initname'
  let updatevar = 1; // variable to use in the update function
  let speedupvar = 5 // variable to speed up the spawning of the enemies
  function preload () {

    //Sprite assets
    this.load.image("tankBase", "../assets/tankBase.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("tankTurret", "../assets/tankTurret.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("bullet", "../assets/bullet.png", { frameWidth: 16, frameHeight: 16 }); 
    this.load.image("ground", "../assets/Dirt 6 .png");
    this.load.image("wall", "../assets/wall.png");
    this.load.image('trunk','../assets/woodlong.png')
    
    //Loading of the Healthbars
    this.load.image('Health3','../assets/Healthbar/Health6.png')
    this.load.image('Health2','../assets/Healthbar/Health4.png')
    this.load.image('Health1','../assets/Healthbar/Health2.png')
    this.load.image('Health0','../assets/Healthbar/Health0.png')
    this.load.image('Healthsingle','../assets/Healthbar/Healthsingle.png')
    
    //Loading of the Powerups
    this.load.image('pup1','../assets/Powerup/frame 1.png')
    this.load.image('pup2','../assets/Powerup/frame 2.png')
    this.load.image('pup3','../assets/Powerup/frame 3.png')
    this.load.image('pup4','../assets/Powerup/frame 4.png')
    this.load.image('pup5','../assets/Powerup/frame 5.png')
    this.load.image('pup6','../assets/Powerup/frame 6.png')
  

    //Loading of the sounds:
    this.load.audio('shot','../assets/Sounds/gun_fire.wav')
    this.load.audio('explosion','../assets/Sounds/explosion.wav') // https://opengameart.org/content/explosion-0
    this.load.audio('woodhit','../assets/Sounds/424911-impactshort78.wav') //https://opengameart.org/content/short-impact
    this.load.audio('music','../assets/Sounds/BossMain.wav') 

}
  

  function create () {
    
    music = this.sound.add('music',{volume: 0.2}); //create the background music

    if(startPausedFlag == 0) { //flag used to start the game as paused
        this.scene.pause(); 
        music.pause();
    } else {
        music.loop = true;
        music.play();
    }

    let restartButton = document.getElementById('restartbutton')
    restartButton.addEventListener("click",restartGame)


    let pauseButton = document.getElementById('pausebutton')
    pauseButton.addEventListener("click",pauseGame)
    setLeaderboard(this)

    //Representing the current scene as t on the functions (sending this)
    //Help to get tiled background from here: http://www.netexl.com/blog/repeating-or-tiled-background-in-phaser/
    this.add.tileSprite(0, 0, this.game.width, this.game.height, "ground");
    scoreText = this.add.text(700, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    timeText = this.add.text(400, 16, 'Time: 0', { fontSize: '32px', fill: '#000' });
   
    
    // Initialization of the enemygroups, walls and the player
    enemygroup = new EnemyGroup(this) 
    
    //Create boxes
    walls = this.physics.add.staticGroup();
    for(let i = 1; i<7; i++) {
        for(let j=1;j<10;j++) {
            if((j == 4 | j == 5) ) {
                continue;
            }
        walls.create(0+j*100,0+i*100,'wall')
        }
    }

    //Create moving trunk
    trunk = this.physics.add.sprite(450, 350, "trunk");
    trunk.setScale(0.2)
    trunk.setVelocity(0,50)
    trunk.body.immovable = true; // Make it so tanks cannot move the trunk

    //player initialization
    player = playerInit(this);

    //creating variables for controlling the keyboard keys (cursors) and the pointer (pointer)
    cursors = this.input.keyboard.createCursorKeys();
    pointer = this.input.activePointer;
    bulletwallcollider = this.physics.add.collider(bulletgroup,walls)
   // this.sys.canvas.style.cursor = 'none' //If you want to hide cursor
  }
  




  function update () {

    updatevar +=1; // The game updates 60 times per second, meaning that when we divide the update var by 60, we get one update per second.
    timevar +=1;  // Follow up how long the game has been on
    timeText.setText('Time: '+Math.round((timevar/60)*100)/100)

    if (updatevar==(Math.round(speedupvar*60)+2)) { //Handles how often enemies spawn
        
        speedupvar = speedupvar-0.1; //Speedupvar is used to speed up the spawning of enemies (every time enemy spawns the next enemy will spawn 0.1 seconds sooner)
        if (speedupvar<1) {
            speedupvar = 1 //At the end enemies spawn once per second
        }
        spawnlocation = randomGridLocation();
        enemygroup.createEnemy(spawnlocation[0],spawnlocation[1],this)
        updatevar=1; //Reset the updatevar
    }


    if ((timevar/60)%15== 0) { //Create powerups and extra healths every 15 seconds
        //powerup creation
        powerup = new Powerup(this,0,0,'pup1');
        var randindex = Math.floor(Math.random()*3)+1 // Random index between 1-3 to get a powerup
        powerup.powerupind = randindex;
        spawnlocation = randomGridLocation();
        powerup.create(spawnlocation[0],spawnlocation[1],this)  
        this.physics.add.collider(powerup,player,randomPower,null,this)


        //health creation
        spawnlocation2 = randomGridLocation();
        healthup = new Powerup(this,0,0,'Healthsingle');
        healthup.createHealth(spawnlocation2[0],spawnlocation2[1],this)  
        this.physics.add.collider(healthup,player,healUp,null,this)
    }

    //The angle of the players turret and your cursor
    angle = Phaser.Math.Angle.BetweenPoints(playerturret,pointer)+90
    //Movement of the turret:
    moveTurret(this,angle)
    moveTank(this)
   
    //Movement of the trunk
    if(trunk.y<100) {
        trunk.setVelocity(0,100)
    }else if(trunk.y>600) {
        trunk.setVelocity(0,-100)
    }
    
    trunk.x = 450 // So the trunk will not move in x-axis direction

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
    
    //Movement and collisions
    enemygroup.moveEnemy(player,this)
    this.physics.collide(player,walls)
    
    this.physics.collide(player,trunk)
    this.physics.collide(trunk,bulletgroup)
    this.physics.collide(enemygroup,trunk)

    this.physics.collide(player,enemygroup)
    this.physics.collide(bulletgroup,player)
    this.physics.collide(enemygroup,walls)
    this.physics.collide(enemygroup,player)
    this.physics.collide(enemygroup,bulletgroup)
    

  }

  function randomGridLocation() { //Function to generate random spawnpoints for the enemies,powerups and healths
    let locationmat = [50,150,250,350,450,550,650,750] // Vector for spawnpoints of the powerups
    let randlocindx = Math.floor(Math.random()*8) //Random index of the locationmat
    let randlocindy = Math.floor(Math.random()*8)
    let spawnlocation = [locationmat[randlocindx],locationmat[randlocindy]]
    return spawnlocation;
  }


  
 
  