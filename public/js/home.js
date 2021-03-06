(async function() {
	const socket = io();

	socket.on('update user list', (data) => {
		const arr = data.arr;
		arr.sort((a, b) => {
			if (a.status === 'active' && b.status === 'active') {
				return a.name.localeCompare(b.name);
			} else if (a.status === 'active') return -1;
			else return 1;
		});

		$('#people-here').children().remove();
		for (const user of arr) {
			const div = createUserPanel(user);
			$('#people-here').append(div);
		}
	});
})(jQuery);

function createUserPanel(user) {
	const div = $('<div/>').addClass('card text-center').css('width', '200px');
	const classStatus = (user.status === 'active') ? 'text-success' : 'text-secondary';
	const coverImageUrl = user.cover_image + "?width=200&height=150";

	div.html(`
		<div class='card-img-top user-bg'>
			<img style='object-fit: cover' src='${coverImageUrl}' alt='background of ${user.name}'/>
		</div>
		<div class='card-body'>
			<div class='user-pic'>
				<img src='/${user.name}/avatar' alt='avatar of ${user.name}'/>
			</div>
			<h4 class='card-title serif-font'>${user.name}</h4>
			<div class='card-text ${classStatus}'>${user.status}</div>
			<a class='btn btn-primary' href='/profile/${user.name}'>Go to profile</a>
		</div>
	`);

	return div;
}
