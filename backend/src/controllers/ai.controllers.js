const aiService = require("../services/ai.services")

module.exports.getResponse = async (req, res)=>{
    try {
        const code = req.body.code;

        if(!code){
            return res.status(400).json({error: "Prompt is required"})
        }

        const response = await aiService(code)
        res.send(response);
    } catch (error) {
        console.error("AI response error:", error.message)
        res.status(500).json({ error: "Failed to generate AI response" })
    }
}
