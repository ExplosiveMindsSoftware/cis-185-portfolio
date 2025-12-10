window.addEventListener ('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width=800;
    canvas.height=720;

    //Initializes an array to store enemies
    let enemies = [];

    //Initializes score and game over flag
    let score = 0;
    let gameOver = false;

    //Class to handle player input
    class InputHandler {
        constructor(){
            //Initializes an array to store keys
            this.keys = [];
            // Track if music has started
            this.musicStarted = false;

            //Event listener for keydown
            window.addEventListener('keydown', e => {

                //If statement to start music on first key press
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

            // Store game dimensions
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            
            //Load player sprites
            this.runImage = document.getElementById('playerRun');
            this.jumpImage = document.getElementById('playerJump');
            
            // Start with Running
            this.image = this.runImage;
            
            //Auto-calculates dimensions based on sprite sheet
            //Run has 8 frames, Jump has 10 frames
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

            //Animation control
            this.maxFrame = 7;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
        }

        //Draw function for player
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

        //Update function for player
        update(input, deltaTime) {

            enemies.forEach(enemy => {
                //Pythagoras Theorem to check distance between circle centers
                const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
                const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If distance is smaller than both radii combined -> Collision!
                if (distance < enemy.width/2 + this.width/2){
                    gameOver = true;
                }
            });
            //Animation Timer
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            //Controls
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 30;
            } else {
                this.speed = 0;
            }

            //Physics
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

            this.y += this.vy;
            
            //State Switching (Run vs Jump)
            if (!this.onGround()) {

                //Jumping
                this.vy += this.weight;
                
                // Switch to Jump Image & Dimensions
                this.image = this.jumpImage;
                this.width = this.jumpWidth; 
                this.maxFrame = 9; // Jump has 10 frames (0-9)
                
            } else {

                //Running
                this.vy = 0;
                
                // Switch to Run Image & Dimensions
                this.image = this.runImage;
                this.width = this.runWidth; 
                this.maxFrame = 7; // Run has 8 frames (0-7)
                
                this.y = this.gameHeight - this.height;
            }
        }

        //onGround function to check if player is on the ground
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }

    //Background class for scrolling background
    class Background {
        constructor(gameWidth, gameHeight){

            //Store game dimensions
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('background');
            this.x = 0;
            this.y = 0;
            this.width = 800;
            this.height = 720;
            this.speed = 10;
        }

            //Draw function for background
            draw(context){
                context.drawImage(this.image, this.x, this.y, this.width, this.height);
                context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
            }

            //Update function for background
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
            
            //Autocalculates dimensions based on sprite sheet
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

        //Draw function for enemy
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

        //Update function for enemy
        update(deltaTime){
            //Animation timer
            if(this.frameTimer > this.frameInterval){
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            
            //Movement
            this.x -= this.speed;
            
            //Garbage collection
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
                score++;
            }
        }
    }

    //Function to handle enemies
    function handleEnemies(deltaTime){

        //If statement to add enemies at random intervals
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } 
        
        else {
            enemyTimer += deltaTime;
        }

        //Draw and update each enemy
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });

        //Remove enemies that are marked for deletion
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }

    //Function to display score and game over text
    function displayStatusText(context){
        //Draw score
        context.fillStyle = 'black';
        context.font = '40px Helvetica';
        context.fillText('Score: ' + score, 20, 50);
        
        // White "Shadow" for text
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, 22, 52);

        //Draw game over message
        if (gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('GAME OVER: The One Piece wasn\'t real!', canvas.width/2, 200);
            context.fillStyle = 'white';
            context.fillText('GAME OVER: The One Piece wasn\'t real!', canvas.width/2 + 2, 202);
        }
    }

    //Function to play background music
    function playMusic() {
        backgroundMusic.play();
    }

    //Initialize input handler, player, background, and music
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const backgroundMusic = document.getElementById('backgroundMusic');

    //Animation loop variables
    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 2000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    //Start background music
    playMusic();

    //Animate function to handle game loop
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

        //Continue animation loop if game is not over
       if(!gameOver) requestAnimationFrame(animate);

       //Stops the music when the game is over and plays a game over sound
       else{
        const music = document.getElementById('backgroundMusic');
           if(music) music.pause();
        const gameOverSound = new Audio('sounds/gameOverSound.mp3');
        gameOverSound.play();
       }
    }

    //Start the animation loop
    animate(0);

});