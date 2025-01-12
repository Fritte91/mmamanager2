// Function to display talents
function displayTalents() {
    const commonList = document.getElementById('common-talents-list');
    const rareList = document.getElementById('rare-talents-list');
    const epicList = document.getElementById('epic-talents-list');

    // Common Talents
    talentsData.commonTalents.forEach(talent => {
        commonList.innerHTML += `
            <div class="talent-container">
                <div class="talent-image">
                    <img src="${talent.image}" alt="${talent.name}">
                    <div class="talent-info" style="color: ${talent.color};">
                        <h4 style="color: ${talent.color};">${talent.name}:</h4>
                        <p>${talent.description}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Rare Talents
    talentsData.rareTalents.forEach(talent => {
        rareList.innerHTML += `
            <div class="talent-container">
                <div class="talent-image">
                    <img src="${talent.image}" alt="${talent.name}">
                    <div class="talent-info" style="color: ${talent.color};">
                        <h4 style="color: ${talent.color};">${talent.name}:</h4>
                        <p>${talent.description}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Epic Talents
    talentsData.epicTalents.forEach(talent => {
        epicList.innerHTML += `
            <div class="talent-container">
                <div class="talent-image">
                    <img src="${talent.image}" alt="${talent.name}">
                    <div class="talent-info" style="color: ${talent.color};">
                        <h4 style="color: ${talent.color};">${talent.name}:</h4>
                        <p>${talent.description}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

// Call the function to display talents
displayTalents();
