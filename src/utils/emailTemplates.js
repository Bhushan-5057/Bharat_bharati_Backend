export const appointmentConfirmationTemplate = (name, date, time, reason) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #e5e5e5;
    }
      .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header img {
      max-width: 150px;
    }
    h2 {
      color: #2c3e50;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
    .highlight {
      color: #e67e22;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
  <div class="header">
      <img src="cid:trustlogo" alt="Bharat Bharti Trust Logo"/>
    </div>
    <h2>Appointment Confirmation</h2>
    <p>Dear <b>${name}</b>,</p>
    <p>Your appointment is scheduled on <span class="highlight">${date}</span> at <span class="highlight">${time}</span>.</p>
    <p><b>Reason:</b> ${reason}</p>
    <p>Thank you for connecting with us!</p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Bharat Bharti Trust. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const newAppointmentNotificationTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
<style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #e5e5e5;
    }
      .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header img {
      max-width: 150px;
    }
    h2 {
      color: #2c3e50;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
    .highlight {
      color: #e67e22;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
   <div class="header">
      <img src="cid:trustlogo" alt="Bharat Bharti Trust Logo"/>
    </div>
    <h2>New Appointment Received</h2>
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Contact:</b> ${data.contact_number}</p>
    <p><b>Date & Time:</b> ${data.date} ${data.time}</p>
    <p><b>Reason:</b> ${data.reason_of_meeting}</p>
    <p><b>Expectation:</b> ${data.your_expectation}</p>
    <p><b>Details:</b> ${data.more_details}</p>
  </div>
</body>
</html>`;