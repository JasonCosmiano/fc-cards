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
        const result = await pool.query(`
            SELECT 
                name, 
                rating, 
                position, 
                pace, 
                shooting, 
                passing, 
                dribbling, 
                defending, 
                physical
            FROM player
            ORDER BY id DESC
            LIMIT 1
        `);        

        return Response.json({ results: result.rows });
    } catch (error) {
        if (error instanceof Error) {
        return Response.json({ error: error.message }, { status: 500 });
        } else {
        return Response.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
} 

/**
 * POST http://localhost:3000/api/stats
 * {"name": "[name]",
 * "rating": "[rating]",
 * "position": "[position]",
 * "pace": [pace],
 * "shooting": [shooting],
 * "passing": [passing],
 * "dribbling": [dribbling],
 * "defending": [defending],
 * "physical": [physical]
 *  }
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {

    try {
       const body = await request.json();

    const {
      name,
      rating,
      position,
      pace,
      shooting,
      passing,
      dribbling,
      defending,
      physical,
    } = body;

    await pool.query(
      `
      INSERT INTO player (
        name, rating, position, pace, shooting, passing, dribbling, defending, physical
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
      [name, rating, position, pace, shooting, passing, dribbling, defending, physical]
    );

    const result = await pool.query(
      `
      SELECT 
        name, rating, position, pace, shooting, passing, dribbling, defending, physical
      FROM player
      ORDER BY id DESC
      LIMIT 1
    `
    );

    return new Response(
      JSON.stringify({ results: result.rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'An unknown error occurred' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
}