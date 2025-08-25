import * as MessageModel from './messages.model.js';

export const MessagesController = {
    getMessage: async (req, res) => {
        try {
            const messages = await MessageModel.getAllMessage(); // plural, konsisten
            res.status(200).json({
                success: true,
                message: "Messages retrieved successfully",
                data: messages
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err.message
            });
        }
    },

    postMessage: async (req, res) => {
        try {
            const { fullName, email, message } = req.body;
            const newMessage = await MessageModel.postMessage(fullName, email, message);
            res.status(201).json({
                success: true,
                message: "Message created successfully",
                data: newMessage
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err.message
            });
        }
    }
}
