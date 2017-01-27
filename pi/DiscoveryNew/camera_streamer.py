import os
import time

CAMERA_PATH='./raspberry_pi_camera_streamer' 


class Camera(object):

    def __init__(self, camera_path=CAMERA_PATH):
        self.camera_path = camera_path

        if not self._camera_started():
            self.start()

    def start(self):
        os.system('sudo {}  > cam.log &'.format(self.camera_path))

    def stop(self):
        camera_name = os.path.split(self.camera_path)[1]
        os.system('sudo killall {}'.format(camera_name))

    def _camera_started(self):
        cam_name = os.path.split(self.camera_path)[1]
        return cam_name in os.popen('ps -u root').read()


#cam = Camera()
#time.sleep(2)
#cam.stop()
