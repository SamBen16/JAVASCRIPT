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
    var widthInBlocks = canvasWidth/BlockSize;
    var heightInBlocks = canvasHeight/BlockSize;
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
    snakee = new Snake([[6,4], [5, 4], [4,4], [3, 4]], "right");
    applee = new Apple([10, 10]);
    refreshCanvas();

    }

    function refreshCanvas() {
        snakee.advance();
        if(snakee.checkCollision())
        {
            //game over
        }
        else{
            if(snakee.isEatingApple(applee))
            {
                snakee.ateApple = true;
                do
                {
                // SERPENT A MANGE LA POMME
                applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee))
            }
            ctx.clearRect(0,0, canvasHeight, canvasWidth);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas, delay);
        }

    }

    function drawBlock(ctx, position){
            var x = position[0] * BlockSize;
            var y = position[1] * BlockSize;
            ctx.fillRect(x, y, BlockSize, BlockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
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
            if(!this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;
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
            this.checkCollision = function()
            {
                var wallCollision = false;
                // serpent se prend un mur
                var snakeCollision = false;
                // serpent tourne sur lui même
                var head = this.body[0];
                var rest = this.body.slice(1);
                var snakeX = head[0];
                var snakeY = head[1];
                var minX = 0;
                var minY = 0;
                var maxX = widthInBlocks - 1;
                var maxY = heightInBlocks -1;
                var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
                var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

                if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) 
                {
                    wallCollision = true;
                }

                for(var i = 0; i < rest.length; i++)
                {
                    if(snakeX === rest[i][0] && snakeY === rest[i][1] )
                    {
                        snakeCollision = true;
                    }
                }
                return wallCollision || snakeCollision;
            };
            this.isEatingApple = function(appleToEat)
            {
                var head = this.body[0];
                if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                    return true;    
                else
                    return false;
            }
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
            var x = this.position[0]*BlockSize + radius;
            var y = this.position[1]*BlockSize + radius; 
            ctx.arc(x,y, radius, 0, Math.PI+2, true);
            ctx.fill();
            ctx.restore();
        };
        this.setNewPosition = function()
        {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };
        this.isOnSnake = function(snakeToCheck)
        {
            var isOnSnake = false;
            for(var i = 0; i < snakeToCheck.body.length; i++)
            {
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
                {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
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
