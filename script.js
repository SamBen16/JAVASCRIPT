window.onload = function()
{
    var canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 500;
    canvas.style.border = "1px solid";
    // création du canvas
    document.body.appendChild(canvas);
    // canvas accroché sur la page HTML

    var ctx = canvas.getContext('2d');
    //retourne un contexte de dessin 
    ctx.fillStyle = "#ff0000";
    // attribut fillStyle spécifie la couleur
    ctx.fillRect(30,30, 100, 50);
    // fillRect dessine un rectangle plein aux coordonnées (x, y)
}

