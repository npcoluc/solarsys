#!/bin/bash

set -Eeuo pipefail

export FLASK_APP=app.py
flask run --port=8001 &
