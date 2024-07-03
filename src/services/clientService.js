import { getClientByEmail, updateClientById, updateWelcomeMessage, getClientByTelegram } from "../dao/clientDAO.js";

export const getClientByEmailService = async email => {
    try {
        const client = await getClientByEmail(email)
        return client;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getClientByTelegramService = async tgchatid => {
    try {
        const client = await getClientByTelegram(tgchatid)
        return client;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const calculateTotalLeads = orders => {
    let totalQuantity = 0;

    orders.forEach((order) => {
        if (!order.delivered) {
            totalQuantity += order.quantity;
        }
    });

    return totalQuantity;
};

export const setTelegramChatIdService = async (userId, telegramChatId) => {
    try {
        const response = await updateClientById(userId, { tgchatid: telegramChatId })
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateWelcomeMessageService = async (email, welcomeMessage) => {
    try {
        const response = await updateWelcomeMessage(email, welcomeMessage);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};