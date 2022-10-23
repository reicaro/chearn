import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    //api key of a fresh test account, no payment linked
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function call_prompt(prompt) {
    const response = await openai.createCompletion("text-davinci-002", {
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        });
    return response.choices[0].text;
}