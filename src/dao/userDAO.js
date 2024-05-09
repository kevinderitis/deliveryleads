import User from "./models/userModel.js";

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Cliente no encontrado')
        }
        return user;
    } catch (error) {
        console.error('Error al obtener usuario por correo electrónico:', error.message);
        throw new Error('No se pudo encontrar el usuario');
    }
};


export { getUserByEmail };