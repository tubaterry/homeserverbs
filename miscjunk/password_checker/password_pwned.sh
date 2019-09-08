#!/bin/bash

#Example:
#p@55w0rd
#ce0b2b771f7d468c0141918daea704e0e5ad45db

#Speed up grep by making cases match
echo "Password to check: "
HASH=`read -s; echo -n $REPLY | shasum | cut -d" " -f1 | tr '[:lower:]' '[:upper:]'`
SHORTHASH=`echo $HASH | cut -b1-5`
HASHSUFFIX=`echo $HASH | cut -b6-`

SUFFIXMATCH=`curl -s -B "https://api.pwnedpasswords.com/range/${SHORTHASH}" | grep $HASHSUFFIX | tr -d '[:cntrl:]' | cut -d":" -f2`
if [ "$SUFFIXMATCH" == "" ]; then
  echo "Password not found in pwned database."
else
  echo "There were $SUFFIXMATCH matches for this password"
fi
