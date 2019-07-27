function animate(elem, yShift, xShift, animSpeed) {
    /*
        elem        element to move
        yShift      pixels to move Y (negative value moves up)
        xShift      pixels to move X (negative value moves left)
        animSpeed   low number = high framerate, low speed
                    high number = high speed, low framerate
    */
    if (yShift == 0 && xShift == 0) {  // void if no move requested
        return false;
    }

    // obtain start and end positions
    var y = parseInt(window.getComputedStyle(elem).top);
    var x = parseInt(window.getComputedStyle(elem).left);
    var yEnd = y + yShift;
    var xEnd = x + xShift;

    // calculate steps required for animation
    var stepsRaw, steps;
    if (Math.abs(yShift) >= Math.abs(xShift)) {
        steps = Math.abs(Math.floor(yShift / animSpeed));
    }
    else {
        steps = Math.abs(Math.floor(xShift / animSpeed));
    }
    // proportional changes in Y and X position per step
    var yStep = yShift / steps;
    var xStep = xShift / steps;

    // run animation
    var frameCount = 0;  // step counter
    animDo();
    function animDo() {
        if (frameCount < steps) {
            y += yStep;
            x += xStep;
            frameCount++;
        }
        elem.style.top = y + "px";
        elem.style.left = x + "px";
        window.requestAnimationFrame(animDo);  // repeat until frameCount == steps
    }
    return true;
}
