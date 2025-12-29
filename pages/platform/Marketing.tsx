
import React, { useState } from 'react';
import { Gift, Plus, Search, CheckCircle, X, LayoutGrid, ArrowRight, Settings2, Info, Tag, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { ActivityStatus, ActivityType } from '../../types';

const MarketingManagement: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedType, setSelectedType] = useState<ActivityType>(ActivityType.FULL_REDUCTION);

  const activities = [
    {
      id: 'ACT_001',
      name: '双十一全场满减',
      type: ActivityType.FULL_REDUCTION,
      status: ActivityStatus.RUNNING,
      budget: 1000000,
      used: 450000,
      creator: '运营张三'
    }
  ];

  return (
    <div className="space-y-6 relative overflow-hidden">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">营销活动实验室</h1>
        <button 
          onClick={() => setShowDrawer(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl flex items-center hover:bg-blue-700 transition shadow-lg shadow-blue-100 font-bold"
        >
          <Plus size={20} className="mr-2" />
          创建新营销活动
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
          <div className="flex space-x-3">
             {['全部状态', '进行中', '未开始'].map(tab => (
               <button key={tab} className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600">{tab}</button>
             ))}
          </div>
          <div className="relative w-72">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="搜索活动名称..." className="w-full pl-12 pr-4 py-2.5 border rounded-2xl text-xs outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px]">活动主题</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px]">类型</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase text-[10px]">预算看板</th>
                <th className="px-6 py-5 text-right font-black text-gray-400 uppercase text-[10px]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {activities.map(act => (
                <tr key={act.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-5">
                    <div className="font-black text-gray-900 italic">{act.name}</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase mt-1">Creator: {act.creator}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[9px] font-black border border-blue-100 uppercase">{act.type}</span>
                  </td>
                  <td className="px-6 py-5">
                     <div className="w-40 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{width: '45%'}}></div>
                     </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                     <button className="p-2 text-gray-300 hover:text-blue-600 transition"><Settings2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 创建活动侧滑抽屉 */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[60] animate-in fade-in" onClick={() => setShowDrawer(false)}></div>
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
             <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-black uppercase italic text-gray-800 flex items-center">
                   <Zap size={20} className="mr-2 text-blue-600" /> 初始化营销活动 (New Activity)
                </h3>
                <button onClick={() => setShowDrawer(false)} className="p-2 text-gray-400 hover:bg-white rounded-full"><X size={24}/></button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-8 space-y-10">
                <section className="space-y-4">
                   <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-2">1. 基础配置 (Basic)</h4>
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">活动名称</label>
                      <input type="text" className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-blue-200 outline-none" placeholder="如：黑色星期五超级大促" />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">活动类型</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: ActivityType.FULL_REDUCTION, label: '全场满减' },
                          { id: ActivityType.TIMED_DISCOUNT, label: '限时打折' }
                        ].map(t => (
                          <button 
                            key={t.id}
                            onClick={() => setSelectedType(t.id)}
                            className={`p-3 rounded-xl text-[10px] font-black uppercase border transition-all ${selectedType === t.id ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                   </div>
                </section>

                <section className="space-y-4">
                   <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest border-l-4 border-orange-600 pl-2">2. 逻辑规则与类目联动</h4>
                   <div className="bg-orange-50/50 p-6 rounded-[32px] border border-orange-50 space-y-4">
                      <div>
                        <label className="text-[9px] font-black text-orange-700 uppercase block mb-2">适用商品类目限制</label>
                        <select className="w-full border-none bg-white rounded-xl p-3 text-xs font-bold shadow-sm outline-none">
                           <option>全部类目通用 (GLOBAL)</option>
                           <option>数码通讯专用</option>
                           <option>生鲜水果专用</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-[9px] font-black text-orange-700 uppercase block mb-2 italic">满额门槛 (￥)</label>
                            <input type="number" className="w-full bg-white rounded-xl p-3 text-sm font-black outline-none shadow-sm" defaultValue={100} />
                         </div>
                         <div>
                            <label className="text-[9px] font-black text-orange-700 uppercase block mb-2 italic">立减金额 (￥)</label>
                            <input type="number" className="w-full bg-white rounded-xl p-3 text-sm font-black outline-none shadow-sm" defaultValue={20} />
                         </div>
                      </div>
                   </div>
                </section>

                <section className="space-y-4">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-4 border-gray-400 pl-2">3. 预算与时间窗</h4>
                   <div className="grid grid-cols-1 gap-4">
                      <div className="relative">
                         <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                         <input type="text" className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 pl-12 text-xs font-bold outline-none" placeholder="选择起止日期..." />
                      </div>
                      <div className="relative">
                         <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                         <input type="number" className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 pl-12 text-xs font-bold outline-none" placeholder="投放预算总额 (￥)..." />
                      </div>
                   </div>
                </section>
             </div>

             <div className="p-8 border-t bg-gray-50 flex space-x-3">
                <button onClick={() => setShowDrawer(false)} className="flex-1 py-4 bg-white border-2 border-white rounded-2xl font-black text-[10px] uppercase text-gray-400 tracking-widest shadow-sm">放弃</button>
                <button className="flex-2 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition">保存并立即上线 (Push)</button>
             </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketingManagement;
