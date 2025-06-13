document.addEventListener('DOMContentLoaded', function() {
    loadLinks();
});

function loadLinks() {
    loadSocialLinks();
    loadLegalLinks();
    loadSupportLinks();
}

function loadSocialLinks() {
    const socialContainer = document.getElementById('socialLinks');
    const socialLinks = config.links.social;
    
    Object.entries(socialLinks).forEach(([platform, url]) => {
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.className = 'link-item';
        
        let icon = '';
        switch(platform) {
            case 'discord':
                icon = 'fab fa-discord';
                break;
            case 'twitter':
                icon = 'fab fa-twitter';
                break;
            case 'youtube':
                icon = 'fab fa-youtube';
                break;
            default:
                icon = 'fas fa-link';
        }
        
        linkElement.innerHTML = `
            <i class="${icon}"></i>
            <span>${platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            <i class="fas fa-external-link-alt"></i>
        `;
        
        socialContainer.appendChild(linkElement);
    });
}

function loadLegalLinks() {
    const legalContainer = document.getElementById('legalLinks');
    const legalLinks = config.links.legal;
    
    Object.entries(legalLinks).forEach(([type, url]) => {
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.className = 'link-item';
        
        let displayName = '';
        switch(type) {
            case 'terms':
                displayName = 'Terms of Service';
                break;
            case 'privacy':
                displayName = 'Privacy Policy';
                break;
            case 'refund':
                displayName = 'Refund Policy';
                break;
            default:
                displayName = type.charAt(0).toUpperCase() + type.slice(1);
        }
        
        linkElement.innerHTML = `
            <i class="fas fa-file-contract"></i>
            <span>${displayName}</span>
            <i class="fas fa-external-link-alt"></i>
        `;
        
        legalContainer.appendChild(linkElement);
    });
}

function loadSupportLinks() {
    const supportContainer = document.getElementById('supportLinks');
    const supportLinks = config.links.support;
    
    Object.entries(supportLinks).forEach(([type, url]) => {
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.className = 'link-item';
        
        let displayName = '';
        let icon = '';
        switch(type) {
            case 'helpdesk':
                displayName = 'Help Desk';
                icon = 'fas fa-question-circle';
                break;
            case 'status':
                displayName = 'Status Page';
                icon = 'fas fa-heartbeat';
                break;
            case 'docs':
                displayName = 'Documentation';
                icon = 'fas fa-book';
                break;
            default:
                displayName = type.charAt(0).toUpperCase() + type.slice(1);
                icon = 'fas fa-link';
        }
        
        linkElement.innerHTML = `
            <i class="${icon}"></i>
            <span>${displayName}</span>
            <i class="fas fa-external-link-alt"></i>
        `;
        
        supportContainer.appendChild(linkElement);
    });
}
