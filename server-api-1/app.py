#!/usr/bin/env python3
import os
from application import create_app
from flask_restful import Api

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0')