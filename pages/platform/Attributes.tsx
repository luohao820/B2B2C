
import React, { useState } from 'react';
import { Plus, Database, Edit3, Trash2, X, Check, Search, Settings2, AlertCircle, Save } from 'lucide-react';
import { ProductAttribute } from '../../types';

const AttributeManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingAttr, setEditingAttr] = useState<ProductAttribute | null>(null);
  const [optionsString, setOptionsString] = useState('');

  const [attributePool, setAttributePool] = useState<ProductAttribute[]>([
    { id: 'attr_1', name: '品牌', type: 'select', options: ['苹果', '华为', '小米', '索尼'], is_required: true },
    { id: 'attr_2', name: '面料成分', type: 'input', is_required: false },
    { id: 'attr_3', name: '保修期限', type: 'select', options: ['1年', '2年', '3年'], is_required: true },
    { id: 'attr_4', name: '机身层数', type: 'input', is_required: false }
  ]);

  const handleOpenForm = (attr: ProductAttribute | null = null) => {
    if (attr) {
      setEditingAttr(attr);
      setOptionsString(attr.options?.join(', ') || '');
    } else {
      setEditingAttr({ id: '', name: '', type: 'input', options: [], is_required: true });
      setOptionsString('');
    }
    setShowForm(true);
  };

  const handleSave = () => {
    if (!editingAttr?.name.trim()) return;
    
    const newAttr: ProductAttribute = {
      ...editingAttr,
      id: editingAttr.id || `attr_${Date.now()}`,
      options: editingAttr.type === 'select' ? optionsString.split(/[,，]/).map(s => s.trim()).filter(s => s !== '') : []
    };

    if (attributePool.some(a => a.id === newAttr.id)) {
      setAttributePool(attributePool.map(a => a.id === newAttr.id ? newAttr : a));
    } else {
      setAttributePool([...attributePool, newAttr]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">业务属性特征库</h1>
          <p className="text-xs text-gray-400 mt-1 font-medium">维护全站通用的描述性属性，支持设置必填项约束以标准化商品建模</p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl flex items-center hover:bg-blue-700 transition shadow-lg shadow-blue-100 font-bold"
        >
          <Plus size={20} className="mr-2" /> 新增业务属性
        </button>
      </div>

      <div className="bg-white rounded-[40px] border shadow-sm p-10 min-h-[70vh]">
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" placeholder="搜索属性名称或 ID..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-800 focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attributePool.map(attr => (
            <div key={attr.id} className="p-8 bg-white rounded-[40px] border-2 border-gray-50 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all group relative">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mr-3 shadow-inner">
                    <Settings2 size={18}/>
                  </div>
                  <div>
                    <div className="text-base font-black text-gray-900 italic">{attr.name}</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase">{attr.type} | {attr.id}</div>
                  </div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenForm(attr)} className="p-2 text-gray-400 hover:text-blue-600"><Edit3 size={16}/></button>
                  <button onClick={() => setAttributePool(attributePool.filter(a => a.id !== attr.id))} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">约束强度</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${attr.is_required ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-100 text-gray-400'}`}>
                    {attr.is_required ? '必须填写' : '选填项'}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center italic mb-2">枚值选项 (Options)</div>
                <div className="flex flex-wrap gap-2">
                  {attr.options?.map(opt => (
                    <span key={opt} className="px-3 py-1 bg-gray-50 text-[10px] font-bold text-gray-600 rounded-lg border border-gray-100">{opt}</span>
                  ))}
                  {(!attr.options || attr.options.length === 0) && <span className="text-[10px] text-gray-300 italic">自由文本输入</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && editingAttr && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-black uppercase italic text-gray-800 tracking-tight">属性特征定义</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 p-2"><X size={24} /></button>
            </div>
            <div className="p-10 space-y-8 bg-white">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-blue-600 block mb-2 uppercase tracking-widest">属性名称 (Key)</label>
                  <input 
                    autoFocus
                    type="text" 
                    value={editingAttr.name}
                    onChange={e => setEditingAttr({...editingAttr, name: e.target.value})}
                    className="w-full border-2 border-gray-100 bg-white rounded-2xl p-4 outline-none focus:border-blue-600 text-gray-900 font-bold shadow-inner" 
                    placeholder="如：面料成分 / 适用年龄" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 block mb-2 uppercase tracking-widest">交互方式</label>
                    <select 
                      value={editingAttr.type}
                      onChange={e => setEditingAttr({...editingAttr, type: e.target.value as any})}
                      className="w-full border-2 border-gray-100 bg-white rounded-2xl p-4 text-gray-900 font-bold outline-none focus:border-blue-600"
                    >
                      <option value="input">自由文本</option>
                      <option value="select">预设下拉单选</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 block mb-2 uppercase tracking-widest">必填约束 (Required)</label>
                    <div className="flex bg-gray-50 p-1 rounded-2xl border">
                      <button 
                        onClick={() => setEditingAttr({...editingAttr, is_required: true})}
                        className={`flex-1 py-2 text-[10px] font-black rounded-xl transition-all ${editingAttr.is_required ? 'bg-white text-red-600 shadow-sm border border-red-100' : 'text-gray-400'}`}
                      >
                        必填
                      </button>
                      <button 
                        onClick={() => setEditingAttr({...editingAttr, is_required: false})}
                        className={`flex-1 py-2 text-[10px] font-black rounded-xl transition-all ${!editingAttr.is_required ? 'bg-white text-blue-600 shadow-sm border border-blue-100' : 'text-gray-400'}`}
                      >
                        选填
                      </button>
                    </div>
                  </div>
                </div>
                {editingAttr.type === 'select' && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black text-blue-600 block mb-2 uppercase tracking-widest italic flex items-center">
                      <AlertCircle size={12} className="mr-1.5" /> 枚举可选项库 (用逗号分隔)
                    </label>
                    <textarea 
                      value={optionsString}
                      onChange={e => setOptionsString(e.target.value)}
                      className="w-full border-2 border-gray-100 bg-white rounded-3xl p-5 outline-none focus:border-blue-600 text-gray-900 font-bold text-sm h-32 shadow-inner transition-all placeholder:text-gray-300" 
                      placeholder="例如：纯棉, 涤纶, 桑蚕丝..."
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
            <div className="p-8 border-t bg-gray-50 flex space-x-3">
              <button onClick={() => setShowForm(false)} className="flex-1 py-4 bg-white border rounded-2xl font-black text-[10px] text-gray-400 uppercase tracking-widest shadow-sm">取消</button>
              <button onClick={handleSave} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center">
                <Save size={18} className="mr-2" /> 同步至属性库
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttributeManagement;
