const PostgresService = require('../../services/postgres.service')
const _pg = new PostgresService();
/**
 * Consultar todas las personas
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const getPersonas = async (req, res) => {
    try{
        let sql= 'select * from personas';
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok:true,
            message:"Personas consultadas",
            content: rows,
        });
    } catch (error){
        return res.send({
            ok:false,
            message:"Ha ocurrido un error crenado el usuario",
            content: error,
        });
    }
    
    
}

const getPersona = async (req, res) => {
    try{
        let id = req.params.id;
        let sql= "select * from personas WHERE id='" + id + "'";
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok:true,
            message:"Personas consultada",
            content: rows[0],
        });
    } catch (error){
        return res.send({
            ok:false,
            message:"Ha ocurrido un error crenado el usuario",
            content: error,
        });
    }
    
    
}

const createPersona = async (req, res) => {
    try {
        let user = req.body;
        let sql = `INSERT INTO public.personas (name, email) VALUES( '${user.name}', '${user.email}');`;
        let result = await _pg.executeSql(sql);
        console.log(result);
        return res.send({
            ok:true,
            message: result.rowCount ==1? "Persona creada" : "El usuario no fue creado",
            content: user,
        });
    } catch (error) {
        return res.send({
            ok:false,
            message:"Ha ocurrido un error creando el usuario",
            content: error,
        });
    }
    
    
};

const updatePersona = async (req, res) => {
    try{
        let id = req.params.id;
        let user = req.body;
        let sql = `UPDATE public.personas SET name='${user.name}', email='${user.email}' WHERE id='${id}'`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok:true,
            message: result.rowCount ==1? "Persona modificada" : "El usuario no fue modificado",
            content: user,
        });
    } catch (error) {
        return res.send({
            ok:false,
            message:"Ha ocurrido un error actualizando el usuario",
            content: error,
        });

    }
}

const deletePersona = async (req, res) => {
    try{
        let id = req.params.id;
        let sql = `DELETE FROM public.personas WHERE id='${id}'`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok:true,
            message: result.rowCount ==1? "Persona eliminada" : "El usuario no fue eliminado",
            content: user,
        });
    } catch (error) {
        return res.send({
            ok:false,
            message:"Ha ocurrido un error eliminado el usuario",
            content: error,
        });
    }
}

module.exports = {getPersonas, getPersona, createPersona, updatePersona, deletePersona};
