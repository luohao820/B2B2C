
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Plus, Search, Edit3, Trash2, LayoutGrid, Tag, 
  CheckCircle, Clock, ChevronRight, Image as ImageIcon
} from 'lucide-react';
import { ProductAuditStatus } from '../../types';

const SupplierProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([
    {
      id: 'PROD_S_001',
      name: '极简主义纯棉 T 恤',
      category_name: '潮流服饰',
      supply_price: 89.00,
      stock: 1200,
      audit: ProductAuditStatus.APPROVED,
      main_image: 'https://picsum.photos/400/400?random=21'
    },
    {
      id: 'PROD_S_002',
      name: 'iPhone 15 Pro Max 钛金属版',
      category_name: '智能手机',
      supply_price: 8200.00,
      stock: 450,
      audit: ProductAuditStatus.PENDING,
      main_image: 'https://picsum.photos/400/400?random=10'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">商品档案资产库</h1>
           <p className="text-xs text-gray-400 mt-1 font-medium italic">管理数字化商品档案，通过精细化建模建立市场准入基础</p>
        </div>
        <button 
          onClick={() => navigate('/supplier/products/new')}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl flex items-center hover:bg-blue-700 transition shadow-lg shadow-blue-100 font-bold"
        >
          <Plus size={20} className="mr-2" /> 发布新数字化商品
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/20">
           <div className="relative w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="搜索商品名称或 UID..." className="w-full pl-12 pr-4 py-2.5 border rounded-2xl text-xs outline-none" />
           </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="py-5 px-8">商品画册与标识</th>
              <th className="py-5 px-6">挂载类目</th>
              <th className="py-5 px-6">供货价 (￥)</th>
              <th className="py-5 px-6">审核状态</th>
              <th className="py-5 px-8 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition group">
                <td className="py-5 px-8">
                  <div className="flex items-center">
                    <img src={p.main_image} className="w-12 h-12 rounded-xl object-cover mr-4 shadow-sm border" />
                    <div>
                      <div className="text-sm font-black text-gray-900 group-hover:text-blue-600">{p.name}</div>
                      <div className="text-[9px] text-gray-400 font-mono mt-0.5 uppercase tracking-tighter">UID: {p.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 uppercase italic">{p.category_name}</span>
                </td>
                <td className="py-5 px-6 font-black text-gray-900 italic">￥{p.supply_price.toFixed(2)}</td>
                <td className="py-5 px-6">
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase border ${p.audit === ProductAuditStatus.APPROVED ? 'bg-green-50 text-green-600 border-green-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                    {p.audit}
                  </span>
                </td>
                <td className="py-5 px-8 text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => navigate(`/supplier/products/edit/${p.id}`)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-blue-100"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button className="p-2 text-gray-300 hover:text-red-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-red-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierProducts;
