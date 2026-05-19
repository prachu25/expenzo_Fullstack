from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# IMPORT ROUTES
from expense_routes import *
from user_routes import *

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)