import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
  } from "./card"

import getTargetWords from "../words"; 

function WordDisplay(){

    const wordCount = 5;
    const [gameStarted, setGameStarted] = useState(false); 
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState("");
    const [targetWord, setTargetWord] = useState("");
    const [displayReport, setDisplayReport] = useState(false)
    const [sessionWords, setSessionWords] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());


    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getTimeBetweenDates(date1, date2) {
        const diff = Math.abs(date2 - date1); // Difference in milliseconds
      
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
        return (
            <div>
                <label class="font-bold px-1">Total Time:</label>
                Hour: {hours} Min: {minutes} Sec: {seconds}
            </div>
        )
      }

    function start(){
        setSessionWords([]);
        setWords([]);
        setGameStarted(true);
        setDisplayReport(false);
        pickRandomWord(getTargetWords());
        setStartTime(new Date());
    }
    
    function end(){
        if (gameStarted === true){
            setEndTime(new Date());
        }
        setGameStarted(false);
        setDisplayReport(true);
    }

    useEffect(() => {
        if (words.length === wordCount) {
          // store old array somewhere
          var updatedValue = {}
          updatedValue = {
            "word": targetWord,
            "words": words
         }
          setSessionWords(sessionWords => ([
            ...sessionWords,
            updatedValue
          ]));
          // pick new target word
          pickRandomWord(words);
          // clear array
          setWords([]);
        }
      }, [words,pickRandomWord,targetWord,wordCount]);
    
    function pickRandomWord(wordList){
        const randomIndex = randomIntFromInterval(0, wordList.length-1);
        setTargetWord(wordList[randomIndex]);
    }

    function addWord(){

        setWords(oldWords => [...oldWords, currentWord]);
        setCurrentWord("");

    }

    const updateCurrentWord = (event) => {
        setCurrentWord(event.target.value);

    }

    const hitEnterKey = (e) => {
        if (e.key === 'Enter'){
            addWord();
        }
    }

    function renderForm(){
        if (gameStarted){
            return (
                <div>
                    {/* Current word */}
                    <h1 class="text-2xl font-extrabold leading-none tracking-tight py-2">Word: {targetWord}</h1>
                    {/* button for voice mode */}
                    {/* Input field to enter word */}
                    <input type="text" value={currentWord} onChange={updateCurrentWord} onKeyDown={hitEnterKey} placeholder="Enter word" class="text-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    {/* button to enter word */}
                    <button onClick={addWord} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Enter</button>
                    {/* List of words display */}
                    <div class="p-2">
                        
                            {words.map(function(word, idx){
                            return (
                                <li key={idx}>{word}</li>
                            )
                        })}
                        
                    </div>
                    

                </div>
            )
        }
        return "";
    }

    function renderReport(){
        if (displayReport){
            return (
                <div>
                    <div class="border-solid border-2">
                        {/* Header */}
                        <h1 class="font-bold text-2xl md:text-2xl lg:text-3xl">Session Report</h1>
                    </div>
                    <div class="border-solid border-2">
                        {/* Summary */}
                        <h1 class="font-bold text-xl md:text-xl lg:text-2xl">Session Summary</h1>
                            {getTimeBetweenDates(startTime, endTime)}
                        <div>
                            <label class="font-bold px-1">Total Words:</label>
                            {sessionWords.length}
                        </div>
                    </div>
                    <div class="border-solid border-2">
                        {/* Details */}
                        <h1 class="font-bold text-xl md:text-xl lg:text-2xl">Session Details</h1>
                        <div class="flex">
                            {sessionWords.map(function(obj, keyIndex) {
                                return (
                                    <div class="w-fit px-3 space-x-4">
                                    
                                        <h1 class="font-bold text-center">{obj["word"]}</h1>
                                        <ul class="list-disc">
                                            {obj["words"].map(function(word, idx){
                                                return (
                                                            <li key={idx}>{word}</li>
                                                        )
                                            })}
                                        </ul>
                                        
                                    
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
        return "";
    }
    
    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Given a starting word, write down first 5 words that come to your mind.
                    Once 5 words are entered, a new word is picked from the previous 5 words and you continue.
                    <h3>Click Start button to start the session.</h3>
                    Click End button to end the session and get report.
                </CardDescription>
                <div class="space-x-4">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={start}>
                        Start
                    </button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={end}>
                        End
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                {renderForm()}
                {renderReport()}
            </CardContent>

        </Card>
    )
}

export default WordDisplay;