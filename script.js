window.onload = function()
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var BlockSize = 30;
    var canvas;
    var ctx;
    var delay = 1000;
    var snakee;
    var applee;
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
    snakee = new Snake([[6,4], [5, 4], [4,4]], "right");
    applee = new Apple([10, 10]);
    refreshCanvas();

    }

    function refreshCanvas() {
        ctx.clearRect(0,0, canvasHeight, canvasWidth);
        snakee.draw();
        applee.draw();
        snakee.advance();
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position){
            var x = position[0] * BlockSize;
            var y = position[1] * BlockSize;
            ctx.fillRect(x, y, BlockSize, BlockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
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
            switch(this.direction){
                case "left":
                    nextPosition[0] --
                    // 0 on parle du x
                    break;
                case "right" :
                    nextPosition[0] ++
                    break;
                case "down":
                    nextPosition[1] ++
                    //1 on parle du y
                    break;
                case "up":
                    nextPosition[1] --
                    break;
                default:
                        throw("invalid direction");
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
            this.setDirection = function(newDirection) 
            {
                var allowdDirections;
                //directions permises
                switch(this.direction)
                {
                    case "left":
                    case "right":
                        allowdDirections = ["up", "down"];
                    case "down":
                    case "up":
                        allowdDirections =handleKeyDown ["left", "right"];
                    default:
                            throw("invalid direction");
                }
                if(allowdDirections.indexOf(newDirection) > -1) {
                    this.direction = newDirection;
                }
            };
    }

    function Apple(position)
    {
        this.position = position;
        this.draw = function() 
        {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = BlockSize*2;
            var x = position[0]*BlockSize + radius;
            var y = position[1]*BlockSize + radius; 
            ctx.arc(x,y, radius, 0, Math.PI+2, true);
            ctx.fill();
            ctx.restore();
        };
    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.event;
        var newDirection;
        switch(key){
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "left";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }
}
