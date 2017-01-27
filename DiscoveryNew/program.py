import discovery_bot
from discovery_bot import Movement
from discovery_bot import Servo
from discovery_bot import Ultrasound
from discovery_bot import Light
from discovery_bot import Infrared
from discovery_bot import Button
from discovery_bot import Buzzer
import time
robot = Movement()
red = Light(discovery_bot.pins.LED_RED)
blue = Light(discovery_bot.pins.LED_BLUE)
green = Light(discovery_bot.pins.LED_GREEN)
buzzer = Buzzer()
b = Button()
usound = Ultrasound()
buzzer.on();
time.sleep(1 )
buzzer.off()
