#!/bin/bash

cd .. && git checkout main && git pull origin main && cd builder && python build_backend.py

