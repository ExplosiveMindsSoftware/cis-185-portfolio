window.addEventListener ('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width=800;
    canvas.height=720;

    let enemies = [];
    let score = 0;
    let gameOver = false;

    //Class to handle player input
    class InputHandler {
        constructor(){
            this.keys = [];
            // Track if music has started
            this.musicStarted = false;
            window.addEventListener('keydown', e => {
                if (!this.musicStarted) {
                    const music = document.getElementById('backgroundMusic');
                    if(music) music.play();
                    this.musicStarted = true;
                }
                console.log(e.key);
                if((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                console.log(e.keys, this.keys);
            });

            window.addEventListener('keyup', e => {
                if( e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    //Class to handle the player
    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            
            // 1. Load Both Images
            this.runImage = document.getElementById('playerRun');
            this.jumpImage = document.getElementById('playerJump');
            
            // Start with Running
            this.image = this.runImage;
            
            // 2. Auto-Calculate Widths (Computer does the math!)
            // Run has 8 frames, Jump has 10 frames
            this.runWidth = this.runImage.width / 8;
            this.jumpWidth = this.jumpImage.width / 10;
            
            this.width = this.runWidth; 
            this.height = 65;
            
            this.x = 0;
            this.y = this.gameHeight - this.height;
            
            this.frameX = 0;
            this.frameY = 0;
            
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;

            this.maxFrame = 7;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
        }

        draw(context) {
            context.drawImage(
                this.image,
                this.frameX * this.width, // Source X
                0, // Source Y
                this.width, this.height, 
                this.x, this.y, 
                this.width, this.height 
            );
        }

        update(input, deltaTime) {

            enemies.forEach(enemy => {
                // Pythagoras Theorem to check distance between circle centers
                const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
                const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If distance is smaller than both radii combined -> Collision!
                if (distance < enemy.width/2 + this.width/2){
                    gameOver = true;
                }
            });
            // ANIMATION TIMER
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            // CONTROLS
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 30;
            } else {
                this.speed = 0;
            }

            // PHYSICS
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

            this.y += this.vy;
            
            // STATE SWITCHING (Run vs Jump)
            if (!this.onGround()) {
                // --- JUMPING ---
                this.vy += this.weight;
                
                // Switch to Jump Image & Dimensions
                this.image = this.jumpImage;
                this.width = this.jumpWidth; 
                this.maxFrame = 9; // Jump has 10 frames (0-9)
                
            } else {
                // --- RUNNING ---
                this.vy = 0;
                
                // Switch to Run Image & Dimensions
                this.image = this.runImage;
                this.width = this.runWidth; 
                this.maxFrame = 7; // Run has 8 frames (0-7)
                
                this.y = this.gameHeight - this.height;
            }
        }

        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('background');
            this.x = 0;
            this.y = 0;
            this.width = 800;
            this.height = 720;
            this.speed = 10;
        }
            draw(context){
                context.drawImage(this.image, this.x, this.y, this.width, this.height);
                context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
            }

            update(){
                this.x -= this.speed;
                if(this.x < 0 - this.width) this.x = 0;
            }
    }

    //Class for creating enemies
    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            
            this.image = document.getElementById('NavyEnemy');
            
            // --- FIX 1: AUTO-CALCULATE SIZE ---
            // The image has 3 frames, so we divide total width by 3
            this.width = this.image.width / 3; 
            this.height = this.image.height;
            
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            
            this.frameX = 0;
            this.maxFrame = 2; // 3 frames total (indices 0, 1, 2)
            
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            
            this.speed = 8;
            this.markedForDeletion = false;
        }

        draw(context){
            context.drawImage(
                this.image, 
                this.frameX * this.width, 
                0,
                this.width, this.height, 
                this.x, this.y, 
                this.width, this.height
            );
        }

        update(deltaTime){
            // ANIMATION TIMER
            if(this.frameTimer > this.frameInterval){
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            
            // MOVEMENT
            this.x -= this.speed;
            
            // GARBAGE COLLECTION
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
                score++;
            }
        }
    }

    //Function to handle enemies
    function handleEnemies(deltaTime){
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } 
        
        else {
            enemyTimer += deltaTime;
        }

        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });

        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }

    function displayStatusText(context){
        // 1. Draw Score
        context.fillStyle = 'black';
        context.font = '40px Helvetica';
        context.fillText('Score: ' + score, 20, 50);
        
        // White "Shadow" for text
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, 22, 52);

        // 2. Draw Game Over Message
        if (gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('GAME OVER: The One Piece wasn\'t real!', canvas.width/2, 200);
            context.fillStyle = 'white';
            context.fillText('GAME OVER: The One Piece wasn\'t real!', canvas.width/2 + 2, 202);
        }
    }

    function playMusic() {
        backgroundMusic.play();
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const backgroundMusic = document.getElementById('backgroundMusic');

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 2000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    playMusic();

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        background.draw(ctx);
        background.update();

        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);

        displayStatusText(ctx);

       if(!gameOver) requestAnimationFrame(animate);

       //Stops the music when the game is over and plays a game over sound
       else{
        const music = document.getElementById('backgroundMusic');
           if(music) music.pause();
        const gameOverSound = new Audio('sounds/gameOverSound.mp3');
        gameOverSound.play();
       }
    }

    animate(0);

});