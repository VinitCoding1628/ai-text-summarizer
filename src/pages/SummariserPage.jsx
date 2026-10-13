import { React, useState, useEffect, useRef } from 'react'
import { GoogleGenAI } from "@google/genai";
import { Textarea } from '@/components/ui/textarea';
import { CheckIcon, ClipboardIcon, SparkleIcon, SparklesIcon, TrashIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Spinner } from '@/components/ui/spinner';
import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { Toaster, toast } from 'sonner';
import { Blocks } from "loading-dev";
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';

const SummariserPage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const summarizingRef = useRef(false);

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
      toast.error('Failed to paste', {
        description: 'Please use Ctrl+V to paste.',
      });
    }
  }

  // Summarize text function
  const summarizeText = async () => {
    let timeoutID;
    if (summarizingRef.current || loading) return;
    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    if (text.trim().length < 50) {
      setError('Please enter at least 50 characters to summarize.');
      return;
    }
    summarizingRef.current = true;
    timeoutID = setLoading(true);
    setError(null);
    setSummary('');

    try {
      // Importing the Google Gemini
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY
      });

      const response = await ai.interactions.create({
        model: 'gemini-3.5-flash-lite',
        input: 'Please provide a concise paragraph summary of the following text:\n\n' + text,
        generation_config: {
          thinking_level: "low",
        },
      })
      const data = response.steps[1].content[0].text;
      setSummary(data);

      console.log('Summarization response:', response.steps[1].content[0].text);
    } catch (error) {
      toast.error('Summarization failed', {
        description: error.message || 'Summarization failed. Please try again later.',
      });
    } finally {
      timeoutID = setTimeout(() => {
        setLoading(false);
      }, 1500);
      summarizingRef.current = false;
    }

    return () => {clearTimeout(timeoutID);}
  }

  // Function to copy summary to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      const timeoutId = setTimeout(() => setCopied(false), 2000);
      return () => { clearTimeout(timeoutId); }

    } catch (error) {
      toast.error('Failed to copy summary', {
        description: error.message || 'Failed to copy to clipboard. Please try again later.',
      });
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
    <div className='bg-linear-to-r from-bg-light-blue to-bg-light-violet pt-8 flex flex-col justify-start gap-6 w-full overflow-y-auto'>
      <Toaster />
      {/* Title */}
      <div className='flex flex-col items-center justify-center gap-3'>
        <h2 className='text-4xl font-bold'> Turn Long Text into <span className='italic text-primary'>Clear Summaries</span></h2>
        <p className='text-muted-foreground'>Paste your text and get a concise, easy-to-read summary using Google Gemini</p>
      </div>

      {/* Main Container */}
      <div className='bg-card p-3 mb-4 rounded-lg shadow flex lg:flex-row md:flex-col sm:flex-col flex-col justify-center gap-5 items-start lg:mx-8 md:mx-4 sm:mx-2 mx-2.5'>
        {/* Input Area */}
        <div className='p-3 rounded-lg my-2 flex flex-col gap-4 w-full'>
          {/* Text with words count */}
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold'>Input Text</h3>

            <div className='flex items-center gap-2'>
              <Button variant='outline' className='flex items-center justify-center gap-2' onClick={pasteText} disabled={loading}>
                <ClipboardIcon className='w-4 h-4' />
                <span>Paste Text</span>
              </Button>
              <Button variant='outline' className='flex items-center justify-center gap-2' onClick={clearAll} disabled={loading || !text.trim()}>
                <TrashIcon className='w-4 h-4' />
                <span>Clear</span>
              </Button>
            </div>
          </div>

          {/* Textarea  */}
          <Field data-invalid={!!error} className='flex justify-between items-center'>
            <Textarea
              id="summariser-input"
              placeholder="Enter or paste your content here..."
              className="h-[35dvh] resize-none"
              value={text}
              disabled={loading}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null); // clear invalid state while typing
              }}
              aria-invalid={!!error}
              aria-describedby={error ? "summariser-input-error" : undefined}
            />

            <div className="flex justify-between items-center my-3">
              {error ? (
                <FieldError className='text-sm text-red-500'>{error}</FieldError>
              ) : (
                <FieldDescription>Minimum 50 characters required.</FieldDescription>
              )}
              <p className="text-sm text-muted-foreground">
                {countWords(text)} words | {countSentences(text)} sentences
              </p>
            </div>
          </Field>

          {/* Action Buttons */}
          <div className='flex justify-end'>
            {
              <Button variant='primary' disabled={loading} className='flex items-center gap-2 px-4 py-5 bg-primary text-white hover:bg-primary/80 transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' onClick={summarizeText}>
                {
                  loading ? (
                    <>
                      <Spinner />
                      <span>Summarizing...</span>

                    </>
                  ) : (
                    <>
                      <SparklesIcon />
                      <span>Summarize</span>
                    </>
                  )
                }
              </Button>
            }
          </div>
        </div>

        {/* Separator */}
        <Separator className='lg:hidden md:block sm:block block'/>

        {/* Output Area */}
        <div className='bg-card p-3 rounded-lg my-2 flex flex-col gap-4 w-full me-3'>
          {/* Title */}
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>Summary</h3>
            <Button variant='outline' className='flex items-center justify-center gap-2 text-sm' onClick={copyToClipboard} disabled={loading}>
              {
                copied ? (
                  <>
                    <CheckIcon />
                    <span className='text-sm'>Copied</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon />
                    <span className='text-sm'>Copy to Clipboard</span>
                  </>
                )
              }
            </Button>
          </div>

          {/* Summary Area*/}
          <div className='text-sm text-muted-foreground p-4 rounded-lg bg-foreground/5 h-[35dvh]'>
            {/* Summary Text */}
            {
              summary.length > 0 && !loading && (
                <p className='h-full'>{summary}</p>
              )
            }
            
            {/* Ideal State of the summary area */}
            {
              summary.length === 0 && !loading && (
                <div className='flex flex-col items-center justify-center gap-2 h-full'>
                  <span className='p-4 bg-purple-200/70 rounded-full animate-bounce transition-colors duration-300 ease-in-out text-gray-600'><SparklesIcon /></span>
                  <h3 className='text-lg font-semibold'>Enter some text to get a summary of your text</h3>
                  <p className='text-sm text-muted-foreground'>The summary will be displayed here</p>
                </div>
              )
            }

            {/* Loading State */}
            {
              loading && (
                <div className='flex flex-col items-center justify-center gap-2 h-full'>
                  <Blocks size={40} className='text-muted-foreground'/>
                  <span className='text-sm text-muted-foreground animate-cell-ripple'>Generating your summary...</span>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default SummariserPage