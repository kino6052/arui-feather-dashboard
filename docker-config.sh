#!/bin/bash

SET_COLOR_MAIN="\033[1;35m"
SET_COLOR_SUCCESS="\033[0;32m"
SET_COLOR_DARK="\033[1;30m"
SET_COLOR_NC="\033[0m"

SHOW_MESSAGE_START="echo -e \nУстановка конфигурации ..."
SHOW_MESSAGE_FINISH="echo -e \n${SET_COLOR_SUCCESS}Установка завершена!${SET_COLOR_NC}\n"

OFFSET_PTRN="${SET_COLOR_DARK}\n∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵\n${SET_COLOR_NC}"

function SHOW_MESSAGE_START() {
    echo -e "\nУстановка конфигурации \"$1\" ..."
}

function SHOW_MESSAGE_FINISH() {
    echo -e "\n${SET_COLOR_SUCCESS}Установка завершена!${SET_COLOR_NC}\n${OFFSET_PTRN}"
}

function UNSET_CURRENT_CONFIG() {
    rm -rf Dockerfile Dockerfile-build docker-build.sh
}

function SET_CONFIG() {
    UNSET_CURRENT_CONFIG
    SHOW_MESSAGE_START $2
    cp -a docker/$1/. .
    SHOW_MESSAGE_FINISH
}

echo -e "${OFFSET_PTRN}\n${SET_COLOR_MAIN}Docker${SET_COLOR_NC} ${SET_COLOR_DARK}|${SET_COLOR_NC} Выберите конфигурацию сборки контейнера:\n"

PS3="Ваш выбор: "
QUIT="Отмена"
options=("Стандарт" "Без build-контейнера")
select opt in "${options[@]}"
do
    case $opt in
        "Стандарт")
            SET_CONFIG standard $opt
            break
            ;;
        "Без build-контейнера")
            SET_CONFIG no-bc $opt
            break
            ;;
        *) echo "Некорректная опция";;
    esac
done