import time
import RPi.GPIO as io
import pins

io.setmode(io.BCM)

for i in range(18):
     io.setup(i, io.IN)

for i in range(18):
    print( "Pin " + str(i) + " has value " + str(io.input(i)) )

while True:
    print( "Pin " + str(8) + " has value " + str(io.input(8)) )
