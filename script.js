const themeBtn = document.getElementById('theme-btn')

const getIcon = (theme) => {
	if (theme === "dark") {
		return "bx bx-moon"
	} else {
		return "bx bx-sun"
	}
}

const setTheme = (theme) => {
    themeBtn.firstElementChild.classList = getIcon(theme)
    localStorage.setItem("theme", theme)
}

window.onload = setTheme(document.documentElement.getAttribute('data-theme'))

const themeToggle = () => {
    let theme = document.documentElement.getAttribute('data-theme')
    if (theme === "dark") {
		theme = "light"
	} else {
		theme = "dark"
	}
    document.documentElement.setAttribute('data-theme', theme)
    setTheme(theme)
}

themeBtn.addEventListener('click', themeToggle)



const navbarLinks = document.querySelectorAll('.navbar a')
const sections = document.querySelectorAll('section')


// Navbar menu icon toggle
const menuIcn = document.querySelector('#menu-icon')
const navbar = document.querySelector('.navbar')
menuIcn.addEventListener('click', () => {
    navbar.classList.toggle('active')
})


window.onscroll = () => {
    navbar.classList.remove('active')
    sections.forEach(section => {
        const sectionY = window.scrollY + section.getBoundingClientRect().top
        const id = section.id
        if (sectionY <= window.scrollY + 50 && sectionY + section.scrollHeight >= window.scrollY) {
            navbarLinks.forEach(link => {
                link.classList.remove('current')
            })
            const currentLink = document.querySelector(`.navbar a[href*='${id}']`)
            currentLink.classList.add('current')
        }
    })
}


// Scroll animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show-animation')
        } else {
            entry.target.classList.remove('show-animation')
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden-elem')
hiddenElements.forEach(elem => observer.observe(elem))