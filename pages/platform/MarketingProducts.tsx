
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Search, Trash2, Import, X, Package, Check, Filter, LayoutGrid, FileDown, ShieldCheck, ListPlus } from 'lucide-react';

const MarketingProducts: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showImport, setShowImport] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [marketingProducts, setMarketingProducts] = useState([
    { id: 'PROD_001', name: 'iPhone 15 Pro Max', supplier: '数码优选', price: 9999, stock: 100 },
    { id: 'PROD_002', name: '北面冲锋衣', supplier: '山系装备社', price: 1599, stock: 50 },
  ]);

  const allSystemProducts = [
    { id: 'PROD_001', name: 'iPhone 15 Pro Max', supplier: '数码优选', price: 9999, stock: 100 },
    { id: 'PROD_002', name: '北面冲锋衣', supplier: '山系装备社', price: 1599, stock: 50 },
    { id: 'PROD_003', name: '索尼 WH-1000XM5', supplier: '索尼官方店', price: 2499, stock: 300 },
    { id: 'PROD_004', name: '九阳破壁机', supplier: '九阳授权店', price: 599, stock: 120 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl mr-4 transition-colors">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">活动适用商品管理</h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">当前活动: {id}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
             onClick={() => setShowImport(true)}
             className="px-4 py-2.5 bg-white border-2 border-dashed border-gray-200 rounded-xl text-xs font-black uppercase text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center"
          >
            <Import size={18} className="mr-2" /> 批量导入 (Excel/TXT)
          </button>
          <button 
             onClick={() => setShowPicker(true)}
             className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 flex items-center"
          >
            <Plus size={20} className="mr-2" /> 选择系统商品
          </button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden min-h-[60vh]">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
           <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center">
             <LayoutGrid size={16} className="mr-2 text-blue-600" /> 已加入商品明细 ({marketingProducts.length})
           </h2>
           <div className="relative w-72">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="在已选商品中搜索..." className="w-full pl-12 pr-4 py-2.5 border rounded-2xl text-xs focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                <th className="py-5 px-8">商品信息与ID</th>
                <th className="py-5 px-6">供应商主体</th>
                <th className="py-5 px-6">基础实价 (平台价)</th>
                <th className="py-5 px-6">当前库存</th>
                <th className="py-5 px-6 text-right">管理控制</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {marketingProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-5 px-8">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl mr-4 flex items-center justify-center text-gray-300">
                         <Package size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{p.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="text-xs font-bold text-gray-600">{p.supplier}</div>
                  </td>
                  <td className="py-5 px-6 font-black text-blue-600 text-sm italic">￥{p.price.toLocaleString()}</td>
                  <td className="py-5 px-6 text-xs font-bold text-gray-500">{p.stock} 件</td>
                  <td className="py-5 px-6 text-right">
                     <button className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm">
                       <Trash2 size={16} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-3xl w-full max-w-4xl h-[80vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="text-lg font-black uppercase tracking-widest text-gray-800 flex items-center">
                    <ListPlus size={20} className="mr-2 text-blue-600" /> 选择系统在线商品
                 </h3>
                 <button onClick={() => setShowPicker(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <div className="p-4 border-b flex space-x-4 bg-white">
                 <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="输入商品名、ID或供应商进行检索..." className="w-full pl-12 pr-4 py-3 border rounded-2xl text-sm focus:ring-4 focus:ring-blue-50 outline-none" />
                 </div>
                 <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl text-xs font-bold hover:bg-gray-200 flex items-center">
                    <Filter size={16} className="mr-2" /> 更多筛选
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                 <div className="grid grid-cols-2 gap-4">
                    {allSystemProducts.map(p => {
                      const isAdded = marketingProducts.some(mp => mp.id === p.id);
                      const isSelected = selectedIds.includes(p.id);
                      return (
                        <div 
                          key={p.id}
                          onClick={() => !isAdded && setSelectedIds(prev => isSelected ? prev.filter(i => i !== p.id) : [...prev, p.id])}
                          className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative flex items-center group ${
                            isAdded ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed' :
                            isSelected ? 'bg-blue-50 border-blue-500' : 'bg-white border-transparent hover:border-blue-100 shadow-sm'
                          }`}
                        >
                           <div className="w-12 h-12 bg-gray-50 rounded-2xl mr-4 flex items-center justify-center text-gray-300">
                             <Package size={24} />
                           </div>
                           <div className="flex-1">
                             <div className="text-sm font-bold text-gray-900 line-clamp-1">{p.name}</div>
                             <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">{p.supplier} | ￥{p.price}</div>
                           </div>
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                             isAdded ? 'bg-gray-200 border-gray-200 text-white' :
                             isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-100 text-transparent'
                           }`}>
                             <Check size={14} />
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
              <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-400">已选 {selectedIds.length} 款新商品</span>
                 <div className="flex space-x-3">
                   <button onClick={() => setShowPicker(false)} className="px-8 py-3 bg-white border rounded-2xl font-black text-xs text-gray-600">取消</button>
                   <button className="px-10 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center">
                     <Plus size={18} className="mr-2" /> 确认加入营销清单
                   </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Batch Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="text-lg font-black uppercase tracking-widest text-gray-800 flex items-center">
                    <FileDown size={20} className="mr-2 text-blue-600" /> 批量商品导入
                 </h3>
                 <button onClick={() => setShowImport(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <div className="p-8 space-y-6">
                 <div className="bg-blue-50 p-5 rounded-3xl flex items-start space-x-4 border border-blue-100">
                    <ShieldCheck size={24} className="text-blue-600 flex-shrink-0" />
                    <p className="text-xs text-blue-700 leading-relaxed font-medium">
                      请输入商品 ID 列表，每行一个 ID。系统将自动校验商品是否存在且处于“已发布”状态。
                    </p>
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-gray-400 block mb-2 uppercase tracking-widest">商品 ID 录入框 (ID List)</label>
                    <textarea 
                       className="w-full border-2 border-gray-100 rounded-3xl p-5 h-48 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all text-sm font-mono leading-relaxed" 
                       placeholder="PROD_001&#10;PROD_005&#10;PROD_012..."
                    ></textarea>
                 </div>
              </div>
              <div className="p-6 border-t bg-gray-50 flex space-x-3">
                 <button onClick={() => setShowImport(false)} className="flex-1 py-4 bg-white border rounded-2xl font-black text-xs text-gray-600 uppercase tracking-widest">放弃</button>
                 <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-blue-100 hover:bg-blue-700 transition uppercase tracking-widest">立即校验并导入</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MarketingProducts;
