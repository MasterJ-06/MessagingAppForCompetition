const avatar_form = document.getElementById('avatar')
const name_form = document.getElementById('name_form')
const psw_form = document.getElementById('psw_form')
const avatar_p = document.getElementById('avatar_img')

name_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.getElementById('username')
    input.style.display = 'inline-block'
    const cookie = document.cookie
    const cookie_match = cookie.match(/\^.+\^/)
    const token = cookie_match[0].slice(1, -1)
    const update = {
        "name": input.value
    }
    fetch(`/users/me`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
            'Authorization': token,
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((response) => {
        response.text().then((data) => {
            $user_name.textContent = 'Username updated.'
        })
    })
})

psw_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.getElementById('pword_val')
    input.style.display = 'inline-block'
    const cookie = document.cookie
    const cookie_match = cookie.match(/\^.+\^/)
    const token = cookie_match[0].slice(1, -1)
    const update = {
        "password": input.value
    }
    fetch(`/users/me`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
            'Authorization': token,
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((response) => {
        response.text().then((data) => {
            $pword.textContent = 'Password updated.'
        })
    })
})