#!/usr/bin/env bash

# Chances are this will have to run as root.

SOURCE_PV="/dev/sda2"
SOURCE_VG="/dev/vg0"
SOURCE_LV="root"

DEST_PV="/dev/md0"
DEST_VG="/dev/vg0"
DEST_LV="root_backup"
