import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
    Gamepad2,
    UserSearch,
    RotateCcw,
    CheckCircle2,
    XSquare,
    Sparkles,
    HelpCircle
} from "lucide-react";

// --- Smart Tic-Tac-Toe Logic (Minimax) ---
const checkWinner = (board: (string | null)[]) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]             // diags
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : "draw";
};

const minimax = (board: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (winner === "draw") return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = "O";
                const score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = "X";
                const score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const findBestMove = (board: (string | null)[]) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = "O";
            const score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
};

// --- Actor Guesser Data & Logic ---
interface Actor {
    name: string;
    isMale: boolean;
    isBollywood: boolean;
    isSouth: boolean;
    isVeteran: boolean; // Started before 2000
    hasNationalAward: boolean;
    isMegastar: boolean; // SRK, Salman, Rajini, etc.
}

const actors: Actor[] = [
    { name: "Shah Rukh Khan", isMale: true, isBollywood: true, isSouth: false, isVeteran: true, hasNationalAward: false, isMegastar: true },
    { name: "Salman Khan", isMale: true, isBollywood: true, isSouth: false, isVeteran: true, hasNationalAward: false, isMegastar: true },
    { name: "Amitabh Bachchan", isMale: true, isBollywood: true, isSouth: false, isVeteran: true, hasNationalAward: true, isMegastar: true },
    { name: "Rajinikanth", isMale: true, isBollywood: false, isSouth: true, isVeteran: true, hasNationalAward: false, isMegastar: true },
    { name: "Deepika Padukone", isMale: false, isBollywood: true, isSouth: false, isVeteran: false, hasNationalAward: false, isMegastar: true },
    { name: "Alia Bhatt", isMale: false, isBollywood: true, isSouth: false, isVeteran: false, hasNationalAward: true, isMegastar: false },
    { name: "Prabhas", isMale: true, isBollywood: false, isSouth: true, isVeteran: false, hasNationalAward: false, isMegastar: true },
    { name: "Allu Arjun", isMale: true, isBollywood: false, isSouth: true, isVeteran: false, hasNationalAward: true, isMegastar: true },
    { name: "Akshay Kumar", isMale: true, isBollywood: true, isSouth: false, isVeteran: true, hasNationalAward: true, isMegastar: true },
    { name: "Ranbir Kapoor", isMale: true, isBollywood: true, isSouth: false, isVeteran: false, hasNationalAward: false, isMegastar: true },
    { name: "Vijay Sethupathi", isMale: true, isBollywood: false, isSouth: true, isVeteran: false, hasNationalAward: true, isMegastar: false },
    { name: "Sridevi", isMale: false, isBollywood: true, isSouth: true, isVeteran: true, hasNationalAward: true, isMegastar: true },
    { name: "Kamal Haasan", isMale: true, isBollywood: true, isSouth: true, isVeteran: true, hasNationalAward: true, isMegastar: true },
];

const questions = [
    { id: "isMale", text: "Is the person Male?" },
    { id: "isBollywood", text: "Does the person primarily work in Bollywood?" },
    { id: "isSouth", text: "Does the person primarily work in South Indian Cinema?" },
    { id: "isVeteran", text: "Did their career start before the 2000s?" },
    { id: "hasNationalAward", text: "Have they won a National Film Award?" },
    { id: "isMegastar", text: "Are they considered a Global Megastar?" },
];

export default function AIGames() {
    const [activeGame, setActiveGame] = useState<"ttt" | "actor">("ttt");
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    // Tic-Tac-Toe States
    const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [tttWinner, setTttWinner] = useState<string | null>(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    // Actor Guesser States
    const [possibleActors, setPossibleActors] = useState<Actor[]>(actors);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [guessedActor, setGuessedActor] = useState<Actor | null>(null);
    const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

    // --- Tic-Tac-Toe Actions ---
    const handleTttClick = (index: number) => {
        if (tttBoard[index] || tttWinner || !isPlayerTurn) return;

        const newBoard = [...tttBoard];
        newBoard[index] = "X";
        setTttBoard(newBoard);

        const winner = checkWinner(newBoard);
        if (winner) {
            setTttWinner(winner);
        } else {
            setIsPlayerTurn(false);
        }
    };

    useEffect(() => {
        if (!isPlayerTurn && !tttWinner) {
            const timer = setTimeout(() => {
                const bestMove = findBestMove(tttBoard);
                if (bestMove !== -1) {
                    const newBoard = [...tttBoard];
                    newBoard[bestMove] = "O";
                    setTttBoard(newBoard);
                    const winner = checkWinner(newBoard);
                    if (winner) setTttWinner(winner);
                    setIsPlayerTurn(true);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, tttBoard, tttWinner]);

    const resetTtt = () => {
        setTttBoard(Array(9).fill(null));
        setTttWinner(null);
        setIsPlayerTurn(true);
    };

    // --- Actor Guesser Actions ---
    const handleActorAnswer = (answer: boolean) => {
        const currentQ = questions[currentQIndex];
        const filtered = possibleActors.filter(actor => (actor as any)[currentQ.id] === answer);

        setPossibleActors(filtered);

        if (filtered.length === 1) {
            setGuessedActor(filtered[0]);
            setGameStatus("won");
        } else if (filtered.length === 0 || currentQIndex + 1 >= questions.length) {
            if (filtered.length > 1) {
                // If many left but out of questions, just pick one as a "guess"
                setGuessedActor(filtered[Math.floor(Math.random() * filtered.length)]);
                setGameStatus("won");
            } else {
                setGameStatus("lost");
            }
        } else {
            setCurrentQIndex(currentQIndex + 1);
        }
    };

    const resetActor = () => {
        setPossibleActors(actors);
        setCurrentQIndex(0);
        setGuessedActor(null);
        setGameStatus("playing");
    };

    return (
        <section id="games" className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center" ref={ref}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4"
                    >
                        Play & Learn
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold mb-12"
                    >
                        AI <span className="text-primary">Playground</span>
                    </motion.h3>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {[
                            { id: "ttt", name: "Tic-Tac-Toe", icon: Gamepad2 },
                            { id: "actor", name: "Actor Guesser", icon: UserSearch },
                        ].map((game) => (
                            <button
                                key={game.id}
                                onClick={() => setActiveGame(game.id as any)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${activeGame === game.id
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-white text-gray-600 hover:bg-white/80 border border-gray-100"
                                    }`}
                            >
                                <game.icon className="w-5 h-5" />
                                <span className="font-semibold">{game.name}</span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeGame === "ttt" && (
                            <motion.div
                                key="ttt"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-sm mx-auto"
                            >
                                <div className="mb-6 text-center">
                                    <h4 className="text-xl font-bold mb-2">Smart Tic-Tac-Toe</h4>
                                    <p className="text-gray-500 text-sm">Can you beat the Minimax AI?</p>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-8">
                                    {tttBoard.map((cell, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleTttClick(i)}
                                            className={`w-full aspect-square text-3xl font-extrabold flex items-center justify-center rounded-2xl transition-all ${!cell ? "bg-gray-50 hover:bg-gray-100" : "bg-white shadow-inner"
                                                } ${cell === "X" ? "text-primary" : "text-gray-800"}`}
                                        >
                                            {cell}
                                        </button>
                                    ))}
                                </div>

                                {tttWinner ? (
                                    <div className="flex flex-col items-center">
                                        <p className="text-xl font-bold mb-4">
                                            {tttWinner === "draw" ? "It's a Draw!" : tttWinner === "X" ? "You Won!" : "AI Won!"}
                                        </p>
                                        <button onClick={resetTtt} className="flex items-center space-x-2 text-primary font-bold hover:underline">
                                            <RotateCcw className="w-5 h-5" />
                                            <span>Play Again</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-sm font-medium text-gray-500 text-center">
                                        {isPlayerTurn ? "Your Turn (X)" : "AI is thinking..."}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeGame === "actor" && (
                            <motion.div
                                key="actor"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-lg mx-auto"
                            >
                                <div className="mb-8 text-center">
                                    <h4 className="text-2xl font-bold mb-2 flex items-center justify-center space-x-2">
                                        <Sparkles className="text-yellow-500 w-6 h-6" />
                                        <span>Actor Guesser</span>
                                    </h4>
                                    <p className="text-gray-500">Think of an Indian movie actor, and I will guess!</p>
                                </div>

                                {gameStatus === "playing" ? (
                                    <div className="space-y-10">
                                        <div className="min-h-[100px] flex items-center justify-center">
                                            <motion.p
                                                key={currentQIndex}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-2xl font-semibold text-gray-800"
                                            >
                                                {questions[currentQIndex].text}
                                            </motion.p>
                                        </div>

                                        <div className="flex justify-center gap-6">
                                            <button
                                                onClick={() => handleActorAnswer(true)}
                                                className="px-10 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-primary/20"
                                            >
                                                YES
                                            </button>
                                            <button
                                                onClick={() => handleActorAnswer(false)}
                                                className="px-10 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all border border-gray-200"
                                            >
                                                NO
                                            </button>
                                        </div>

                                        <div className="text-sm text-gray-400 font-medium">
                                            Question {currentQIndex + 1} of {questions.length}
                                        </div>
                                    </div>
                                ) : gameStatus === "won" ? (
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 animate-bounce">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <p className="text-gray-500 mb-1">I am 99% sure you are thinking of...</p>
                                        <p className="text-3xl font-black text-primary mb-10">{guessedActor?.name}</p>
                                        <button onClick={resetActor} className="flex items-center space-x-2 text-primary font-bold hover:underline">
                                            <RotateCcw className="w-5 h-5" />
                                            <span>Play Again</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-6">
                                            <HelpCircle className="w-12 h-12" />
                                        </div>
                                        <p className="text-2xl font-bold mb-2">You beat me!</p>
                                        <p className="text-gray-500 mb-10">I couldn't guess the actor. You win this round!</p>
                                        <button onClick={resetActor} className="flex items-center space-x-2 text-primary font-bold hover:underline">
                                            <RotateCcw className="w-5 h-5" />
                                            <span>Play Again</span>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
