import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  AlertTriangle,
  Target,
  Package,
  MessageSquare,
  Wrench,
  Search,
} from 'lucide-react';
import { BusinessNote } from '../types';

export const BusinessNotes: React.FC = () => {
  const { notes, addNote, toggleNoteCompleted, deleteNote } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Note Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BusinessNote['category']>('Daily Target');
  const [priority, setPriority] = useState<BusinessNote['priority']>('normal');

  const filteredNotes = notes.filter((note) => {
    const matchSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || note.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addNote({
      date: new Date().toISOString().split('T')[0],
      title: title.trim(),
      content: content.trim(),
      category,
      priority,
      completed: false,
    });

    setTitle('');
    setContent('');
    setShowAddModal(false);
  };

  const getCategoryIcon = (cat: BusinessNote['category']) => {
    switch (cat) {
      case 'Daily Target':
        return <Target className="w-4 h-4 text-emerald-600" />;
      case 'Inventory Alert':
        return <Package className="w-4 h-4 text-amber-600" />;
      case 'Client Feedback':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'Equipment':
        return <Wrench className="w-4 h-4 text-indigo-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Daily Business Notes & Shift Log</h2>
          <p className="text-xs text-slate-500">
            Record inventory restock alerts, daily haircut targets, client preferences, and repair notes
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Business Note</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes by keyword..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
          >
            <option value="all">All Note Categories</option>
            <option value="Daily Target">Daily Target</option>
            <option value="Inventory Alert">Inventory Alert</option>
            <option value="Client Feedback">Client Feedback</option>
            <option value="Equipment">Equipment</option>
            <option value="General">General</option>
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`bg-white rounded-xl p-5 border transition-all flex flex-col justify-between shadow-xs ${
                note.completed
                  ? 'border-slate-200 bg-slate-50/60 opacity-80'
                  : note.priority === 'urgent'
                  ? 'border-rose-200/80 ring-1 ring-rose-200/50'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    {getCategoryIcon(note.category)}
                    <span>{note.category}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <span>{note.date}</span>
                    {note.priority === 'urgent' && (
                      <span className="text-rose-600 font-bold ml-1">· Urgent</span>
                    )}
                    {note.priority === 'important' && (
                      <span className="text-amber-600 font-medium ml-1">· Important</span>
                    )}
                  </div>
                </div>

                <h3
                  className={`text-sm font-bold text-slate-900 ${
                    note.completed ? 'line-through text-slate-500' : ''
                  }`}
                >
                  {note.title}
                </h3>

                <p
                  className={`text-xs mt-2 text-slate-600 leading-relaxed whitespace-pre-wrap ${
                    note.completed ? 'line-through text-slate-400' : ''
                  }`}
                >
                  {note.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleNoteCompleted(note.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                    note.completed
                      ? 'text-emerald-700 hover:text-emerald-800'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {note.completed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" />
                      <span>Mark as done</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => deleteNote(note.id)}
                  title="Delete note"
                  className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center shadow-xs">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No notes found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Keep track of daily goals, restock reminders, and client requests in one place.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Create Your First Note
          </button>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-xl border border-slate-200 my-auto max-h-[92vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add Business Note</h3>
            <p className="text-xs text-slate-500 mb-4">
              Write down today's goal, inventory reminder, or shift instructions
            </p>

            <form onSubmit={handleCreateNote} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saturday target: 20 haircuts & 4 hot towel shaves"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BusinessNote['category'])}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
                  >
                    <option value="Daily Target">Daily Target</option>
                    <option value="Inventory Alert">Inventory Alert</option>
                    <option value="Client Feedback">Client Feedback</option>
                    <option value="Equipment">Equipment</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as BusinessNote['priority'])}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Details / Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Additional notes for your barbers or suppliers..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-full py-2.5 px-3.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 min-h-[44px] flex items-center justify-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm min-h-[44px] flex items-center justify-center text-center"
                >
                  Save (Hifadhi)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
