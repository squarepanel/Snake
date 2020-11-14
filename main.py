def blink_food():
    led.toggle(food_x, food_y)

def on_button_pressed_a():
    global dir2
    dir2 = normalize(dir2 - 1, 3)
input.on_button_pressed(Button.A, on_button_pressed_a)

def normalize(coordinate: number, max: number):
    if coordinate < 0:
        return max
    elif coordinate > max:
        return 0
    else:
        return coordinate

def on_button_pressed_b():
    global dir2
    dir2 = normalize(dir2 + 1, 3)
input.on_button_pressed(Button.B, on_button_pressed_b)

def move():
    global food_x, food_y, food_consumed, x, y
    if food_consumed == 1:
        food_x = randint(0, grid_size)
        food_y = randint(0, grid_size)
        led.plot(food_x, food_y)
        food_consumed = 0
    led.unplot(x, y)
    x = normalize(x + dir_x[dir2], grid_size)
    y = normalize(y + dir_y[dir2], grid_size)
    led.plot(x, y)
    if food_x == x and food_y == y:
        food_consumed = 1
t_blink = 0
t_move = 0
t_max = 0
t = 0
food_y = 0
food_x = 0
tail_x: List[number] = []
food_consumed = 0
grid_size = 0
dir2 = 0
y = 0
x = 0
dir_y: List[number] = []
dir_x: List[number] = []
dir_x = [0, 1, 0, -1]
dir_y = [-1, 0, 1, 0]
x = 2
y = 3
led.plot(x, y)
dir2 = 0
grid_size = 4
food_consumed = 1
tail_x.append(x)
tail_y: List[number] = []
tail_y.append(y)

def on_forever():
    global t, t_max, t_move, t_blink
    t = 0
    t_max = 10000
    t_move = 100
    t_blink = 120
    while True:
        if t_move == t:
            t_move = t_move + 120
            move()
        if t_blink == t:
            t_blink = t_blink + 80
            blink_food()
        basic.pause(1)
        t = t + 1
        if t == t_max:
            t = 0
            t_move = t_move - t_max
            t_blink = t_blink - t_max
basic.forever(on_forever)
