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
});