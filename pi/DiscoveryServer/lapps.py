#!/usr/bin/python

import os, os.path
import random
import string
import json

class Lapps():
    PROGRAM_PATH = '/home/frazer/Downloads/DiscoveryServer/apps/'    

    def __init__(self, filename):
	self.filename = filename
	self.file = open(self.PROGRAM_PATH + filename, 'wr+')

    def read(self):
	
	output = {}

	if os.path.splitext(self.filename)[1] == ".xml":
	    output['from_blockly'] = True
	elif os.path.splitext(self.filename)[1] == ".py":
	    output['from_blockly'] = False

	output['id'] = self.filename

	output['name'] = os.path.splitext(self.filename)[0]

	output['comment'] = 'NA'

	output['author'] = 'AGILIC'

	output['py_code'] = self.file.read()
	print("##############################################################")
	print(self.file.read())
	print("##############################################################")
	
	return output

    def write(self, code):
	self.file.write(code)
	self.file.close()

    def delete(self):
	return
        
