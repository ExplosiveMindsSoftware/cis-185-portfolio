window.addEventListener ('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width=800;
    canvas.width=720;

    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                console.log(e.key);
                if(e.key === 'ArrowDown' && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                console.log(e.keys, this.keys);
            });

            window.addEventListener('keyup', e => {
                if(e.key === 'ArrowDown'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            console.log(e.keys, this.keys);
            });
        }
    }

    class Player {

    }

    class Background {

    }

    class Enemy {

    }

    function handleEnemies(){

    }

    function displayStatusText(){

    }

    const input = new InputHandler();
});