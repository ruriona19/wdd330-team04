// Step 1: Create an Alert class to manage alert-related operations
class Alert {
  // Step 2: Initialize an empty array to store alert data
  constructor() {
    this.alertsData = [];
  }

  // Step 3: Asynchronously fetch alert data from the specified JSON file
  async AlertsDatafetch() {
    try {
      const response = await fetch("../json/alerts.json");
      // Step 4: Check if the response is successful
      if (response.ok) {
        // Step 5: Parse the JSON data and store it in the alertsData array
        this.alertsData = await response.json();
      }
    } catch (error) {
      // Step 6: Handle errors by setting alertsData to an empty array
      this.alertsData = [];
    }
  }

  editAlertMessage(type, message) {
    this.alertsData.forEach((alert) => {
      if (alert.type == type) {
        alert.message = message;
      }
    });
  }

  // Step 7: Create HTML elements for each alert and prepend them to the main element
  buildAlertElements(type) {
    // Step 8: Check if there are alerts to display
    if (this.alertsData.length === 0) {
      return; // No alerts, exit early
    }

    // Step 9: Create a new HTML section element to hold the alerts
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    // Step 10: Loop through each alert and create a <p> element for each in alertsDAta array
    this.alertsData.forEach((alert) => {
      if (alert.type == type) {
        // Step 11: Create a <p> element with specified content and styles for each alert
        const alertMessage = document.createElement("p");
        alertMessage.textContent = alert.message;
        alertMessage.style.backgroundColor = alert.backgroundColor;
        alertMessage.style.color = alert.color;
        alertMessage.classList.add("alert-item"); // Add the CSS class to each alert element

        // Step 12: Append the <p> element to the alert section
        alertSection.appendChild(alertMessage);

        setTimeout(() => {
          alertSection.removeChild(alertMessage);
        }, 5000);
      }
    });

    // Step 13: Prepend the alert section to the main element on the index page
    const mainElement = document.querySelector("main");
    mainElement.prepend(alertSection);
  }
}

// Step 14: Export the Alert class for use in other modules
export default Alert;
