document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Atualiza a URL sem recarregar a página
            history.pushState(null, null, targetId);
        });
    });
    
    // Filtro de projetos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active apenas no botão clicado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Efeito de mudança no navbar ao rolar
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.7)';
            navbar.style.padding = '15px 0';
        }
    });
    
    // Ativa a seção atual no menu
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});

// Modal para o GIF
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("gifModal");
    const modalImg = document.getElementById("fullSizeGif");
    const gifPreview = document.querySelector(".project-gif");
    const span = document.getElementsByClassName("close-modal")[0];

    // Quando clicar no GIF pequeno
    gifPreview.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }

    // Quando clicar no X para fechar
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Quando clicar fora do modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});