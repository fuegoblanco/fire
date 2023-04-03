var aspect = 1.75
var $controller = $('#controller')

function handleResize() {
    var w = window.innerWidth, h = window.innerHeight

    if (w / h > aspect) {
        w = h * aspect
        $controller.css('transform', 'scale(' + (h / 280) + ')')
    }
    else {
        h = w / aspect
        $controller.css('transform', 'scale(' + (w / 490) + ')')
    }

    $controller.css({
        left: 0.5 * (window.innerWidth - w) + 'px',
        top: 0.5 * (window.innerHeight - h) + 'px',
    })
}


handleResize()
window.addEventListener('resize', handleResize)
window.addEventListener('orientationchange', handleResize)


var $dpad_buttons = $('.dpad:not(.dpad-center)')
var $other_buttons = $('.buttons-container .button')

$dpad_buttons
.on('mousedown touchstart', function (event) {
    // $dpad_buttons.removeClass('active')
    $(this).addClass('active')
})

$other_buttons
.on('mousedown touchstart', function (event) {
    // $other_buttons.removeClass('active')
    $(this).addClass('active')
})

$('body')
.on('mouseup touchend', function (event) {
    $dpad_buttons.removeClass('active')
    $other_buttons.removeClass('active')
})

var music = true,
    sound = true

$('.button-music').click(function (event) {
    if (music = !music) {
        $controller.removeClass('music-off').addClass('music-on')
    }
    else {
        $controller.removeClass('music-on').addClass('music-off')
    }
})

$('.button-sound').click(function (event) {
    if (sound = !sound) {
        $controller.removeClass('sound-off').addClass('sound-on')
    }
    else {
        $controller.removeClass('sound-on').addClass('sound-off')
    }
})