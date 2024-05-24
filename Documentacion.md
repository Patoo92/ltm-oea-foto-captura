Instalación de Dependencias
Para instalar las dependencias necesarias, ejecuta los siguientes comandos en la raíz del proyecto:


npm install ldrs
npm install multer
npm install nodemailer
npm install express
npm install dotenv



Uso de Dependencias
Express: Framework para manejar el servidor y las rutas.
Multer: Middleware para la carga de archivos.
Nodemailer: Librería para enviar correos electrónicos.
dotenv: Carga variables de entorno desde un archivo .env.
ldrs: Asegúrate de revisar la documentación específica de esta dependencia para su correcta implementación.




Configuración de Variables de Entorno
El archivo .env se utiliza para manejar variables de entorno sensibles como claves API y credenciales. Ejemplo de variables que puedes definir:

PORT=3000
EMAIL_SERVICE=your-email-service
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

Para las variables de entorno hay que configurar la contraseña de aplicación, esto se hace desde la cuenta de correo gmail que deseas utilizar para que te lleguen los emails

Enlace para obtener la contraseña de aplicación (La misma se utiliza en la configuracion del servidor y sirve como variable de entorno para el envio de emails)

https://accounts.google.com/v3/signin/challenge/pwd?TL=ALv_Gf_Qm91YZnH0uS5hHQ5IQXR6e2ISHeW_HWESzpKJm5xTCr7ec478U7WSACTi&cid=2&continue=https%3A%2F%2Fmyaccount.google.com%2Fapppasswords%3Fpli%3D1%26rapt%3DAEjHL4N7IBeI5kV7VuGkcsuF4y8beiwUws389sRQsHMygwJahY0WCY3lGeb7NEcvBxHeeViQxxHaO5r8s1SB0WTk-BhxdocBULZvyqZ_FUB35TdU-ta7y1U&flowName=GlifWebSignIn&followup=https%3A%2F%2Fmyaccount.google.com%2Fapppasswords%3Fpli%3D1%26rapt%3DAEjHL4N7IBeI5kV7VuGkcsuF4y8beiwUws389sRQsHMygwJahY0WCY3lGeb7NEcvBxHeeViQxxHaO5r8s1SB0WTk-BhxdocBULZvyqZ_FUB35TdU-ta7y1U&ifkv=AaSxoQwV43-6sEq1co6PtaM8fQqfCfaYPaBGQML0M5nwmjGfuXxEuSLkVJ34FAjEKd2Ms2KR2U6orw&osid=1&rart=ANgoxcdhtnPPTjo45kISrEoF5MJulj02DiNjPJ9Zeu9xAVMJK-EOTYHiQ-JJmTS783xU8t1rtLLxtY3qixT0SEdUR1Byz2Cx630vBnm7dAuoZ05BeWdFPQM&rpbg=1&service=accountsettings

^Para ejecutar el servidor: node server.js


Archivos Clave
server.js: Configuración del servidor y rutas.
public/: Contiene los archivos estáticos CSS, JS, y HTML.
uploads/: Directorio donde se almacenan los archivos cargados.
