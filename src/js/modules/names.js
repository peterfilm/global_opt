const names = (selector) => {
    let namesFind = document.querySelectorAll(selector);

    namesFind.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[\d\s]+/, '')
        })
    })

}

export default names