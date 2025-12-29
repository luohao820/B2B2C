
import React, { useState, useMemo } from 'react';
import { 
  Boxes, Search, Import, AlertTriangle, Edit3, Save, X, 
  FileDown, CheckCircle2, History, Filter, Plus, Trash2,
  ArrowRight, Database, ShieldCheck, Grid3X3
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  main_image: string;
  specs: any[];
  status: 'normal' | 'low';
}

const InventoryManagement: React.FC = () => {
  const [products, setProducts] = useState<InventoryItem[]>([
    { 
      id: 'PROD_S_001', 
      name: '极简主义纯棉 T 恤', 
      category: '潮流服饰',
      main_image: 'https://picsum.photos/400/400?random=21',
      specs: [
        { name: '颜色', values: ['曜石黑', '珍珠白'] },
        { name: '尺码', values: ['S', 'M', 'L'] }
      ],
      status: 'normal' 
    },
    { 
      id: 'PROD_S_002', 
      name: 'iPhone 15 Pro Max', 
      category: '智能手机',
      main_image: 'https://picsum.photos/400/400?random=10',
      specs: [
        { name: '颜色', values: ['原色', '蓝色'] },
        { name: '存储', values: ['256G', '512G'] }
      ],
      status: 'low' 
    }
  ]);

  const [showEditModal, setShowEditModal] = useState<InventoryItem | null>(null);

  // 计算 SKU 笛卡尔积组合
  const skuTable = useMemo(() => {
    if (!showEditModal) return [];
    const specs = showEditModal.specs;
    return specs.reduce((acc, spec) => {
      if (acc.length === 0) return spec.values.map((v: string) => [v]);
      const newAcc: any[] = [];
      acc.forEach((prev: any) => {
        spec.values.forEach((v: string) => {
          newAcc.push([...prev, v]);
        });
      });
      return newAcc;
    }, []);
  }, [showEditModal]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">库存与资产调配中心</h1>
          <p className="text-xs text-gray-400 mt-1 font-medium italic">对已建模的商品进行动态实物库存配置与低位预警拦截</p>
        </div>
        <div className="flex space-x-3">
           <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 flex items-center hover:bg-blue-700">
              <History size={16} className="mr-2" /> 库存操作流水
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
           <div className="relative w-80">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
             <input type="text" placeholder="搜索商品名称或 UID..." className="w-full pl-12 pr-4 py-2.5 border rounded-2xl text-xs outline-none" />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                <th className="py-5 px-8">商品资产标识</th>
                <th className="py-5 px-6">挂载类目</th>
                <th className="py-5 px-6 text-center">规格组合数</th>
                <th className="py-5 px-6">风险拦截</th>
                <th className="py-5 px-8 text-right">资产动作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-all group">
                  <td className="py-5 px-8">
                    <div className="flex items-center">
                       <img src={p.main_image} className="w-12 h-12 rounded-xl object-cover mr-4 border shadow-sm" />
                       <div>
                          <div className="text-sm font-black text-gray-900">{p.name}</div>
                          <div className="text-[9px] text-gray-400 font-mono mt-0.5">UID: {p.id}</div>
                       </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-[9px] font-black text-blue-600 uppercase italic bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{p.category}</span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className="text-sm font-black italic text-gray-700">{p.specs.reduce((acc, s) => acc * s.values.length, 1)} <span className="text-[9px] font-normal uppercase text-gray-300 not-italic">Skus</span></span>
                  </td>
                  <td className="py-5 px-6">
                    {p.status === 'low' ? (
                      <div className="flex items-center text-red-600 font-black text-[10px] uppercase italic animate-pulse">
                         <AlertTriangle size={12} className="mr-1.5" /> 低库存风险
                      </div>
                    ) : (
                      <div className="flex items-center text-green-600 font-black text-[10px] uppercase italic">
                         <CheckCircle2 size={12} className="mr-1.5" /> 资产充足
                      </div>
                    )}
                  </td>
                  <td className="py-5 px-8 text-right">
                     <button 
                        onClick={() => setShowEditModal(p)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center ml-auto"
                     >
                       <Boxes size={14} className="mr-1.5" /> 配置实物库存
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 核心功能：表格化库存配置弹窗 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
           <div className="bg-white rounded-[48px] w-full max-w-5xl h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300">
              <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
                 <div className="flex items-center">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-[20px] flex items-center justify-center shadow-xl shadow-blue-100 mr-5">
                       <Grid3X3 size={28} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black italic text-gray-900 uppercase tracking-tight">规格化库存矩阵配置</h3>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">Physical Inventory Specification Table</p>
                    </div>
                 </div>
                 <button onClick={() => setShowEditModal(null)} className="p-3 bg-white hover:bg-gray-100 rounded-full text-gray-400 shadow-sm transition-all"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-12 space-y-10 scrollbar-hide">
                 <div className="flex items-center space-x-6 p-6 bg-blue-50/30 rounded-[32px] border border-blue-50">
                    <img src={showEditModal.main_image} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md" />
                    <div>
                       <div className="text-xl font-black text-gray-900 mb-1">{showEditModal.name}</div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Modeling UUID: {showEditModal.id}</div>
                    </div>
                    <div className="ml-auto flex items-center text-orange-600 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
                       <AlertTriangle size={18} className="mr-2" />
                       <span className="text-[10px] font-black uppercase tracking-widest">库存变动将实时同步至前台消费终端</span>
                    </div>
                 </div>

                 {/* 动态规格配置表格 */}
                 <div className="bg-white rounded-[32px] border-2 border-gray-50 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                       <thead className="bg-gray-50/80 border-b">
                          <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                             <th className="py-6 px-10">规格变体组合 (Specs Matrix)</th>
                             <th className="py-6 px-8 text-center w-48">当前实物库存</th>
                             <th className="py-6 px-8 text-center w-48">低库存预警阈值</th>
                             <th className="py-6 px-10 text-right">状态健康度</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {skuTable.map((combo: any, i: number) => (
                             <tr key={i} className="hover:bg-blue-50/10 transition-colors group">
                                <td className="py-6 px-10">
                                   <div className="flex items-center space-x-2">
                                      {combo.map((val: string, idx: number) => (
                                         <React.Fragment key={idx}>
                                            <span className="bg-white border-2 border-gray-100 px-4 py-1.5 rounded-xl text-xs font-black text-gray-800 shadow-sm uppercase italic group-hover:border-blue-200">{val}</span>
                                            {idx < combo.length - 1 && <ArrowRight size={12} className="text-gray-300" />}
                                         </React.Fragment>
                                      ))}
                                   </div>
                                </td>
                                <td className="py-6 px-8">
                                   <input 
                                     type="number" 
                                     defaultValue={Math.floor(Math.random() * 50)} 
                                     className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-3 text-sm font-black text-blue-600 text-center outline-none focus:bg-white focus:border-blue-600 focus:shadow-lg transition-all"
                                   />
                                </td>
                                <td className="py-6 px-8">
                                   <input 
                                     type="number" 
                                     defaultValue={10} 
                                     className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-3 text-sm font-black text-red-400 text-center outline-none focus:bg-white focus:border-red-400 focus:shadow-lg transition-all"
                                   />
                                </td>
                                <td className="py-6 px-10 text-right">
                                   <div className="flex items-center justify-end text-[10px] font-black text-green-600 uppercase italic">
                                      <CheckCircle2 size={12} className="mr-1.5" /> Healthy
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="p-10 border-t bg-gray-50/50 flex justify-end space-x-4 shadow-inner">
                 <button onClick={() => setShowEditModal(null)} className="px-10 py-4 bg-white border-2 rounded-2xl font-black text-[10px] text-gray-400 uppercase tracking-widest hover:bg-gray-100 transition shadow-sm">放弃修改</button>
                 <button onClick={() => { alert('库存协议已更新并全量下发！'); setShowEditModal(null); }} className="px-16 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition flex items-center group">
                    <Save size={18} className="mr-2 group-hover:scale-110 transition-transform" /> 保存并同步仓库状态
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
