#!/bin/bash
base="https://docs.google.com/spreadsheets/d/e/2PACX-1vQsybM5HEFgzMK1M8JMI1JlIRWkoyM-TFEO2pjgq3gYUPHj7vHTxGqG1Tbn5SXHd1GCWVgD_j68Ewzn/pub"
curl -L "$base?output=csv" -o src/lib/data/roles.csv
curl -L "$base?gid=264311549&output=csv" -o src/lib/data/years.csv
curl -L "$base?gid=1879873008&output=csv" -o src/lib/data/size.csv
curl -L "$base?gid=742401031&output=csv" -o src/lib/data/orgs.csv