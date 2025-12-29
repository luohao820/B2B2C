
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, Gift, CreditCard, 
  RotateCcw, BarChart3, Paintbrush, Store, User as UserIcon, Home,
  Bell, MapPin, Clock, ListTree, FilePieChart, Boxes, Settings2,
  ChevronDown, ChevronRight, Monitor, Database, Grid3X3, ShieldAlert,
  UserPlus, Key
} from 'lucide-react';
import { Role } from './types';

// Admin Components
import PlatformDashboard from './pages/platform/Dashboard';
import SupplierManagement from './pages/platform/Suppliers';
import ProductAudit from './pages/platform/ProductAudit';
import OrderManagement from './pages/platform/Orders';
import MarketingManagement from './pages/platform/Marketing';
import MarketingProducts from './pages/platform/MarketingProducts';
import UserManagement from './pages/platform/Users';
import SettlementManagement from './pages/platform/Settlements';
import AfterSaleManagement from './pages/platform/AfterSales';
import DecorationList from './pages/platform/DecorationList';
import DecorationEditor from './pages/platform/Decoration';
import CategoryManagement from './pages/platform/Categories';
import AttributeManagement from './pages/platform/Attributes';
import SpecificationManagement from './pages/platform/Specifications';
import ProductReports from './pages/platform/ProductReports';
import MemberManagement from './pages/common/MemberManagement';
import SecuritySettings from './pages/common/SecuritySettings';

// Supplier Components
import SupplierProducts from './pages/supplier/Products';
import SupplierProductEdit from './pages/supplier/ProductEdit'; // 新增编辑页
import SupplierOrders from './pages/supplier/Orders';
import SupplierAfterSales from './pages/supplier/AfterSales';
import SupplierSettlement from './pages/supplier/Settlement';
import ReturnAddress from './pages/supplier/ReturnAddress';
import InventoryManagement from './pages/supplier/Inventory';
import NotificationSettings from './pages/supplier/NotificationSettings';

// Consumer Components
import H5Home from './pages/consumer/Home';
import H5ProductDetail from './pages/consumer/ProductDetail';
import H5Cart from './pages/consumer/Cart';
import H5OrderConfirm from './pages/consumer/OrderConfirm';
import H5OrderList from './pages/consumer/OrderList';
import H5AddressList from './pages/consumer/AddressList';
import H5Profile from './pages/consumer/Profile';
import H5Login from './pages/consumer/Login';

const AdminSidebar: React.FC<{ role: Role }> = ({ role }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const menuItems = role === Role.PLATFORM_ADMIN ? [
    { name: '控制台', path: '/platform/dashboard', icon: LayoutDashboard },
    { name: '供应商管理', path: '/platform/suppliers', icon: Store },
    { 
      name: '商品管理中心', icon: Package,
      children: [
        { name: '类目架构定义', path: '/platform/categories' },
        { name: '属性特征库', path: '/platform/attributes' },
        { name: '规格变体库', path: '/platform/specifications' },
        { name: '商品定价审核', path: '/platform/product-audit' },
        { name: '销售报表分析', path: '/platform/reports' },
      ]
    },
    { 
      name: '交易中心', icon: ShoppingCart,
      children: [
        { name: '平台订单管理', path: '/platform/orders' },
        { name: '售后维权仲裁', path: '/platform/after-sales' },
      ]
    },
    { 
      name: '运营中心', icon: Gift,
      children: [
        { name: '营销活动配置', path: '/platform/marketing' },
        { name: '页面装修视觉', path: '/platform/decoration' },
      ]
    },
    { name: '用户管理', path: '/platform/users', icon: Users },
    { name: '结算管理', path: '/platform/settlements', icon: CreditCard },
    { 
      name: '系统设置', icon: Settings2,
      children: [
        { name: '成员与权限', path: '/platform/members' },
        { name: '安全设置', path: '/platform/security' },
      ]
    },
  ] : [
    { 
      name: '商品与库存', icon: Package,
      children: [
        { name: '商品档案维护', path: '/supplier/products' },
        { name: '库存动态调配', path: '/supplier/inventory' },
      ]
    },
    { 
      name: '履约中心', icon: ShoppingCart,
      children: [
        { name: '待发货订单', path: '/supplier/orders' },
        { name: '售后退换处理', path: '/supplier/after-sales' },
      ]
    },
    { name: '财务结算', path: '/supplier/settlements', icon: BarChart3 },
    { 
      name: '店铺设置', icon: Settings2,
      children: [
        { name: '成员管理', path: '/supplier/members' },
        { name: '通知提醒配置', path: '/supplier/notifications' },
        { name: '退货地址管理', path: '/supplier/addresses' },
        { name: '安全设置', path: '/supplier/security' },
      ]
    },
  ];

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col fixed left-0 top-16 bottom-0 z-10 hidden md:flex">
      <div className="flex-1 overflow-y-auto py-6 space-y-1">
        {menuItems.map((item) => (
          <div key={item.name} className="px-3">
            {item.children ? (
              <div className="mb-1">
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <item.icon size={18} className="mr-3" />
                    <span>{item.name}</span>
                  </div>
                </div>
                <div className="mt-1 ml-4 border-l-2 border-gray-100 space-y-1">
                  {item.children.map((child) => (
                    <Link key={child.path} to={child.path} className={`flex items-center px-6 py-2 text-xs font-bold transition-all rounded-r-xl ${location.pathname === child.path ? 'text-blue-600 bg-blue-50/50 border-l-2 border-blue-600 -ml-[2px]' : 'text-gray-500 hover:text-gray-900'}`}>{child.name}</Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link to={item.path!} className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all mb-1 ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                <item.icon size={18} className="mr-3" /> {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Header: React.FC<{ role: Role, setRole: (role: Role) => void }> = ({ role, setRole }) => (
  <header className="h-16 bg-white border-b flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-20 shadow-sm">
    <div className="flex items-center space-x-4">
      <div className="text-xl font-black text-gray-900 flex items-center italic uppercase tracking-tighter">
        <ShoppingCart className="mr-2 text-blue-600" size={24} /> B2B2C<span className="text-blue-600 ml-1">Connect</span>
      </div>
      <div className="hidden lg:flex items-center bg-gray-100 rounded-xl p-1 ml-6 border">
        <button onClick={() => setRole(Role.PLATFORM_ADMIN)} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${role === Role.PLATFORM_ADMIN ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Platform</button>
        <button onClick={() => setRole(Role.SUPPLIER)} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${role === Role.SUPPLIER ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Supplier</button>
        <button onClick={() => setRole(Role.CONSUMER)} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${role === Role.CONSUMER ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Consumer H5</button>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [role, setRole] = useState<Role>(Role.PLATFORM_ADMIN);
  return (
    <HashRouter>
      <div className="min-h-screen text-gray-900">
        {role !== Role.CONSUMER ? (
          <>
            <Header role={role} setRole={setRole} />
            <AdminSidebar role={role} />
            <main className="md:ml-64 pt-16 min-h-screen bg-gray-50/50 p-8">
              <Routes>
                <Route path="/platform/dashboard" element={<PlatformDashboard />} />
                <Route path="/platform/suppliers" element={<SupplierManagement />} />
                <Route path="/platform/categories" element={<CategoryManagement />} />
                <Route path="/platform/attributes" element={<AttributeManagement />} />
                <Route path="/platform/specifications" element={<SpecificationManagement />} />
                <Route path="/platform/product-audit" element={<ProductAudit />} />
                <Route path="/platform/orders" element={<OrderManagement />} />
                <Route path="/platform/marketing" element={<MarketingManagement />} />
                <Route path="/platform/users" element={<UserManagement />} />
                <Route path="/platform/settlements" element={<SettlementManagement />} />
                <Route path="/platform/after-sales" element={<AfterSaleManagement />} />
                <Route path="/platform/reports" element={<ProductReports />} />
                <Route path="/platform/decoration" element={<DecorationList />} />
                <Route path="/platform/decoration/edit/:id" element={<DecorationEditor />} />
                <Route path="/platform/members" element={<MemberManagement type="platform" />} />
                <Route path="/platform/security" element={<SecuritySettings />} />
                
                <Route path="/supplier/products" element={<SupplierProducts />} />
                <Route path="/supplier/products/new" element={<SupplierProductEdit />} />
                <Route path="/supplier/products/edit/:id" element={<SupplierProductEdit />} />
                <Route path="/supplier/inventory" element={<InventoryManagement />} />
                <Route path="/supplier/orders" element={<SupplierOrders />} />
                <Route path="/supplier/after-sales" element={<SupplierAfterSales />} />
                <Route path="/supplier/settlements" element={<SupplierSettlement />} />
                <Route path="/supplier/notifications" element={<NotificationSettings />} />
                <Route path="/supplier/addresses" element={<ReturnAddress />} />
                <Route path="/supplier/members" element={<MemberManagement type="supplier" />} />
                <Route path="/supplier/security" element={<SecuritySettings />} />
                <Route path="/" element={<Navigate to={role === Role.PLATFORM_ADMIN ? "/platform/dashboard" : "/supplier/products"} />} />
              </Routes>
            </main>
          </>
        ) : (
          <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative pb-16 text-gray-900">
            {/* H5 Routes */}
            <Routes>
              <Route path="/consumer/home" element={<H5Home />} />
              <Route path="/consumer/product/:id" element={<H5ProductDetail />} />
              <Route path="/consumer/cart" element={<H5Cart />} />
              <Route path="/consumer/profile" element={<H5Profile />} />
              <Route path="/" element={<Navigate to="/consumer/home" />} />
            </Routes>
          </div>
        )}
      </div>
    </HashRouter>
  );
};
export default App;
