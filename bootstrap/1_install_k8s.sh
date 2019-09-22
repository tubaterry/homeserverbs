#!/usr/bin/env bash



PATH="${PATH}:/snap/bin"

snap refresh
snap install microk8s --classic
usermod -a -G microk8s chris
snap alias microk8s.kubectl kubectl
microk8s.status --wait-ready
microk8s.kubectl config view --raw > /tmp/kube.config
echo "don't forget to grab kube.config from /tmp"
for package in `cat microk8s-packages.list`; do
  microk8s.enable ${package}
  microk8s.status --wait-ready
done
snap install helm
snap install docker
microk8s.status --wait-ready


echo "access the dashboard with this token:"
token=$(microk8s.kubectl -n kube-system get secret | grep default-token | cut -d " " -f1)
microk8s.kubectl -n kube-system describe secret $token

# Istio go
microk8s.kubectl label namespace default istio-injection=enabled
microk8s.kubectl label namespace kube-system istio-injection=enabled

microk8s.status --wait-ready
APISERVER_FILE=/var/snap/microk8s/current/args/kube-apiserver
grep service-node-port-range ${APISERVER_FILE}
SUCCESS=$?
if [ ${SUCCESS} -eq 1 ]; then
  echo "--service-node-port-range=80-65535" >> ${APISERVER_FILE}
fi
microk8s.stop
microk8s.start
microk8s.status --wait-ready
