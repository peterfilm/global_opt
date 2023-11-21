'user strict';
import hamburger from "./modules/hamburger";
import {Testimonials} from "./modules/testimonials";
import modals from "./modules/modals";
import forms from "./modules/forms";
import mask from "./modules/mask";
import names from "./modules/names";
import { reviews } from "./modules/testimonials";

window.addEventListener('DOMContentLoaded', () => {

    // Hamburger
    hamburger()

    // Testimonials
    let testimonials = new Testimonials(reviews, '.testimonials__wrapper')
    testimonials.render()
    testimonials.show()
    // Modal Window
    modals()
    forms()
    mask('[data-tel]')
    names('[data-name]')
    
});