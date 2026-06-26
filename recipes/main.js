(() => {
	// ─── Recipe Data ────────────────────────────────────────────────────────────

	const recipes = [
		{
			author: 'Provo High Culinary Students',
			cookTime: '30 Min',
			datePublished: '2016-10-16',
			tags: ['Waffles', 'Sweet Potato', 'Side'],
			description: 'Savory waffles made with Sweet potato with a hint of Ginger',
			image: './images/sweet-potato-waffle-md.jpg',
			name: 'Sweet Potato Waffles',
			prepTime: '30 Min',
			rating: 4
		},
		{
			author: 'Shane Thompson',
			cookTime: '20 min',
			tags: ['Chicken', 'Entree'],
			description:
				'Delicious quick and easy creamy rice dish. The mustard, mushrooms, and lemon all blend together wonderfully',
			image: './images/escalopes-de-poulet-a-la-creme.webp',
			name: 'Escalope de Poulet a la Creme with steamed green beans (Chicken with Cream)',
			prepTime: '10 min',
			rating: 4.5
		},
		{
			author: 'Shane Thompson',
			cookTime: '30 min',
			tags: ['Potatoes', 'side'],
			description:
				'Easy and delicious oven roasted potatoes that go great with almost anything.',
			image: './images/roasted-potatoes.webp',
			name: 'Oven Roasted Potato Slices',
			prepTime: '10 min',
			rating: 4
		},
		{
			author: 'Shane Thompson',
			cookTime: '20 min',
			tags: ['Southwest', 'entree'],
			description:
				'Black beans and tomatoes served over a bed of rice. Top with cheese and scoop up with tortilla chips for maximum enjoyment.',
			image: './images/black-beans-and-rice.jpg',
			name: 'Black Beans and Rice',
			prepTime: '10 min',
			rating: 3
		},
		{
			author: 'Shane Thompson',
			cookTime: '30 min',
			tags: ['chicken', 'entree', 'Indian'],
			description:
				'Quick and easy Chicken curry recipe made with easy to find ingredients.',
			image: './images/chicken-curry.webp',
			name: 'Chicken Curry',
			prepTime: '10 min',
			rating: 5
		},
		{
			author: 'Shane Thompson',
			cookTime: '11 min',
			tags: ['dessert'],
			description: 'Delicious soft chocolate chip cookies with coconut.',
			image: './images/chocolate-chip-cookies.jpg',
			name: 'Chocolate Chip Cookies',
			prepTime: '15 min',
			rating: 5
		},
		{
			author: 'Ester Kocht',
			cookTime: '45min',
			tags: ['dessert', 'German'],
			description:
				"This gooseberry cake with crumble is easy to follow, a bit tart and not too sweet. Made up of a cake base, filled with fresh gooseberries and vanilla cream and finished off with crumble that's flavored with vanilla. A must have recipe for gooseberry lovers!!",
			image: './images/german-gooseberry-cake.jpg',
			name: 'German Gooseberry Cake with Vanilla Cream and Crumble',
			prepTime: '30 min',
			rating: 5
		},
		{
			author: 'AllRecipes',
			cookTime: '45min',
			tags: ['dessert'],
			description:
				"This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
			image: './images/apple-crisp.jpg',
			name: 'Apple Crisp',
			prepTime: '30 min',
			rating: 4
		}
	];

	// ─── Helpers ─────────────────────────────────────────────────────────────────

	function renderStars(rating) {
		const full = Math.floor(rating);
		const half = rating % 1 >= 0.5;
		const empty = 5 - full - (half ? 1 : 0);

		// Using the same star characters as the original HTML
		const stars =
			'⭐'.repeat(full) +
			(half ? '½' : '') +
			'☆'.repeat(empty);

		return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
			<span aria-hidden="true">${'⭐'.repeat(full)}${half ? '⭐' : ''}${'☆'.repeat(empty)}</span>
		</span>`;
	}

	function getTagLabel(tags) {
		// Use the first tag as the category label (lowercase)
		return tags && tags.length ? tags[0].toLowerCase() : '';
	}

	function buildCard(recipe) {
		const article = document.createElement('article');
		article.className = 'recipe-card';

		const full = Math.floor(recipe.rating);
		const half = recipe.rating % 1 >= 0.5;
		const empty = 5 - full - (half ? 1 : 0);

		const filledStars = Array(full).fill('<span aria-hidden="true" class="icon-star">⭐</span>').join('');
		const halfStar = half ? '<span aria-hidden="true" class="icon-star">⭐</span>' : '';
		const emptyStars = Array(empty).fill('<span aria-hidden="true" class="icon-star-empty">☆</span>').join('');

		article.innerHTML = `
			<img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">
			<div class="recipe-content">
				<p class="category">${getTagLabel(recipe.tags)}</p>
				<h2>${recipe.name}</h2>
				<span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
					${filledStars}${halfStar}${emptyStars}
				</span>
				<p class="description">${recipe.description}</p>
			</div>
		`;

		return article;
	}

	function displayRecipes(list) {
		const main = document.querySelector('main');
		// Remove all existing recipe cards
		main.querySelectorAll('.recipe-card').forEach(card => card.remove());

		if (list.length === 0) {
			const msg = document.createElement('p');
			msg.className = 'no-results';
			msg.textContent = 'No recipes found. Try a different search term.';
			main.appendChild(msg);
			return;
		}

		// Remove any previous no-results message
		const prev = main.querySelector('.no-results');
		if (prev) prev.remove();

		list.forEach(recipe => main.appendChild(buildCard(recipe)));
	}

	function randomRecipe() {
		const idx = Math.floor(Math.random() * recipes.length);
		return [recipes[idx]];
	}

	function searchRecipes(keyword) {
		const term = keyword.trim().toLowerCase();
		if (!term) return randomRecipe();

		const results = recipes.filter(recipe => {
			const inName = recipe.name.toLowerCase().includes(term);
			const inDesc = recipe.description.toLowerCase().includes(term);
			const inTags = recipe.tags.some(tag => tag.toLowerCase().includes(term));
			return inName || inDesc || inTags;
		});

		// Sort alphabetically by name
		results.sort((a, b) => a.name.localeCompare(b.name));

		return results;
	}

	// ─── Init ────────────────────────────────────────────────────────────────────

	function init() {
		// Show a random recipe on load
		displayRecipes(randomRecipe());

		const form = document.querySelector('.search-bar');
		const input = document.querySelector('#recipe-search');

		if (!form || !input) return;

		form.addEventListener('submit', e => {
			e.preventDefault();
			const results = searchRecipes(input.value);
			displayRecipes(results);
		});

		// Optional: also search on clear (when user clears the input and submits)
		input.addEventListener('search', () => {
			if (input.value === '') {
				displayRecipes(randomRecipe());
			}
		});
	}

	document.addEventListener('DOMContentLoaded', init);
})();