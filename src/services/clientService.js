import { getClientByEmail } from "../dao/clientDAO.js";

export const getClientByEmailService = async email => {
    try {
        const client = await getClientByEmail(email)
        return client;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
