
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Save, Package, LayoutGrid, Tag, Grid3X3, Image as ImageIcon,
  Camera, X, Palette, Plus, AlertCircle, Trash2, ArrowRight
} from 'lucide-react';

const ProductEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [productData, setProductData] = useState({
    name: isEdit ? '极简主义纯棉 T 恤' : '',
    category: '潮流服饰',
    supply_price: isEdit ? 89.00 : 0,
    description: isEdit ? '采用 100% 精梳棉，克重 240g，透气亲肤。' : '',
    specs: [
      { name: '颜色', values: ['曜石黑', '珍珠白'], type: 'color' },
      { name: '尺码', values: ['S', 'M', 'L'], type: 'text' }
    ]
  });

  const handleAddSpecValue = (specIndex: number) => {
    const val = window.prompt('请输入新的规格值（如：香槟金、XL）：');
    if (val) {
      const newSpecs = [...productData.specs];
      newSpecs[specIndex].values.push(val);
      setProductData({ ...productData, specs: newSpecs });
    }
  };

  const handleRemoveSpecValue = (specIndex: number, valIndex: number) => {
    const newSpecs = [...productData.specs];
    newSpecs[specIndex].values.splice(valIndex, 1);
    setProductData({ ...productData, specs: newSpecs });
  };

  const handleSave = () => {
    alert('商品数据已成功同步至待审中心！接下来请在库存管理中配置首批进货量。');
    navigate('/supplier/inventory');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24">
      {/* 顶部导航 */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[32px] border shadow-sm sticky top-20 z-10">
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate('/supplier/products')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition">
            <ChevronLeft size={24} className="text-gray-400" />
          </button>
          <div>
            <h1 className="text-xl font-black italic text-gray-800 uppercase tracking-tighter">
              {isEdit ? '编辑商品建模' : '新数字化资产初始化'}
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Product Modeling & Archive Setup</p>
          </div>
        </div>
        <button onClick={handleSave} className="px-10 py-3.5 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition flex items-center group">
          <Save size={18} className="mr-2 group-hover:scale-110 transition-transform" /> 提交建模申请 (Finalize)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：基础档案与规格 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. 基础信息 */}
          <section className="bg-white p-10 rounded-[40px] border shadow-sm space-y-8">
             <div className="flex items-center space-x-3 border-b pb-5 border-gray-50">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner"><LayoutGrid size={20}/></div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 italic">核心档案配置 (Basic Archive)</h3>
             </div>
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">商品展示全称</label>
                   <input 
                      type="text" 
                      value={productData.name} 
                      onChange={e => setProductData({...productData, name: e.target.value})}
                      className="w-full border-2 border-gray-100 bg-gray-50/30 rounded-2xl p-4 text-sm font-black text-gray-900 outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                      placeholder="例如：[旗舰新款] 极地系列防风透气冲锋衣"
                   />
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">业务挂载类目</label>
                      <select className="w-full border-2 border-gray-100 bg-gray-50/30 rounded-2xl p-4 text-sm font-black text-gray-900 outline-none appearance-none">
                         <option>潮流服饰</option>
                         <option>智能数码</option>
                         <option>日常百货</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">供货基准价 (￥)</label>
                      <input 
                        type="number" 
                        value={productData.supply_price}
                        onChange={e => setProductData({...productData, supply_price: parseFloat(e.target.value)})}
                        className="w-full border-2 border-gray-100 bg-gray-50/30 rounded-2xl p-4 text-sm font-black text-blue-600 outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                      />
                   </div>
                </div>
             </div>
          </section>

          {/* 2. 规格维护 - 深度强化 */}
          <section className="bg-white p-10 rounded-[40px] border shadow-sm space-y-8">
             <div className="flex items-center space-x-3 border-b pb-5 border-gray-50">
                <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner"><Grid3X3 size={20}/></div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 italic">SKU 变体引擎 (Variant Modeling)</h3>
             </div>
             <div className="space-y-10">
                {productData.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center">
                           <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></span>
                           <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 italic">规格维度：{spec.name}</span>
                        </div>
                        {spec.type === 'color' && <span className="text-[9px] font-black text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">支持图样映射</span>}
                     </div>
                     <div className="bg-gray-50/50 p-6 rounded-[32px] border border-dashed border-gray-200 flex flex-wrap gap-4">
                        {spec.values.map((v, vIdx) => (
                          <div key={vIdx} className="group relative bg-white border-2 border-indigo-100 px-5 py-2 rounded-2xl text-xs font-black text-indigo-600 shadow-sm flex items-center animate-in zoom-in duration-200">
                             {spec.type === 'color' && <div className="w-3 h-3 rounded-full mr-2 shadow-sm" style={{backgroundColor: v === '曜石黑' ? '#333' : '#eee'}}></div>}
                             {v}
                             <button 
                               onClick={() => handleRemoveSpecValue(sIdx, vIdx)}
                               className="ml-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                                <X size={14}/>
                             </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => handleAddSpecValue(sIdx)}
                          className="px-5 py-2 border-2 border-dashed border-indigo-200 rounded-2xl text-xs font-bold text-indigo-400 hover:bg-white hover:border-indigo-400 transition-all flex items-center"
                        >
                           <Plus size={16} className="mr-1"/> Add Value
                        </button>
                     </div>
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[32px] text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all">+ 建立新规格维度 (Dimension)</button>
             </div>
          </section>

          {/* 3. 详情描述 - 长文案文本域 */}
          <section className="bg-white p-10 rounded-[40px] border shadow-sm space-y-6">
             <div className="flex items-center space-x-3 border-b pb-5 border-gray-50">
                <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner"><Tag size={20}/></div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 italic">图文详情配置 (Details & Copywriting)</h3>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">主卖点文案 (Description Context)</label>
                <textarea 
                  value={productData.description}
                  onChange={e => setProductData({...productData, description: e.target.value})}
                  className="w-full h-48 border-2 border-gray-100 bg-gray-50/30 rounded-[32px] p-6 text-sm font-medium leading-relaxed text-gray-700 outline-none focus:bg-white focus:border-orange-400 transition-all shadow-inner"
                  placeholder="请输入用于移动端展示的详细卖点介绍..."
                ></textarea>
                <div className="grid grid-cols-4 gap-4">
                   <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-300 hover:border-orange-400 transition-all cursor-pointer">
                      <Camera size={24} className="mb-1"/>
                      <span className="text-[8px] font-black uppercase">Add Media</span>
                   </div>
                </div>
             </div>
          </section>
        </div>

        {/* 右侧：预览与辅助 */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-gray-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">建模预览 (Modeling)</span>
                    <Package size={24} className="text-blue-400" />
                 </div>
                 <div className="space-y-2">
                    <div className="text-2xl font-black italic">{productData.name || '未命名商品'}</div>
                    <div className="text-3xl font-black text-blue-400">￥{productData.supply_price}</div>
                 </div>
                 <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="text-[10px] font-black uppercase opacity-40">预计变体总数 (SKUs)</div>
                    <div className="text-4xl font-black italic">
                       {productData.specs.reduce((acc, curr) => acc * curr.values.length, 1)}
                    </div>
                    <p className="text-[9px] text-white/50 leading-relaxed italic">变体数量由各规格维度值的笛卡尔积自动计算得出。</p>
                 </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
                 <Grid3X3 size={200} />
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border shadow-sm space-y-6">
              <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-widest flex items-center">
                 <AlertCircle size={14} className="mr-2 text-blue-600" /> 发布指引 (Guidelines)
              </h4>
              <ul className="space-y-4">
                 {[
                   '精准的规格划分有助于消费者更快的决策',
                   '供货价不包含平台服务费及营销点位',
                   '提交后档案进入锁定待审状态',
                   '建模成功后需立即补齐首批动态库存'
                 ].map((text, i) => (
                   <li key={i} className="flex items-start">
                      <ArrowRight size={12} className="mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-xs text-gray-500 font-medium">{text}</span>
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
