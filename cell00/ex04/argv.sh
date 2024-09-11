#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    index=0
    for arg in $@; do
        if [ $index -lt 3 ]; then
            echo $arg
            ((index++))
        fi
    done
fi