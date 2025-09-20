import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

/**
 * GET http://localhost:3000/api/stats
 * @param request 
 * @returns 
 */
export async function GET(request: Request) {

    try {
        const result = await pool.query('SELECT name, rating, position, pace, shooting, passing, dribbling, defending, physical FROM player WHERE id=1;');
        return Response.json({ results: result.rows });
    } catch (error) {
        if (error instanceof Error) {
        return Response.json({ error: error.message }, { status: 500 });
        } else {
        return Response.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
} 

