// Notification System
// Uses a container with the ID 'notifications-container' to display notifications
// Example container: <div id="notifications-container"></div>
// Font Awesome is required for the icons to display correctly
// Example usage: globalNotifications.show('success', 'Data saved successfully!', 'Success');
// Icons will be loaded automatically if Font Awesome is included in the page

if (typeof window.notification_data === 'undefined') {
    window.notification_data = {
        info: {
            icon: '<fa class="fa-solid fa-circle-info"></fa>',
            title: 'Data Incoming',
            message: 'Please wait a moment.'
        },
    success: {
        icon: '<fa class="fa-solid fa-check-circle"></fa>',
        title: 'Mission Complete!',
        message: "There was a success."
    },
    warning: {
        icon: '<fa class="fa-solid fa-triangle-exclamation"></fa>',
        title: 'Uh-oh!',
        message: "Don't worry, it's probably nothing."
    },
        error: {
            icon: '<fa class="fa-solid fa-circle-xmark"></fa>',
            title: 'We Have a Problem!',
            message: 'Looks like something went wrong.'
        }
    };
}

// Main function to show a notification
function showNotification(type, message, title) {
    const container = document.getElementById('notifications-container');
    if (!container) {
        alert((title || window.notification_data[type]?.title || 'Notification') + ': ' + (message || window.notification_data[type]?.message || 'No message'));
        return;
    }
    
    const data = window.notification_data[type];
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-title">${title || data.title}</div>
            <div class="notification-message">${message || data.message}</div>
        </div>
        <div class="notification-close" onclick="closeNotification(this.parentElement)"> <i class="fa-solid fa-xmark"></i> </div>
        <div class="notification-progressTimer"></div>
    `;
    
    container.appendChild(notification);
    notification.offsetHeight;
    setTimeout(() => {
        if (notification.parentElement) {
            container.removeChild(notification);
        }
    }, 5000);
}

// Close and remove a notification
function closeNotification(notification) {
    notification.style.animation = 'fadeToNothing 0.5s ease forwards';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}

// Expose the notification system globally
window.globalNotifications = {
    show: showNotification
};
