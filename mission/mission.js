// Get the theme selector and logo elements
const themeSelect = document.getElementById('themeSelect');
const logoImg = document.querySelector('.logo');

// Initialize theme from localStorage or default to 'light'
function initializeTheme() {
	const savedTheme = localStorage.getItem('theme') || 'light';
	setTheme(savedTheme);
	themeSelect.value = savedTheme;
}

// Set the theme and update UI accordingly
function setTheme(theme) {
	if (theme === 'dark') {
		document.documentElement.classList.add('dark-mode');
		logoImg.src = 'byui-logo-dark.png';
		logoImg.alt = 'BYU-Idaho logo (dark mode)';
	} else {
		document.documentElement.classList.remove('dark-mode');
		logoImg.src = 'byui-logo-blue.webp';
		logoImg.alt = 'BYU-Idaho logo';
	}
	localStorage.setItem('theme', theme);
}

// Add event listener to theme selector
themeSelect.addEventListener('change', (event) => {
	setTheme(event.target.value);
});

// Initialize theme on page load
initializeTheme();
