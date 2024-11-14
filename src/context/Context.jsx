import { createContext, useState } from "react";
import run from "../config/gemini";

// Define the formatResponse function
const formatResponse = (response) => {
    let paragraphs = response.split("\n");
    let formattedResponse = "";

    paragraphs.forEach(paragraph => {
        if (paragraph.startsWith("## ")) {
            formattedResponse += `<h2>${paragraph.slice(3)}</h2>`;
        } else if (paragraph.startsWith("- ")) {
            if (!formattedResponse.endsWith("</ul>")) {
                formattedResponse += "<ul>";
            }
            formattedResponse += `<li>${paragraph.slice(2)}</li>`;
        } else {
            let parts = paragraph.split("**");
            let newParagraph = "";

            parts.forEach((part, index) => {
                if (index % 2 === 1) {
                    newParagraph += `<b>${part}</b><br>`;
                } else {
                    newParagraph += part.replace(/\*/g, "<br>");
                }
            });

            formattedResponse += `<p>${newParagraph}</p>`;
        }
    });

    if (formattedResponse.endsWith("</li>")) {
        formattedResponse += "</ul>";
    }

    return `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; padding: 20px;">
            ${formattedResponse}
        </div>
    `;
};

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setloading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setloading(true);
        setShowResult(true);

        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        // Use the formatResponse function here
        let formattedResponse = formatResponse(response);

        // Handle the delay-based display
        let newResponseArray = formattedResponse.split(" ");
        newResponseArray.forEach((nextWord, i) => delayPara(i, nextWord + " "));

        setloading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
