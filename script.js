window.onload = function()
{
    var canvas;
    var ctx;
    var delay = 1000;
    var xCoord = 0;
    var yCoord = 0; 
    init();

    function init() {
    canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 500;
    canvas.style.border = "1px solid";
    // création du canvas
    document.body.appendChild(canvas);
    // canvas accroché sur la page HTML
    ctx = canvas.getContext('2d');
    //retourne un contexte de dessin 
    refreshCanvas();

    }

    function refreshCanvas() {
        xCoord += 2;
        yCoord += 2;
        ctx.clearRect(0,0, canvas.height, canvas.width);
        ctx.fillStyle = "#ff0000";
        // attribut fillStyle spécifie la couleur
        ctx.fillRect(xCoord, yCoord, 100, 50);
        // fillRect dessine un rectangle plein aux coordonnées (x, y)
        setTimeout(refreshCanvas, delay);
    }
}
