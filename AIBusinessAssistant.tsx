import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getAIBusinessAdvice } from '../services/aiAdvisor';
import { AIMessage } from '../types';
import {
  Sparkles,
  Send,
  TrendingUp,
  Receipt,
  DollarSign,
  Scissors,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Users,
  Bot,
  User as UserIcon,
} from 'lucide-react';

export const AIBusinessAssistant: React.FC = () => {
  const {
    metrics,
    sales,
    expenses,
    services,
    staff,
    bookings,
    serviceProfitability,
    formatCurrency,
    user,
  } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial conversation
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Karibu ${user?.name || 'Owner'}! I am your EzzyBIZZ Business Assistant. I analyze your shop's sales (mauzo), operational costs (matumizi), appointments (miadi), and profit margins (faida) in real-time. Ask me anything or tap one of the quick questions below.`,
      timestamp: Date.now(),
      highlightData: {
        title: 'Current Profit Margin',
        value: `${metrics.profitMargin.toFixed(0)}% Faida`,
        subtext: `Gross Sales: ${formatCurrency(metrics.revenue)}`,
        category: 'profit',
      },
    },
  ]);

  const quickQuestions = [
    { label: "Mauzo ya Leo (Today's Sales)", prompt: "What are my total sales and profit today?" },
    { label: 'Faida Halisi (Net Profit)', prompt: 'What is my current net profit and margin?' },
    { label: 'Huduma Yenye Faida (Top Service)', prompt: 'Which service generates the highest profit?' },
    { label: 'Punguza Matumizi (Cost-Saving)', prompt: 'How can I reduce my barbershop expenses?' },
    { label: 'Miadi ya Wateja (Appointments)', prompt: 'How many customer appointments are booked?' },
    { label: 'Wafanyakazi (Barbers Roster)', prompt: 'How is my barber team performing?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt;
    if (!textToSend.trim() || loading) return;

    const userMessage: AIMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputPrompt('');
    setLoading(true);

    try {
      const advice = await getAIBusinessAdvice(textToSend, {
        currency: user?.currency || 'KSh',
        formatCurrency,
        metrics,
        sales,
        expenses,
        services,
        staff,
        bookings,
        serviceProfitability,
      });

      const assistantMessage: AIMessage = {
        id: 'ast_' + Date.now(),
        sender: 'assistant',
        text: advice.text,
        timestamp: Date.now(),
        highlightData: advice.highlightData,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'assistant',
          text: 'Pole sana (Sorry), could not process your query at this moment. Please try again.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">AI Business Assistant</h2>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              EzzyBIZZ Advisor
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Ask about your daily sales (mauzo), expenses (matumizi), and best services (huduma) in plain language
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs flex items-center gap-1.5 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Local Engine Active (No external API needed)</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[65vh] sm:h-[560px] overflow-hidden">
        
        {/* Messages Feed */}
        <div className="flex-1 p-3.5 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 sm:gap-3 max-w-2xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                  msg.sender === 'user'
                    ? 'bg-slate-800'
                    : 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-xs'
                }`}
              >
                {msg.sender === 'user' ? (
                  <UserIcon className="w-4 h-4" />
                ) : (
                  <Bot className="w-4.5 h-4.5" />
                )}
              </div>

              {/* Bubble */}
              <div className="space-y-2 max-w-[85vw] sm:max-w-md">
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed break-words ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-slate-50 text-slate-800 border border-slate-200/70 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Optional Highlight Card generated by assistant */}
                {msg.highlightData && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[11px] font-semibold text-emerald-800">
                        {msg.highlightData.title}
                      </div>
                      <div className="text-base font-bold text-slate-900 tabular-nums">
                        {msg.highlightData.value}
                      </div>
                    </div>
                    {msg.highlightData.subtext && (
                      <span className="text-[11px] text-slate-500 font-medium max-w-[150px] sm:max-w-[200px] text-right truncate">
                        {msg.highlightData.subtext}
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`text-[10px] text-slate-400 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 sm:gap-3 max-w-md mr-auto">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Calculating financial insights...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>Prompts:</span>
          </span>
          {quickQuestions.map((q) => (
            <button
              key={q.label}
              onClick={() => handleSend(q.prompt)}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 rounded-lg transition-all whitespace-nowrap shrink-0 disabled:opacity-50 min-h-[36px] flex items-center"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Uliza chochote: e.g. What were today's sales?..."
            className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 min-h-[44px]"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-40 text-white rounded-xl shadow-xs transition-all shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
