#!/bin/bash

/etc/init.d/hostapd restart
/sbin/ifdown wlan0
/sbin/ifup wlan0
/etc/init.d/udhcpd restart
