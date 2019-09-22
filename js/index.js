(function () {
	'use strict'

	const getUsers = async (number) => {
		return fetch(`https://5d867f0ecd71160014aae700.mockapi.io/pwa?page=1&limit=${number}`)
			.then(res => res.json())
	}

	const showUsers = async () => {
		const users = await getUsers(6)

		let $main = document.getElementById('main')
		let frag = document.createDocumentFragment();

		users.forEach(item => {

			let div = document.createElement('div')
			div.className = 'card'
			let image = document.createElement('img')
			image.className = 'image'
			image.src = item.avatar
			let name = document.createElement('p')
			name.className = 'name'
			name.textContent = item.name

			div.appendChild(image)
			div.appendChild(name)
			frag.appendChild(div)

		})
		main.appendChild(frag)

	}

	showUsers()

})();