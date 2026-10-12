import { React, useState, useEffect } from 'react'
import { GoogleGenAI } from "@google/genai";

const SummariserPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Function to count words
  const countWords = (str) => {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  // Function to count sentences
  const countSentences = (str) => {
    return str.trim().split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  }

  // Function for paste functionality
  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    }
    catch (error) {
      console.error('Failed to paste', error);
      setError('Failed to paste from clipboard. Please use Ctrl+V to paste. ')
    }
  }

  // Summarize text function
  const summarizeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    if (text.trim().length < 50) {
      setError('Please enter at least 50 characters to summarize.');
      return;
    }

    setLoading(true);
    setError(null);
    setSummary('');

    try {
      // Importing the Google Gemini
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY
      });

      const response = await ai.interactions.create({
        model: 'gemini-3.5-flash',
        input: 'Please provide a concise one-sentence summary of the following text:\n\n' + text,
        generation_config: {
          thinking_level: "low",
        },
      })
      const data = response.steps[1].content[0].text;
      setSummary(data);

      console.log('Summarization response:', response.steps[1].content[0].text);
    } catch (error) {
      console.error('Summarization failed', error);
      setError(error.message || 'Summarization failed. Please try again later.')
    } finally {
      setLoading(false);
    }
  }

  // Function to copy summary to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      const timeoutId = setTimeout(() => setCopied(false), 2000);
      return () => { clearTimeout(timeoutId); }

    } catch (error) {
      console.error('Failed to copy summary', error);
      setError('Failed to copy to clipboard. Please try again later.')
    }
  }

  // const clear all function
  const clearAll = () => {
    setText('');
    setSummary('');
    setError(null);
    setCopied(false)
  }
  
  return (
    <div>SummariserPage</div>
  )
}

export default SummariserPage