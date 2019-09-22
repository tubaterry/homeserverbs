#!/usr/bin/env bash

# Really we should be using something like Vault to do this "right" but I don't have infinite RAM on this box
# Still, we're at least gonna follow good patterns - don't store secrets in yer dang text files.

# We really should test that this is an interactive shell first.
echo "Setting necessary secrets values based on local input."


# secrets/transmission-user.yaml
echo "Transmission username: "
read TRANSMISSION_USER
echo "Transmission password: "
read TRANSMISSION_PASSWORD

cp secrets/transmission-user.yaml secrets/transmission-user.yaml-active
sed -i "s/REPLACEME_TRANSMISSION_USER/${TRANSMISSION_USER}/" secrets/transmission-user.yaml-active
sed -i "s/REPLACEME_TRANSMISSION_PASSWORD/${TRANSMISSION_PASSWORD}/" secrets/transmission-user.yaml-active
kubectl apply -f secrets/transmission-user.yaml-active
rm secrets/transmission-user.yaml-active

echo "If you need to get this secret in the future, run:"
echo "kubectl get secret transmission-user"
echo "Then base64 decode the password and username fields"
