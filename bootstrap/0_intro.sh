#!/usr/bin/env bash

xargs -a apt-packages.list -r -- sudo apt-get -y install

# lvcreate -L 1T vg0 -n k8s-storage /dev/md0
# mkfs.ext4 /dev/vg0/k8s-storage
# blkid -o value /dev/vg0/k8s-storage | head -n1
# storageid=`blkid -o value /dev/vg0/k8s-storage | head -n1`
# echo "UUID=${storageid}"
