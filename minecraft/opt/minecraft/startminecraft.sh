#!/bin/bash

MINECRAFT_LOC=/opt/minecraft

DL_PAGE="https://minecraft.net/en-us/download/server"
DL_KEYWORD="launcher.mojang"

if ! [ `pwd` == ${MINECRAFT_LOC} ]; then
  cd $MINECRAFT_LOC
fi

if ! [ `pwd` == ${MINECRAFT_LOC} ]; then
  echo "Quitting because for some reason these two are still not exact matches: "
  pwd
  echo $MINECRAFT_LOC
  echo "Fix MINECRAFT_LOC in /opt/minecraft/startminecraft.sh"
  exit 1
fi

#Minecraft is stored in an S3 bucket
CURRENT_LINK=`curl -s $DL_PAGE | grep "$DL_KEYWORD" | cut -d'"' -f2`
CURRENT_VER=`echo $CURRENT_LINK | rev | cut -d'/' -f 4 | rev`
INSTALLED_VER=`find . -name 'server-*.jar' -printf '%f' | cut -d"-" -f 2 | sed -e s/.jar//`

if [ "${INSTALLED_VER}" == "${CURRENT_VER}" ]; then
  echo "Version already matching"
else
  echo "Local version out of date, updating $INSTALLED_VER to $CURRENT_VER"
  for old_jar in `find . -name 'minecraft_server*.jar' | cut -c 3-`; do
    echo $old_jar
    mv $old_jar old-$old_jar
  done
  curl -s -o $MINECRAFT_LOC/server-$CURRENT_VER.jar $CURRENT_LINK
  rm old-minecraft_server*
  INSTALLED_VER=$CURRENT_VER
fi

java -Xmx3G -Xms3G -jar server-$INSTALLED_VER.jar nogui
