
const nodemailer = require("nodemailer");

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ssgprueba@gmail.com',
                pass: 'ssgprueba123',
            },
        });

        this.mailOptions = {
            from: 'ssgprueba@gmail.com',
            to: '',
            subject: 'Bienvenido, ¡Se ha registrado con exito!',
            html:'<b>USUARIO CREADO </b> <br> Bienvenido a nuestro sistema <br/>',
        }
    }

    async sendEmail(email) {
        this.mailOptions.to = email;
        await this.transporter.sendMail(this.mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            } else {
                console.log("Email enviado: " + info.response);
            }
        })
    }
}

module.exports = EmailService;