import os
import time
import pins

SERVOD_PATH='/home/pi/ServoBlaster1/user/servod'


class Servo(object):
    """A Servo instance controls a single servo

    Parameters
    ----------
    pin : int
        GPIO pin number the servo is connected to
    min : int
        Minimun pulse width (in 10s of us) servo responds to
    max : int
        Maximum pulse width (in 10s of us) servo responds to
    servod_path : str
        Path to the "servod" executable

    """

    def __init__(self, pin=0, range=(1000, 2000), servod_path=SERVOD_PATH):
        self.pin = pin
        self.range = range
        self.servod_path = servod_path

        if not self._servoblaster_started():
            self.start()

    def set(self, pulse_width):
        """
        Parameters
        ----------
        pulse_width : int
            pulse width to send to the servo measured in 10s of us
        """
        os.system('echo "{}={}" > /dev/servoblaster'.format(self.pin, pulse_width))

    # 0 = Backwards, 0.5 = Stopped, 1 = Forwards
    def set_normalized(self, val):
        min, max = self.range
        scale = max - min
        speed = min + int(val * scale)
        self.set(str(speed) + 'us')

    def start(self):
        os.system('sudo {}'.format(self.servod_path))

    def stop(self):
        servod_name = os.path.split(self.servod_path)[1]
        os.system('sudo killall {}'.format(servod_name))

    def _servoblaster_started(self):
        servod_name = os.path.split(self.servod_path)[1]
        return servod_name in os.popen('ps -u root').read()


#servo_left = Servo(pins.SERVO_LEFT_MOTOR)
#servo_right = Servo(pins.SERVO_RIGHT_MOTOR)

#servo_left.set_normalized(1)
#servo_right.set_normalized(1)

#time.sleep(1)

#servo_left.set_normalized(0.5)
#servo_right.set_normalized(0.5)

#servo_left.stop()
