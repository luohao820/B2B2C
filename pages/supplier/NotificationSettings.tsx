
import React, { useState } from 'react';
import { Bell, Mail, MessageCircle, Share2, Smartphone, Send, CheckCircle2, ShieldCheck, Settings, Webhook, Facebook, AlertTriangle, Save, Link as LinkIcon } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const [config, setConfig] = useState({
    email_enabled: true,
    email_addr: 'supplier_test@corp.com',
    dingtalk_enabled: false,
    dingtalk_webhook: '',
    facebook_enabled: false,
    order_shipped: true,
    order_received: true,
    low_stock: true,
    global_threshold: 15
  });

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('通知协议配置已更新并实时生效');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black italic text-gray-800 uppercase tracking-tight">通知中枢配置</h1>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Bind channels and define business rules</p>
        </div>
        <div className="flex items-center space-x-3">
           <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-4 py-2 rounded-xl">
             <ShieldCheck size={16} className="mr-2" /> 通信网关在线
           </div>
           <button 
             onClick={handleSave}
             className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center"
           >
              {saving ? <div className="animate-spin mr-2 h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></div> : <Save size={16} className="mr-2" />}
              保存全局配置
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. 通道绑定 */}
        <section className="space-y-6">
           <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center border-b pb-3 border-blue-100">
             <Share2 size={16} className="mr-2"/> 1. 消息发送渠道 (Channels)
           </h2>
           
           <div className="space-y-4">
              {/* Email */}
              <div className={`p-6 rounded-[32px] border-2 transition-all group ${config.email_enabled ? 'bg-white border-blue-500 shadow-xl shadow-blue-50' : 'bg-gray-50 border-transparent opacity-60'}`}>
                 <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shadow-sm ${config.email_enabled ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          <Mail size={20} />
                       </div>
                       <div>
                          <div className="text-sm font-black text-gray-900 italic">邮件通知 (Email)</div>
                          <div className="text-[9px] text-gray-400 font-bold uppercase">SMTP 专用通道</div>
                       </div>
                    </div>
                    <div 
                      onClick={() => setConfig({...config, email_enabled: !config.email_enabled})}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${config.email_enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.email_enabled ? 'left-7' : 'left-1'}`}></div>
                    </div>
                 </div>
                 {config.email_enabled && (
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-100 transition-all animate-in slide-in-from-top-2"
                      placeholder="输入接收邮箱..."
                      value={config.email_addr}
                      onChange={(e) => setConfig({...config, email_addr: e.target.value})}
                    />
                 )}
              </div>

              {/* DingTalk/Webhook */}
              <div className={`p-6 rounded-[32px] border-2 transition-all group ${config.dingtalk_enabled ? 'bg-white border-green-500 shadow-xl shadow-green-50' : 'bg-gray-50 border-transparent opacity-60'}`}>
                 <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 shadow-sm ${config.dingtalk_enabled ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          <Webhook size={20} />
                       </div>
                       <div>
                          <div className="text-sm font-black text-gray-900 italic">企业微信/钉钉</div>
                          <div className="text-[9px] text-gray-400 font-bold uppercase">Bot Webhook 实时推送</div>
                       </div>
                    </div>
                    <div 
                      onClick={() => setConfig({...config, dingtalk_enabled: !config.dingtalk_enabled})}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${config.dingtalk_enabled ? 'bg-green-600' : 'bg-gray-300'}`}
                    >
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.dingtalk_enabled ? 'left-7' : 'left-1'}`}></div>
                    </div>
                 </div>
                 {config.dingtalk_enabled && (
                    <div className="relative animate-in slide-in-from-top-2">
                       <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                         type="text" 
                         className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 pl-10 text-[10px] font-mono outline-none focus:ring-2 focus:ring-green-100"
                         placeholder="https://oapi.dingtalk.com/robot/send?access_token=..."
                         value={config.dingtalk_webhook}
                         onChange={(e) => setConfig({...config, dingtalk_webhook: e.target.value})}
                       />
                    </div>
                 )}
              </div>
           </div>
        </section>

        {/* 2. 自动化触发规则 */}
        <section className="space-y-6">
           <h2 className="text-xs font-black uppercase tracking-widest text-orange-600 flex items-center border-b pb-3 border-orange-100">
             <Settings size={16} className="mr-2"/> 2. 自动化规则 (Business Rules)
           </h2>
           <div className="bg-white p-8 rounded-[40px] border shadow-sm space-y-8">
              <div className="flex justify-between items-start group">
                 <div className="flex-1">
                    <div className="text-sm font-black text-gray-800 uppercase italic flex items-center">
                       <Smartphone size={14} className="mr-2 text-orange-500" /> 订单发货/收货通知
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">当子订单状态变为“已发货”或买家点击“确认收货”时，立即触发同步通知。</p>
                 </div>
                 <div 
                   onClick={() => setConfig({...config, order_shipped: !config.order_shipped})}
                   className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${config.order_shipped ? 'bg-orange-500' : 'bg-gray-100'}`}
                 >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${config.order_shipped ? 'left-5.5' : 'left-0.5'}`}></div>
                 </div>
              </div>

              <div className="flex flex-col space-y-4">
                 <div className="flex justify-between items-start">
                    <div className="flex-1">
                       <div className="text-sm font-black text-gray-800 uppercase italic flex items-center">
                          <AlertTriangle size={14} className="mr-2 text-red-500" /> 低库存智能预警
                       </div>
                       <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">系统定时扫描 SKU 库存，低于阈值即发送高优告警。</p>
                    </div>
                    <div 
                      onClick={() => setConfig({...config, low_stock: !config.low_stock})}
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${config.low_stock ? 'bg-red-500' : 'bg-gray-100'}`}
                    >
                       <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${config.low_stock ? 'left-5.5' : 'left-0.5'}`}></div>
                    </div>
                 </div>
                 
                 {config.low_stock && (
                   <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-red-100 animate-in fade-in duration-300">
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">全局预警触发阈值</span>
                         <span className="text-xl font-black text-red-600 italic">≤ {config.global_threshold}</span>
                      </div>
                      <input 
                         type="range" 
                         min="0" max="100" 
                         className="w-full h-1 bg-red-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                         value={config.global_threshold}
                         onChange={(e) => setConfig({...config, global_threshold: parseInt(e.target.value)})}
                      />
                      <p className="text-[9px] text-gray-400 mt-3 italic">* 个别 SKU 的独立预警值将在“库存管理”中覆盖此全局设置。</p>
                   </div>
                 )}
              </div>
              
              <div className="pt-6 border-t border-dashed border-gray-100">
                 <div className="bg-blue-50 p-4 rounded-2xl flex items-center group cursor-pointer hover:bg-blue-100 transition-colors">
                    <Facebook size={20} className="text-blue-600 mr-3" />
                    <div className="flex-1">
                       <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Facebook Messenger Page</div>
                       <div className="text-[9px] text-blue-400 font-bold">同步发送通知至绑定的公共主页</div>
                    </div>
                    <button className="px-3 py-1 bg-white border border-blue-200 text-blue-600 text-[9px] font-black rounded-lg uppercase shadow-sm">Connect</button>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationSettings;
