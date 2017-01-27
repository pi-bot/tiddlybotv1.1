from servo import Servo
import pins
import time

class Movement():

    def __init__(self):
        self.left = Servo(pins.SERVO_LEFT_MOTOR)
        self.right = Servo(pins.SERVO_RIGHT_MOTOR)

    def normalize(self, val):
        scale = 0.5 / 100
        speed = val * scale

        if val >= 0:
            speed += 0.5

        return speed

    def forward(self, speed = 100):
        self.left.set_normalized(self.normalize(speed))
        self.right.set_normalized(self.normalize(-speed))

    def backward(self, speed = 100):
        self.left.set_normalized(self.normalize(-speed))
        self.right.set_normalized(self.normalize(speed))

    def turn_left(self, speed = 100):
        self.left.set_normalized(self.normalize(-speed))
        self.right.set_normalized(self.normalize(-speed))

    def turn_right(self, speed = 100):
        self.left.set_normalized(self.normalize(speed))
        self.right.set_normalized(self.normalize(speed))

    def stop(self):
        self.left.set_normalized(-1)
        self.right.set_normalized(-1)
