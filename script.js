// DESTINATION DATA
const destinations = [
    {
        name: 'Feeder Port',
        desc: 'Discover the town center and its nearby coastal views.',
        img: 'poblacion.png'
    },
    {
        name: 'Aplaya',
        desc: 'Explore the shoreline and coastal community of Aplaya.',
        img: 'aplaya.png'
    },
    {
        name: 'Butas na Bato',
        desc: 'See the natural rock formations and coastal scenery of Butas na Bato.',
        img: 'bato.png'
    },
    {
        name: 'Ibona',
        desc: 'Enjoy the green surroundings and freshwater scenery of Ibona.',
        img: 'ibona.png'
    },
    {
        name: 'Matawe',
        desc: 'Take in the blue waters and scenic coastline around Matawe.',
        img: 'matawe.png'
    },
    {
        name: 'Umiray',
        desc: 'Discover the peaceful community and natural surroundings of Umiray.',
        img: 'umiray.png'
    }
];

// TEAM MEMBER DATA
const members = [
    {
        name: 'Santos, Josh Andrei B.',
        role: 'UI / UX Designer',
        img: 'josh.jpg'
    },
    {
        name: 'Rutaquio, Trina R.',
        role: 'Front End Developer',
        img: 'trina.jpg'
    },
    {
        name: 'Jintalan, Iya Marienel A.',
        role: 'Project Manager',
        img: 'iya.png',
        isLeader: true
    },
    {
        name: 'Manuzon, John Christian D.',
        role: 'Content Interaction Developer',
        img: 'jc.jpg'
    },
    {
        name: 'Alarcio, Jefferson Jonix R.',
        role: 'Quality Assurance',
        img: 'onix.jpg'
    }
];

// CAROUSEL LOGIC
let currentSlide = 0;

function showSlide() {
    const item = destinations[currentSlide];

    document.getElementById('heroImage').src = item.img;
    document.getElementById('heroImage').alt = item.name;
    document.getElementById('heroTitle').textContent = item.name;

    document.getElementById('slideCount').textContent =
        String(currentSlide + 1).padStart(2, '0') + ' / 06';

    document.querySelectorAll('#carouselDots button').forEach((button, index) => {
        button.style.width = index === currentSlide ? '1.75rem' : '0.625rem';
        button.style.backgroundColor = index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.4)';
    });
}

// CREATE CAROUSEL DOTS
const carouselDotsContainer = document.getElementById('carouselDots');
if (carouselDotsContainer) {
    destinations.forEach((item, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Show ' + item.name);

        dot.onclick = () => {
            currentSlide = index;
            showSlide();
        };

        carouselDotsContainer.appendChild(dot);
    });
}

// PREVIOUS AND NEXT BUTTONS
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn) {
    prevBtn.onclick = () => {
        currentSlide = (currentSlide + destinations.length - 1) % destinations.length;
        showSlide();
    };
}

if (nextBtn) {
    nextBtn.onclick = () => {
        currentSlide = (currentSlide + 1) % destinations.length;
        showSlide();
    };
}

// DISPLAY DESTINATION CARDS
const grid = document.getElementById('destinationGrid');
if (grid) {
    destinations.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card-destination';

        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="card-body">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <button type="button" onclick="chooseDestination('${item.name}')">
                    Select destination →
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// SELECT DESTINATION FOR BOOKING
function chooseDestination(name) {
    const destinationSelect = document.getElementById('bookDestination');
    const bookingSection = document.getElementById('booking');

    if (destinationSelect) destinationSelect.value = name;
    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// DISPLAY TEAM MEMBERS
const teamGrid = document.getElementById('teamGrid');
if (teamGrid) {
    members.forEach(member => {
        const card = document.createElement('article');
        card.className = member.isLeader ? 'card-team card-leader' : 'card-team';

        card.innerHTML = `
            <img src="${member.img}" alt="${member.name}" class="${member.isLeader ? 'team-avatar-leader' : 'team-avatar-img'}">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
        `;

        teamGrid.appendChild(card);
    });
}

// BOOKING FORM EVENT
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', event => {
        event.preventDefault();

        const successMessage = document.getElementById('bookingSuccess');
        if (successMessage) successMessage.classList.remove('hidden');

        event.target.reset();
    });
}

// SET MINIMUM BOOKING DATE
const bookDateInput = document.getElementById('bookDate');
if (bookDateInput) {
    const today = new Date();
    bookDateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];
}

// INITIALIZE FIRST SLIDE
showSlide();