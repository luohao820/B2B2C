
import React, { useState } from 'react';
import { 
  Plus, ListTree, Edit3, Trash2, X, Check, 
  LayoutGrid, Tag, ChevronRight, AlertCircle, Save, 
  Database, Link2, Settings2, Boxes, Palette, Grid3X3, Layers
} from 'lucide-react';
import { Category, ProductAttribute, ProductSpecification } from '../../types';

const CategoryManagement: React.FC = () => {
  const [showForm, setShowForm] = useState<'category' | 'bind_attr' | 'bind_spec' | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(1);

  // 模拟全局库数据
  const attributePool: ProductAttribute[] = [
    { id: 'attr_1', name: '品牌', type: 'select', options: ['苹果', '耐克'], is_required: true },
    { id: 'attr_2', name: '主要材质', type: 'input', is_required: false },
    { id: 'attr_4', name: '机身层数', type: 'input', is_required: false }
  ];

  const specificationPool: ProductSpecification[] = [
    { id: 'spec_1', name: '颜色', values: ['黑色', '白色'], has_image: true },
    { id: 'spec_2', name: '尺码', values: ['S', 'M', 'L'], has_image: false },
    { id: 'spec_3', name: '内存', values: ['8G', '16G'], has_image: false }
  ];

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: '数码通讯',
      level: 1,
      attributes: [attributePool[0], attributePool[2]],
      specifications: [specificationPool[2]]
    },
    {
      id: 2,
      name: '智能手机',
      parent_id: 1,
      level: 2,
      attributes: [attributePool[0]],
      specifications: [specificationPool[0], specificationPool[2]]
    }
  ]);

  const [categoryForm, setCategoryForm] = useState({ name: '', parent_id: undefined as number | undefined });

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const handleSaveCategory = () => {
    if (!categoryForm.name.trim()) return;
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const parent = categories.find(c => c.id === categoryForm.parent_id);
    const newCategory: Category = {
      id: newId,
      name: categoryForm.name,
      parent_id: categoryForm.parent_id,
      level: parent ? parent.level + 1 : 1,
      attributes: [],
      specifications: []
    };
    setCategories([...categories, newCategory]);
    setShowForm(null);
    setSelectedCategoryId(newId);
  };

  const bindAttribute = (attr: ProductAttribute) => {
    if (!selectedCategoryId) return;
    const isBound = selectedCategory?.attributes.some(a => a.id === attr.id);
    if (isBound) return;
    setCategories(categories.map(c => c.id === selectedCategoryId ? { ...c, attributes: [...c.attributes, attr] } : c));
    setShowForm(null);
  };

  const bindSpecification = (spec: ProductSpecification) => {
    if (!selectedCategoryId) return;
    const isBound = selectedCategory?.specifications.some(s => s.id === spec.id);
    if (isBound) return;
    setCategories(categories.map(c => c.id === selectedCategoryId ? { ...c, specifications: [...c.specifications, spec] } : c));
    setShowForm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">全域类目架构定义</h1>
          <p className="text-xs text-gray-400 mt-1 font-medium italic">管理多级商品分类体系，并从全局库中挂载特定的业务属性与 SKU 规格模型</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 分类树 */}
        <div className="lg:col-span-1 bg-white rounded-[32px] border shadow-sm flex flex-col h-[75vh] overflow-hidden">
          <div className="p-5 border-b font-black text-[10px] text-gray-400 uppercase tracking-widest bg-gray-50/50 flex items-center justify-between">
            <span className="flex items-center"><ListTree size={16} className="mr-2 text-blue-600" /> 层级架构目录</span>
            <button onClick={() => { setCategoryForm({name: '', parent_id: undefined}); setShowForm('category'); }} className="p-1 hover:bg-blue-50 rounded-lg text-blue-600 transition"><Plus size={16}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {categories.filter(c => !c.parent_id).map(cat => (
              <div key={cat.id} className="space-y-2">
                <div 
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${selectedCategoryId === cat.id ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'bg-white border-transparent hover:bg-gray-50'}`}
                >
                  <span className="font-black text-sm uppercase text-gray-900">{cat.name}</span>
                  <ChevronRight size={14} className={selectedCategoryId === cat.id ? 'text-blue-600' : 'text-gray-200'} />
                </div>
                <div className="pl-6 space-y-2 border-l-2 border-dashed border-gray-100 ml-4">
                  {categories.filter(c => c.parent_id === cat.id).map(sub => (
                    <div 
                      key={sub.id}
                      onClick={() => setSelectedCategoryId(sub.id)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${selectedCategoryId === sub.id ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' : 'bg-white border-transparent hover:bg-gray-50'}`}
                    >
                      <span className="text-xs text-gray-900">{sub.name}</span>
                      <ChevronRight size={12} className={selectedCategoryId === sub.id ? 'text-blue-600' : 'text-gray-200'} />
                    </div>
                  ))}
                  <button onClick={() => { setCategoryForm({name: '', parent_id: cat.id}); setShowForm('category'); }} className="w-full py-2.5 border-2 border-dashed border-gray-100 rounded-xl text-[10px] font-black text-blue-400 uppercase hover:bg-blue-50 transition-all">+ 新增二级</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 详情与绑定 */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border shadow-sm flex flex-col h-[75vh] overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between bg-gray-50/50">
             <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center">
                <Layers size={16} className="mr-2 text-blue-600" /> 类目模型配置：
                {selectedCategory ? <span className="ml-2 text-blue-600 font-black">[{selectedCategory.name}]</span> : <span className="ml-2 text-gray-300 italic font-medium">请先选取类目</span>}
             </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
            {selectedCategory ? (
              <>
                {/* Section 1: Attributes */}
                <section className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center"><Tag size={16} className="mr-2" /> 挂载业务属性 (Attributes)</h3>
                    <button onClick={() => setShowForm('bind_attr')} className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest flex items-center"><Link2 size={12} className="mr-1" /> 从库挑选</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCategory.attributes.map(attr => (
                      <div key={attr.id} className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm flex justify-between items-center group">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{attr.name}</div>
                          <span className={`text-[9px] font-black uppercase mt-1 px-1.5 py-0.5 rounded ${attr.is_required ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}`}>
                             {attr.is_required ? '必填' : '选填'}
                          </span>
                        </div>
                        <button onClick={() => setCategories(categories.map(c => c.id === selectedCategoryId ? {...c, attributes: c.attributes.filter(a => a.id !== attr.id)} : c))} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
                      </div>
                    ))}
                    {selectedCategory.attributes.length === 0 && <div className="col-span-2 py-10 text-center text-[10px] text-gray-300 font-bold uppercase border-2 border-dashed rounded-3xl">未挂载特征属性</div>}
                  </div>
                </section>

                {/* Section 2: Specifications */}
                <section className="space-y-6 pb-10">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center"><Grid3X3 size={16} className="mr-2" /> 挂载 SKU 规格 (Specifications)</h3>
                    <button onClick={() => setShowForm('bind_spec')} className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest flex items-center"><Link2 size={12} className="mr-1" /> 从库挑选</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCategory.specifications.map(spec => (
                      <div key={spec.id} className="p-5 bg-white border border-indigo-50 rounded-3xl shadow-sm flex justify-between items-center group">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{spec.name}</div>
                          <div className="text-[9px] text-gray-400 mt-1 uppercase italic">{spec.values.length} 个预设值 | {spec.has_image ? '支持配图' : '无图规格'}</div>
                        </div>
                        <button onClick={() => setCategories(categories.map(c => c.id === selectedCategoryId ? {...c, specifications: c.specifications.filter(s => s.id !== spec.id)} : c))} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
                      </div>
                    ))}
                    {selectedCategory.specifications.length === 0 && <div className="col-span-2 py-10 text-center text-[10px] text-gray-300 font-bold uppercase border-2 border-dashed rounded-3xl">未挂载规格模型</div>}
                  </div>
                </section>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-200">
                <Boxes size={64} className="mb-4 opacity-10" />
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">请选择节点以配置建模参数</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 弹窗逻辑 (略，保持类目初始化弹窗并增加属性/规格绑定弹窗) */}
      {showForm === 'category' && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="text-lg font-black uppercase italic text-gray-800">新增类目实体</h3>
                 <button onClick={() => setShowForm(null)} className="text-gray-400"><X size={24}/></button>
              </div>
              <div className="p-10 space-y-8 bg-white">
                <div>
                   <label className="text-[10px] font-black text-blue-600 block mb-2 uppercase tracking-widest">类目显示名称</label>
                   <input type="text" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full border-2 border-gray-100 rounded-2xl p-4 font-bold text-gray-900 outline-none focus:border-blue-600 shadow-inner" placeholder="如：智能穿戴" />
                </div>
              </div>
              <div className="p-8 border-t bg-gray-50 flex space-x-3">
                 <button onClick={() => setShowForm(null)} className="flex-1 py-4 bg-white border rounded-2xl font-black text-[10px] text-gray-400 uppercase">放弃</button>
                 <button onClick={handleSaveCategory} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-blue-100">保存类目</button>
              </div>
           </div>
        </div>
      )}

      {showForm === 'bind_attr' && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-[48px] w-full max-w-2xl h-[60vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-200">
              <div className="p-8 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="text-xl font-black uppercase italic text-gray-800 flex items-center"><Database size={24} className="mr-3 text-blue-600" /> 选择挂载业务属性</h3>
                 <button onClick={() => setShowForm(null)} className="text-gray-400"><X size={24}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10">
                 <div className="grid grid-cols-2 gap-4">
                    {attributePool.map(attr => (
                       <div key={attr.id} onClick={() => bindAttribute(attr)} className="p-6 rounded-[32px] border-2 border-gray-50 bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer flex flex-col items-center text-center group">
                          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform"><Plus size={24}/></div>
                          <div className="text-sm font-black text-gray-900">{attr.name}</div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">{attr.is_required ? '必填约束' : '选填'}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {showForm === 'bind_spec' && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-[48px] w-full max-w-2xl h-[60vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-200">
              <div className="p-8 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="text-xl font-black uppercase italic text-gray-800 flex items-center"><Grid3X3 size={24} className="mr-3 text-indigo-600" /> 选择挂载 SKU 规格</h3>
                 <button onClick={() => setShowForm(null)} className="text-gray-400"><X size={24}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10">
                 <div className="grid grid-cols-2 gap-4">
                    {specificationPool.map(spec => (
                       <div key={spec.id} onClick={() => bindSpecification(spec)} className="p-6 rounded-[32px] border-2 border-gray-50 bg-white hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50 transition-all cursor-pointer flex flex-col items-center text-center group">
                          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform"><Plus size={24}/></div>
                          <div className="text-sm font-black text-gray-900">{spec.name}</div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">{spec.values.length} 个枚举选项</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
