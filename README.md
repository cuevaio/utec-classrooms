# UTEC Classrooms

A Next.js application that helps students find available classrooms at UTEC campus.

## Overview

UTEC Classrooms displays real-time information about which classrooms are currently available at the UTEC campus. It works by:
1. Fetching classroom event data from the UTEC API
2. Filtering classrooms with no active events for each hour of the day
3. Displaying the free classrooms in an intuitive interface

## Features

- Real-time availability status for all classrooms
- Filter by time slot, building, or classroom type
- Mobile-friendly responsive design
- Quick view of upcoming availability

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yourusername/utec-classrooms.git
cd utec-classrooms
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Create a `.env.local` file with the necessary API configuration:

```
NEXT_PUBLIC_API_URL=https://api.utec.edu.pe/reserva-api
# Add other environment variables as needed
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Database**: Xata for filtering and querying
- **API Integration**: UTEC Reservation API

## API Integration

The application uses the UTEC API to fetch classroom data:

```bash
curl --request GET \
 --url 'https://api.utec.edu.pe/reserva-api/filtro/aula/reservable/tipoaula?codsede=2&codtipoaula=0' \
 --header 'X-Auth-Token: YOUR_AUTH_TOKEN'
```

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style and naming conventions
- Write clear commit messages
- Add tests for new features when possible
- Update documentation as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UTEC for providing the classroom reservation API
- All contributors who help improve this project
