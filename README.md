# Pratibha Patel — Portfolio

Animated portfolio for Pratibha Patel. The Next.js site reads profile, experience, skills, projects, and education from a local MongoDB database through an Express API. The contact form saves messages into that same database.

## Stack

- Next.js, TypeScript, React
- Node.js, Express, Mongoose
- MongoDB, running locally

## Run it

The API stores data in MongoDB at `mongodb://127.0.0.1:27017/pratibha_portfolio`.

If MongoDB is already running on that address, skip straight to the install step. Otherwise start Docker Desktop and run:

```powershell
docker compose up -d
```

Install dependencies once:

```powershell
npm install
npm install --prefix server
npm install --prefix client
```

Start the API and the site together:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The API listens on [http://localhost:5000](http://localhost:5000). The first start seeds the database from the resume.

## Useful endpoints

- `GET /api/health` — API and database status
- `GET /api/portfolio` — public portfolio content
- `POST /api/contact` — save a message (`name`, `email`, `subject`, `message`)
