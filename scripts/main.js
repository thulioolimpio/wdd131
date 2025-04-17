// Dados das trilhas (certifique-se que as imagens existem na pasta images/)
const hikes = [
    { 
        name: "Trilha do Pico Verde", 
        date: "15/10/2023", 
        difficulty: "moderate", 
        distance: "8km",
        description: "Trilha com vista panorâmica do vale",
        image: "images/trail1.jpg" 
    },
    { 
        name: "Cachoeira Serrana", 
        date: "22/10/2023", 
        difficulty: "easy", 
        distance: "5km",
        description: "Trilha leve terminando em linda cachoeira",
        image: "images/trail2.jpg"
    },
    { 
        name: "Vale das Pedras", 
        date: "05/11/2023", 
        difficulty: "hard", 
        distance: "12km",
        description: "Desafiadora trilha com formações rochosas únicas",
        image: "images/trail3.jpg"
    }
];

// Carrega as trilhas na página inicial
function loadHikes() {
    const hikeCards = document.getElementById("hikeCards");
    if (!hikeCards) return;

    hikeCards.innerHTML = hikes.map(hike => `
        <div class="card" data-difficulty="${hike.difficulty}">
            <img src="${hike.image}" alt="${hike.name}" loading="lazy" 
                 onerror="this.onerror=null;this.src='images/default-trail.jpg';">
            <div class="trail-info">
                <h3>${hike.name}</h3>
                <span class="difficulty ${hike.difficulty}">
                    ${getDifficultyLabel(hike.difficulty)}
                </span>
                <p><strong>Data:</strong> ${hike.date}</p>
                <p><strong>Distância:</strong> ${hike.distance}</p>
                <p>${hike.description}</p>
            </div>
        </div>
    `).join("");
}

// Carrega todas as trilhas na página de trilhas
function loadAllTrails() {
    const trailList = document.getElementById("trailList");
    if (!trailList) return;

    trailList.innerHTML = hikes.map(hike => `
        <div class="trail-card" data-difficulty="${hike.difficulty}">
            <img src="${hike.image}" alt="${hike.name}" loading="lazy"
                 onerror="this.onerror=null;this.src='images/default-trail.jpg';">
            <div class="trail-info">
                <h3>${hike.name}</h3>
                <span class="difficulty ${hike.difficulty}">
                    ${getDifficultyLabel(hike.difficulty)}
                </span>
                <p><strong>Data:</strong> ${hike.date}</p>
                <p><strong>Distância:</strong> ${hike.distance}</p>
                <p>${hike.description}</p>
            </div>
        </div>
    `).join("");
}

// Retorna o label de dificuldade
function getDifficultyLabel(difficulty) {
    const labels = {
        easy: "Fácil",
        moderate: "Moderado",
        hard: "Difícil"
    };
    return labels[difficulty] || "";
}

// Filtra trilhas por dificuldade
function filterTrails(difficulty) {
    const cards = document.querySelectorAll(".trail-card, .card");
    cards.forEach(card => {
        if (difficulty === "all" || card.dataset.difficulty === difficulty) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Configura o accordion de dicas
function setupTipsAccordion() {
    const tips = document.querySelectorAll(".tip-header");
    tips.forEach(tip => {
        tip.addEventListener("click", () => {
            const item = tip.parentElement;
            item.classList.toggle("active");
        });
    });
}

// Configura o menu mobile
function setupMobileMenu() {
    const burger = document.querySelector(".burger-menu");
    const nav = document.querySelector(".nav-links");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
}

// Configura o formulário de inscrição
function setupMembershipForm() {
    const form = document.getElementById("membershipForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const memberData = {
            name: formData.get("name"),
            email: formData.get("email"),
            level: formData.get("level"),
            newsletter: formData.get("newsletter") === "on"
        };

        // Salva no localStorage
        localStorage.setItem("newMember", JSON.stringify(memberData));
        
        // Mostra mensagem de confirmação
        const message = document.getElementById("confirmationMessage");
        if (message) {
            message.classList.remove("hidden");
            setTimeout(() => message.classList.add("hidden"), 5000);
        }
        
        // Reseta o formulário
        this.reset();
    });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadHikes();
    loadAllTrails();
    setupMobileMenu();
    setupTipsAccordion();
    setupMembershipForm();

    // Configura filtros
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterTrails(btn.dataset.difficulty);
        });
    });

    // Simula o mapa
    const mapContainer = document.getElementById("trailMap");
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="width:100%;height:100%;background:#3498db;color:white;
                       display:flex;align-items:center;justify-content:center;border-radius:8px;">
                <p>Mapa interativo das trilhas (simulação)</p>
            </div>
        `;
    }

    // Verifica se as imagens estão carregando
    hikes.forEach(hike => {
        const img = new Image();
        img.src = hike.image;
        img.onload = () => console.log(`✅ Imagem carregada: ${hike.image}`);
        img.onerror = () => console.log(`❌ Falha ao carregar: ${hike.image}`);
    });
});