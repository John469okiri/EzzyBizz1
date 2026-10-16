import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Scissors, Shield, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import { BusinessType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, loginAsDemo } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('Ezzy Cuts Grooming Lounge');
  const [businessType, setBusinessType] = useState<BusinessType>('barbershop');
  const [email, setEmail] = useState('john@ezzybizz.com');
  const [password, setPassword] = useState('password123');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signup(name || 'Barber Owner', businessName, businessType, email, password);
    } else {
      login(email, password);
    }
    onClose();
  };

  const handleQuickAccess = () => {
    loginAsDemo();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-5 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 my-auto max-h-[94vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs shrink-0">
              <Scissors className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">EzzyBIZZ</h3>
              <p className="text-xs text-slate-500">
                {isSignUp ? 'Create your business profile' : 'Sign in to your shop'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Local Profile Notice (Professional & Transparent) */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-900">Local Profile Access</p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Your shop information, sales, and bookings are stored on this device’s browser. No external cloud account is required.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brian Ochieng"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-sm sm:text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business / Shop Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ezzy Cuts & Shave Lounge"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-sm sm:text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business Category
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-sm sm:text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 min-h-[44px]"
                >
                  <option value="barbershop">Barbershop & Grooming</option>
                  <option value="salon">Hair Salon</option>
                  <option value="nails">Nails & Pedicure Studio</option>
                  <option value="spa">Day Spa & Massage</option>
                  <option value="combo">Combo Lounge</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-2 text-sm sm:text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-2 text-sm sm:text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Fast Access for Shop Owner */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          <button
            onClick={handleQuickAccess}
            className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium text-xs transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Quick Access (Ezzy Cuts & Grooming)</span>
          </button>

          <div className="text-center pt-1">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-slate-500 hover:text-emerald-700 font-medium transition-colors py-1 inline-block"
            >
              {isSignUp ? 'Already have an account? Sign In' : "New to EzzyBIZZ? Create an Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
