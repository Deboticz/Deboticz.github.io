document.addEventListener('DOMContentLoaded', function() {
    loadTeamMembers();
});

function loadTeamMembers() {
    const teamGrid = document.getElementById('teamGrid');
    
    config.team.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-card';
        
        memberCard.innerHTML = `
            <div class="team-image">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="team-info">
                <h3>${member.name}</h3>
                <p class="position">${member.position}</p>
                <p class="bio">${member.bio}</p>
            </div>
        `;
        
        teamGrid.appendChild(memberCard);
    });
}
