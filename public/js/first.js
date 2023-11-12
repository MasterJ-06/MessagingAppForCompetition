var user = ''
setInterval(function(){
    if (document.cookie.match(/\^.+\^/) !== null) {
        const t_regex = document.cookie.match(/\^.+\^/)
        const JWT = t_regex[0].slice(1, -1)
        const jwtPayload = JSON.parse(window.atob(JWT.split('.')[1]))
        if (jwtPayload.exp < Date.now()/1000) {
            if (user !== '') {
                user = ''
            }
            document.cookie = `logged_in=no; max-age=7200; path=/;`
            document.cookie = `token=; max-age=-7200; path=/;`;
            document.cookie = `name=; max-age=-7200; path=/;`;
        }
    }
},900000);

setInterval(() => {
    let x = document.cookie
    const t_regex = document.cookie.match(/\&.+\&/)
    const t = t_regex[0].slice(1, -1)
    if (x.includes("logged_in=yes")) {
        fetch('/users/refresh', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                'name': t
            }),
            redirect: 'follow'
        }).then((response) => {
            if (response.status === 400) {
                return $login_error.textContent = 'Invalid token.'
            } else {
                response.json().then((data) => {
                    user = data
                    document.cookie = `token=^${user.token}^; max-age=7200; path=/;`;
                    document.cookie = `name=&${data.user.name}&; max-age=7200; path=/;`;
                })
            }
        })
    }
}, 780000);

setInterval(() => {
    let x = document.cookie
    if (x.includes("logged_in=no")) {
        document.getElementById('logout_button').style.display='none'
        document.getElementById('signup_button').style.display='inline-block'
        document.getElementById('login_button').style.display='inline-block'
    } else if (x.includes("logged_in=yes")) {
        document.getElementById('logout_button').style.display='inline-block'
        document.getElementById('signup_button').style.display='none'
        document.getElementById('login_button').style.display='none'
    }
}, 100);