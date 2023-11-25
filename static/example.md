the query is:

```js
(async () => {
	let sessionId = '_';

	const payload = JSON.stringify({
		codAula: '2668', // Classroom A101
		fechaInicial: '10/10/2023',
		fechaFinal: '10/10/2023'
	});

	const utec_token = '_';

	try {
		let response = await fetch('https://reserva-intranet.utec.edu.pe/events', {
			method: 'POST',
			body: payload,
			headers: {
				'X-Auth-Token': utec_token,
				Cookie: `sessionId=${sessionId}`,

				Accept: 'application/json, text/plain, */*',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'en-US,en;q=0.6',
				'Content-Length': '70',
				'Content-Type': 'application/json',
				Origin: 'https://reserva-intranet.utec.edu.pe',
				Referer: 'https://reserva-intranet.utec.edu.pe/reserva/aulalibre',
				'Sec-Ch-Ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
				'Sec-Ch-Ua-Mobile': '?0',
				'Sec-Ch-Ua-Platform': 'Windows',
				'Sec-Fetch-Dest': 'empty',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Site': 'same-origin',
				'Sec-Gpc': '1',
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
			}
		});
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
})();

``;
```
