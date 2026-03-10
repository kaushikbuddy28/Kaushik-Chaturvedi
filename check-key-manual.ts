import https from "https";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

function testKey() {
    console.log("Testing API Key with manual https request to v1/models...");
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

    https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
            if (res.statusCode === 200) {
                const json = JSON.parse(data);
                console.log("Success! Models available:");
                console.log(json.models.map(m => m.name).join("\n"));
            } else {
                console.error("Request failed:", res.statusCode, data);
            }
        });
    }).on("error", (e) => {
        console.error("Request error:", e.message);
    });
}

testKey();
