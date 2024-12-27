# import frappe

# def get_context(context):
#     # Fetch customer-specific data
#     user_email = frappe.session.user
#     member = frappe.db.get_value('Gym Member', {'email': user_email}, '*')
    
#     if member:
#         context.active_plan = member.get('active_plan')
#         context.remaining_days = (member.get('end_date') - frappe.utils.today()).days
#         context.allocated_trainer = frappe.db.get_value('Gym Trainer Subscription', {'member': member.get('name')}, 'trainer_name')
#         context.past_plans = frappe.get_all('Gym Membership', filters={'member': member.get('name')}, fields=['name', 'start_date', 'end_date'])
        
# if frappe.session.user == "Guest":
#     frappe.throw("You need to log in to view this page.")
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/method/your_app.customer_profile.get_customer_profile', methods=['GET'])
def get_customer_profile():
    # Simulate fetching data from a database
    data = {
        "active_plan": "Gold Plan",
        "remaining_days": 15,
        "trainer_name": "John Doe",
        "trainer_contact": "+1234567890",
        "past_plans": [
            {"name": "Silver Plan", "start_date": "2024-11-01"},
            {"name": "Bronze Plan", "start_date": "2024-10-01"}
        ]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
