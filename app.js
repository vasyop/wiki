function isOnPlayer(playerX, playerY, playerSize, x, y, pos) {
	for (let i = 0; i < playerSize; i++) {
		if (x == playerX[i] && y == playerY[i]) {
			if (pos) {
				pos.pos = i
			}
			return true;
		}
	}

	return false;
}

function el(cls, x, y) {
	const el = document.createElement('div');
	el.classList.add(cls)
	el.setAttribute('bla', x + '-' + y)
	return el
}

function pushToRow(e) {
	const row = document.body.children.item(document.body.children.length - 1)
	row.appendChild(e)
}

let isPressed = {}
addEventListener('keydown', e => isPressed[e.key] = true)

let made
function draw(playerX, playerY, playerSize, itemX, itemY, size) {
	if (made) {
		document.querySelectorAll('.tile').forEach(el => {
			const [x, y] = el.getAttribute('bla').split('-').map(Number)
			if (itemX == x && itemY == y) {
				el.style.backgroundColor = 'red'
			}
			else if (isOnPlayer(playerX, playerY, playerSize, x, y)) {
				el.style.backgroundColor = 'blue'
			}
			else {
				el.style.backgroundColor = 'white'
			}
		})
		return
	}
	made = true

	for (let y = 0; y < size; y++) {
		document.body.appendChild(el('row'))
		for (let x = 0; x < size; x++) {
			pushToRow(el('tile', x, y))
		}
		pushToRow(el('border'))
	}

	document.body.appendChild(el('row'))
	for (let x = 0; x < size; x++) {
		pushToRow(el('border'))
	}
}

(() => {
	const playerX = Array(10000).fill(0)
	const playerY = Array(10000).fill(0)
	playerX[0] = 0;
	playerY[0] = 0;

	let playerSize = 1;
	const size = 50;

	let dirX = 0;
	let dirY = 1;

	let itemX = 10
	let itemY = 10

	setInterval(() => {
		if (isPressed['d']) {
			if (dirX == 0) {
				dirX = 1;
				dirY = 0;
			}
		} else if (isPressed['a']) {
			if (dirX == 0) {
				dirX = -1;
				dirY = 0;
			}
		} else if (isPressed['s']) {
			if (dirY == 0) {
				dirX = 0;
				dirY = 1;
			}
		} else if (isPressed['w']) {
			if (dirY == 0) {
				dirX = 0;
				dirY = -1;
			}
		}
		isPressed = {}

		//check death
		pos = {}
		if (isOnPlayer(playerX.slice(1), playerY.slice(1), playerSize - 1, playerX[0], playerY[0], pos)) {
			playerSize = pos.pos
		}

		//movement
		for (let i = playerSize - 1; i >= 0; i--) {
			playerX[i + 1] = playerX[i];
			playerY[i + 1] = playerY[i];
		}
		playerX[0] += dirX;
		playerY[0] += dirY;

		//check if head on item
		if (playerX[0] == itemX && playerY[0] == itemY) {
			playerSize++;

			// itemX = Math.floor(Math.random() * size)
			itemX = 10
			itemY = 10
			// itemY = Math.floor(Math.random() * size)
		}

		//check if outside map
		if (playerX[0] == size) {
			playerX[0] = 0;
		}
		if (playerX[0] == -1) {
			playerX[0] = size - 1;
		}
		if (playerY[0] == size) {
			playerY[0] = 0;
		}
		if (playerY[0] == -1) {
			playerY[0] = size - 1;
		}

		draw(playerX, playerY, playerSize, itemX, itemY, size);
	}, 60)
})()
