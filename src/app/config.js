//Exportamos la ruta para toma imagenes

export let Path = {

	url : 'http://localhost:4200/assets/'
}

//Exportamos el endPoint de la APIREST de Firebase

export let Api = {

	url:'https://marketplace-d4416-default-rtdb.firebaseio.com/'	
}

//Exportamos el endPoint para el registro de usuarios en Firebase Authentication

export let Register = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbGc4thd67KjwEUcYke9_34Sk0FijtpOY'
}

//Exportamos el endPoint para el ingreso de usuarios en Firebase Authentication

export let Login = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbGc4thd67KjwEUcYke9_34Sk0FijtpOY'
}


//Exportamos el endPoint para enviar verificacion de correo electronico

export let SendEmailVerification = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBbGc4thd67KjwEUcYke9_34Sk0FijtpOY'
}

//Exportamos el endPoint para confirmar email de verificacion

export let ConfirmEmailVerification = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBbGc4thd67KjwEUcYke9_34Sk0FijtpOY'
}


//Exportamos el endPoint para tomar la data del usuario en Firebase Auth

export let GetUserData = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBbGc4thd67KjwEUcYke9_34Sk0FijtpOY'
}

//Exportamos el endPoint para resetear la contraseña

export let SendPasswordResetEmail = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBbGc4thd67KjwEUcYke9_34Sk0FijtpOY'
}

//Exportamos el endpoint para confirmar el cambio de la contraseña

export let VerifyPasswordResetCode = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyBbGc4thd67KjwEUcYke9_34Sk0FijtpOY'
}


//Exportamos el endpoint para enviar la nueva contraseña 

export let ConfirmPasswordReset = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyBbGc4thd67KjwEUcYke9_34Sk0FijtpOY'
}


