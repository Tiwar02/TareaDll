const PostgresService = require('../../services/postgres.service')
const _pg = new PostgresService();


const EmailService = require('../../services/email.service');
const _email = new EmailService();

const ExcelService = require('../../services/excel.service');

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
            message:"Ha ocurrido un error obteniendo los usuarios",
            content: error,
        });
    }
    
    
}
 

/**
 * Crear una persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const createPersona = async (req, res) => {
    try {
        let user = req.body;
        let sql = `INSERT INTO public.personas (name, email) VALUES( '${user.name}', '${user.email}');`;
        let result = await _pg.executeSql(sql);
        console.log(result);
        if (result.rowCount==1) {
            _email.sendEmail(user.email);
        }
        return res.send({
            ok:true,
            message: result.rowCount ==1? "Persona creada" : "El usuario no fue creado",
            content: user,
        });
    } catch (error) {
        return res.send({
            ok:false,
            message:"Ha ocurrido un error CREANDO el usuario",
            content: error,
        });
    }
    
    
};

/**
 * Actualizar info de persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
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

/**
 * Eliminar persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const deletePersona = async (req, res) => {
    try{
        let id = req.params.id;
        let sql = `DELETE FROM public.personas WHERE id='${id}'`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok:true,
            message: result.rowCount ==1? "Persona eliminada" : "El usuario no fue eliminado"
        });
    } catch (error) {
        return res.send({
            ok:false,
            message:"Ha ocurrido un error eliminado el usuario",
            content: error,
        });
    }
}

const report = async (req, res) => {
	try {
        let sql= 'select * from personas';
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
		const excel = new ExcelService();
		await excel.excelCreado(rows);
		return res.send({
			ok: true,
			message: "Reporte entregado",
		});
	} catch (error) {
		return res.send({
			ok: false,
			message: "ERROR",
			content: error,
		});
	}
};

module.exports = {getPersonas, createPersona, updatePersona, deletePersona, report};
