window.onload = function()
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var BlockSize = 30;
    var canvas;
    var ctx;
    var delay = 1000;
    var snakee;
    init();

    function init() {
    var canvas = document.createElement('canvas');
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    canvas.style.border = "1px solid";
    // création du canvas
    document.body.appendChild(canvas);
    // canvas accroché sur la page HTML
    ctx = canvas.getContext('2d');
    //retourne un contexte de dessin 
    snakee = new Snake([[6,4], [5, 4], [4,4]]);
    refreshCanvas();

    }

    function refreshCanvas() {
        ctx.clearRect(0,0, canvasHeight, canvasWidth);
        snakee.draw();
        snakee.advance();
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position){
            var x = position[0] * BlockSize;
            var y = position[1] * BlockSize;
            ctx.fillRect(x, y, BlockSize, BlockSize);
    }

    function Snake(body) {
        this.body = body;
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i = 0; i< this.body.length; i++){
                drawBlock(ctx, this.body[i])
            }
            ctx.restore();
        };
        this.advance = function() {
            var nextPosition = this.body[0].slice();
            nextPosition[0] ++;
            this.body.unshift(nextPosition);
            this.body.pop();
        }
    }
}
