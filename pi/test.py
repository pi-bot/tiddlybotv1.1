import RPi.GPIO as GPIO
import discovery_bot
import time

GPIO.setwarnings(False)

def leds():
    red = discovery_bot.Light(discovery_bot.pins.LED_RED)
    blue = discovery_bot.Light(discovery_bot.pins.LED_BLUE)
    green = discovery_bot.Light(discovery_bot.pins.LED_GREEN)

    red.off()
    blue.off()
    green.off()

    red.on()
    time.sleep(2)
    red.off()

    blue.on()
    time.sleep(2)
    blue.off()

    green.on()
    time.sleep(2)
    green.off()

def button():
    robot = discovery_bot.Button()

    while robot.button_pressed() == False:
        time.sleep(0.001)

    print("button press detected!")
    time.sleep(1)

def usound():
    for _ in range(5):
        u = discovery_bot.Ultrasound()
        print(u.read_normalized())
	time.sleep(1)

def ir():
    for _ in range(5):
        ir = discovery_bot.Infrared()
        if(ir.is_on_line):
            print("line detected!")
        else:
            print("no line detected!")
	time.sleep(1)

def buzzer():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(discovery_bot.pins.BUZZER, GPIO.OUT)
    GPIO.output(discovery_bot.pins.BUZZER, 1)
    time.sleep(1)
    GPIO.output(discovery_bot.pins.BUZZER, 0)

def servo():
    servo_left = discovery_bot.Servo(discovery_bot.pins.SERVO_LEFT_MOTOR)
    servo_right = discovery_bot.Servo(discovery_bot.pins.SERVO_RIGHT_MOTOR)
    #servo2 = discovery_bot.Servo(1)
    #servo3 = discovery_bot.Servo(2)

    servo_left.set_normalized(1)
    servo_right.set_normalized(1)

    time.sleep(1)

    servo_left.set_normalized(0.5)
    servo_right.set_normalized(0.5)

    servo_left.stop()

    #servo2.set(0)
    #servo3.set(0)

while True:

    print("running led test\n")
    leds()
    print("ending led test\n")

    print("running button test\n")
    button()
    print("ending button test\n")

    print("testing ultrasound\n")
    usound()
    print("ending usound test\n")

    print("running IR test\n")
    ir()
    print("ending IR test\n")

    print("running buzzer test\n")
    buzzer()
    print("ending buzzer test\n")

    print("running servo test\n")
    servo()
    print("ending servo test\n")
