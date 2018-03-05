#!/bin/bash

#Let's get dependencies

#This assumes you're on Ubuntu.  And root.

if ! [ ${EUID} -eq 0]; then
  echo "be root first."
  exit 1
fi

#Change to 8 if minecraft starts having the shits
#Don't forget to change the startup script to point to the specific java version too
apt-get -y install openjdk-9-jre screen

mkdir -p /opt/minecraft
adduser --system --shell /bin/bash --home /opt/minecraft --group minecraft


cp minecraft/opt/minecraft/startminecraft.sh /opt/minecraft/
cp minecraft/etc/systemd/system/minecraft-server.service /etc/systemd/system/minecraft-server.service

systemctl daemon-reload
systemctl enable minecraft

#You really should actually read this.
echo "eula=true" > /opt/minecraft/eula.txt
chown -R minecraft:minecraft /opt/minecraft

echo "Run as root 'systemctl start minecraft' to begin"
