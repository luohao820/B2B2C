
export enum Role {
  PLATFORM_ADMIN = 'platform_admin',
  SUPPLIER = 'supplier',
  CONSUMER = 'consumer'
}

export enum AdminMemberStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled'
}

export interface AdminPermission {
  id: string;
  name: string;
  path: string;
}

export interface AdminRole {
  id: string;
  name: string;
  permissions: string[]; // IDs of permissions
}

export interface AdminMember {
  id: string;
  username: string;
  real_name: string;
  role_id: string;
  status: AdminMemberStatus;
  email: string;
  phone: string;
  last_login?: string;
  created_at: string;
}

export enum SupplierStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FROZEN = 'frozen'
}

export enum ProductAuditStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum OrderStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  SHIPPED = 'shipped',
  RECEIVED = 'received',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDING = 'refunding',
  REFUNDED = 'refunded',
  CLOSED = 'closed'
}

export enum ActivityType {
  FULL_REDUCTION = 'full_reduction',
  TIMED_DISCOUNT = 'timed_discount',
  NEW_USER = 'new_user',
  COUPON = 'coupon'
}

export enum ActivityStatus {
  DRAFT = 'draft',
  RUNNING = 'running',
  PAUSED = 'paused',
  ENDED = 'ended'
}

export enum UserLevel {
  NEW = 'new',
  REGULAR = 'regular',
  VIP = 'vip',
  SVIP = 'svip'
}

export enum UserStatus {
  NORMAL = 'normal',
  DISABLED = 'disabled',
  FROZEN = 'frozen'
}

export enum SettlementStatus {
  PENDING = 'pending',
  CALCULATED = 'calculated',
  CONFIRMED = 'confirmed',
  PAID = 'paid'
}

export enum AfterSaleType {
  REFUND = 'refund',
  RETURN = 'return',
  EXCHANGE = 'exchange'
}

export enum AfterSaleStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  RETURNING = 'returning',
  REFUNDED = 'refunded',
  COMPLETED = 'completed'
}

// 业务属性：用于描述商品特征（如品牌、材质），不影响 SKU 生成
export interface ProductAttribute {
  id: string;
  name: string;
  type: 'select' | 'input' | 'checkbox';
  options?: string[];
  is_required: boolean;
}

// SKU 规格：用于生成变体（如颜色、尺码），每个组合对应一个 SKU
export interface ProductSpecification {
  id: string;
  name: string;
  values: string[];
  has_image: boolean; // 是否支持为该规格值上传图片（通常针对颜色）
}

export interface Category {
  id: number;
  name: string;
  parent_id?: number;
  icon?: string;
  attributes: ProductAttribute[]; // 绑定的业务属性
  specifications: ProductSpecification[]; // 绑定的 SKU 规格
  level: number;
}

export interface Supplier {
  supplier_id: string;
  supplier_name: string;
  contact_person: string;
  contact_phone: string;
  contact_email: string;
  business_license: string;
  license_image: string;
  tax_certificate?: string;
  status: SupplierStatus;
  audit_notes?: string;
  audit_time?: string;
  auditor?: string;
  settlement_rate: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  product_id: string;
  product_name: string;
  supplier_id: string;
  category_id: number;
  main_image: string;
  detail_images: string[];
  description: string;
  supply_price: number;
  platform_price: number;
  stock_quantity: number;
  min_purchase?: number;
  specs: Record<string, string[]>;
  sku_list: any[];
  audit_status: ProductAuditStatus;
  reject_reason?: string;
  is_on_shelf: boolean;
  created_at: string;
}

export interface Order {
  order_id: string;
  sub_order_id: string;
  user_id: string;
  supplier_id: string;
  order_amount: number;
  original_amount: number;
  discount_amount: number;
  mileage_deduction: number;
  payment_amount: number;
  order_status: OrderStatus;
  payment_status: 'unpaid' | 'paid' | 'refunded';
  payment_method?: string;
  payment_time?: string;
  shipping_address: any;
  products: any[];
  created_at: string;
}
