
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Layout, LayoutGrid, Image as ImageIcon, List, Layers, Plus, Save, 
  Smartphone, Monitor, X, Trash2, Clock, AlertCircle, Edit3, 
  ShoppingBag, Check, Search, ChevronLeft, ArrowRight, Grid3X3, 
  MousePointer2, Zap, Eye, MoveVertical
} from 'lucide-react';

const DecorationEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [isLive, setIsLive] = useState(true);
  
  // 核心组件状态 - 初始化模拟数据
  const [components, setComponents] = useState<any[]>([
    { id: 'c1', type: 'banner', title: '2024 春季焕新周', style: { bg: '#3b82f6', height: 180 }, data: { subtitle: '全场满 300 减 40', btnText: '立即抢购' } },
    { id: 'c2', type: 'grid', title: '快捷入口', style: { bg: '#ffffff' }, data: { items: 4 } },
    { id: 'c3', type: 'countdown', title: '限时秒杀', style: { bg: '#ef4444' }, data: { endTime: '2024-12-31' } },
    { id: 'c4', type: 'product_list', title: '猜你喜欢', style: { bg: '#ffffff' }, data: { products: ['P1', 'P3', 'P5'] } },
  ]);

  // 模拟商品库
  const allAvailableProducts = [
    { id: 'P1', name: 'iPhone 15 Pro Max', price: 9999, img: 'https://picsum.photos/200/200?random=101' },
    { id: 'P2', name: '北面冲锋衣 经典版', price: 1599, img: 'https://picsum.photos/200/200?random=102' },
    { id: 'P3', name: '索尼 WH-1000XM5', price: 2499, img: 'https://picsum.photos/200/200?random=103' },
    { id: 'P4', name: '九阳破壁机 2024款', price: 599, img: 'https://picsum.photos/200/200?random=104' },
    { id: 'P5', name: '戴森 HD15 吹风机', price: 2999, img: 'https://picsum.photos/200/200?random=105' },
  ];

  const addComponent = (type: string) => {
    const newId = `comp_${Date.now()}`;
    let newComp: any = { id: newId, type, title: '新组件', style: { bg: '#ffffff', height: 120 }, data: {} };
    
    if (type === 'banner') {
      newComp.title = '夏日狂欢节';
      newComp.style.bg = '#10b981';
      newComp.data = { subtitle: '夏季新品首发', btnText: '去看看' };
    } else if (type === 'product_list') {
      newComp.title = '爆款精选';
      newComp.data = { products: [] };
    } else if (type === 'countdown') {
      newComp.title = '零点秒杀';
      newComp.style.bg = '#f97316';
    }

    setComponents([...components, newComp]);
    setSelectedCompId(newId);
    // 自动滚动到新组件位置 (预览窗口)
    setTimeout(() => {
      const el = document.getElementById(`preview-${newId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const updateCompProperty = (id: string, key: string, value: any, section: 'style' | 'data' | 'title' = 'title') => {
    setComponents(prev => prev.map(c => {
      if (c.id !== id) return c;
      if (section === 'title') return { ...c, title: value };
      return { ...c, [section]: { ...c[section], [key]: value } };
    }));
  };

  const toggleProductInComp = (productId: string) => {
    if (!selectedCompId) return;
    const comp = components.find(c => c.id === selectedCompId);
    if (comp?.type !== 'product_list') return;

    const currentProducts = comp.data.products || [];
    const newProducts = currentProducts.includes(productId)
      ? currentProducts.filter((p: string) => p !== productId)
      : [...currentProducts, productId];
    
    updateCompProperty(selectedCompId, 'products', newProducts, 'data');
  };

  const selectedComp = components.find(c => c.id === selectedCompId);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col space-y-4">
      {/* 顶部实时同步工具栏 */}
      <div className="flex justify-between items-center bg-white p-5 rounded-[32px] border shadow-sm">
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate('/platform/decoration')} className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition group">
             <ChevronLeft size={24} className="text-gray-400 group-hover:text-blue-600" />
          </button>
          <div className="h-10 w-[1px] bg-gray-100"></div>
          <div>
            <h1 className="text-xl font-black text-gray-800 flex items-center italic">视觉画布编辑器<span className="ml-2 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] rounded-full non-italic border border-green-100 animate-pulse">LIVE</span></h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time Synchronization Engine v2.0</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 mr-2">
             <Zap size={14} className="text-yellow-500 mr-2" />
             <span className="text-[10px] font-black text-gray-400 uppercase">实时预览模式已开启</span>
          </div>
          <button onClick={() => { alert('方案已成功发布上线！'); navigate('/platform/decoration'); }} className="px-10 py-3 bg-blue-600 text-white rounded-2xl text-[11px] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition flex items-center group uppercase tracking-widest">
            <Save size={18} className="mr-2 group-hover:scale-110 transition-transform" /> 立即发布生效
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* 左侧：组件库 */}
        <div className="w-72 bg-white border rounded-[32px] overflow-hidden flex flex-col shadow-sm">
          <div className="p-5 border-b font-black text-[10px] text-gray-400 uppercase tracking-widest flex items-center bg-gray-50/50">
             <Layers size={14} className="mr-2 text-blue-600" /> 组件库中心 (Elements)
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {[
              { label: '品牌广告 BANNERS', icon: ImageIcon, type: 'banner', desc: '支持图片、文字及按钮自定义' },
              { label: '商品网格瀑布流', icon: ShoppingBag, type: 'product_list', desc: '可按 ID 精准选品或按类目' },
              { label: '金刚区功能入口', icon: LayoutGrid, type: 'grid', desc: '4-10 个快捷图标导航' },
              { label: '限时秒杀倒计时', icon: Clock, type: 'countdown', desc: '强交互促销氛围组件' },
            ].map(item => (
              <button 
                key={item.type}
                onClick={() => addComponent(item.type)}
                className="w-full text-left p-4 border-2 border-transparent bg-gray-50/50 rounded-[28px] hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center mb-1">
                   <div className="p-2 bg-white rounded-xl shadow-sm mr-3 text-gray-400 group-hover:text-blue-600 group-hover:shadow-blue-100 transition-all">
                      <item.icon size={18} />
                   </div>
                   <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{item.label}</span>
                </div>
                <p className="text-[9px] text-gray-400 leading-tight ml-10">{item.desc}</p>
                <div className="absolute -right-2 -bottom-2 opacity-0 group-hover:opacity-10 transition-opacity">
                   <item.icon size={56} />
                </div>
              </button>
            ))}
          </div>
          <div className="p-4 border-t bg-gray-50/50">
             <div className="p-3 bg-white border rounded-2xl flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">所有更改已实时保存</span>
             </div>
          </div>
        </div>

        {/* 中间：实时滚动预览画布 */}
        <div className="flex-1 bg-[#f0f2f5] rounded-[48px] flex flex-col items-center overflow-hidden border-4 border-white shadow-inner relative">
           <div className="h-16 w-full bg-white/80 backdrop-blur-md border-b flex justify-between px-8 items-center z-10 sticky top-0">
              <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex items-center space-x-6">
                <button onClick={() => setPreviewMode('mobile')} className={`p-2.5 rounded-xl transition-all ${previewMode === 'mobile' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'text-gray-300 hover:text-gray-400'}`}><Smartphone size={20}/></button>
                <button onClick={() => setPreviewMode('desktop')} className={`p-2.5 rounded-xl transition-all ${previewMode === 'desktop' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'text-gray-300 hover:text-gray-400'}`}><Monitor size={20}/></button>
              </div>
              <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <Eye size={14} className="mr-1.5" /> Previewing...
              </div>
           </div>
           
           <div className="flex-1 w-full overflow-y-auto py-12 flex justify-center scrollbar-hide relative group/canvas">
              {/* 装饰用滚动指示条 */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 opacity-0 group-hover/canvas:opacity-30 transition-opacity">
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                 <MoveVertical size={20} className="text-gray-400" />
                 <div className="text-[8px] font-black text-gray-400 uppercase [writing-mode:vertical-lr]">Scroll to review</div>
              </div>

              <div className={`bg-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] rounded-[56px] border-[14px] border-gray-900 relative overflow-hidden transition-all duration-500 flex flex-col ${
                previewMode === 'mobile' ? 'w-[375px]' : 'w-[880px]'
              }`}>
                 {/* 手机顶部状态栏 */}
                 <div className="h-8 flex justify-between items-center px-8 bg-white">
                    <span className="text-[10px] font-black italic">9:41</span>
                    <div className="flex space-x-1.5">
                       <div className="w-3 h-3 border border-black rounded-sm"></div>
                       <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                 </div>

                 {/* 可滚动的组件画布容器 */}
                 <div className="flex-1 overflow-y-auto bg-gray-50 scroll-smooth">
                    {components.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-inner animate-pulse">
                            <Plus size={40} className="text-gray-300" />
                         </div>
                         <p className="text-xs font-black text-gray-300 uppercase tracking-widest italic">请从左侧拖入组件开启设计</p>
                      </div>
                    )}
                    {components.map((comp) => (
                      <div 
                        id={`preview-${comp.id}`}
                        key={comp.id}
                        onClick={() => setSelectedCompId(comp.id)}
                        className={`group/item relative transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-4 ${selectedCompId === comp.id ? 'z-20' : 'z-10'}`}
                      >
                         {/* 实时预览渲染引擎 */}
                         <div className={`transition-all ${selectedCompId === comp.id ? 'ring-4 ring-blue-500/50 ring-inset shadow-2xl scale-[0.98] rounded-[24px] overflow-hidden' : 'hover:bg-blue-50/30'}`}>
                           {comp.type === 'banner' && (
                             <div className="relative overflow-hidden group/img" style={{height: `${comp.style.height}px`, backgroundColor: comp.style.bg}}>
                               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                               <div className="absolute bottom-6 left-6 text-white space-y-1">
                                  <div className="text-lg font-black italic uppercase leading-none">{comp.title}</div>
                                  <div className="text-[10px] font-bold opacity-80">{comp.data.subtitle}</div>
                                  <button className="mt-3 px-4 py-1.5 bg-white text-gray-900 rounded-full text-[9px] font-black uppercase tracking-widest">{comp.data.btnText || 'SHOP NOW'}</button>
                               </div>
                               <ImageIcon size={64} className="absolute right-[-10px] top-[-10px] text-white/10 rotate-12" />
                             </div>
                           )}

                           {comp.type === 'grid' && (
                             <div className="bg-white p-6 grid grid-cols-4 gap-4">
                               {[...Array(comp.data.items || 4)].map((_, i) => (
                                 <div key={i} className="flex flex-col items-center space-y-2">
                                   <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-500 border shadow-sm"><LayoutGrid size={20}/></div>
                                   <div className="h-1 w-8 bg-gray-100 rounded"></div>
                                 </div>
                               ))}
                             </div>
                           )}

                           {comp.type === 'countdown' && (
                             <div className="p-5 flex justify-between items-center text-white" style={{backgroundColor: comp.style.bg}}>
                                <div className="flex items-center">
                                   <div className="p-2 bg-white/20 rounded-xl mr-3"><Clock size={16}/></div>
                                   <div>
                                      <div className="text-[10px] font-black uppercase tracking-widest">{comp.title}</div>
                                      <div className="text-[9px] opacity-60 font-bold uppercase">Ends at {comp.data.endTime || 'Midnight'}</div>
                                   </div>
                                </div>
                                <div className="flex space-x-1 font-mono">
                                   <div className="bg-black/20 px-2 py-1 rounded text-xs font-black italic">02</div>
                                   <span className="opacity-50">:</span>
                                   <div className="bg-black/20 px-2 py-1 rounded text-xs font-black italic">45</div>
                                   <span className="opacity-50">:</span>
                                   <div className="bg-black/20 px-2 py-1 rounded text-xs font-black italic">12</div>
                                </div>
                             </div>
                           )}

                           {comp.type === 'product_list' && (
                             <div className="bg-white p-6 space-y-5">
                               <div className="flex justify-between items-center border-l-4 border-blue-600 pl-3">
                                  <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest italic">{comp.title}</span>
                                  <button className="text-[8px] font-black text-gray-400 uppercase flex items-center">View More <ArrowRight size={10} className="ml-1"/></button>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                {(comp.data.products || []).length > 0 ? comp.data.products.map((pid: string) => {
                                   const p = allAvailableProducts.find(item => item.id === pid);
                                   return (
                                     <div key={pid} className="bg-white border rounded-2xl p-2 shadow-sm animate-in zoom-in duration-300">
                                        <img src={p?.img} className="w-full aspect-square object-cover rounded-xl mb-3" />
                                        <div className="text-[9px] font-bold text-gray-800 truncate px-1">{p?.name}</div>
                                        <div className="text-[11px] font-black text-red-600 mt-1 italic px-1">￥{p?.price.toLocaleString()}</div>
                                     </div>
                                   );
                                }) : (
                                  <div className="col-span-2 py-12 text-center bg-gray-50 border-2 border-dashed border-gray-100 rounded-3xl">
                                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">请在右侧选择器中添加商品</span>
                                  </div>
                                )}
                               </div>
                             </div>
                           )}
                         </div>

                         {/* 实时编辑浮层控制按钮 */}
                         {selectedCompId === comp.id && (
                           <div className="absolute -right-14 top-2 flex flex-col space-y-2 opacity-100 transition-all animate-in slide-in-from-left-4">
                              <button className="p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-red-600 hover:rotate-6 transition-all" onClick={(e) => { e.stopPropagation(); setComponents(components.filter(c => c.id !== comp.id)); setSelectedCompId(null); }} title="删除组件"><Trash2 size={18}/></button>
                              <button className="p-3 bg-white border border-gray-100 text-gray-400 rounded-2xl shadow-xl hover:text-blue-600" title="上移"><Zap size={18} className="rotate-180"/></button>
                           </div>
                         )}
                      </div>
                    ))}
                    <div className="py-24 bg-gray-100/50 border-4 border-dashed border-gray-200 rounded-[40px] m-4 flex flex-col items-center justify-center text-gray-300 font-black uppercase text-[12px] tracking-[0.4em] italic">
                       Page Footer
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 右侧：参数检视器 (Inspector) - 实时响应面板 */}
        <div className="w-80 bg-white border rounded-[32px] flex flex-col shadow-sm">
           <div className="p-5 border-b font-black text-[10px] text-gray-400 uppercase tracking-widest bg-gray-50/50 flex justify-between items-center">
              <span>属性调优 (Inspector)</span>
              {selectedComp && <Zap size={14} className="text-yellow-500 animate-pulse" />}
           </div>
           {selectedComp ? (
             <div className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-hide animate-in slide-in-from-right duration-200">
                <section className="space-y-4">
                   <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center border-b pb-2 italic"><Edit3 size={14} className="mr-2" /> 基础文案定义</h5>
                   <div>
                      <label className="text-[9px] font-black text-gray-400 block mb-1.5 uppercase">主标题 (Main Title)</label>
                      <input 
                        type="text" 
                        value={selectedComp.title}
                        onChange={(e) => updateCompProperty(selectedComp.id, 'title', e.target.value, 'title')}
                        className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-black text-gray-900 bg-white outline-none focus:border-blue-600 transition-all shadow-inner" 
                      />
                   </div>
                   {selectedComp.type === 'banner' && (
                     <div className="animate-in fade-in duration-500">
                        <label className="text-[9px] font-black text-gray-400 block mb-1.5 uppercase">副标题文案</label>
                        <input 
                          type="text" 
                          value={selectedComp.data.subtitle}
                          onChange={(e) => updateCompProperty(selectedComp.id, 'subtitle', e.target.value, 'data')}
                          className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-700 bg-white outline-none focus:border-blue-600" 
                        />
                     </div>
                   )}
                </section>
                
                <section className="space-y-4">
                   <h5 className="text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center border-b pb-2 italic"><MousePointer2 size={14} className="mr-2" /> 视觉样式设定</h5>
                   <div>
                      <label className="text-[9px] font-black text-gray-400 block mb-1.5 uppercase tracking-widest">组件背景主题</label>
                      <div className="flex items-center space-x-3 bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                        <input 
                          type="color" 
                          value={selectedComp.style.bg}
                          onChange={(e) => updateCompProperty(selectedComp.id, 'bg', e.target.value, 'style')}
                          className="w-12 h-12 border-none rounded-xl cursor-pointer bg-transparent"
                        />
                        <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest">{selectedComp.style.bg}</span>
                      </div>
                   </div>
                   {selectedComp.type === 'banner' && (
                     <div>
                        <label className="text-[9px] font-black text-gray-400 block mb-1.5 uppercase">容器纵向高度 (px)</label>
                        <input 
                          type="range" 
                          min="100" max="400" 
                          value={selectedComp.style.height}
                          onChange={(e) => updateCompProperty(selectedComp.id, 'height', parseInt(e.target.value), 'style')}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between mt-1 text-[8px] font-black text-gray-400"><span>100PX</span><span>{selectedComp.style.height}PX</span><span>400PX</span></div>
                     </div>
                   )}
                </section>
                
                {selectedComp.type === 'product_list' && (
                  <section className="space-y-4 animate-in slide-in-from-right duration-300">
                    <h5 className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center border-b pb-2 italic"><Grid3X3 size={14} className="mr-2" /> 选品引擎中心</h5>
                    <div className="space-y-4">
                       <button 
                         onClick={() => setShowProductPicker(true)}
                         className="w-full py-4 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-orange-700 transition flex items-center justify-center border-b-4 border-orange-800 active:border-b-0 active:translate-y-1"
                       >
                         <Plus size={16} className="mr-2" /> 动态关联数字化商品
                       </button>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase flex justify-between">
                             已关联商品 <span>{selectedComp.data.products?.length || 0} SKUS</span>
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                             {(selectedComp.data.products || []).map((pid: string) => {
                                const p = allAvailableProducts.find(item => item.id === pid);
                                return (
                                  <div key={pid} className="flex items-center justify-between p-3 border rounded-2xl bg-gray-50 hover:bg-white transition-all shadow-sm group/row">
                                     <div className="flex items-center flex-1 truncate">
                                        <img src={p?.img} className="w-8 h-8 rounded-lg mr-2 object-cover border" />
                                        <span className="text-[10px] font-black text-gray-700 truncate">{p?.name}</span>
                                     </div>
                                     <button onClick={() => toggleProductInComp(pid)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><X size={14}/></button>
                                  </div>
                                );
                             })}
                          </div>
                       </div>
                    </div>
                  </section>
                )}
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-200 border-2 border-dashed border-gray-100 shadow-inner">
                   <Edit3 size={36} />
                </div>
                <div>
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] leading-loose">点击预览区域组件</p>
                   <p className="text-[9px] text-gray-300 uppercase tracking-widest">开启实时调优引擎</p>
                </div>
             </div>
           )}
           <div className="p-6 border-t bg-gray-50">
              <button className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-gray-300 hover:text-gray-600 transition-all shadow-sm">重置该模块默认参数</button>
           </div>
        </div>
      </div>

      {/* 选品弹窗 - 实时映射 */}
      {showProductPicker && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] w-full max-w-4xl h-[80vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300">
              <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
                 <div>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-gray-900 italic flex items-center">
                       <ShoppingBag size={28} className="mr-3 text-blue-600" /> 商品资产池 (Assets Picker)
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 ml-10 tracking-[0.2em]">Select items to populate the real-time component</p>
                 </div>
                 <button onClick={() => setShowProductPicker(false)} className="p-4 bg-white text-gray-400 hover:text-gray-900 rounded-full shadow-sm hover:shadow-xl transition-all"><X size={28} /></button>
              </div>
              <div className="p-6 bg-white flex items-center space-x-6 border-b">
                 <div className="relative flex-1">
                    <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input type="text" placeholder="键入商品 ID 或名称进行实时筛选..." className="w-full pl-16 pr-8 py-5 bg-gray-100 border-none rounded-[32px] text-sm font-black text-gray-800 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-gray-300" />
                 </div>
                 <button className="px-10 py-5 bg-gray-900 text-white rounded-[32px] text-[12px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">
                    搜索资产
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 scrollbar-hide bg-gray-50/30">
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {allAvailableProducts.map(p => {
                       const isSelected = selectedComp?.data.products?.includes(p.id);
                       return (
                         <div 
                           key={p.id}
                           onClick={() => toggleProductInComp(p.id)}
                           className={`p-6 rounded-[48px] border-2 transition-all cursor-pointer flex flex-col items-center group text-center relative ${isSelected ? 'border-blue-600 bg-white shadow-2xl shadow-blue-100 scale-105' : 'border-transparent bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-gray-100'}`}
                         >
                            <div className="relative w-full aspect-square mb-5">
                               <img src={p.img} className="w-full h-full rounded-[36px] object-cover shadow-md group-hover:rotate-1 transition-transform" />
                               {isSelected && (
                                 <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-in zoom-in">
                                    <Check size={24} />
                                 </div>
                               )}
                            </div>
                            <div className="text-[11px] font-black text-gray-900 mb-1 px-2 line-clamp-1 uppercase tracking-tight">{p.name}</div>
                            <div className="text-[14px] font-black text-blue-600 italic">￥{p.price.toLocaleString()}</div>
                         </div>
                       );
                    })}
                 </div>
              </div>
              <div className="p-8 border-t bg-gray-50 flex justify-between items-center shadow-inner">
                 <div className="flex items-center space-x-6">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">已选中装修资产</span>
                       <span className="text-3xl font-black text-blue-600 italic tracking-tighter">{selectedComp?.data.products?.length || 0} <span className="text-sm font-normal text-gray-400 ml-1">SKUS</span></span>
                    </div>
                    <div className="h-10 w-[1px] bg-gray-200"></div>
                    <p className="text-[10px] text-gray-400 italic max-w-xs leading-relaxed">选中的商品将实时呈现在中间预览画布的网格组件中，您可以随时移除或更换。</p>
                 </div>
                 <button onClick={() => setShowProductPicker(false)} className="px-20 py-5 bg-blue-600 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center group">
                    保存选品结果 <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DecorationEditor;
