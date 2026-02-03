import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Minimize2, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Import CSV as raw string using Vite's ?raw suffix
import espositoriCsv from "../../data/espositori.csv?raw";
import eventiCsv from "../../data/eventi.csv?raw";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}



export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Ciao! Sono l'assistente virtuale AI di SIGEP World. Chiedimi qualsiasi cosa su espositori ed eventi!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [contextData, setContextData] = useState<{ exhibitors: string, events: string }>({ exhibitors: "", events: "" });

  // Load CSV data on mount
  useEffect(() => {
    // Process CSVs purely as text for the LLM context to save processing time
    // But we still want to ensure they are loaded.
    setContextData({
      exhibitors: espositoriCsv,
      events: eventiCsv
    });
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with Gemini
    generateGeminiResponse(inputValue);
  };

  const generateGeminiResponse = async (userInput: string) => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Tu sei l'assistente ufficiale del SIGEP. Rispondi in italiano.
        Usa i seguenti dati per rispondere alle domande dell'utente.
        
        DATI ESPOSITORI (Nome, Posizione, Categoria/Note):
        ${contextData.exhibitors}
        
        DATI EVENTI (Titolo, Data, Ora, Luogo):
        ${contextData.events}

        ISTRUZIONI:
        - Rispondi in modo preciso basandoti SOLO sui dati forniti.
        - Se l'utente cerca un'azienda, fornisci la posizione esatta.
        - Gestisci errori di battitura nei nomi (es. "Bindi" invece di "BINDI S.p.A.").
        - Se non trovi un'espositore, offri di cercare per categoria se possibile o suggerisci nomi simili.
        - Sii cordiale e professionale.

        Domanda utente: ${userInput}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: text,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Mi dispiace, ho avuto un problema nel processare la tua richiesta. Riprova più tardi.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[600px] animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-accent text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Gemini Assistant</h3>
              <p className="text-xs text-white/80">Powered by Google AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] ${message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                    }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString("it-IT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-white">TU</span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-secondary rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-secondary/30">
          <div className="flex gap-2">
            <Input
              placeholder="Scrivi il tuo messaggio... (es. Bindi)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Premi Invio per inviare • Prova a cercare un'azienda
          </p>
        </div>
      </div>
    </div>
  );
}
