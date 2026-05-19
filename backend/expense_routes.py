from flask import request, jsonify
from app import app
from datetime import datetime
from db import db

from bson.objectid import ObjectId
from bson.errors import InvalidId



#ADD EXPENSES API----------------------------------------------------
@app.route("/add-expense", methods=["POST"])
def add_expense():
    data = request.json

    

    expense = {

    "title": data["title"],

    "amount": int(data["amount"]),

    "category": data["category"],

    "payment_method": data["payment_method"],

    "email": data["email"],

    "created_date": datetime.now().strftime("%d-%m-%Y"),

    "created_time": datetime.now().strftime("%I:%M %p")
    }

    db.expenses.insert_one(expense)

    return jsonify({
        "message": "Expense Added Succsessfully.."
    })



# GET ALL EXPENSES API ----------------------------------------------
@app.route("/get-expenses/<email>", methods=["GET"])
def get_expenses(email):

    expenses = list(

        db.expenses.find(

            {"email": email},

            {"email": 0}
        )
    )



    # CONVERT OBJECT ID TO STRING
    for expense in expenses:

        expense["_id"] = str(expense["_id"])



    return jsonify(expenses)









# DELETE API---------------------------------------------------------
@app.route("/delete-expense/<expenses_id>", methods=["DELETE"])
def delete_expenses(expenses_id):

    try:

        result = db.expenses.delete_one({

            "_id": ObjectId(expenses_id)
        })



        # IF ID NOT FOUND
        if result.deleted_count == 0:

            return jsonify({

                "error": "Expense Not Found"
            }), 404



        return jsonify({

            "message": "Expense Deleted Successfully"
        })



    except Exception as e:

        return jsonify({

            "error": "Invalid Expense ID"
        }), 400







# UPDATE API-------------------------------------------------------
@app.route("/modify-expense/<expenses_id>", methods=["PUT"])
def update_expenses(expenses_id):

    try:

        # CHECK VALID OBJECT ID
        object_id = ObjectId(expenses_id)

    except InvalidId:

        return jsonify({

            "error": "Invalid Expense ID"
        }), 400

    data = request.get_json()

    # IF NO DATA
    if not data:

        return jsonify({

            "error": "No data received"
        }), 400



 # CONVERT AMOUNT TO NUMBER
    if "amount" in data:

        data["amount"] = int(data["amount"])



    # UPDATE EXPENSE
    result = db.expenses.update_one(

        {"_id": object_id},

        {"$set": data}
    )


    # IF ID NOT FOUND
    if result.matched_count == 0:

        return jsonify({

            "error": "Expense Not Found"
        }), 404



    return jsonify({

        "message": "Expense Updated Successfully"
    })






# FILTER EXPENSES BY CATEGORY API----------------------------------------
@app.route("/filter-expenses/<category>/<email>", methods=["GET"])
def filter_expenses(category, email):

    expenses = list(

        db.expenses.find(

            {
                "category": category,
                "email": email
            },

            {"_id": 0}
        )
    )

    if not expenses:

        return jsonify({
            "message": "No expenses found"
        }), 404

    return jsonify(expenses)



# FILTER EXPENSES BY AMOUNT API-----------------------------------------
@app.route("/filter-amount/<int:amount>/<email>", methods=["GET"])
def filter_amount(amount, email):

    expenses = list(

        db.expenses.find(

            {
                "amount": amount,
                "email": email
            },

            {"_id": 0}
        )

    )

    if not expenses:

        return jsonify({
            "message": "No expenses found"
        }), 404

    return jsonify(expenses)



# FILTER GREATER THAN AMOUNT---------------------------------------------
@app.route("/greater-than/<int:amount>/<email>", methods=["GET"])
def greater_than(amount, email):

    expenses = list(

        db.expenses.find(

            {
                "amount": {"$gte": amount},
                "email": email
            },

            {"_id": 0}
        )

    )

    if not expenses:

        return jsonify({
            "message": "No expenses found"
        }), 404

    return jsonify(expenses)




# FILTER LESS THAN AMOUNT-----------------------------------------------
@app.route("/less-than/<int:amount>/<email>", methods=["GET"])
def less_than(amount, email):

    expenses = list(

        db.expenses.find(

            {
                "amount": {"$lte": amount},
                "email": email
            },

            {"_id": 0}
        )

    )

    if not expenses:

        return jsonify({
            "message": "No expenses found"
        }), 404

    return jsonify(expenses)
