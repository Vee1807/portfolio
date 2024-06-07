// Message form submission
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "<i class='bx bx-loader-circle bx-spin bx-rotate-90' ></i>"

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
});

// Theme toggle
const themeBtn = document.getElementById('theme-btn')

const getIcon = (theme) => {
	if (theme === "dark") {
		return "bx bx-moon"
	} else {
		return "bx bx-sun"
	}
}

const captcha = document.querySelector('.h-captcha')
const setTheme = (theme) => {
	document.documentElement.setAttribute('data-theme', theme)
	captcha.setAttribute('data-theme', theme)
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
	setTheme(theme)
}

themeBtn.addEventListener('click', themeToggle)


// Navbar menu icon toggle
const navbarLinks = document.querySelectorAll('.navbar a')
const sections = document.querySelectorAll('section')

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
const observerOptions = {
	root: null,
	threshold: 0.15,
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('show-animation')
		}/* else {
			entry.target.classList.remove('show-animation')
		}*/
	})
}, observerOptions)

const hiddenElements = document.querySelectorAll('.hidden-elem')
hiddenElements.forEach(elem => observer.observe(elem))


// "Software Developer" hover gradient
const specialtyTitle = document.getElementById('specialty-title');

specialtyTitle.addEventListener('mousemove', e => {
	const rect = e.target.getBoundingClientRect()

	const x = e.clientX - rect.left
	const y = e.clientY - rect.top

	specialtyTitle.style.backgroundPosition = `${x}px ${y}px`;
})
