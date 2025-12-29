
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

const H5Login: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  return (
    <div className="bg-white min-h-screen p-8 flex flex-col">
      <button onClick={() => navigate(-1)} className="self-start text-gray-400 mb-12">
        <ChevronLeft size={28} />
      </button>

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">欢迎登录</h1>
        <p className="text-sm text-gray-400 mt-2">首次登录将自动注册您的账户</p>

        <div className="mt-12 space-y-6">
          <div className="border-b focus-within:border-blue-600 transition-colors py-2 flex items-center">
            <span className="text-gray-900 font-medium mr-4">+86</span>
            <input 
              type="tel" 
              placeholder="请输入手机号" 
              className="flex-1 text-lg focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="border-b focus-within:border-blue-600 transition-colors py-2 flex items-center justify-between">
            <input 
              type="number" 
              placeholder="请输入验证码" 
              className="flex-1 text-lg focus:outline-none"
            />
            <button className="text-blue-600 text-sm font-medium">获取验证码</button>
          </div>
        </div>

        <button 
          onClick={() => navigate('/consumer/home')}
          className="w-full bg-blue-600 text-white rounded-full py-4 font-bold text-lg mt-12 shadow-lg shadow-blue-100 flex items-center justify-center group"
        >
          登录 <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center mt-6">
          <input type="checkbox" id="agreement" className="w-4 h-4 text-blue-600 rounded border-gray-300 mr-2" />
          <label htmlFor="agreement" className="text-xs text-gray-400">
            我已阅读并同意 <span className="text-blue-600">用户协议</span> 和 <span className="text-blue-600">隐私政策</span>
          </label>
        </div>
      </div>

      {/* Third Party */}
      <div className="pb-10">
        <div className="flex items-center text-gray-300 mb-8">
          <div className="flex-1 h-[1px] bg-gray-100"></div>
          <span className="px-4 text-xs">其他登录方式</span>
          <div className="flex-1 h-[1px] bg-gray-100"></div>
        </div>
        <div className="flex justify-center space-x-10">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <ShieldCheck size={24} />
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Smartphone size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default H5Login;
