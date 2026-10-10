import { React, useState, useEffect } from 'react'
import { GoogleGenAI } from "@google/genai";

const App = () => {
  const [text, setText] = useState('he Solar System formed at least 4.568 billion years ago from the gravitational collapse of a region within a large molecular cloud.[b] This initial cloud was likely several light-years across and probably birthed several stars.[22] As is typical of molecular clouds, this one consisted mostly of hydrogen, with some helium, and small amounts of heavier elements fused by previous generations of stars.[23] As the pre-solar nebula[23] collapsed, conservation of angular momentum caused it to rotate faster. The center, where most of the mass collected, became increasingly hotter than the surroundings.[22] As the contracting nebula spun faster, it began to flatten into a protoplanetary disc with a diameter of roughly 200 AU[22][24] and a hot, dense protostar at the center.[25][26] The planets formed by accretion from this disc,[27] in which dust and gas gravitationally attracted each other, coalescing to form ever larger bodies. Hundreds of protoplanets may have existed in the early Solar System, but they either merged or were destroyed or ejected, leaving the planets, dwarf planets, and leftover minor bodies.[28][29] In the inner Solar System, heat from the accretion process exceeded the boiling point of hydrocarbon molecules for the first million years, leading to low carbon content for the inner planets. The boundary for this process has been dubbed the soot line.[30] As the Solar System disk cooled, this line moved inward and now lies within Earths orbit around the Sun.[31] Material other than metals and silicates, due to their higher boiling points, could not persist in solid form. Here planets formed that are mainly rocky, which are Mercury, Venus, Earth, and Mars. Because these refractory materials only comprised a small fraction of the solar nebula, the terrestrial planets could not grow very large.[28] The giant planets (Jupiter, Saturn, Uranus, and Neptune) formed further out, beyond the frost line, the point between the orbits of Mars and Jupiter where material is cool enough for volatile icy compounds to remain solid. The ices that formed these planets were more plentiful than the metals and silicates that formed the terrestrial inner planets, allowing them to grow massive enough to capture large atmospheres of hydrogen and helium, the lightest and most abundant elements.[28] Leftover debris that never became planets congregated in regions such as the asteroid belt, Kuiper belt, and Oort cloud.[28]');
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
  const copyToClipboard = async() => {
    try{
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      const timeoutId = setTimeout(() => setCopied(false), 2000);
      return () => {clearTimeout(timeoutId);}

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
    <div className=''>
      <button onClick={summarizeText} disabled={loading} className='bg-linear-to-r from-blue-300 px-6 py-2 text-white font-semibold rounded-xl shadow-md to-blue-500 disabled:text-slate-500 disabled:cursor-not-allowed'>
        {loading ? 'Summarizing...' : 'Click to Summarize'}
      </button>
    </div>
  )
}

export default App