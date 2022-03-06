const audioGameOver = new Audio();
const captura = new Audio();
audioGameOver.src = 'sons/game_over.mp3';
captura.src = 'sons/captura.mp3';

var pont = document.querySelector("div.pontuacao p");
var qpont = 0;

window.onload = function(){
                
    
    var canvas = document.getElementById('stage');
    var ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush)
    setInterval(game, 90);
    
    pont.innerHTML = qpont;

    console.log(qpont);

    const vel = 1;

    var vx = vy = 0;//velocidade x e velocidade y
    var px = 10;
    var py = 15;
    var tp = 20;//tamanho da peça
    var qp = 30;//quantidade de peças
    var ax = ay = 15;//posição inicial da peça
    var init = false;
    var trail = [];//rastro da cobra

    tail = 5;

    function game(){
        px += vx;
        py += vy;
        if (px < 0){
            px = qp - 1;
        }
        if (px > qp -1){
            px = 0;
        }
        if (py < 0){
            py = qp -1;
        }
        if (py > qp-1){
            py = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp, ay*tp, tp,tp);

        ctx.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++){
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1,tp-1);
            if (trail[i].x == px && trail[i].y == py && init){
                audioGameOver.play();
                init = false;
                qpont = 0;
                atualizaPontuacao();
                vx = vy = 0;//game over
                px = 10;
                py = 15;
                tail = 5;
            }
        }

        trail.push({x:px,y:py})
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) {
            captura.play();
            ++qpont;
            atualizaPontuacao();
            console.log(qpont);
            tail++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
        }
    }

    function keyPush(event) {
        init = true;
        switch (event.keyCode) {
            case 37:// esquerda
                vx = -vel;
                vy = 0;
                break;
            case 38:// cima
                vx = 0;
                vy = -vel;
                break;
            case 39:// direita
                vx = vel;
                vy = 0;
                break;
            case 40:// baixo
                vx = 0;
                vy = vel;
                break;
        }
    }
}

function atualizaPontuacao(){
    pont.innerHTML = qpont;
}