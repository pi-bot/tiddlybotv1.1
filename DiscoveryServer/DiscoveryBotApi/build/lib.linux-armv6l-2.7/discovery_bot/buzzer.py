import sys, time, threading, signal, atexit

import pins

try:
    import thread
except ImportError:
    import _thread as thread

import RPi.GPIO as GPIO

class Pin(object):
    type = 'Pin'

    def __init__(self, pin):
        self.pin = pin
        self.last = self.read()
        self.handle_change = False
        self.handle_high = False
        self.handle_low = False

    def has_changed(self):
        if self.read() != self.last:
            self.last = self.read()
            return True
        return False

    def is_off(self):
        return self.read() == 0

    def is_on(self):
        return self.read() == 1

    def read(self):
        return GPIO.input(self.pin)

    def stop(self):
        return True

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        pass

    is_high = is_on
    is_low = is_off
    get = read


class Output(Pin):

    type = 'Output'

    def __init__(self, pin):
        GPIO.setup(pin, GPIO.OUT, initial=0)
        super(Output,self).__init__(pin)
        self.gpio_pwm = GPIO.PWM(pin,1)

        self.pulser = Pulse(self,0,0,0,0)
        self.blinking = False
        self.pulsing = False
        self.fader = None

    ## Fades an LED to a specific brightness over a specific time
    def fade(self,start,end,duration):
        self.stop()
        time_start = time.time()
        self.pwm(PULSE_FREQUENCY,start)
        def _fade():
            if time.time() - time_start >= duration:
                self.duty_cycle(end)
                return False
            
            current = (time.time() - time_start) / duration
            brightness = start + (float(end-start) * current)
            self.duty_cycle(round(brightness))
            time.sleep(0.1)
            
        self.fader = AsyncWorker(_fade)
        self.fader.start()
        return True

    ## Blinks an LED by working out the correct PWM frequency/duty cycle
    #  @param self Object pointer.
    #  @param on Time the LED should stay at 100%/on
    #  @param off Time the LED should stay at 0%/off
    def blink(self,on=1,off=-1):
        if off == -1:
            off = on

        off = float(off)
        on = float(on)

        total = off + on

        duty_cycle = 100.0 * (on/total)

        # Stop the thread that's pulsing the LED
        if self.pulsing:
            self.stop_pulse();

        # Use pure PWM blinking, because threads are fugly
        if self.blinking:
            self.frequency(1.0/total)
            self.duty_cycle(duty_cycle)
        else:
            self.pwm(1.0/total,duty_cycle)
            self.blinking = True

        return True
    
    ## Pulses an LED
    #  @param self Object pointer.
    #  @param transition_on Time the transition from 0% to 100% brightness should take
    #  @param transition_off Time the trantition from 100% to 0% brightness should take
    #  @param time_on Time the LED should stay at 100% brightness
    #  @param time_off Time the LED should stay at 0% brightness
    def pulse(self,transition_on=None,transition_off=None,time_on=None,time_off=None):
        # This needs a thread to handle the fade in and out

        # Attempt to cascade parameters
        # pulse() = pulse(0.5,0.5,0.5,0.5)
        # pulse(0.5,1.0) = pulse(0.5,1.0,0.5,0.5)
        # pulse(0.5,1.0,1.0) = pulse(0.5,1.0,1.0,1.0)
        # pulse(0.5,1.0,1.0,0.5) = -

        if transition_on == None:
            transition_on = 0.5
        if transition_off == None:
            transition_off = transition_on
        if time_on == None:
            time_on = transition_on
        if time_off == None:
            time_off = transition_on

        # Fire up PWM if it's not running
        if self.blinking == False:
            self.pwm(PULSE_FREQUENCY,0.0)

        # pulse(x,y,0,0) is basically just a regular blink
        # only fire up a thread if we really need it
        if transition_on == 0 and transition_off == 0:
            self.blink(time_on,time_off)
        else:
            self.pulser.time_on = time_on
            self.pulser.time_off = time_off
            self.pulser.transition_on = transition_on
            self.pulser.transition_off = transition_off
            self.pulser.start() # Kick off the pulse thread
            self.pulsing = True

        self.blinking = True

        return True

    def pwm(self,freq,duty_cycle = 50):
        self.gpio_pwm.ChangeDutyCycle(duty_cycle)
        self.gpio_pwm.ChangeFrequency(freq)
        self.gpio_pwm.start(duty_cycle)
        return True

    def frequency(self,freq):
        self.gpio_pwm.ChangeFrequency(freq)
        return True

    def duty_cycle(self,duty_cycle):
        self.gpio_pwm.ChangeDutyCycle(duty_cycle)
        return True

    ## Stops the pulsing thread
    def stop(self):
        if self.fader != None:
            self.fader.stop()

        self.blinking = False
        self.stop_pulse()

        # Abruptly stopping PWM is a bad idea
        # unless we're writing a 1 or 0
        # So don't inherit the parent classes
        # stop() since weird bugs happen

        # Threaded PWM access was aborting with
        # no errors when stop coincided with a
        # duty cycle change.
        return True

    ## Stops the pulsing thread
    #  @param self Object pointer.
    def stop_pulse(self):
        self.pulsing = False
        self.pulser.stop()
        self.pulser = Pulse(self,0,0,0,0)

    def write(self,value):
        blinking = self.blinking

        self.stop()

        self.duty_cycle(100)
        self.gpio_pwm.stop()

        # Some gymnastics here to fix a bug ( in RPi.GPIO?)
        # That occurs when trying to output(1) immediately
        # after stopping the PWM

        # A small delay is needed. Ugly, but it works
        if blinking and value == 1:
            time.sleep(0.02)

        GPIO.output(self.pin,value)

        return True

    ## Turns an Output on
    #  @param self Object pointer.
    #
    #  Includes handling of pulsing/blinking functions
    #  which must be stopped before turning on
    def on(self):
        self.write(1)
        return True

    ## Turns an Output off
    #  @param self Object pointer.
    #
    #  Includes handling of pulsing/blinking functions
    #  which must be stopped before turning off
    def off(self):
        self.write(0)
        return True

    # Alias on/off to conventional names
    high = on
    low  = off

    def toggle(self):
        if( self.blinking ):
            self.write(0)
            return True

        if( self.read() == 1 ):
            self.write(0)
        else:
            self.write(1)
        return True


class Buzzer(Output):

    type = 'Buzzer'

    def __init__(self,pin):
        self._melody = None
        super(Buzzer,self).__init__(pin)

    def buzz(self,frequency):
        self.pwm(frequency,30)

    # Play a single note, mathmatically
    # deduced from its index, offset from 440Hz
    def note(self,note):
        note = float(note)
        a = pow(2.0, 1.0/12.0)
        f = 440.00 * pow(a,note)
        self.buzz(f)
        return True

    # Example sound effects
    def success(self):
        # Repeat the last note to extend its duration
        self.melody([0,1,2,3,3,3,3,3],0.2,False)
        return True

    def fail(self):
        # Repeat the last note to extend its duration
        self.melody([5,4,3,2,1,1,1,1,1],0.2,False)
        return True

    def melody(self,notes,duration = 0.5,loop = True):
        self.stop()
        time_start = time.time()
        is_notation = False

        if notes[0] == 'N':
            is_notation = True
            notes.pop(0)

        if duration <= 0.0001:
            raise ValueError('Duration must be greater than 0.0001')

        if len(notes) == 0:
            raise ValueError('You must provide at least one note')

        # Get the total length of the tune
        # so we can play it!
        total = len(notes) * duration

        def melody():

            now = time.time() - time_start
            
            # Play only once if loop is false
            if loop == False and int(now / total) > 0:
                self._stop_buzzer()
                return False

            # Figure out how far we are into the current iteration
            # Then divide by duration to find the current note index
            delta = round( (now % total) / duration )
            
            # Select the note from the notes array
            note = notes[int(delta)-1]
            
            
            if is_notation:
                # this note and above would be OVER NINE THOUSAND Hz!
                # Treat it as an explicit pitch instead
                if note == 0:
                    self._stop_buzzer()
                else:
                    pibrella.buzzer.buzz(note)
            else:
                if note == '-':
                    self._stop_buzzer()
                else:
                    # Play the note
                    pibrella.buzzer.note(note)
    
            # Sleep a bit
            time.sleep(0.0001)

        self._melody = AsyncWorker(melody)
        self.fps = 100
        self._melody.start()

    def alarm(self):

        # Play all notes from -30 to 30
        # with a note duration of 0.01sec
        # and, boom, we have an alarm!
        self.melody(range(-30,30),0.01)

    def notes(self,notation,speed=0.5):
        import re

        # Constant of about 1.0594
        N = pow( 2.0, (1.0/12.0) )

        # Table of notes, no support for flats YET
        note_key = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']

        # Split our notation into individual notes
        notes = notation.split(' ')

        # print notes

        # Set up a list for our parsed output
        parsed = ['N']

        # Step through each note in turn
        for note in notes:

            # Split out the note and duration components
            detail = note.split(':')
            if len(detail) == 2:
                # We have a note and a duration
                note = detail[0]
                dur = int(detail[1])
            else:
                # We have just a note, so duration is 1 beat
                note = detail[0]
                dur = 1

            # Now try to match an octave
            octave = re.findall(r'\d+', note)

            # If we can't find one, default to octave 5
            if len(octave) == 0:
                octave = 5.0
            else:
                note = note.replace(octave[0],'')
                octave = float(octave[0])

            # If the note is a rest, turn off for that duration
            if note == 'R':
                for _ in range(dur):
                    parsed.append(0) # Frequency of 0 ( off )
            else:
            # Otherwise, calculate the pitch of the note from A1 at 55Hz
                note_index = float(note_key.index( note ))

                # Pitch of the note itself is  1.0594 ^ note_index
                pitch = 55.000 * pow( N, note_index )

                # Then we shift up 2 to the power of the octave index -1
                pitch = round( pitch  * pow( 2, ( octave - 1 ) ) ,3)

                for _ in range(dur):
                    parsed.append(pitch)

        self.melody(parsed,speed)

    def _stop_buzzer(self):
        self.duty_cycle(100)
        self.gpio_pwm.stop()

        time.sleep(0.02)

        GPIO.output(self.pin,0)

    def stop(self):
        if self._melody != None:
            self._melody.stop()

        self._stop_buzzer()

        return super(Buzzer,self).stop()


buzzer = Buzzer(pins.BUZZER)
buzzer.alarm()
time.sleep(2)
buzzer.stop()
