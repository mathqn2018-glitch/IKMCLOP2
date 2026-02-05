
import React, { useState } from 'react';

interface APIKeyModalProps {
  onSave: (key: string) => void;
  onClose: () => void;
}

const APIKeyModal: React.FC<APIKeyModalProps> = ({ onSave, onClose }) => {
  const [key, setKey] = useState(localStorage.getItem('gemini_api_key') || '');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            <i className="fas fa-key"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Cài đặt API Key</h2>
          <p className="text-gray-500 text-sm mt-2">
            Nhập Gemini API Key của bạn để sử dụng các tính năng giải bài thông minh bằng AI.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Gemini API Key</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Dán key của bạn vào đây..."
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-blue-700 uppercase mb-1">💡 Mẹo nhỏ</h4>
            <p className="text-xs text-blue-600 leading-relaxed">
              Bạn có thể lấy API Key miễn phí tại <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline font-bold">Google AI Studio</a>. Key được lưu an toàn trên máy của bạn (LocalStorage).
            </p>
          </div>

          <button
            onClick={() => onSave(key)}
            className="w-full py-4 gradient-primary text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Lưu cài đặt
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-2 text-gray-400 font-medium hover:text-gray-600 transition-all"
          >
            Để sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default APIKeyModal;
