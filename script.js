// Local mock data repository containing academic subjects and mapped mentors
const mentorData = {
    'BSc - Computer Science': ['KUMAR', 'RAJA', 'CHANDRIKA'],
    'BSc - Data Science': ['NAGAMANI', 'RAJESH KUMAR', 'BEGHAM'],
    'BSc - Artificial Intelligence': ['SHOBHA ', 'JANAKI RAM', 'VALLI'],
    'BSc - Chemistry': ['NARASIMHA RAO', 'DIVYA'],
    'BCA - Data Science': ['UMA DEVI', 'ASWINI', 'TEJA'],
    'BCom': ['LAKSHMI', 'SUSHMITA'],
    'BBA': ['BHASHYAM', 'SRINIVAS']
};

const mentorsSection = document.getElementById('mentorsSection');
const chatSection = document.getElementById('chatSection');
const welcomeMsg = document.getElementById('welcomeMsg');
const mentorsList = document.getElementById('mentorsList');
const doubtTextInput = document.getElementById('doubtText');

// Filter and dynamically display active faculty mentors assigned to selected course domain
function showMentors(subject) {
    mentorsSection.style.display = 'flex';
    chatSection.style.display = 'none';
    welcomeMsg.style.display = 'none';
    
    mentorsList.innerHTML = ''; 
    
    mentorData[subject].forEach(mentor => {
        const card = document.createElement('div');
        card.className = 'mentor-card';
        card.innerHTML = `
            <div class="mentor-avatar">${mentor.charAt(0)}</div>
            <div><strong>${mentor}</strong></div>
        `;
        card.onclick = () => openChat(mentor);
        mentorsList.appendChild(card);
    });
}

// Initialize workspace environment setup for sending ticket message to specified target mentor
function openChat(mentorName) {
    chatSection.style.display = 'flex';
    document.getElementById('activeMentorName').innerText = mentorName;
    document.getElementById('activeMentorAvatar').innerText = mentorName.charAt(0);
    document.getElementById('chatBody').innerHTML = ''; 
}

// Append student text content interface dynamically into messaging interface view
function sendDoubt() {
    const text = doubtTextInput.value;
    if(text.trim() === '') return;

    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML += `
        <div style="background-color: #e0f2fe; padding: 10px 15px; border-radius: 8px; align-self: flex-end; max-width: 70%;">
            <strong>You:</strong> <br> ${text}
        </div>
    `;
    doubtTextInput.value = ''; 
    
    // Automatically scroll to the latest message
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Event listener to trigger sendDoubt function when the Enter key is pressed
if(doubtTextInput) {
    doubtTextInput.addEventListener('keypress', function(event) {
        // Check if Enter is pressed without the Shift key
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents adding a new line
            sendDoubt();
        }
    });
}
// Toggle user profile dropdown visibility
function toggleProfileDropdown() {
    const menu = document.getElementById('profileMenu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
}

// Close dropdown context menu when clicking outside the target element
window.onclick = function(event) {
    if (!event.target.matches('.profile-avatar')) {
        const dropdowns = document.getElementsByClassName("profile-dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'flex') {
                openDropdown.style.display = 'none';
            }
        }
    }
}