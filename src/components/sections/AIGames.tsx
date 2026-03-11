import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
    Gamepad2,
    RotateCcw,
    Table2,
    Trophy,
    User,
    Cpu
} from "lucide-react";

// --- Constants ---
const ROWS = 6;
const COLS = 7;
const EMPTY = null;
const PLAYER = "RED";
const AI = "YELLOW";

// --- Smart Tic-Tac-Toe Logic (Minimax) ---
const checkTttWinner = (board: (string | null)[]) => {
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

const tttMinimax = (board: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const winner = checkTttWinner(board);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (winner === "draw") return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = "O";
                const score = tttMinimax(board, depth + 1, false);
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
                const score = tttMinimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const findTttBestMove = (board: (string | null)[]) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = "O";
            const score = tttMinimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
};

// --- Connect Four Logic ---
type Board = (string | null)[][];

const createBoard = (): Board => Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY));

const checkC4Winner = (board: Board) => {
    // Horizontal
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (board[r][c] && board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] && board[r][c] === board[r][c + 3])
                return board[r][c];
        }
    }
    // Vertical
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c] && board[r][c] === board[r + 1][c] && board[r][c] === board[r + 2][c] && board[r][c] === board[r + 3][c])
                return board[r][c];
        }
    }
    // Positive Diagonal
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (board[r][c] && board[r][c] === board[r + 1][c + 1] && board[r][c] === board[r + 2][c + 2] && board[r][c] === board[r + 3][c + 3])
                return board[r][c];
        }
    }
    // Negative Diagonal
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            if (board[r][c] && board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3])
                return board[r][c];
        }
    }

    if (board[0].every(cell => cell !== EMPTY)) return "draw";
    return null;
};

const evaluateWindow = (window: (string | null)[], piece: string) => {
    let score = 0;
    const oppPiece = piece === PLAYER ? AI : PLAYER;

    const count = window.filter(c => c === piece).length;
    const empty = window.filter(c => c === EMPTY).length;
    const oppCount = window.filter(c => c === oppPiece).length;

    if (count === 4) score += 100;
    else if (count === 3 && empty === 1) score += 5;
    else if (count === 2 && empty === 2) score += 2;

    if (oppCount === 3 && empty === 1) score -= 4;

    return score;
};

const scorePosition = (board: Board, piece: string) => {
    let score = 0;

    // Center column preference
    const centerArray = board.map(r => r[Math.floor(COLS / 2)]);
    const centerCount = centerArray.filter(c => c === piece).length;
    score += centerCount * 3;

    // Horizontal
    for (let r = 0; r < ROWS; r++) {
        const rowArray = board[r];
        for (let c = 0; c < COLS - 3; c++) {
            score += evaluateWindow(rowArray.slice(c, c + 4), piece);
        }
    }

    // Vertical
    for (let c = 0; c < COLS; c++) {
        const colArray = board.map(r => r[c]);
        for (let r = 0; r < ROWS - 3; r++) {
            score += evaluateWindow(colArray.slice(r, r + 4), piece);
        }
    }

    // Positive Diagonal
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]];
            score += evaluateWindow(window, piece);
        }
    }

    // Negative Diagonal
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [board[r][c], board[r - 1][c + 1], board[r - 2][c + 2], board[r - 3][c + 3]];
            score += evaluateWindow(window, piece);
        }
    }

    return score;
};

const getValidLocations = (board: Board) => {
    const valid = [];
    for (let c = 0; c < COLS; c++) {
        if (board[0][c] === EMPTY) valid.push(c);
    }
    return valid;
};

const getNextOpenRow = (board: Board, col: number) => {
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === EMPTY) return r;
    }
    return -1;
};

const c4Minimax = (board: Board, depth: number, alpha: number, beta: number, isMaximizing: boolean): [number | null, number] => {
    const winner = checkC4Winner(board);
    const isTerminal = winner !== null;
    const validLocations = getValidLocations(board);

    if (depth === 0 || isTerminal) {
        if (isTerminal) {
            if (winner === AI) return [null, 100000000000000];
            if (winner === PLAYER) return [null, -100000000000000];
            return [null, 0];
        }
        return [null, scorePosition(board, AI)];
    }

    if (isMaximizing) {
        let value = -Infinity;
        let column = validLocations[Math.floor(Math.random() * validLocations.length)];
        for (let col of validLocations) {
            const row = getNextOpenRow(board, col);
            const bCopy = board.map(r => [...r]);
            bCopy[row][col] = AI;
            const newScore = c4Minimax(bCopy, depth - 1, alpha, beta, false)[1];
            if (newScore > value) {
                value = newScore;
                column = col;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta) break;
        }
        return [column, value];
    } else {
        let value = Infinity;
        let column = validLocations[Math.floor(Math.random() * validLocations.length)];
        for (let col of validLocations) {
            const row = getNextOpenRow(board, col);
            const bCopy = board.map(r => [...r]);
            bCopy[row][col] = PLAYER;
            const newScore = c4Minimax(bCopy, depth - 1, alpha, beta, true)[1];
            if (newScore < value) {
                value = newScore;
                column = col;
            }
            beta = Math.min(beta, value);
            if (alpha >= beta) break;
        }
        return [column, value];
    }
};

export default function AIGames() {
    const [activeGame, setActiveGame] = useState<"ttt" | "c4">("ttt");
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    // Tic-Tac-Toe States
    const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [tttWinner, setTttWinner] = useState<string | null>(null);
    const [isTttTurn, setIsTttTurn] = useState(true);

    // Connect 4 States
    const [c4Board, setC4Board] = useState<Board>(createBoard());
    const [c4Winner, setC4Winner] = useState<string | null>(null);
    const [isC4Turn, setIsC4Turn] = useState(true);

    // --- Tic-Tac-Toe Actions ---
    const handleTttClick = (index: number) => {
        if (tttBoard[index] || tttWinner || !isTttTurn) return;

        const newBoard = [...tttBoard];
        newBoard[index] = "X";
        setTttBoard(newBoard);

        const winner = checkTttWinner(newBoard);
        if (winner) {
            setTttWinner(winner);
        } else {
            setIsTttTurn(false);
        }
    };

    useEffect(() => {
        if (activeGame === "ttt" && !isTttTurn && !tttWinner) {
            const timer = setTimeout(() => {
                const bestMove = findTttBestMove(tttBoard);
                if (bestMove !== -1) {
                    const newBoard = [...tttBoard];
                    newBoard[bestMove] = "O";
                    setTttBoard(newBoard);
                    const winner = checkTttWinner(newBoard);
                    if (winner) setTttWinner(winner);
                    setIsTttTurn(true);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isTttTurn, tttBoard, tttWinner, activeGame]);

    const resetTtt = () => {
        setTttBoard(Array(9).fill(null));
        setTttWinner(null);
        setIsTttTurn(true);
    };

    // --- Connect 4 Actions ---
    const handleC4Click = (col: number) => {
        if (!isC4Turn || c4Winner || c4Board[0][col] !== EMPTY) return;

        const row = getNextOpenRow(c4Board, col);
        if (row === -1) return;

        const newBoard = c4Board.map(r => [...r]);
        newBoard[row][col] = PLAYER;
        setC4Board(newBoard);

        const winner = checkC4Winner(newBoard);
        if (winner) {
            setC4Winner(winner);
        } else {
            setIsC4Turn(false);
        }
    };

    useEffect(() => {
        if (activeGame === "c4" && !isC4Turn && !c4Winner) {
            const timer = setTimeout(() => {
                const [bestCol] = c4Minimax(c4Board, 4, -Infinity, Infinity, true);
                if (bestCol !== null) {
                    const row = getNextOpenRow(c4Board, bestCol);
                    const newBoard = c4Board.map(r => [...r]);
                    newBoard[row][bestCol] = AI;
                    setC4Board(newBoard);
                    const winner = checkC4Winner(newBoard);
                    if (winner) setC4Winner(winner);
                    setIsC4Turn(true);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isC4Turn, c4Board, c4Winner, activeGame]);

    const resetC4 = () => {
        setC4Board(createBoard());
        setC4Winner(null);
        setIsC4Turn(true);
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
                        Algorithmic Combat
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
                            { id: "c4", name: "Connect Four", icon: Table2 },
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
                                <div className="mb-6">
                                    <h4 className="text-xl font-bold mb-2">Smart Tic-Tac-Toe</h4>
                                    <p className="text-gray-500 text-sm">3x3 Strategy vs Minimax AI</p>
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
                                    <div className="text-sm font-medium text-gray-500">
                                        {isTttTurn ? "Your Turn (X)" : "AI is thinking..."}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeGame === "c4" && (
                            <motion.div
                                key="c4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 max-w-md mx-auto"
                            >
                                <div className="mb-6 flex justify-between items-center px-4">
                                    <div className="text-left">
                                        <h4 className="text-xl font-bold mb-1">Connect Four AI</h4>
                                        <p className="text-gray-500 text-xs">Get four in a row to win!</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <span className="text-[10px] font-bold text-gray-400">YOU</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                            <span className="text-[10px] font-bold text-gray-400">AI</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-600 p-3 rounded-2xl shadow-inner mb-6 relative overflow-hidden">
                                    <div className="grid grid-cols-7 gap-2">
                                        {c4Board.map((row, r) =>
                                            row.map((cell, c) => (
                                                <div
                                                    key={`${r}-${c}`}
                                                    className="relative aspect-square rounded-full bg-blue-800 shadow-inner overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => handleC4Click(c)}
                                                        className={`absolute inset-0 w-full h-full rounded-full transition-colors z-20 ${!c4Winner && isC4Turn ? "hover:bg-white/5 cursor-pointer" : "cursor-default"
                                                            }`}
                                                    />
                                                    <AnimatePresence>
                                                        {cell && (
                                                            <motion.div
                                                                initial={{ y: -(r + 1) * 80 }}
                                                                animate={{ y: 0 }}
                                                                transition={{
                                                                    type: "spring",
                                                                    stiffness: 300,
                                                                    damping: 20,
                                                                    mass: 0.8
                                                                }}
                                                                className={`absolute inset-0 w-full h-full rounded-full shadow-lg z-10 ${cell === PLAYER ? "bg-red-500" : "bg-yellow-400"
                                                                    }`}
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {c4Winner ? (
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Trophy className={`w-6 h-6 ${c4Winner === PLAYER ? "text-red-500" : c4Winner === AI ? "text-yellow-500" : "text-gray-400"}`} />
                                            <p className="text-xl font-bold">
                                                {c4Winner === "draw" ? "It's a Draw!" : c4Winner === PLAYER ? "You Won!" : "AI Won!"}
                                            </p>
                                        </div>
                                        <button onClick={resetC4} className="flex items-center space-x-2 text-primary font-bold hover:underline py-2">
                                            <RotateCcw className="w-5 h-5" />
                                            <span>Play Again</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-3 py-2">
                                        {isC4Turn ? (
                                            <>
                                                <User className="w-4 h-4 text-red-500" />
                                                <span className="text-sm font-semibold text-gray-600">Your Turn (Red)</span>
                                            </>
                                        ) : (
                                            <>
                                                <Cpu className="w-4 h-4 text-yellow-500 animate-pulse" />
                                                <span className="text-sm font-semibold text-gray-600">AI is thinking...</span>
                                            </>
                                        )}
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
