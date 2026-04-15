import db from "#db/client";

export async function createFolder({name}){
    const sql = `
        INSERT INTO folders (name) 
        VALUES ($1) RETURNING * 
        `;
        const {rows: folders} = await db.query(sql, [name]);
        return folders[0];
}

export async function getFolders(){
    const sql = `
    SELECT * FROM folders
    `;
    const folders = await db.query(sql);
    return folders;
}

export async function getFolderById(){
    const sql = `
        SELECT 
        folders.*, 
        COALESCE
            (
            json_agg(files.*) FILTER (WHERE files.id IS NOT NULL), 
            '[]'
            ) AS files
        FROM folders
        LEFT JOIN files ON folders.id = files.folder_id
        WHERE folders.id = $1
        GROUP BY folders.id;
    `;
}