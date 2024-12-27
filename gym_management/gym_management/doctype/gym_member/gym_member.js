// Copyright (c) 2024, sanku ram sodhi and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Gym Member", {
// 	refresh(frm) {

// 	},
// });
 // Function to fetch customer profile data and update the page
function fetchCustomerProfile() {
    // Use the Fetch API to get data from the server
    fetch('http://127.0.0.1:5000/api/method/your_app.customer_profile.get_customer_profile')
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
            // Dynamically update the page with customer data
            document.getElementById('active_plan').innerText = data.active_plan || 'N/A';
            document.getElementById('trainer_name').innerText = data.trainer_name || 'No trainer assigned';
            document.getElementById('trainer_contact').innerText = data.trainer_contact || 'N/A';
            document.getElementById('profile_picture').src = data.profile_picture || 'default.jpg';

            // Calculate End Date and Remaining Days
            let startDate = new Date(data.start_date); // Convert start date to Date object
            let endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 7); // Assuming the active plan is 7 days long, adjust as necessary

            // Format End Date to DD-MM-YYYY format
            let formattedEndDate = `${endDate.getDate().toString().padStart(2, '0')}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getFullYear()}`;

            // Calculate Remaining Days
            let today = new Date();
            let remainingTime = endDate - today; // Time difference in milliseconds
            let remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24)); // Convert to days

            // Update End Date and Remaining Days on the page
            document.getElementById('end_date').innerText = formattedEndDate || 'N/A';
            document.getElementById('remaining_days').innerText = (remainingDays > 0) ? `${remainingDays} days left` : 'Expired';

            // Update past plans
            const pastPlansList = document.getElementById('past_plans');
            pastPlansList.innerHTML = '';  // Clear previous list
            data.past_plans.forEach(plan => {
                let listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = `${plan.name} - Start Date: ${plan.start_date}`;
                pastPlansList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching customer profile:', error);
        });
}

// Call fetchCustomerProfile when the page is fully loaded
document.addEventListener('DOMContentLoaded', fetchCustomerProfile);
