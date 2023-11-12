function logout() { 
    window.onbeforeunload = function(event)
    {
        document.cookie = `logged_in=no; max-age=7200; path=/;`
        document.cookie = `token=; max-age=-7200; path=/;`;
        document.cookie = `name=; max-age=-7200; path=/;`;
        user = ''
    }
    window.location.reload()
}