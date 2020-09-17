#!/bin/bash

DATE=$(date '+%Y-%m-%d %H:%M')

CPU_IDLE=$(sar 0 | awk '{print $8}' | tail -n 1 | tr ',' '.')
CPU=$(echo 100 - $CPU_IDLE | bc)
CPU_METRIC="{date: new Date('$DATE'), value: $CPU, type: 'CPU'}"

MEM_USED=$(sar -r 0 | awk '{print $5}' | tail -n -1 | tr ',' '.')
MEM_METRIC="{date: new Date('$DATE'), value: $MEM_USED, type: 'MEM'}"

DISK_USED=$(sar -F 0 | awk '{print $4}' | head -4 | tail -1 | tr ',' '.')
DISK_METRIC="{date: new Date('$DATE'), value: $DISK_USED, type: 'DSK'}"

mongo metrics --eval "printjson(db.collection.insertMany([$CPU_METRIC,$MEM_METRIC,$DISK_METRIC]))"
