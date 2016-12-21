var NR_OF_GLITCHED_CANVASES = 7;
var DELAY_BETWEEN_FRAMES = 60;

var DELAY_BETWEEN_GLITCHES_MINIMUM = 5000;
var DELAY_BETWEEN_GLITCHES_MAXIMUM = 15000;

var TEXT_ELEMENT = null;
var TEXT_NORMAL = null;
var TEXT_GLITCHED = null;

var rendered_canvases = 0;
var times_rendered = 0;
var glitched_canvases = Array();
var curr_canvas = null;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render_glitches() {
    if (curr_canvas != null) {
        document.body.removeChild(curr_canvas);
    }
    if ((0 < glitched_canvases.length) && (rendered_canvases < glitched_canvases.length)) {
        curr_canvas = glitched_canvases[rendered_canvases];
        document.body.insertBefore(curr_canvas, document.body.firstChild);
        rendered_canvases++;
        setTimeout(render_glitches, DELAY_BETWEEN_FRAMES);
        
        TEXT_ELEMENT.innerHTML = TEXT_GLITCHED;
    } else {
        if (rendered_canvases >= glitched_canvases.length) {
            times_rendered++;
            rendered_canvases = 0;
        }
        
        setTimeout(render_glitches, getRandomInt(DELAY_BETWEEN_GLITCHES_MINIMUM, DELAY_BETWEEN_GLITCHES_MAXIMUM));
        curr_canvas = null;
            
        TEXT_ELEMENT.innerHTML = TEXT_NORMAL;
    }
}

window.onload = function() {
    TEXT_ELEMENT = document.getElementById("text");
    TEXT_NORMAL = TEXT_ELEMENT.getAttribute("data-text-normal");
    TEXT_GLITCHED = TEXT_ELEMENT.getAttribute("data-text-glitched");
    
    for (var i = 0; i < NR_OF_GLITCHED_CANVASES; ++i) {
        glitch(document.body, {
            amount: i,
            complete: function(canvas) {
                glitched_canvases.push(canvas);
                canvas.style.position = "absolute";
                canvas.style.top = 0;
                canvas.style.left = 0;
            }
        });
    }
    render_glitches();
};