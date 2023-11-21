'user strict';

window.addEventListener('DOMContentLoaded', () => {

    const menu = document.querySelector('.menu_mobile'),
        menuItem = document.querySelectorAll('.menu_item'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        toggleHamburger()
    });

    function toggleHamburger() {
        if (menu.classList.contains('menu_mobile__activate')) {
            document.body.style.overflow = '';
        } else {
            document.body.style.overflow = 'hidden';
        }
        hamburger.classList.toggle('show');
        menu.classList.toggle('menu_mobile__activate');
    }

    menuItem.forEach((item) => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('show');
            menu.classList.toggle('menu_mobile__activate');
        });
    });

    testimonials = new Testimonials(reviews, '.testimonials__wrapper')
    testimonials.render()
    testimonials.show()

    // Modal Window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // если пользователь сам открыл модельное окно, то таймер не сработает
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        if (!hamburger.classList.contains('show')) {
            document.body.style.overflow = '';
        }
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && hamburger.classList.contains('show')) {
            toggleHamburger()
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});