
import React, { useState } from 'react';
import { 
  Package, Eye, CheckCircle, XCircle, Search, Filter, X, 
  LayoutGrid, Info, Edit3, Clock, ArrowDownCircle, 
  TrendingUp, Layers, Tag, Grid3X3, ArrowRight, 
  ShieldCheck, AlertCircle, Save, RotateCcw, Monitor
} from 'lucide-react';
import { ProductAuditStatus } from '../../types';

const ProductAudit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [showDetail, setShowDetail] = useState<any>(null);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState<number>(0);

  // 模拟增强后的商品列表数据
  const [products, setProducts] = useState<any[]>([
    {
      id: 'PROD_20231027_101',
      name: 'iPhone 15 Pro Max 钛金属版',
      supplier: '数码优选旗舰店',
      category: '智能手机',
      supply_price: 8200.00,
      platform_price: 9999.00,
      stock: 450,
      image: 'https://picsum.photos/400/400?random=10',
      status: 'pending',
      desc: '配备 A17 Pro 芯片，全新钛金属边框，影像系统全面升级。',
      // 业务属性
      attributes: [
        { name: '品牌', value: 'Apple / 苹果' },
        { name: '机身层数', value: '一体化结构' },
        { name: '核心频率', value: '3.78GHz' }
      ],
      // SKU 规格
      specifications: [
        { name: '颜色', values: ['原色钛', '蓝色钛', '白色钛'] },
        { name: '存储', values: ['256GB', '512GB', '1TB'] }
      ]
    },
    {
      id: 'PROD_20231027_102',
      name: '北面 (TNF) Gore-Tex 冲锋衣',
      supplier: '山系户外馆',
      category: '户外服饰',
      supply_price: 1100.00,
      platform_price: 1599.00,
      stock: 120,
      image: 'https://picsum.photos/400/400?random=12',
      status: 'approved',
      desc: '经典 1986 款复刻，采用全密封压胶工艺，极致防风防水。',
      attributes: [
        { name: '主要材质', value: '锦纶/Gore-Tex' },
        { name: '产地', value: '越南' }
      ],
      specifications: [
        { name: '尺码', values: ['S', 'M', 'L', 'XL'] },
        { name: '颜色', values: ['经典黑', '极地蓝'] }
      ]
    }
  ]);

  const handleOpenDetail = (p: any) => {
    setShowDetail(p);
    setNewPrice(p.platform_price);
    setIsEditingPrice(false);
  };

  const handleUpdateStatus = (id: string, status: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status } : p));
    setShowDetail(null);
  };

  const handleSavePrice = () => {
    setProducts(products.map(p => p.id === showDetail.id ? { ...p, platform_price: newPrice } : p));
    setShowDetail({ ...showDetail, platform_price: newPrice });
    setIsEditingPrice(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">商品准入审核与定价中枢</h1>
           <p className="text-xs text-gray-400 mt-1 font-medium italic">对供应商提交的资产进行合规性审计，并执行全生命周期的定价干预</p>
        </div>
      </div>

      {/* 顶部状态切换 */}
      <div className="bg-white p-2 rounded-2xl border shadow-sm inline-flex space-x-1">
        {[
          { id: 'pending', label: '待定价审核', count: products.filter(p => p.status === 'pending').length },
          { id: 'approved', label: '已发布/在售', count: products.filter(p => p.status === 'approved').length },
          { id: 'rejected', label: '已下架/驳回', count: products.filter(p => p.status === 'rejected').length }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            {tab.label} <span className={`ml-1.5 opacity-50 ${activeTab === tab.id ? 'text-white' : ''}`}>[{tab.count}]</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="py-5 px-8">商品画册与标识</th>
                <th className="py-5 px-6">供应源与类目</th>
                <th className="py-5 px-6 text-center">当前库存</th>
                <th className="py-5 px-6">价格模型 (供货/零售)</th>
                <th className="py-5 px-8 text-right">管理动作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.filter(p => p.status === activeTab).map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition group">
                  <td className="py-5 px-8">
                    <div className="flex items-center">
                      <img src={p.image} className="w-12 h-12 rounded-xl object-cover mr-4 shadow-sm border" />
                      <div>
                        <div className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{p.name}</div>
                        <div className="text-[9px] text-gray-400 font-mono mt-0.5 uppercase">UID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="text-xs font-bold text-gray-800">{p.supplier}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase border border-blue-100 italic">{p.category}</span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="text-sm font-black text-gray-900">{p.stock}</div>
                    <div className="text-[8px] text-gray-400 uppercase font-bold">In Stock</div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="text-[10px] text-gray-400 font-mono line-through">￥{p.supply_price.toFixed(2)}</div>
                    <div className="text-base font-black text-blue-600 italic leading-none mt-1">￥{p.platform_price.toFixed(2)}</div>
                  </td>
                  <td className="py-5 px-8 text-right">
                     <button 
                       onClick={() => handleOpenDetail(p)}
                       className="px-5 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 shadow-sm hover:border-blue-600 hover:text-blue-600 transition-all"
                     >
                       审查并定价
                     </button>
                  </td>
                </tr>
              ))}
              {products.filter(p => p.status === activeTab).length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                     <div className="flex flex-col items-center justify-center text-gray-300">
                        <Package size={48} className="mb-4 opacity-10" />
                        <p className="text-xs font-black uppercase tracking-[0.2em] italic">当前列表为空</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 核心审核与定价详情模态框 */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-[48px] w-full max-w-6xl h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center">
                 <div className="w-14 h-14 bg-blue-600 text-white rounded-[20px] flex items-center justify-center shadow-xl shadow-blue-100 mr-5">
                    <ShieldCheck size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black italic text-gray-900 uppercase tracking-tighter">商品资产深度审计与定价</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">Physical Audit & Strategic Pricing Protocol</p>
                 </div>
              </div>
              <button onClick={() => setShowDetail(null)} className="p-3 bg-white hover:bg-gray-100 rounded-full text-gray-400 shadow-sm transition-all"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide">
               {/* 顶部基本信息概览 */}
               <div className="grid grid-cols-12 gap-10">
                  <div className="col-span-4">
                     <img src={showDetail.image} className="w-full aspect-square object-cover rounded-[40px] shadow-2xl border-4 border-white" />
                  </div>
                  <div className="col-span-8 space-y-8">
                     <section>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">{showDetail.name}</h2>
                        <div className="flex flex-wrap gap-3">
                           <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black border border-blue-100 uppercase italic flex items-center">
                              <LayoutGrid size={12} className="mr-1.5" /> {showDetail.category}
                           </span>
                           <span className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-[10px] font-black border border-gray-100 uppercase flex items-center">
                              <Monitor size={12} className="mr-1.5" /> ID: {showDetail.id}
                           </span>
                           <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black border border-indigo-100 uppercase flex items-center">
                              <ShieldCheck size={12} className="mr-1.5" /> {showDetail.supplier}
                           </span>
                        </div>
                     </section>

                     {/* 动态定价工作台 */}
                     <div className="p-8 bg-blue-600 rounded-[40px] shadow-2xl shadow-blue-100 text-white relative overflow-hidden group">
                        <div className="flex justify-between items-end relative z-10">
                           <div className="space-y-6">
                              <div className="space-y-1">
                                 <span className="text-[10px] font-black uppercase opacity-60 flex items-center tracking-widest"><Clock size={12} className="mr-1.5" /> 供应商供货底价</span>
                                 <div className="text-3xl font-black italic">￥{showDetail.supply_price.toFixed(2)}</div>
                              </div>
                              <div className="space-y-1">
                                 <span className="text-[10px] font-black uppercase opacity-60 flex items-center tracking-widest"><TrendingUp size={12} className="mr-1.5" /> 平台预想零售价</span>
                                 {isEditingPrice ? (
                                    <div className="flex items-center space-x-3 animate-in slide-in-from-left duration-300">
                                       <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center border border-white/20">
                                          <span className="px-3 text-xl font-black opacity-60">￥</span>
                                          <input 
                                            autoFocus
                                            type="number" 
                                            value={newPrice} 
                                            onChange={e => setNewPrice(parseFloat(e.target.value))}
                                            className="bg-transparent border-none text-3xl font-black italic outline-none w-40 text-white placeholder:text-white/30" 
                                          />
                                       </div>
                                       <button onClick={handleSavePrice} className="p-4 bg-white text-blue-600 rounded-2xl shadow-xl hover:bg-gray-50 transition-all"><Save size={24}/></button>
                                    </div>
                                 ) : (
                                    <div className="flex items-center group/price cursor-pointer" onClick={() => setIsEditingPrice(true)}>
                                       <div className="text-5xl font-black italic tracking-tighter">￥{showDetail.platform_price.toFixed(2)}</div>
                                       <div className="ml-4 p-2 bg-white/20 rounded-xl opacity-0 group-hover/price:opacity-100 transition-all"><Edit3 size={18}/></div>
                                    </div>
                                 )}
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-[10px] font-black uppercase opacity-60 mb-2 italic">预计毛利率分析</div>
                              <div className="text-4xl font-black text-blue-200">
                                 {(((showDetail.platform_price - showDetail.supply_price) / showDetail.platform_price) * 100).toFixed(1)}%
                              </div>
                              <p className="text-[9px] font-bold opacity-40 mt-1 uppercase italic">Margin contribution</p>
                           </div>
                        </div>
                        <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
                           <ArrowDownCircle size={200} />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* 商品建模：规格与属性 */}
                  <section className="space-y-8">
                     <div className="flex items-center space-x-3 border-b pb-4 border-gray-100">
                        <Grid3X3 size={20} className="text-blue-600" />
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-800 italic">建模快照 (Modeling Snapshot)</h4>
                     </div>
                     
                     <div className="space-y-10">
                        <div>
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 flex items-center italic">
                              <Tag size={12} className="mr-1.5" /> 核心业务属性 (Attributes)
                           </label>
                           <div className="grid grid-cols-2 gap-4">
                              {showDetail.attributes.map((attr: any, i: number) => (
                                 <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{attr.name}</span>
                                    <span className="text-xs font-black text-gray-800">{attr.value}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div>
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 flex items-center italic">
                              <Layers size={12} className="mr-1.5" /> SKU 变体规则 (Specs)
                           </label>
                           <div className="space-y-4">
                              {showDetail.specifications.map((spec: any, i: number) => (
                                 <div key={i} className="space-y-2">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{spec.name}</span>
                                    <div className="flex flex-wrap gap-2">
                                       {spec.values.map((v: string) => (
                                          <span key={v} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-600 shadow-sm">{v}</span>
                                       ))}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </section>

                  {/* 商品图文描述与库存 */}
                  <section className="space-y-8">
                     <div className="flex items-center space-x-3 border-b pb-4 border-gray-100">
                        <ArrowRight size={20} className="text-orange-600" />
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-800 italic">详情与交付 (Detail & Logistics)</h4>
                     </div>
                     <div className="space-y-8">
                        <div>
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3 italic">供应端描述文字</label>
                           <div className="p-6 bg-orange-50/20 border-2 border-dashed border-orange-100 rounded-[32px] text-sm text-gray-600 leading-relaxed italic">
                              "{showDetail.desc}"
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="p-6 bg-gray-900 rounded-[32px] text-white">
                              <span className="text-[10px] font-black uppercase opacity-40 block mb-1">实物总库存量</span>
                              <span className="text-3xl font-black italic">{showDetail.stock} <span className="text-sm font-normal opacity-50 uppercase">qty</span></span>
                           </div>
                           <div className="p-6 bg-white border-2 border-gray-100 rounded-[32px]">
                              <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">类目平均售价</span>
                              <span className="text-3xl font-black italic text-gray-800">￥8,420</span>
                           </div>
                        </div>
                     </div>
                  </section>
               </div>
            </div>

            {/* 底部操作台：根据当前状态显示不同按钮 */}
            <div className="p-10 border-t bg-gray-50/50 flex justify-between items-center shadow-inner">
               <div className="flex items-center space-x-3 text-orange-600 font-bold bg-orange-50 px-5 py-2 rounded-2xl border border-orange-100">
                  <AlertCircle size={18} />
                  <span className="text-[10px] uppercase tracking-widest">注意：修改价格后将实时更新消费者终端</span>
               </div>
               
               <div className="flex space-x-4">
                  {showDetail.status === 'pending' ? (
                     <>
                        <button 
                          onClick={() => handleUpdateStatus(showDetail.id, 'rejected')}
                          className="px-10 py-4 bg-white border-2 border-red-100 text-red-500 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-red-50 transition flex items-center shadow-sm"
                        >
                           <XCircle size={18} className="mr-2" /> 驳回审核
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(showDetail.id, 'approved')}
                          className="px-16 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition flex items-center"
                        >
                           <CheckCircle size={18} className="mr-2" /> 批准通过并发布上线
                        </button>
                     </>
                  ) : showDetail.status === 'approved' ? (
                     <>
                        <button 
                          onClick={() => handleUpdateStatus(showDetail.id, 'rejected')}
                          className="px-10 py-4 bg-white border-2 border-orange-100 text-orange-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-orange-50 transition flex items-center shadow-sm"
                        >
                           <RotateCcw size={18} className="mr-2" /> 下架并撤回资产
                        </button>
                        <button 
                          onClick={() => setShowDetail(null)}
                          className="px-16 py-4 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-black transition flex items-center"
                        >
                           完成调价与归档
                        </button>
                     </>
                  ) : (
                     <button 
                        onClick={() => handleUpdateStatus(showDetail.id, 'pending')}
                        className="px-16 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-blue-700 transition flex items-center"
                     >
                        重新发起审核流程
                     </button>
                  )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAudit;
