import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "./card"

function WordDisplay(){

    const [gameStarted, setGameStarted] = useState(false); 
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState("");
    const [wordCount, setWordCount] = useState(5);
    const [targetWord, setTargetWord] = useState("Chair");
    const [displayReport, setDisplayReport] = useState(false)
    const [sessionWords, setSessionWords] = useState({});

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const getTargetWords = () => {
        // Gets list of target words
        // TODO implement a backend api call or db call or something else
        // TODO cache the array somewhere
        return ["chair", "table", "orange", "trees", "flags"]
    }

    function start(){
        setGameStarted(true);
        setDisplayReport(false);
    }
    
    function end(){
        setGameStarted(false);
        setDisplayReport(true);
    }

    useEffect(() => {
        if (words.length === wordCount) {
          // store old array somewhere
          var updatedValue = {}
          updatedValue[targetWord]=words
          setSessionWords(sessionWords => ({
            ...sessionWords,
            ...updatedValue
          }));
          // pick new target word
          const targetWords = getTargetWords();
          const randomIndex = randomIntFromInterval(0, targetWords.length-1);
          setTargetWord(targetWords[randomIndex]);
          // clear array
          setWords([]);
        }
      }, [words]);
    

    function addWord(){

        setWords(oldWords => [...oldWords, currentWord]);
        setCurrentWord("");

    }

    const updateCurrentWord = (event) => {
        setCurrentWord(event.target.value);

    }

    const hitEnterKey = (e) => {
        if (e.key == 'Enter'){
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
                        <div>
                            <label class="font-bold">Total Time:</label>
                        </div> 
                        <div>
                            <label class="font-bold">Total Words:</label>
                        </div>
                    </div>
                    <div class="border-solid border-2">
                        {/* Details */}
                        <h1 class="font-bold text-xl md:text-xl lg:text-2xl">Session Details</h1>
                        <div class="flex">
                            {Object.keys(sessionWords).map(function(key, keyIndex) {
                                return (
                                    <div class="w-fit px-3 space-x-4">
                                    
                                        <h1 class="font-bold text-center">{key}</h1>
                                        <ul class="list-disc">
                                            {sessionWords[key].map(function(word, idx){
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