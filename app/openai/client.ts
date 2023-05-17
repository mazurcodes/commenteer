import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-JrUdMITzi3TxHi0fsN1Piecq',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
