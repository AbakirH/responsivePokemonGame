    let whichpoke = '';
    let enemyPoke = '';
    let rand = Math.floor(Math.random() * 600);
    let pokeURL = 'http://pokeapi.co/api/v2/pokemon/' + whichpoke;
    let moveURL = 'http://pokeapi.co/api/v2/move/' + rand;
    let gamescreen = 0;
    let run = 0;
    let sixPoke = true;


    let switch5 = 'yes';
    let switch4 = 'yes';

    let switch1;
    let switch2;

    let pokesimulator1;
    let pokesimulator2;


    let shadowP;
    let shadowW;
    let shadowH;
    let shadowPH;

    let shadowP2;
    let shadowPH2;

    let elem = document.getElementById("sketch-holder");

    //Health Bar 
    let a;
    let b;

    //determines if their is more than six pokemon
    let cool = 0;

    //The components of the pokemon objects
    let HP = '';
    let HP_E = '';
    let name = '';
    let nameE = '';
    let sprite = '';
    let sprite1 = '';
    let spriteE = '';
    let move1 = '';
    let move2 = '';
    let move3 = '';
    let move4 = '';
    let power1 = '';
    let power2 = '';
    let power3 = '';
    let power4 = '';
    let canvas;

    let switch6 = "false";

    function Pokemon(Name, Type, figure, maxHP, hp, move1, power1, move2,
        power2, move3, power3, move4, power4) {
        this.Name = Name;
        this.Type = Type;
        this.figure = figure;
        this.maxHP = maxHP;
        this.hp = hp;
        this.move1 = move1;
        this.power1 = power1;
        this.move2 = move2;
        this.power2 = power2;
        this.move3 = move3;
        this.power3 = power3;
        this.move4 = move4;
        this.power4 = power4
    }

    function EnemyPokemon(Name, Type, figure, maxHP, hp, move1, power1, move2,
        power2, move3, power3, move4, power4) {
        this.Name = Name;
        this.Type = Type;
        this.figure = figure;
        this.maxHP = maxHP;
        this.hp = hp;
        this.move1 = move1;
        this.power1 = power1;
        this.move2 = move2;
        this.power2 = power2;
        this.move3 = move3;
        this.power3 = power3;
        this.move4 = move4;
        this.power4 = power4
    }

    let pokemons = [];
    let enemyPokemons = [];
    let pic;

    function setup() {
        pic = loadImage('battle.jpg');
        canvas = createCanvas(windowWidth, windowHeight);
        canvas.parent('sketch-holder');

        if (windowWidth > 1500 ){
            shadowP = 13.3;
            shadowW = 150;
            shadowH = 50;
            shadowPH = 1.18;

            shadowPH2 = 6;
            shadowP2 = 1.15;
            
        } else if(windowWidth > 1000 ){
            shadowP = 11;
            shadowW = 200;
            shadowH = 75;
            shadowPH = 1.2;

            shadowPH2 = 5;
            shadowP2 = 1.1;
        }else if(windowWidth > 350 ){
            shadowP =  8;
            shadowW = 250;
            shadowH = 100;
            shadowPH = 1.1;

            shadowPH2 = 9.5;
            shadowP2 = 1.15;
        }
        
    }

    function draw() {


        background(pic);
        if (run == 0) {

            initScreen();
            chooseThatPoke();
        }
        pokebattle();

        if(windowHeight > 600 && windowWidth < 1000){
            shadowP = 8;
            shadowPH2 = 10;  

            shadowW = 250;
            shadowH = 100;  
            shadowPH = 1.15; 
            
        }else if(windowHeight > 300 && windowWidth < 1000){
            shadowP = 8.5;
            shadowPH2 = 2.75;
            shadowPH = 1.25;

            shadowW = 200;
            shadowH = 75;
            
        }
        
        

        
    }

    function initScreen() {
        if (gamescreen == 0) {
            fill('white');
            textAlign(CENTER);
            textSize(50);
            text('Pokemon Battle' + '\n' + 'Simulator', width / 2, height / 2);
            fill('white');

            textSize(40);
            text('Click To Play', width / 2, height / 2 + height / 3.2);
        }
    }

    function chooseThatPoke() {
        if (gamescreen == 1) {
            background('grey');
            $('#search').append(`<h1 id='instruction'>Choose Your Six Pokemon</h1>
                <input id='whichpoke' placeholder='Pokemon'/>
                <button onclick='addpoke(); addEnemyPoke(); '>Search!</button>
                <button onclick='battle(); fullScreen();'>Start!</button>`);
            run++;
        }
    }

    function addpoke() {

        whichpoke = document.getElementById('whichpoke').value;
        pokeURL = 'https://pokeapi.co/api/v2/pokemon/' + whichpoke + '/';
        if (cool == 0) {
            fetch(pokeURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                    sprite = data.sprites.front_default;
                    sprite1 = data.sprites.back_default;
                    HP = data.stats[5].base_stat;
                    HP = HP * 4;
                    moveA();
                })
                .catch(function() {
                    $('#search').append(`
                    <div class='modal' id='error' role='dialog'>
                    <div class=' modal-dialog'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <div class='modal-content'>
                                    <div class='modal-header'>
                                        <button type='button' class='close' data-dismiss='modal'>&times;</button>
                                        <h4 class='modal-title'> Unable to find the indicated pokemon. Please recheck the spelling of the inputted text or number.</h4>
                                    </div>
                                    <div class='modal-footer'>
                                        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `);
                    $('#error').modal('show');
                    $('.modal-backdrop').remove();
                });
        } else if (cool == 1) {
            alert('You can not have more than six pokemon');
        }
    }

    function addEnemyPoke() {
        enemyPoke = Math.floor(Math.random() * 600);
        pokeURL = 'https://pokeapi.co/api/v2/pokemon/' + enemyPoke + '/';
        fetch(pokeURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (newdata) {
                    nameE = newdata.name.charAt(0).toUpperCase() + newdata.name.slice(1);
                    spriteE = newdata.sprites.front_default;
                    HP_E = newdata.stats[5].base_stat;
                    HP_E = HP_E * 4;
                })
                .catch(function() {
                    addEnemyPoke();
                });
    }

    function moveA() {
        rand = Math.floor(Math.random() * 600);
        moveURL = 'https://pokeapi.co/api/v2/move/' + rand + '/';
        fetch(moveURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            move1 = data.name;
            power1 = data.power;
            moveB();
        });

    }

    function moveB() {
        rand = Math.floor(Math.random() * 600);
        moveURL = 'https://pokeapi.co/api/v2/move/' + rand + '/';
        fetch(moveURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            move2 = data.name;
            power2 = data.power;
            moveC();
        });

    }

    function moveC() {
        rand = Math.floor(Math.random() * 600);
        moveURL = 'https://pokeapi.co/api/v2/move/' + rand + '/';
        fetch(moveURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            move3 = data.name;
            power3 = data.power;
            moveD();
        });

    }

    function moveD() {
        rand = Math.floor(Math.random() * 600);
        moveURL = 'https://pokeapi.co/api/v2/move/' + rand + '/';
        fetch(moveURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            move4 = data.name;
            power4 = data.power;
                if (pokemons.length < 6) {
                    pokemons.push(new Pokemon(name, 'grass', sprite1, HP, HP, move1, power1, move2,
                        power2, move3, power3, move4, power4));
                    pokesimulator1 = pokemons[0];


                }
                if (enemyPokemons.length < 6) {
                    enemyPokemons.push(new EnemyPokemon(nameE, 'grass', spriteE, HP_E, HP_E, move1, power1, move2,
                        power2, move3, power3, move4, power4));
                    pokesimulator2 = enemyPokemons[0];
                    poke(data);
                }

        });


    }

    function poke(data) {
        console.log(cool);
        console.log(pokemons.length + ' ' + enemyPokemons.length);
        if (pokemons.length <= 6) {
            $('#pic').append(`<img class='pic' data-toggle='modal' data-target='#${name}' src= '${sprite}'>`);
            makeModel();
            console.log('True');
            if (pokemons.length == 6) {
                cool = 1;
                console.log('changed');
            }
        }


    }

    function makeModel() {
        $('#pic').append(`
        <div class='modal fade' id='${name}' role='dialog'>
            <div class=' modal-dialog'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <button type='button' class='close' data-dismiss='modal'>&times;</button>
                                <h4 class='modal-title'>Name: ${name}</h4>
                            </div>
                            <div class='modal-body'>
                                <p>HP: ${HP_E}</p>
                                <p>Move 1: ${move1}</p>
                                <p>Move 2: ${move2}</p>
                                <p>Move 3: ${move3}</p>
                                <p>Move 4: ${move4}</p>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);
    }

    function battle() {
        if (pokemons.length < 6) {
            alert('You need six pokemons to go into battle.');
        } else if (pokemons.length == 6) {
            gamescreen++;
        }
    }

    function pokebattle() {
        if (gamescreen == 2) {

            $('#search').empty();
            $('#pic').empty();
            document.getElementById('moves').style.zIndex = '1';
            background('#a3c2c2');

            fill('#C0C0C0');
            ellipse(windowWidth / shadowP, windowHeight / shadowPH, shadowW, shadowH); //shadowx    

            fill('#C0C0C0');
            ellipse(windowWidth / shadowP2, windowHeight / shadowPH2, shadowW, shadowH); //shadow
            

            $('#pic').append(
                
                `<div id="bottom">
                    <div id="userinfo">
                        <div id="userpoke">
                            <img  class = "battlePic" class="stop" src= '${pokesimulator1.figure}'>
                            
                        </div>
                    
                        <div id="healthbox">
                        
                                <h1> ${pokesimulator1.Name} </h1>
                                <div id="maxhealth">
                                    <div style="width:${((((pokesimulator1.hp) / pokesimulator1.maxHP) * 100))}px;" id="health">
                                    </div>
                                </div>
                                <h1> HP: ${pokesimulator1.hp} </h1>
                        </div>
                    </div>
                    <div id = "history">
                    </div>
                </div>
                
                `
            );
            
            $('#search').append(
                `<div id="Euserinfo">
                    <div id="Ehealthbox">
                            <h1> ${pokesimulator2.Name} </h1>
                            <div id="Emaxhealth">
                                <div style="width:${((((pokesimulator2.hp) / pokesimulator2.maxHP) * 100))}px;" id="health">
                                </div>
                            </div>
                            <h1> HP: ${pokesimulator2.hp} </h1>
                    </div>
                    

                    <div id"Euserpoke">
                        <img class = "battlePic" src= '${pokesimulator2.figure}'>
                    </div>
                
                 </div>`
            );

            moves(); 
            check();
            
        }
    }

    function check() {
        for (let i = 0; i < pokemons.length; i++) {
            if (pokemons[i].hp <= 0) {
                pokemons[i].hp = 0;
                pokemons.splice(i, 1);
                console.log(pokemons);
                pokesimulator1 = pokemons[i];
                switch5 = 'yes';
                document.getElementById("health").style.width = `100px`;
            }
            if (pokemons.length == 0) {
                fill('white');
                rect(0, 0, windowWidth, windowHeight);
                fill('black');
                textAlign(CENTER);
                textSize(20);
                text("All your Pokemon's have fainted", windowWidth/2, windowHeight/2);
                noLoop();
            }
        }
        for (let j = 0; j < enemyPokemons.length; j++) {
            if (enemyPokemons[j].hp <= 0) {
                enemyPokemons[j].hp = 0;
                enemyPokemons.splice(j, 1);
                console.log(enemyPokemons);
                pokesimulator2 = enemyPokemons[j];
            }
            if (enemyPokemons.length == 0) {
                fill('white');
                rect(0, 0, windowWidth, windowHeight);
                fill('black');
                textAlign(CENTER);
                textSize(20);
                text("All your Opponent's pokemon have fainted", windowWidth/2, windowHeight/2);
                noLoop();
            }

        }
    }

    function mousePressed() {
        if (gamescreen == 0) {
            if (mouseX >= width - width + 20 && mouseX <= width - 30 && mouseY >= height / 2 + height / 4 && mouseY <= height / 2 + height / 4 + 100) {
                gamescreen++;
            }
        }
    }

    function windowResized() {
        canvas = resizeCanvas(windowWidth, windowHeight);
    }
    

    function moves(){
        if(switch5 == 'yes'){
            document.getElementById('moves').innerHTML ='';
            document.getElementById('moves').style.backgroundColor = "red";
            $('#moves').append(
                
                `   <h1> Moves: </h1>
                    <div id="userMoves">
                    <button onclick='calculate(0)' class='move' >${pokesimulator1.move1}</button>
                    <button onclick='calculate(1)' class='move'>${pokesimulator1.move2}</button>
                    <button onclick='calculate(2)' class='move'>${pokesimulator1.move3}</button>
                    <button onclick='calculate(3)' class='move'>${pokesimulator1.move4}</button>
                    </div>
                `
                );
                switch5 = 'no';
                
        }
    }


    function calculate(num){

        if(document.getElementsByClassName('move')[num].innerHTML == `${pokesimulator1.move1}`){
            

            pokesimulator1.hp = pokesimulator1.hp - Math.floor(random(0, pokesimulator2.power1)); 
            pokesimulator2.hp = pokesimulator2.hp - Math.floor(random(0, pokesimulator1.power1)); 


        }else if(document.getElementsByClassName('move')[num].innerHTML == `${pokesimulator1.move2}`){
    

            pokesimulator1.hp = pokesimulator1.hp - Math.floor(random(0, pokesimulator2.power2)); 
            pokesimulator2.hp = pokesimulator2.hp - Math.floor(random(0, pokesimulator1.power2)); 

        }else if(document.getElementsByClassName('move')[num].innerHTML == `${pokesimulator1.move3}`){
            
            pokesimulator1.hp = pokesimulator1.hp - Math.floor(random(0, pokesimulator2.power3)); 
            pokesimulator2.hp = pokesimulator2.hp - Math.floor(random(0, pokesimulator1.power3)); 
        }else if(document.getElementsByClassName('move')[num].innerHTML == `${pokesimulator1.move4}`){

            pokesimulator1.hp = pokesimulator1.hp - Math.floor(random(0, pokesimulator2.power4)); 
            pokesimulator2.hp = pokesimulator2.hp - Math.floor(random(0, pokesimulator1.power4)); 
        }
       

}
function fullScreen(){

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
 
    document.addEventListener('fullscreenchange', (event) => {
        // document.fullscreenElement will point to the element that
        // is in fullscreen mode if there is one. If there isn't one,
        // the value of the property is null.
        if (!document.fullscreenElement) {
            $('#sketch-holder').append(`
                <div class='modal' id='fix' role='dialog'>
                    <div class=' modal-dialog'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <div class='modal-content'>
                                    <div class='modal-header'>
                                        <button type='button' class='close' data-dismiss='modal'>&times;</button>
                                        <h4 class='modal-title'> Functionality Alert</h4>
                                    </div> 
                                    <div class='modal-body'>
                                        <p>You need to be in fullscreen for the game to work as excepted, otherwise press the quit button!</p>
                                    </div>
                                    <div class='modal-footer'>
                                        <button type='button' class='btn btn-default' data-dismiss='modal' onclick='fullScreen();'>FullScreen</button>
                                        <button type='button' class='btn btn-default' data-dismiss='modal'>Quit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            $('#fix').modal('show');
            $('.modal-backdrop').remove();
        } 
      });
}
