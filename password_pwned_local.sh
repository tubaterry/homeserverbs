#!/bin/bash

#Example:
#p@55w0rd
#ce0b2b771f7d468c0141918daea704e0e5ad45db

#pwned-passwords-ordered-2.0.txt
HASH_DATABASE=pwned-passwords-ordered-2.0.txt
#HASH_DATABASE=/main/torrents/downloads/pwned-passwords-ordered-2.0.txt.7z

#Speed up grep by making cases match
echo -n "Password to check: "
HASH=`read -s; echo -n $REPLY | shasum | cut -d" " -f1 | tr '[:lower:]' '[:upper:]'`

grep $HASH $HASH_DATABASE
