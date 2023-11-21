const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        textarea = document.querySelectorAll('textarea')

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.text()

    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
        textarea.forEach(item => {
            item.value = '';
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            let lastBtn = item.querySelector('button')
            statusMessage.classList.add('status', 'button', 'button__success');
            statusMessage.setAttribute('id', 'quest_submit')
            statusMessage.style.cssText = `
            text-align: center;
            margin-top: 12px;
            margin-bottom: 13px;
            `
            lastBtn.replaceWith(statusMessage);

            const formData = new FormData(item);

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res)
                    statusMessage.textContent = message.success;
                })
                .catch((error) => {
                    statusMessage.textContent = message.failure
                    statusMessage.style.cssText = `background-color: red`

                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.replaceWith(lastBtn)
                    }, 5000);
                })

        })
    })

}
export default forms