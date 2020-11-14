function game_over_animation () {
    game_over_animation_delay = 1
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(game_over_animation_delay)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(200)
}
function blink_food () {
    led.toggle(food_x, food_y)
}
input.onButtonPressed(Button.A, function () {
    dir = normalize(dir - 1, 3)
})
function normalize (coordinate: number, max: number) {
    if (coordinate < 0) {
        return max
    } else if (coordinate > max) {
        return 0
    } else {
        return coordinate
    }
}
input.onButtonPressed(Button.B, function () {
    dir = normalize(dir + 1, 3)
})
function move () {
    x = tail_x[0]
    y = tail_y[0]
    x = normalize(x + dir_x[dir], grid_size)
    y = normalize(y + dir_y[dir], grid_size)
    if (check_for_tail_collision(x, y)) {
        game_over_animation()
        control.reset()
    }
    tail_x.unshift(x)
    tail_y.unshift(y)
    led.plot(x, y)
    if (food_x == x && food_y == y) {
        food_is_not_placed = 1
        while (food_is_not_placed) {
            food_x = randint(0, grid_size)
            food_y = randint(0, grid_size)
            food_is_not_placed = check_for_tail_collision(food_x, food_y)
        }
        led.plot(food_x, food_y)
        food_consumed = 0
    } else {
        led.unplot(tail_x.pop(), tail_y.pop())
    }
}
/**
 * return 1 on collision
 */
function check_for_tail_collision (vx: number, vy: number) {
    for (let index = 0; index <= tail_x.length; index++) {
        if (vx == tail_x[index] && vy == tail_y[index]) {
            return 1
        }
    }
    return 0
}
let t_blink = 0
let t_move = 0
let t_max = 0
let t = 0
let food_is_not_placed = 0
let y = 0
let x = 0
let food_y = 0
let food_x = 0
let game_over_animation_delay = 0
let tail_y: number[] = []
let tail_x: number[] = []
let food_consumed = 0
let grid_size = 0
let dir = 0
let dir_y: number[] = []
let dir_x: number[] = []
dir_x = [0, 1, 0, -1]
dir_y = [-1, 0, 1, 0]
dir = 0
grid_size = 4
food_consumed = 1
tail_x = [2, 2]
tail_y = [3, 4]
led.plot(tail_x[0], tail_y[0])
led.plot(tail_x[1], tail_y[1])
basic.forever(function () {
    t = 0
    t_max = 10000
    t_move = 100
    t_blink = 120
    while (true) {
        if (t_move == t) {
            t_move = t_move + 120
            move()
        }
        if (t_blink == t) {
            t_blink = t_blink + 80
            blink_food()
        }
        basic.pause(1)
        t = t + 1
        if (t == t_max) {
            t = 0
            t_move = t_move - t_max
            t_blink = t_blink - t_max
        }
    }
})
