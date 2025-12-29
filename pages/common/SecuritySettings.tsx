
import React, { useState } from 'react';
import { 
  Key, Lock, ShieldCheck, Mail, Smartphone, ArrowRight,
  AlertCircle, ShieldAlert, CheckCircle, Save, Eye, EyeOff
} from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('安全凭证已成功更新，系统将在下次登录时强制要求使用新密码。');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-black italic text-gray-800 uppercase tracking-tight">安全中心 (Security Console)</h1>
           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Manage your administrative credentials and security tokens</p>
        </div>
        <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-5 py-2.5 rounded-2xl border border-green-100">
           <ShieldCheck size={18} className="mr-2" /> 账户受双重验证保护
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-400/20">
                    <Lock size={32} />
                 </div>
                 <div>
                    <div className="text-xl font-black italic tracking-tight mb-1">admin_leo</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 italic">超级管理员 (System Owner)</div>
                 </div>
                 <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-bold text-white/50">
                       <span>密码安全度</span>
                       <span className="text-green-400 uppercase tracking-widest">HIGH</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="bg-green-400 h-full w-[85%] shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                    </div>
                 </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
                 <ShieldAlert size={200} />
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border shadow-sm space-y-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                 <AlertCircle size={14} className="mr-2 text-blue-600" /> 安全建议 (Compliance)
              </h4>
              <ul className="space-y-4">
                 {[
                   '建议每 90 天定期更换管理后台密码',
                   '密码必须包含大小写字母、数字及特殊字符',
                   '请勿在不同平台使用重复的账号体系',
                   '禁止向任何第三方泄露管理后台访问令牌'
                 ].map((text, i) => (
                   <li key={i} className="flex items-start">
                      <ArrowRight size={12} className="mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-xs text-gray-500 font-medium leading-relaxed italic">{text}</span>
                   </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* Change Password Form */}
        <div className="lg:col-span-2 space-y-8">
           <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[48px] border shadow-sm space-y-10">
              <div className="flex items-center space-x-3 border-b pb-6 border-gray-50">
                 <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                    <Key size={20}/>
                 </div>
                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 italic">重置访问密码 (Reset Credentials)</h3>
              </div>

              <div className="space-y-8">
                 <div className="relative">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest italic">当前旧密码 (Old Password)</label>
                    <div className="relative group">
                       <input 
                         type={showOldPass ? 'text' : 'password'} 
                         required
                         className="w-full border-2 border-gray-100 bg-gray-50/30 rounded-2xl p-4 pr-12 text-sm font-black outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" 
                         placeholder="请输入当前生效的密码..."
                       />
                       <button 
                         type="button" 
                         onClick={() => setShowOldPass(!showOldPass)}
                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-600 transition-colors"
                       >
                         {showOldPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                       </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="relative">
                       <label className="text-[10px] font-black text-blue-600 uppercase mb-3 block tracking-widest italic">设置新密码 (New Password)</label>
                       <div className="relative">
                          <input 
                            type={showNewPass ? 'text' : 'password'} 
                            required
                            className="w-full border-2 border-blue-100 bg-blue-50/10 rounded-2xl p-4 pr-12 text-sm font-black outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" 
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowNewPass(!showNewPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400"
                          >
                            {showNewPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                          </button>
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest italic">再次确认 (Confirm New)</label>
                       <input 
                         type="password" 
                         required
                         className="w-full border-2 border-gray-100 bg-gray-50/30 rounded-2xl p-4 text-sm font-black outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" 
                       />
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-50 flex items-center space-x-4">
                 <ShieldCheck size={24} className="text-blue-600" />
                 <div>
                    <div className="text-[11px] font-black text-blue-700 uppercase tracking-widest">安全令牌即刻刷新</div>
                    <p className="text-[10px] text-blue-500 mt-0.5 leading-relaxed">重置成功后，所有登录中的端点（APP, WEB）都将被强制注销。</p>
                 </div>
              </div>

              <div className="flex justify-end">
                 <button 
                   disabled={loading}
                   className="px-16 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-100 hover:bg-blue-700 transition flex items-center disabled:opacity-50"
                 >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Save size={18} className="mr-2" />
                    )}
                    确认修改并生效 (Commit)
                 </button>
              </div>
           </form>

           <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white border rounded-[32px] shadow-sm flex items-center group cursor-pointer hover:border-blue-500 transition-all">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mr-4">
                    <Mail size={24} />
                 </div>
                 <div>
                    <div className="text-[11px] font-black text-gray-900 uppercase">绑定业务邮箱</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">leo@corp.com</div>
                 </div>
              </div>
              <div className="p-6 bg-white border rounded-[32px] shadow-sm flex items-center group cursor-pointer hover:border-blue-500 transition-all">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mr-4">
                    <Smartphone size={24} />
                 </div>
                 <div>
                    <div className="text-[11px] font-black text-gray-900 uppercase">短信二次验证</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">138****0001</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
