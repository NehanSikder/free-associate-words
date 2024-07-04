import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "./card"
import WordInput from "./WordInput";
  


function WordDisplay(){

    const [gameStarted, setGameStarted] = useState(false); 
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState("");
    const [wordCount, setWordCount] = useState(5);
    const [targetWord, setTargetWord] = useState("Chair");

    function start(){
        setGameStarted(true);
    }
    
    function end(){
        setGameStarted(false);
    }

    function addWord(){
        setWords(words => [...words,currentWord] );
        if (words.length == wordCount){
            // pick new target word
            // store old array somewhere 
            // clear array
        }
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
                    <h1>{targetWord}</h1>
                    {/* button for voice mode */}
                    {/* Input field to enter word */}
                    <input type="text" value={currentWord} onChange={updateCurrentWord} onKeyDown={hitEnterKey}/>
                    {/* button to enter word */}
                    <button onClick={addWord}>Enter</button>
                    {/* List of words display */}
                    <div>
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
            </CardContent>

        </Card>
    )
}

export default WordDisplay;