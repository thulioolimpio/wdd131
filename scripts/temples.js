// Selecionando elementos do DOM
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Evento de clique para abrir/fechar o menu
menuToggle.addEventListener("click", () => {
    const isOpen = menu.style.display === "block";
    menu.style.display = isOpen ? "none" : "block";
    menuToggle.textContent = isOpen ? "☰" : "❌";
});

// Atualiza ano e última modificação no footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
