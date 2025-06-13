// Combined JavaScript for the website (Buttons + Contact Form)

document.addEventListener('DOMContentLoaded', function() {
    stylePrimarySecondaryButtons();
    loadContactInfo();
    setupContactForm();
});

function stylePrimarySecondaryButtons() {
    const primaryButtons = document.querySelectorAll('.btn-primary');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');

    primaryButtons.forEach(btn => {
        btn.style.backgroundColor = '#6366f1';
        btn.style.color = '#ffffff';
        btn.style.border = 'none';
        btn.style.padding = '10px 20px';
        btn.style.borderRadius = '8px';
        btn.style.fontWeight = '600';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background-color 0.3s ease';
        btn.onmouseover = () => btn.style.backgroundColor = '#4f46e5';
        btn.onmouseout = () => btn.style.backgroundColor = '#6366f1';
    });

    secondaryButtons.forEach(btn => {
        btn.style.backgroundColor = '#e5e7eb';
        btn.style.color = '#111827';
        btn.style.border = 'none';
        btn.style.padding = '10px 20px';
        btn.style.borderRadius = '8px';
        btn.style.fontWeight = '600';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background-color 0.3s ease';
        btn.onmouseover = () => btn.style.backgroundColor = '#d1d5db';
        btn.onmouseout = () => btn.style.backgroundColor = '#e5e7eb';
    });
}

function loadContactInfo() {
    document.getElementById('contactEmail').textContent = config.contact.email;
    document.getElementById('contactPhone').textContent = config.contact.phone;
    document.getElementById('contactAddress').textContent = config.contact.address;
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (config.webhook.enabled) {
        sendContactWebhook(data);
    }

    showSuccessMessage();
    e.target.reset();
}

function sendContactWebhook(data) {
    const webhookData = {
        embeds: [{
            title: "New Contact Form Submission",
            color: 6366961,
            fields: [
                { name: "Name", value: data.name, inline: true },
                { name: "Email", value: data.email, inline: true },
                { name: "Subject", value: data.subject, inline: true },
                { name: "Message", value: data.message, inline: false }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    fetch(config.webhook.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
    }).catch(error => {
        console.error('Webhook error:', error);
    });
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you for your message! We'll get back to you soon.</p>
    `;

    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successDiv, form);

    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}
