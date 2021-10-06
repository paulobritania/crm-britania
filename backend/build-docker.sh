#!/bin/bash
#Autor: Vinicius Santiago
#Description: Build images docker

#Docker login
cat /mnt/c/Users/vinicius.santiago/my_password.txt | docker login --username viniquartz --password-stdin

#Exemplo
#accounts-svc
#cd /mnt/c/Users/vinicius.santiago/Documents/1-PROJETOS/Britania/backend/packages/accounts-svc
#docker build . -t viniquartz/viniquartz:accounts

#front
#cd /mnt/c/Users/vinicius.santiago/Documents/1-PROJETOS/Britania/front
#docker build . -t viniquartz/viniquartz:front

#docker push viniquartz/viniquartz:accounts

