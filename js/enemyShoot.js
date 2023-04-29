AFRAME.registerComponent("enemy-shoot",{
    init: function(){
        setInterval(this.shootEnemyFireBall, 2000)
    },
    shootEnemyFireBall: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");
        console.log(els)
        for (var i = 0; i < els.length; i++) {

            //enemyFireBall entity
            var enemyFireBall = document.createElement("a-entity");

            enemyFireBall.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.5,
            });

            enemyFireBall.setAttribute("material", {src: "./color-smoke-abstract-wallpaper-aesthetic-background-design.jpg"});

            var position = els[i].getAttribute("position")

            enemyFireBall.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyFireBall);

            //Three.js Vector Variables
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;
            
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            var direction = new THREE.Vector3();
            direction.subVectors(position1,position2).normalize();

            enemyFireBall.setAttribute("velocity", direction.multiplyScalar(5));

            enemyFireBall.setAttribute("dynamic-body", {
                shape: "sphere",
                mass:0,
            });

            var el = document.querySelector("#countLife");
            var playerLife = parseInt(el.getAttribute("text").value);

            enemyFireBall.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if(playerLife > 0){
                        playerLife -= 1
                        el.setAttribute("text", {value: playerLife});
                    }
                    if(playerLife <= 0){
                        var gameOverTxt = document.querySelector("#over");
                        gameOverTxt.setAttribute("visible", true);

                        var Els = document.querySelectorAll(".enemy");
                        for(var i=0; i<Els.length; i++){
                            scene.removeChild(Els[i])
                        };
                    }


                }
            });

        }
    },
})