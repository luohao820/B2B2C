
import React, { useState } from 'react';
import { Plus, Grid3X3, Edit3, Trash2, X, Check, Search, Palette, Maximize, AlertCircle, Save, ImageIcon } from 'lucide-react';
import { ProductSpecification } from '../../types';

const SpecificationManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingSpec, setEditingSpec] = useState<ProductSpecification | null>(null);
  const [valuesString, setValuesString] = useState('');

  const [specPool, setSpecPool] = useState<ProductSpecification[]>([
    { id: 'spec_1', name: '颜色', values: ['曜石黑', '珍珠白', '远峰蓝', '暗夜紫'], has_image: true },
    { id: 'spec_2', name: '尺码规格', values: ['S', 'M', 'L', 'XL', 'XXL'], has_image: false },
    { id: 'spec_3', name: '存储容量', values: ['128GB', '256GB', '512GB', '1TB'], has_image: false }
  ]);

  const handleOpenForm = (spec: ProductSpecification | null = null) => {
    if (spec) {
      setEditingSpec(spec);
      setValuesString(spec.values.join(', '));
    } else {
      setEditingSpec({ id: '', name: '', values: [], has_image: false });
      setValuesString('');
    }
    setShowForm(true);
  };

  const handleSave = () => {
    if (!editingSpec?.name.trim()) return;
    
    const newSpec: ProductSpecification = {
      ...editingSpec,
      id: editingSpec.id || `spec_${Date.now()}`,
      values: valuesString.split(/[,，]/).map(s => s.trim()).filter(s => s !== '')
    };

    if (specPool.some(s => s.id === newSpec.id)) {
      setSpecPool(specPool.map(s => s.id === newSpec.id ? newSpec : s));
    } else {
      setSpecPool([...specPool, newSpec]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">商品规格变体库</h1>
          <p className="text-xs text-gray-400 mt-1 font-medium">定义用于生成多维 SKU 的规格参数，支持为颜色等特定规格开启图样配置功能</p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl flex items-center hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 font-bold"
        >
          <Plus size={20} className="mr-2" /> 建立规格维度
        </button>
      </div>

      <div className="bg-white rounded-[40px] border shadow-sm p-10 min-h-[70vh]">
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" placeholder="搜索规格名称..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-800 focus:ring-4 focus:ring-indigo-50 outline-none transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specPool.map(spec => (
            <div key={spec.id} className="p-8 bg-white rounded-[40px] border-2 border-gray-50 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50 transition-all group relative">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mr-3 shadow-inner">
                    {spec.name === '颜色' ? <Palette size={18}/> : <Grid3X3 size={18}/>}
                  </div>
                  <div>
                    <div className="text-base font-black text-gray-900 italic">{spec.name}</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase">{spec.id}</div>
                  </div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenForm(spec)} className="p-2 text-gray-400 hover:text-indigo-600"><Edit3 size={16}/></button>
                  <button onClick={() => setSpecPool(specPool.filter(s => s.id !== spec.id))} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">规格图片支持</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${spec.has_image ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-100 text-gray-400'}`}>
                    {spec.has_image ? '已启用 (Supported)' : '未启用'}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center italic mb-2">可选项明细 (Values)</div>
                <div className="flex flex-wrap gap-2">
                  {spec.values.map(val => (
                    <span key={val} className="px-3 py-1 bg-gray-50 text-[10px] font-bold text-gray-600 rounded-lg border border-gray-100">{val}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && editingSpec && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-black uppercase italic text-gray-800 tracking-tight">SKU 规格配置</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 p-2"><X size={24} /></button>
            </div>
            <div className="p-10 space-y-8 bg-white">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-indigo-600 block mb-2 uppercase tracking-widest">规格维度名称</label>
                  <input 
                    autoFocus
                    type="text" 
                    value={editingSpec.name}
                    onChange={e => setEditingSpec({...editingSpec, name: e.target.value})}
                    className="w-full border-2 border-gray-100 bg-white rounded-2xl p-4 outline-none focus:border-indigo-600 text-gray-900 font-bold shadow-inner" 
                    placeholder="如：颜色 / 尺码 / 净含量" 
                  />
                </div>
                
                <div className="bg-gray-50 p-6 rounded-3xl border space-y-3">
                   <div className="flex justify-between items-center">
                      <div>
                         <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest block">开启规格图片映射</span>
                         <p className="text-[9px] text-gray-400 mt-0.5">允许供应商为该规格的每个值上传对应的展示图</p>
                      </div>
                      <div 
                        onClick={() => setEditingSpec({...editingSpec, has_image: !editingSpec.has_image})}
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${editingSpec.has_image ? 'bg-indigo-600' : 'bg-gray-300'}`}
                      >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editingSpec.has_image ? 'left-7' : 'left-1'}`}></div>
                      </div>
                   </div>
                </div>

                <div className="animate-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] font-black text-indigo-600 block mb-2 uppercase tracking-widest italic flex items-center">
                    <AlertCircle size={12} className="mr-1.5" /> 预设规格值列表 (用逗号分隔)
                  </label>
                  <textarea 
                    value={valuesString}
                    onChange={e => setValuesString(e.target.value)}
                    className="w-full border-2 border-gray-100 bg-white rounded-3xl p-5 outline-none focus:border-indigo-600 text-gray-900 font-bold text-sm h-32 shadow-inner transition-all placeholder:text-gray-300" 
                    placeholder="例如：红色, 蓝色, 黑色..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="p-8 border-t bg-gray-50 flex space-x-3">
              <button onClick={() => setShowForm(false)} className="flex-1 py-4 bg-white border rounded-2xl font-black text-[10px] text-gray-400 uppercase tracking-widest shadow-sm">放弃</button>
              <button onClick={handleSave} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center">
                <Save size={18} className="mr-2" /> 同步至规格库
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificationManagement;
