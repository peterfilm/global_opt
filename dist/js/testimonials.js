const LEFT_ARROW = '&#5176;',
        RIGHT_ARROW = '&#5171;',
        MIN_SIZE_TEXT = 150

// Set testimonials here
let reviews = [
    {'name': 'Ольга Анисимова', 'img' :'img/clients/client_1.jpg', 'text': 'Хочу рассказать о компании Global Opt. Самое главное что меня радует, это быстрый поиск и анализ определенного товара. Доставляла через компанию уже много раз, от расходных материалов для отеля, ло дольших партий детской одежды. Буду продолжать пользоваться услугами даной компании'},
    {'name': 'Джимми Феллон', 'img' :'img/clients/client_2.jpg', 'text': 'Все супер! Мне все понравилось! Написал бы большой отзыв, но лень'},
    {'name': 'Гарри Джонсон', 'img' :'img/clients/client_3.jpg', 'text': 'Сначала думал, что лохотрон, но потом пригляделся - и правда он. Но мне понравилось'},
    {'name': 'Натали Вуд', 'img' :'img/clients/client_4.jpg', 'text': 'Какая же гадость это ваша заливная рыба, но компания хорошая, рекомендую!'},
    {'name': 'Оксана Смит', 'img' :'img/clients/client_5.jpg', 'text': 'Наверное лучше компания из всех, что я встречал! Компанейские ребята в вашей компании, молодцы!'},
    {'name': 'Наташа Романофф', 'img' :'img/clients/client_6.jpg', 'text': 'Никогда не думала, что буду писать отзывы. Но сейчас настал тот знаменательный день. Текста будет много, чтобы проверить вместимость. Если его будет слишком много, тогда скрипт обрежет его по 100 символов. А сбоку всегда будет текста мало. Мало... Мало похоже на отзыв, но никто и не говорил, что будет легко. В общем скрипт вполне рабочий, это радует. В общем скрипт вполне рабочий, это радует. В общем скрипт вполне рабочий, это радует. В общем скрипт вполне рабочий, это радует. В общем скрипт вполне рабочий, это радует. В общем скрипт вполне рабочий, это радует. В общем скрипт вполне рабочий, это радует'},
    {'name': 'Сара Рю', 'img' :'img/clients/client_7.jpg', 'text': 'Отличное сочетание JS и HTML + СSS. Достаточно добавлять новые поля в массив и все будет автоматически добавляться. Спасибо большое разработчикам!'},
]


class TestimonialsArrows {
    // Create arrows of Testimonials
    constructor(left, right, wrapper) {
        this.left = left;
        this.right = right;
        this.wrapper = wrapper;
        this.name_left = 'testimonials__left';
        this.name_right = 'testimonials__right';
    }

    render() {
        const arrows = document.createElement('div');
        arrows.classList.add('testimonials__arrows');
        arrows.innerHTML = 
        `<div class=${this.name_left}>${this.left}</div>
          <div class=${this.name_right}>${this.right}</div>
        `
        this.wrapper.append(arrows)
    }
}


class TestimonialItem {
    // Create Item
    constructor(id, name, img, text, wrapper, status) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.text = text;
        this.wrapper = document.querySelector(wrapper)
        this.status = status;
        this.minText = this.getMinSizeText()
    }

    render(action = 'left') {
        const testCard = document.createElement('div');
        let text = action == 'active' ? this.text : this.minText
        testCard.classList.add(`testId${this.id}`);
        testCard.classList.add("testimonials__item");
        testCard.innerHTML = 
        `
        <img class='testimonials__img' src=${this.img} alt="Отзыв - ${this.name}">
        <div class="testimonials__name">${this.name}</div>
        <blockquote class="testimonials__text">${text}</blockquote>
        `
        let mini = this.wrapper.classList.contains('mini')
        switch (action) {
            case 'left':
                this.status = 'next'
                testCard.classList.add(`testimonials__${this.status}`);
                this.wrapper.append(testCard)
                if (mini) {
                    testCard.style.display = 'none'
                    testCard.style.width = '100%'
                } else {
                    testCard.style.display = 'flex'
                    testCard.style.width = ''
                }
                break;
            case 'right':
                this.status = 'previos'
                testCard.classList.add(`testimonials__${this.status}`);
                document.querySelector('.testimonials__arrows').after(testCard)
                if (mini) {
                    testCard.style.display = 'none'
                    testCard.style.width = '100%'
                } else {
                    testCard.style.display = 'flex'
                    testCard.style.width = ''
                }
                break;
            case 'active':
                this.status = 'active'
                testCard.classList.add(`testimonials__${this.status}`);
                this.wrapper.append(testCard)
                break;

        }
    }

    remove() {
        // remove element from DOM
        this.wrapper.querySelector(`.testId${this.id}`).remove()
    }

    getMinSizeText() {
        // Get min-size of tesimonial text
        if (this.text.length >= MIN_SIZE_TEXT) {
            return this.text.slice(0, MIN_SIZE_TEXT) + '...'
        } else {
            return this.text
        }
    }

    changeSizeText() {
        // If element is not active - choose small text for testimonial
        let elem = this.wrapper.querySelector(`.testId${this.id}`)
        if (elem.classList.contains('testimonials__active')) {
            return this.text
        } else {
            return this.minText
        }
    }


    change(action) {
        // Main logic of changing active testimonial
        let elem = this.wrapper.querySelector(`.testId${this.id}`)
        let mini = this.wrapper.classList.contains('mini')
        switch(this.status) {
            case 'previos':
                if (action === 'left') {
                    this.status = null
                    this.remove()
                } else if (action === 'right') {
                    this.status = 'active'
                    elem.classList.remove('testimonials__previos');
                    elem.classList.add('testimonials__active');
                    let elem_text = elem.querySelector('.testimonials__text')
                    if (mini) {
                        elem.style.display = 'flex'
                        elem.style.width = '100%'
                    }
                    elem_text.innerHTML = this.changeSizeText()
                }
                break;
            case 'active':
                if (action === 'left') {
                    this.status = 'previos'
                    elem.classList.remove('testimonials__active');
                    elem.classList.add('testimonials__previos');
                    let elem_text = elem.querySelector('.testimonials__text')
                    elem_text.innerHTML = this.changeSizeText()
                    if (mini) {
                        elem.style.display = 'none'
                        elem.style.width = '100%'
                    } else {
                        elem.style.display = ''
                        elem.style.width = ''
                    }
                } else if (action === 'right') {
                    this.status = 'next'
                    elem.classList.remove('testimonials__active');
                    elem.classList.add('testimonials__next');
                    let elem_text = elem.querySelector('.testimonials__text')
                    elem_text.innerHTML = this.changeSizeText()
                    if (mini) {
                        elem.style.display = 'none'
                        elem.style.width = '100%'
                    } else {
                        elem.style.display = ''
                        elem.style.width = ''
                    }
                }
                break;
            case 'next':
                if (action === 'left') {
                    this.status = 'active'
                    elem.classList.remove('testimonials__next');
                    elem.classList.add('testimonials__active');
                    let elem_text = elem.querySelector('.testimonials__text')
                    elem_text.innerHTML = this.changeSizeText()
                    if (mini) {
                        elem.style.display = 'flex'
                        elem.style.width = '100%'
                    } else {
                        elem.style.width = ''
                    }
                } else if (action === 'right') {
                    this.status = null
                    this.remove()
                }
                break;
            default:
                console.log('error')
        }
    }


}

class Testimonials {
    // Main constructor of testimonials
    constructor(lst, wrapper, flag=1) {
        this.selector = wrapper
        this.wrapper = document.querySelector(this.selector)
        this.arrows = new TestimonialsArrows(LEFT_ARROW, RIGHT_ARROW, this.wrapper)
        this.flag = flag
        this.now = 0
        this.lst = []

        // Collect all testimonials to DB
        for (let i = 0; i < lst.length; i ++) {
            this.lst.push(new TestimonialItem(i, lst[i].name, lst[i].img, lst[i].text, wrapper, null))
        }

        if (this.flag) {
            // If screen-size lower then 992px - change to min-version with one testimonial per page
            this.observeClassChanges(this.wrapper);
            const screenSizeQuery = window.matchMedia('(max-width: 992px)');
            this.handleScreenSize(screenSizeQuery);
            screenSizeQuery.addEventListener('change', this.handleScreenSize);
        } else {
            this.wrapper.classList.add('mini')
        }

    }

    render() {
        this.arrows.render()

        // arrow left event
        this.wrapper.querySelector('.' + this.arrows.name_left).addEventListener('click', (e) => {
            let leftButton = this.wrapper.querySelector('.' + this.arrows.name_left)
            if (leftButton.disabled) {
                return;
            }
            leftButton.disabled = true;
            setTimeout(() => {
                leftButton.disabled = false;
            }, 500);
            this.left();
        });
        
        // arrow right event
        this.wrapper.querySelector('.' + this.arrows.name_right).addEventListener('click', (e) => {
            let rightButton = this.wrapper.querySelector('.' + this.arrows.name_right)
            if (rightButton.disabled) {
                return;
            }
            rightButton.disabled = true;
            setTimeout(() => {
                rightButton.disabled = false;
            }, 500);
            this.right();
        });
    }

    show() {
        // show first 3 testimonals
        this.lst.at(this.now - 1).status = 'previos'
        this.lst[this.now].status = 'active'
        this.lst[this.now + 1].status = 'next'
        this.lst.at(this.now -1).render('right')
        this.lst[this.now].render('active')
        this.lst[this.now + 1].render('left')
        if (!this.flag) this.wrapper.querySelector('.testimonials__active').style.width = '100%'
    }

    right() {
        this.lst.at((this.now + 1) % this.lst.length).change('right')
        this.lst.at((this.now) % this.lst.length).change('right')
        this.lst.at((this.now - 1) % this.lst.length).change('right')
        this.lst.at((this.now - 2) % this.lst.length).render('right')
        this.now -= 1
    }

    left() {
        this.lst.at((this.now - 1) % this.lst.length).change('left')
        this.lst.at((this.now) % this.lst.length).change('left')
        this.lst.at((this.now + 1) % this.lst.length).change('left')
        this.lst.at((this.now + 2) % this.lst.length).render()
        this.now += 1
    }

    observeClassChanges(element) {
        // Check if wrapper has "mini"-class - 
        //it will change from wide screen version to mini with one testimonial per page
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const classList = Array.from(element.classList);
                    const addedMini = classList.includes('mini');
    
                    if (addedMini) {
                        this.wrapper.querySelector('.testimonials__previos').style.display = 'none'
                        this.wrapper.querySelector('.testimonials__next').style.display = 'none'
                        this.wrapper.querySelector('.testimonials__active').style.width = '100%'
                    } else {
                        this.wrapper.querySelector('.testimonials__previos').style.display = ''
                        this.wrapper.querySelector('.testimonials__previos').style.width = ''
                        this.wrapper.querySelector('.testimonials__next').style.display = ''
                        this.wrapper.querySelector('.testimonials__next').style.width = ''
                        this.wrapper.querySelector('.testimonials__active').style.width = ''
                    }
                }
            });
        });
    
        observer.observe(element, { attributes: true, attributeFilter: ['class'] });
    }

    handleScreenSize(event) {
        // Event for screen size
        const element = document.querySelector('.testimonials__wrapper');
    
        if (element && event && event.matches !== undefined) {
            if (event.matches) {
                element.classList.add('mini');
            } else {
                element.classList.remove('mini');
            }
        }
    }
}