const hamburger = () => {
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
}

export default hamburger