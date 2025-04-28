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
    
    // Modal para o GIF
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

    // Carrossel - Navegação
    let currentIndex = 0;
    const gifs = document.querySelectorAll('.project-gif-container');
    const totalGifs = gifs.length;
    const carrossel = document.querySelector('.header-gif-carrossel');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    // Função para atualizar a posição do carrossel
    function updateCarrossel() {
        const offset = -currentIndex * (gifs[0].offsetWidth + 20); // 20px é o espaçamento entre os GIFs
        carrossel.style.transform = `translateX(${offset}px)`;
    }

    // Evento de navegação para a direita
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalGifs; // Aumenta o índice e faz a rotação
        updateCarrossel();
    });

    // Evento de navegação para a esquerda
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalGifs) % totalGifs; // Diminui o índice e faz a rotação
        updateCarrossel();
    });

    // Inicializa o carrossel na posição inicial
    updateCarrossel();
});
