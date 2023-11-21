const modals = () => {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]'),
        hamburger = document.querySelector('.hamburger');

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

    const modalTimerId = setTimeout(openModal, 60000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modals