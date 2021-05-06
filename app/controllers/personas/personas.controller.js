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
        const _excel = new ExcelService();
        await _excel.createWorkSheet(rows);
        //res.download('http://localhost:3001/personas.xlsx');
        return res.send({
            url: 'http://localhost:3001/personas.xlsx',
            ok:true,
            message:"Personas consultadas",
            content: rows,
        });
    } catch (error){
        return res.send({
            ok:false,
            message:"Ha ocurrido un error creando el usuario",
            content: error,
        });
    }
    
    
}
 /**
  * Consultar una persona por id
  * @param {Request} req 
  * @param {Response} res 
  * @returns 
  */
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
            message:"Ha ocurrido un error creando el usuario",
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

const report = async (req, res) => {
	try {
		let rows = await getUsers();
		const excel = new ExcelService();
		await excel.createWorkSheet(rows);
		return res.send({
			url: "http://localhost:3001/reportes/personas.xlsx",
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

module.exports = {getPersonas, getPersona, createPersona, updatePersona, deletePersona};
