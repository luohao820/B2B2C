
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Plus, Search, Home, Clock, Edit3, Trash2, Globe, CheckCircle2, XCircle, Calendar, ChevronRight, LayoutTemplate, MoreVertical } from 'lucide-react';

interface DecoPage {
  id: string;
  name: string;
  type: 'home' | 'activity' | 'category';
  isHome: boolean;
  status: 'draft' | 'published';
  startTime: string;
  endTime: string;
  updateTime: string;
}

const DecorationList: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<DecoPage[]>([
    {
      id: 'P001',
      name: '系统默认商城主页',
      type: 'home',
      isHome: true,
      status: 'published',
      startTime: '2023-01-01 00:00',
      endTime: '2099-12-31 23:59',
      updateTime: '2023-10-27 10:30'
    },
    {
      id: 'P002',
      name: '双11超级大促专题页',
      type: 'activity',
      isHome: false,
      status: 'published',
      startTime: '2023-11-01 00:00',
      endTime: '2023-11-12 23:59',
      updateTime: '2023-10-26 14:20'
    }
  ]);

  // 实现排他性首页设置
  const handleSetHome = (id: string) => {
    if (window.confirm('确认将此页面设为商城唯一首页吗？原有首页将转为普通专题页。')) {
      setPages(pages.map(p => ({
        ...p,
        isHome: p.id === id,
        type: p.id === id ? 'home' : (p.type === 'home' ? 'activity' : p.type)
      })));
    }
  };

  const handleAddPage = () => {
    const id = `P${Date.now()}`;
    // 此处导航至编辑器，模拟“添加多个”即再次点击该按钮
    navigate(`/platform/decoration/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 tracking-tight">商城视觉装修中心</h1>
           <p className="text-xs text-gray-400 mt-1 font-medium">设计多套主题方案，并精细化控制各页面的生效周期</p>
        </div>
        <button onClick={handleAddPage} className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl flex items-center hover:bg-blue-700 transition shadow-lg shadow-blue-100 font-bold">
           <Plus size={20} className="mr-2" /> 策划新装修方案
        </button>
      </div>

      {/* 核心指标概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-7 rounded-[32px] border shadow-sm flex items-center group hover:border-blue-200 transition-all">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
               <Globe size={28} />
            </div>
            <div>
               <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">正在生效方案</div>
               <div className="text-2xl font-black text-gray-900">{pages.filter(p => p.status === 'published').length} 套</div>
            </div>
         </div>
         <div className="bg-white p-7 rounded-[32px] border shadow-sm flex items-center group hover:border-orange-200 transition-all">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
               <Home size={28} />
            </div>
            <div className="flex-1 truncate">
               <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">当前主首页节点</div>
               <div className="text-sm font-black text-gray-800 truncate">
                  {pages.find(p => p.isHome)?.name || '未指定'}
               </div>
            </div>
         </div>
         <div className="bg-white p-7 rounded-[32px] border shadow-sm flex items-center group hover:border-green-200 transition-all">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
               <Clock size={28} />
            </div>
            <div>
               <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">待上线计划</div>
               <div className="text-2xl font-black text-gray-900">1 套</div>
            </div>
         </div>
      </div>

      {/* 方案列表区 */}
      <div className="bg-white rounded-[40px] shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
           <div className="relative w-96">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" placeholder="检索方案名称、ID或属性..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all" />
           </div>
           <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition"><LayoutTemplate size={20} /></button>
           </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">
                <th className="px-6 py-4">装修方案主体 (Archived Pages)</th>
                <th className="px-6 py-4">状态标识</th>
                <th className="px-6 py-4 text-center">核心控制</th>
                <th className="px-6 py-4">生效调度时间窗 (Timeline)</th>
                <th className="px-6 py-4 text-right">管理</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p.id} className="group bg-white hover:bg-gray-50 transition-all">
                  <td className="px-6 py-6 rounded-l-3xl border-y border-l">
                    <div className="font-black text-gray-900 text-base group-hover:text-blue-600 transition-colors italic">{p.name}</div>
                    <div className="text-[10px] text-gray-400 mt-1 font-bold">最后更新于: {p.updateTime} <span className="mx-2">|</span> ID: {p.id}</div>
                  </td>
                  <td className="px-6 py-6 border-y">
                    <div className="flex flex-col space-y-1.5">
                       <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">TYPE: {p.type}</span>
                       <span className={`w-fit px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${p.status === 'published' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                          {p.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-y text-center">
                    {p.isHome ? (
                      <div className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-orange-100 inline-flex items-center">
                         <CheckCircle2 size={12} className="mr-1.5" /> 已激活主页
                      </div>
                    ) : (
                      <button onClick={() => handleSetHome(p.id)} className="text-[10px] font-black text-blue-600 hover:bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl uppercase tracking-widest transition-all">设为首页</button>
                    )}
                  </td>
                  <td className="px-6 py-6 border-y">
                    <div className="flex flex-col space-y-1">
                       <div className="flex items-center text-[11px] font-black text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 shadow-sm"></div> {p.startTime}
                       </div>
                       <div className="flex items-center text-[11px] font-black text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mr-2"></div> {p.endTime}
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 rounded-r-3xl border-y border-r text-right">
                    <div className="flex justify-end space-x-2">
                       <button onClick={() => navigate(`/platform/decoration/edit/${p.id}`)} className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-200 rounded-2xl transition-all shadow-sm"><Edit3 size={18} /></button>
                       <button className="p-2.5 bg-white border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-200 rounded-2xl transition-all shadow-sm"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DecorationList;
