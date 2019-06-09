const { pool } = require('./db');

const sessionSchema = 'CREATE TABLE IF NOT EXISTS session ( sid varchar NOT NULL COLLATE "default" PRIMARY KEY NOT DEFERRABLE INITIALLY IMMEDIATE, sess json NOT NULL, expire timestamp(6) NOT NULL );'

const user_detailsSchema = 'CREATE TABLE IF NOT EXISTS user_details ( id SERIAL PRIMARY KEY, name varchar NOT NULL, email varchar NOT NULL UNIQUE, password varchar NOT NULL, created_at timestamp with time zone, secret_id uuid DEFAULT uuid_generate_v4() );'

const user_commentsSchema = 'CREATE TABLE IF NOT EXISTS user_comments ( comment_id SERIAL PRIMARY KEY, user_id integer NOT NULL REFERENCES user_details(id), slug text NOT NULL, comment text, date timestamp with time zone, edited boolean DEFAULT false );'

const uuidExt = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

const mockUsers = [
    ['Test User','testuser@email.com','$2b$10$CdWibET0u6v1M3fymxx.7uSsUypfKTUiSkxZfFglPKYUuCTwOzT46' ],
    ['Howdy','Howdy@email.com','HASHED' ],
    [ 'Anonymous', 'blank@email.com', 'BLANK' ]
]

const insertQuery = `INSERT INTO user_details(name,email,password,created_at) VALUES ($1,$2,$3,$10),($4,$5,$6,$10),($7,$8,$9,$10) ON CONFLICT DO NOTHING;`
const parameters = [...mockUsers[0],...mockUsers[1],...mockUsers[2], new Date()]

const createSchema = async () => {

    const client = await pool.connect()

    try{
        //SCHEMA
        await client.query('BEGIN')
        await client.query(sessionSchema)
        await client.query(uuidExt)
        await client.query(user_detailsSchema)
        await client.query(user_commentsSchema)

        //INSERTING MOCK VALUES
        await client.query(insertQuery,parameters)
        await client.query('COMMIT')
        
    }
    catch(e){
        await client.query('ROLLBACK')
        throw e
    }
    finally{
        client.release()
    }
}


module.exports = createSchema;


