const h3 = document.getElementById('name')
const Name_regex = document.cookie.match(/&.+&/)
if (Name_regex == null) {
    h3.textContent = 'Please login'
}
const Name = Name_regex[0].slice(1, -1)
h3.textContent = 'Welcome ' + Name + '!'

const $pword = document.getElementById('pword')
const $user_name = document.getElementById('user_name')
$user_name.textContent = 'User Name'
$pword.textContent = 'Password'

const $about = document.getElementById('about')
const $loans = document.getElementById('loans')

$about.addEventListener("click", (e) => {
    e.preventDefault()
    const input = document.getElementById('pword_val')
    const input2 = document.getElementById('username')
    const $edit = document.getElementById('edit')
    const $edit2 = document.getElementById('edit2')
    input.style.display = 'inline'
    input2.style.display = 'inline'
    $edit.style.display = 'inherit'
    $edit2.style.display = 'inherit'
    $user_name.textContent = 'User Name'
    $pword.style.display = 'inherit'
    $pword.textContent = 'Password'
})

$loans.addEventListener("click", (e) => {
    e.preventDefault()
    const input = document.getElementById('pword_val')
    const input2 = document.getElementById('username')
    const $edit = document.getElementById('edit')
    const $edit2 = document.getElementById('edit2')
    input.style.display = 'none'
    input2.style.display = 'none'
    $edit.style.display = 'none'
    $edit2.style.display = 'none'
    $pword.textContent = ''
    $user_name.textContent = 'Click a book to return it.'

    const t_regex = document.cookie.match(/\^.+\^/)
    const t = t_regex[0].slice(1, -1)

    fetch(`/books/loans?Name=${Name}`, {
        headers: {
            'Authorization': t
        }
    }).then((response) => {
        response.text().then((data) => {
            if (data === undefined) {
                $user_name.textContent = 'No books borrowed'
            } else if (data !== undefined) {
                const json = JSON.parse(data)
                let result = json.map(json => ' ' + `<a href="/return?ISBN=${json.ISBNNumber}">` + json.Title + '</a>');
                $user_name.innerHTML = result
            }
        })
    })
})