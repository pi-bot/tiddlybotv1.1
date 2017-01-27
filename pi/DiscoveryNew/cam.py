from discovery_bot import Servo
from discovery_bot import pins

s1 = Servo(1)
s2 = Servo(2)
x  = 0

while True:
    x = x + 1
    if x > 90:
        x = 0

    s1.set(x)
    s2.set(x)
