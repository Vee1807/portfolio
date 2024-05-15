let navbarLinks = document.querySelectorAll('.navbar a')
let sections = document.querySelectorAll('section')


// Navbar menu icon toggle
let menuIcn = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')
menuIcn.addEventListener('click', () => {
    navbar.classList.toggle('active')
})


window.onscroll = () => {
    navbar.classList.remove('active')
    sections.forEach(section => {
        let sectionY = window.scrollY + section.getBoundingClientRect().top
        let id = section.id
        if (sectionY <= window.scrollY + 50 && sectionY + section.scrollHeight >= window.scrollY) {
            navbarLinks.forEach(link => {
                link.classList.remove('current')
            })
            let currentLink = document.querySelector(`.navbar a[href*='${id}']`)
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