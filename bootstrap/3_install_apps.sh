#!/usr/bin/env bash

kubectl apply -f storage/shared-storage.yaml
kubectl apply -f apps/transmission.yaml
kubectl apply -f apps/plex.yaml
