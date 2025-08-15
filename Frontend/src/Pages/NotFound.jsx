import React from 'react';
import { PiggyBank, Home, ArrowLeft, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  // Animated coins that float up
  const coins = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center relative">
        {/* Floating coins animation */}
        {coins.map((coin, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <DollarSign className="text-emerald-500 w-6 h-6 opacity-30" />
          </div>
        ))}

        {/* Main content */}
        <div className="bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
          
          <div className="mb-6 relative">
            <PiggyBank className="w-24 h-24 mx-auto text-emerald-500 animate-bounce" />
          </div>

          <h1 className="text-6xl font-bold text-gray-800 mb-4">4
            <span className="inline-block mx-2">
              <PiggyBank className="w-16 h-16 text-emerald-500 animate-wiggle" />
            </span>
            4
          </h1>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Oops! Your Expense Got Lost
          </h2>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like this transaction didn't make it to the ledger. Don't worry, your money is safe! Let's head back to track your expenses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-300 shadow-lg shadow-emerald-200"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-500 rounded-xl hover:bg-emerald-50 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;