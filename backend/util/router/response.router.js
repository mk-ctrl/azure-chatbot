import express from "express";
const router = express.Router();

// ✅ query function (your fetch wrapper)
async function query(data) {
    const response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
            headers: {
                Authorization: `Bearer ${process.env.HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

// ✅ Express route
router.post("/bot", async (req, res) => {
    try {
        const { message } = req.body;
        console.log("User:", message);

        // Call Hugging Face router
        const chatResponse = await query({
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "zai-org/GLM-4.5:novita",
        });

        console.log("HF Response:", chatResponse);

        // Safely check if choices exist
        const reply =
            chatResponse?.choices?.[0]?.message?.content ||
            "No response received";

        return res.status(200).json({
            response: reply,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
});

export default router;
