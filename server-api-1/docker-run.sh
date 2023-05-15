#!/bin/bash
docker build -t server-test .
docker run -dp 8000:8000 server-test .