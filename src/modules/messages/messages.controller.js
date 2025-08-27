import * as MessageModel from './messages.model.js';
import { success, error } from "../../utils/response.js"


export const MessagesController = {
    getMessage: async (req, res) => {
        try {
            const messages = await MessageModel.getAllMessage(); // plural, konsisten
            return success(res, messages, "Success to get message", 200)
        } catch (err) {
            console.error(err);
            return error(res, "Failed to get message", 500, err.message);
        }
    },

    postMessage: async (req, res) => {
        try {
            const { fullName, email, message } = req.body;
            const newMessage = await MessageModel.postMessage(fullName, email, message);
            return success(res, newMessage, "Created messages successfully", 200)
        } catch (err) {
            console.error(err);
            return error (res, "Failed to create messages", 500, err.message);
        }
    },
    
    deleteMessage: async (req, res) => {
        try {
            const { id } = req.params; // ambil id dari url
            const deletedMessage = await MessageModel.deleteMessage(id);

            if (!deletedMessage) {
                return res.status(404).json({
                    success: false,
                    message: "Message not found"
                });
            }
            return success(res, deletedMessage, "Successfully to deleted messages", 200)
        } catch (err) {
            console.error(err);
            return error(res, "Failed to deleted message", 500, err.message)
        }
    }
}
