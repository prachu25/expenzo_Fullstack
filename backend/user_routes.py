from flask import request, jsonify
from app import app
from db import db
import re


# REGISTER USER API----------------------
@app.route("/register", methods=["POST"])
def reggister_user():
    data = request.json

    password = data["password"]

    # PASSWORD VALIDATION
    if len(password) < 6:

        return jsonify({
            "error": "Password must be at least 6 characters"
        }), 400
    
    # SPECIAL CHARACTER VALIDATION
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):

        return jsonify({
            "error": "Password must contain at least one special character"
        }), 400
    
    # CHECK THE USER ALREADY EXITS
    exiting_user = db.users.find_one({
        "email": data["email"]
    })

    if exiting_user:
        return jsonify({
            "error": "User already exists"
        }),400
    


    
    # USER DATA-------------------------------------
    user = {
        "userid":data["userid"],
        "username":data["username"],
        "email":data["email"],
        "password": password,

        "phone":data["phone"],
        "country":data["country"],
        "profession": data.get("profession", "")
    }

    # INSRTED USER
    db.users.insert_one(user)

    return jsonify({
        "messages": "User Registerd Successfully"
    })







# LOGIN API--------------------------------
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    user = db.users.find_one({
        "email":data["email"],
        "password":data["password"]
    })

    if not user:
        return jsonify({
            "error": "Invalid Email or Password"
        }), 401
    
    return jsonify({
        "message": "Login Successful",
        "user": {

        "username": user["username"],
        "profession": user["profession"]

    }
    })



