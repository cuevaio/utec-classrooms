let xAuthToken = process.env.UTEC_X_AUTH_TOKEN || "";
let sessionId = process.env.UTEC_SESSION_ID || "";


let payload = JSON.stringify({
  codAula: 1629,
  fechaInicial: "06/09/2024",
  fechaFinal: "06/09/2024",
});


let response = await fetch(
  "https://reserva-intranet.utec.edu.pe/events/",
  {
    method: "POST",
    body: payload,
    headers: {
      "X-Auth-Token": xAuthToken,
      Cookie: `sessionId=${sessionId}`,
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.6",
      "Content-Type": "application/json",
      Origin: "https://reserva-intranet.utec.edu.pe",
      Referer: "https://reserva-intranet.utec.edu.pe/reserva/aulalibre",
      "Sec-Ch-Ua":
        '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "Windows",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      cache: "no-store",
    },
  }
);

const data = await response.json()

console.log(JSON.stringify(data, undefined, 2))