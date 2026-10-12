import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, Search, Sun, Moon, Clock, MapPin, Phone, Star, ChevronDown, Trash2, Truck, Store, Percent, ArrowRight, Menu as MenuIcon } from 'lucide-react';
import { menuItems, categories, upsells } from './data/menu';
import type { Product } from './data/menu';
import { useCartStore } from './store/cart';
import { useThemeStore } from './store/theme';

// ===== HEADER =====
function Header() {
  const { toggleCart, getItemCount } = useCartStore();
  const { isDark, toggle } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-card shadow-lg py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:animate-bounce transition-transform">🧀</span>
          <span className="font-[var(--font-heading)] font-bold text-xl text-brand-orange dark:text-white">
            Сыр-Сыр
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#menu" className="text-sm font-medium hover:text-brand-orange transition-colors dark:text-gray-200">Меню</a>
          <a href="#delivery" className="text-sm font-medium hover:text-brand-orange transition-colors dark:text-gray-200">Доставка</a>
          <a href="#contacts" className="text-sm font-medium hover:text-brand-orange transition-colors dark:text-gray-200">Контакты</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="smooth-radius-full p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Переключить тему"
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
          </button>

          {/* Cart button */}
          <motion.button
            onClick={toggleCart}
            className="smooth-radius btn-primary px-4 py-2 flex items-center gap-2 relative"
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline text-sm font-medium">Корзина</span>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
              >
                {itemCount}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 dark:text-white"
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-3">
              <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="py-2 font-medium dark:text-white">Меню</a>
              <a href="#delivery" onClick={() => setMobileMenuOpen(false)} className="py-2 font-medium dark:text-white">Доставка</a>
              <a href="#contacts" onClick={() => setMobileMenuOpen(false)} className="py-2 font-medium dark:text-white">Контакты</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ===== HERO SECTION =====
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-orange-50 to-yellow-50 dark:from-brand-darker dark:via-brand-dark dark:to-brand-gray" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-8xl opacity-20 animate-float hidden lg:block">🍕</div>
      <div className="absolute bottom-20 left-10 text-6xl opacity-20 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>🧀</div>
      <div className="absolute top-40 left-1/4 text-4xl opacity-10 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>🍅</div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="animate-pulse">🔥</span> Доставка от 30 минут
          </div>
          
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 dark:text-white">
            Самая <span className="text-brand-orange">сырная</span> пицца в городе
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            Горячая пицца из печи с тремя видами сыра. Доставка по Новочебоксарску или самовывоз с ул. Винокурова, 48А
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              className="smooth-radius btn-primary px-8 py-4 text-lg flex items-center gap-2"
            >
              Смотреть меню <ArrowRight size={20} />
            </a>
            <a
              href="tel:+79001234567"
              className="smooth-radius px-8 py-4 text-lg font-semibold border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-200 flex items-center gap-2 dark:border-orange-400 dark:text-orange-400"
            >
              <Phone size={20} /> Позвонить
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            <div>
              <div className="text-2xl font-bold text-brand-orange">4.9</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" /> 500+ отзывов
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-orange">30 мин</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Среднее время</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-orange">200₽</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Мин. заказ</div>
            </div>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative w-[420px] h-[420px]">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-yellow rounded-full opacity-20 blur-3xl" />
            <div className="absolute inset-8 bg-gradient-to-br from-brand-orange/20 to-brand-yellow/20 rounded-full animate-pulse-glow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://image.qwenlm.ai/generated-images/72d6bdab-9526-472e-9dcf-dd3f3864a9e0/_result.png"
                alt="Горячая пицца Сыр-Сыр"
                className="w-80 h-80 object-cover rounded-full shadow-2xl animate-float"
                style={{ transform: 'translateZ(0)' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== PRODUCT CARD =====
function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);
  const [added, setAdded] = useState(false);

  const currentPrice = product.sizes ? product.sizes[selectedSize].price : product.price;
  const displayPrice = product.isSale && product.salePrice ? product.salePrice : currentPrice;

  const handleAdd = () => {
    const size = product.sizes ? product.sizes[selectedSize].name : undefined;
    const sizePrice = product.sizes ? product.sizes[selectedSize].price : undefined;
    addItem(product, size, sizePrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="glass-card group hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        {/* Image area */}
        <div
          className="relative h-44 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={() => setShowQuickView(true)}
        >
          <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </span>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isHit && (
              <span className="smooth-radius-full bg-brand-orange text-white text-xs px-2 py-1 font-medium">
                🔥 Хит
              </span>
            )}
            {product.isNew && (
              <span className="smooth-radius-full bg-green-500 text-white text-xs px-2 py-1 font-medium">
                ✨ Новинка
              </span>
            )}
            {product.isSale && (
              <span className="smooth-radius-full bg-red-500 text-white text-xs px-2 py-1 font-medium">
                −{Math.round((1 - (product.salePrice || 0) / currentPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Quick view hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="smooth-radius-full bg-white/90 text-gray-800 px-3 py-1 text-xs font-medium">
              Быстрый просмотр
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-base mb-1 dark:text-white">{product.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Size selector */}
          {product.sizes && (
            <div className="flex gap-2 mb-3">
              {product.sizes.map((size, idx) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(idx)}
                  className={`smooth-radius-full px-3 py-1 text-xs font-medium transition-all ${
                    selectedSize === idx
                      ? 'bg-brand-orange text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          )}

          {/* Weight & calories */}
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span>{product.weight}</span>
            {product.calories && <span>• {product.calories}</span>}
          </div>

          {/* Price & Add button */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-brand-orange">
                {product.isSale ? product.salePrice : displayPrice} ₽
              </span>
              {product.isSale && (
                <span className="text-sm text-gray-400 line-through">{displayPrice} ₽</span>
              )}
            </div>
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.9 }}
              className={`smooth-radius-full w-10 h-10 flex items-center justify-center transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-brand-orange text-white hover:bg-orange-600'
              }`}
            >
              {added ? '✓' : <Plus size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ===== QUICK VIEW MODAL =====
function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState(0);

  const currentPrice = product.sizes ? product.sizes[selectedSize].price : product.price;

  const handleAdd = () => {
    const size = product.sizes ? product.sizes[selectedSize].name : undefined;
    const sizePrice = product.sizes ? product.sizes[selectedSize].price : undefined;
    addItem(product, size, sizePrice);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 smooth-radius-full w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors z-10"
        >
          <X size={16} className="dark:text-white" />
        </button>

        {/* Image */}
        <div className="h-52 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
          <span className="text-9xl">{product.image}</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold mb-2 dark:text-white">{product.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>

          {/* Nutrition */}
          {product.calories && (
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="text-center p-2 bg-orange-50 dark:bg-gray-700 rounded-xl">
                <div className="text-sm font-bold text-brand-orange">{product.calories}</div>
                <div className="text-xs text-gray-500">Калории</div>
              </div>
              <div className="text-center p-2 bg-orange-50 dark:bg-gray-700 rounded-xl">
                <div className="text-sm font-bold text-brand-orange">{product.protein}</div>
                <div className="text-xs text-gray-500">Белки</div>
              </div>
              <div className="text-center p-2 bg-orange-50 dark:bg-gray-700 rounded-xl">
                <div className="text-sm font-bold text-brand-orange">{product.fat}</div>
                <div className="text-xs text-gray-500">Жиры</div>
              </div>
              <div className="text-center p-2 bg-orange-50 dark:bg-gray-700 rounded-xl">
                <div className="text-sm font-bold text-brand-orange">{product.carbs}</div>
                <div className="text-xs text-gray-500">Углев.</div>
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-2 dark:text-white">Размер:</div>
              <div className="flex gap-3">
                {product.sizes.map((size, idx) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(idx)}
                    className={`smooth-radius px-4 py-2 text-sm font-medium transition-all ${
                      selectedSize === idx
                        ? 'bg-brand-orange text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {size.name} — {size.price} ₽
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Weight */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Вес: {product.weight}</div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            className="smooth-radius btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Добавить в корзину — {currentPrice} ₽
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ===== MENU SECTION =====
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  const filteredItems = menuItems
    .filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <section id="menu" className="py-16 px-4 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold mb-3 dark:text-white">
          Наше меню
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Выберите свою идеальную пиццу</p>
      </motion.div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по меню..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="smooth-radius w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="smooth-radius appearance-none px-4 py-3 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40 cursor-pointer"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Сначала дешёвые</option>
            <option value="price-desc">Сначала дорогие</option>
            <option value="name">По алфавиту</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`smooth-radius-full whitespace-nowrap px-5 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${
              activeCategory === cat.id
                ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/25'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl mb-4 block">😕</span>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Ничего не найдено</p>
          <p className="text-gray-400 text-sm mt-1">Попробуйте изменить запрос</p>
        </div>
      )}
    </section>
  );
}

// ===== CART DRAWER =====
function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, getTotal, getDeliveryCost, clearCart, addItem } = useCartStore();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const total = getTotal();
  const delivery = getDeliveryCost();
  const minOrder = 200;

  const applyPromo = () => {
    if (promoInput.toLowerCase() === 'сыр2024') {
      setPromoApplied(true);
    }
  };

  if (showOrderForm) {
    return <OrderForm onClose={() => setShowOrderForm(false)} />;
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={() => setCartOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-brand-dark z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-[var(--font-heading)] text-xl font-bold dark:text-white flex items-center gap-2">
                <ShoppingCart size={24} className="text-brand-orange" />
                Корзина
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="smooth-radius-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} className="dark:text-white" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-6xl mb-4">🛒</span>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Корзина пуста</p>
                  <p className="text-gray-400 text-sm">Добавьте что-нибудь вкусное!</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="smooth-radius btn-primary mt-6 px-6 py-3"
                  >
                    Перейти в меню
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <motion.div
                      key={`${item.product.id}_${item.selectedSize || 'default'}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                    >
                      <div className="w-16 h-16 bg-orange-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {item.product.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm dark:text-white truncate">{item.product.name}</h4>
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.selectedSize}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                              className="smooth-radius-full w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Minus size={14} className="dark:text-white" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                              className="smooth-radius-full w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Plus size={14} className="dark:text-white" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-brand-orange">
                              {(item.selectedSizePrice || item.product.price) * item.quantity} ₽
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id, item.selectedSize)}
                              className="smooth-radius-full p-1 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Upsells */}
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Добавить к заказу?</p>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                      {upsells.map((upsell) => (
                        <button
                          key={upsell.id}
                          onClick={() => {
                            addItem({
                              id: upsell.id,
                              name: upsell.name,
                              description: upsell.name,
                              price: upsell.price,
                              image: upsell.emoji,
                              category: 'snacks',
                              tags: [],
                              weight: '',
                            } as Product);
                          }}
                          className="smooth-radius-full whitespace-nowrap px-4 py-2 text-xs font-medium bg-orange-50 dark:bg-gray-800 text-brand-orange border border-orange-200 dark:border-gray-700 hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                        >
                          {upsell.emoji} {upsell.name} +{upsell.price}₽
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 p-5 space-y-4">
                {/* Promo */}
                {!promoApplied ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Промокод"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="smooth-radius flex-1 px-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                    />
                    <button
                      onClick={applyPromo}
                      className="smooth-radius px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Percent size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Percent size={16} /> Промокод «СЫР2024» применён (−10%)
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between dark:text-gray-300">
                    <span>Товары</span>
                    <span>{total} ₽</span>
                  </div>
                  <div className="flex justify-between dark:text-gray-300">
                    <span>Доставка</span>
                    <span>{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</span>
                  </div>
                  {delivery > 0 && (
                    <p className="text-xs text-gray-400">Бесплатная доставка от 300 ₽</p>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100 dark:border-gray-800 dark:text-white">
                    <span>Итого</span>
                    <span className="text-brand-orange">{total + delivery} ₽</span>
                  </div>
                </div>

                {/* Checkout button */}
                <button
                  onClick={() => {
                    if (total >= minOrder) {
                      setShowOrderForm(true);
                    }
                  }}
                  disabled={total < minOrder}
                  className={`smooth-radius w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    total >= minOrder
                      ? 'btn-primary'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {total < minOrder ? `Мин. заказ ${minOrder} ₽` : 'Оформить заказ'}
                </button>

                {total >= minOrder && (
                  <button
                    onClick={clearCart}
                    className="w-full text-center text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Очистить корзину
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ===== ORDER FORM =====
function OrderForm({ onClose }: { onClose: () => void }) {
  const { getTotal, getDeliveryCost, clearCart, setCartOpen } = useCartStore();
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    paymentMethod: 'card',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = getTotal();
  const delivery = getDeliveryCost();

  const handleSubmit = () => {
    // In production: send to backend → Frontpad API (new_order)
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setCartOpen(false);
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card max-w-sm w-full p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-6xl mb-4"
          >
            ✅
          </motion.div>
          <h3 className="font-[var(--font-heading)] text-xl font-bold mb-2 dark:text-white">Заказ оформлен!</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Мы уже начали готовить вашу пиццу. Ожидайте доставку через 30-40 минут.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] bg-white dark:bg-brand-dark overflow-y-auto">
      <div className="max-w-2xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold dark:text-white">Оформление заказа</h2>
          <button
            onClick={onClose}
            className="smooth-radius-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`smooth-radius-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? 'bg-brand-orange text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 rounded-full transition-all ${step > s ? 'bg-brand-orange' : 'bg-gray-200 dark:bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Order type & Contact */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Order type */}
            <div>
              <label className="text-sm font-medium mb-3 block dark:text-white">Способ получения</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`smooth-radius-lg p-4 flex flex-col items-center gap-2 transition-all ${
                    orderType === 'delivery'
                      ? 'bg-brand-orange/10 border-2 border-brand-orange'
                      : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                  }`}
                >
                  <Truck size={28} className={orderType === 'delivery' ? 'text-brand-orange' : 'text-gray-400'} />
                  <span className={`text-sm font-medium ${orderType === 'delivery' ? 'text-brand-orange' : 'dark:text-white'}`}>Доставка</span>
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`smooth-radius-lg p-4 flex flex-col items-center gap-2 transition-all ${
                    orderType === 'pickup'
                      ? 'bg-brand-orange/10 border-2 border-brand-orange'
                      : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                  }`}
                >
                  <Store size={28} className={orderType === 'pickup' ? 'text-brand-orange' : 'text-gray-400'} />
                  <span className={`text-sm font-medium ${orderType === 'pickup' ? 'text-brand-orange' : 'dark:text-white'}`}>Самовывоз</span>
                </button>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block dark:text-white">Имя *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="smooth-radius w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block dark:text-white">Телефон *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (900) 123-45-67"
                  className="smooth-radius w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block dark:text-white">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="smooth-radius w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                />
              </div>
            </div>

            {orderType === 'delivery' && (
              <div>
                <label className="text-sm font-medium mb-1 block dark:text-white">Адрес доставки *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Улица, дом, квартира"
                  className="smooth-radius w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                />
              </div>
            )}

            {orderType === 'pickup' && (
              <div className="smooth-radius-lg p-4 bg-orange-50 dark:bg-gray-800">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm dark:text-white">ул. Винокурова, 48А</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Новочебоксарск</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Пн-Чт, Вс: 11:00–21:30 | Пт-Сб: 11:00–22:30</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              className="smooth-radius btn-primary w-full py-4 text-lg"
            >
              Далее
            </button>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block dark:text-white">Способ оплаты</label>
              <div className="space-y-3">
                {[
                  { id: 'card', name: 'Банковская карта', icon: '💳', desc: 'Оплата онлайн через ЮKassa' },
                  { id: 'cash', name: 'Наличные', icon: '💵', desc: 'При получении' },
                  { id: 'sbp', name: 'СБП', icon: '📱', desc: 'Система быстрых платежей' },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`smooth-radius-lg w-full p-4 flex items-center gap-4 transition-all text-left ${
                      formData.paymentMethod === method.id
                        ? 'bg-brand-orange/10 border-2 border-brand-orange'
                        : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className={`font-medium text-sm ${formData.paymentMethod === method.id ? 'text-brand-orange' : 'dark:text-white'}`}>{method.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block dark:text-white">Комментарий к заказу</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Пожелания, код домофона..."
                rows={3}
                className="smooth-radius w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="smooth-radius flex-1 py-4 font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Назад
              </button>
              <button
                onClick={() => setStep(3)}
                className="smooth-radius btn-primary flex-1 py-4 text-lg"
              >
                Далее
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="smooth-radius-lg p-5 bg-gray-50 dark:bg-gray-800 space-y-3">
              <h3 className="font-semibold dark:text-white">Ваш заказ</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between dark:text-gray-300">
                  <span>Способ:</span>
                  <span>{orderType === 'delivery' ? '🚗 Доставка' : '🏪 Самовывоз'}</span>
                </div>
                <div className="flex justify-between dark:text-gray-300">
                  <span>Имя:</span>
                  <span>{formData.name || '—'}</span>
                </div>
                <div className="flex justify-between dark:text-gray-300">
                  <span>Телефон:</span>
                  <span>{formData.phone || '—'}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between dark:text-gray-300">
                    <span>Адрес:</span>
                    <span>{formData.address || '—'}</span>
                  </div>
                )}
                <div className="flex justify-between dark:text-gray-300">
                  <span>Оплата:</span>
                  <span>{formData.paymentMethod === 'card' ? '💳 Карта' : formData.paymentMethod === 'sbp' ? '📱 СБП' : '💵 Наличные'}</span>
                </div>
              </div>
            </div>

            <div className="smooth-radius-lg p-5 bg-gray-50 dark:bg-gray-800 space-y-2 text-sm">
              <div className="flex justify-between dark:text-gray-300">
                <span>Товары:</span>
                <span>{total} ₽</span>
              </div>
              <div className="flex justify-between dark:text-gray-300">
                <span>Доставка:</span>
                <span>{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700 dark:text-white">
                <span>Итого:</span>
                <span className="text-brand-orange">{total + delivery} ₽</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="smooth-radius flex-1 py-4 font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Назад
              </button>
              <button
                onClick={handleSubmit}
                className="smooth-radius btn-primary flex-[2] py-4 text-lg"
              >
                Подтвердить заказ
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ===== PROMO BANNER =====
function PromoBanner() {
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="smooth-radius-xl bg-gradient-to-r from-brand-orange to-orange-500 p-6 sm:p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 text-[120px] opacity-20 -rotate-12 translate-x-8 -translate-y-4">🧀</div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold mb-2">
              Промокод СЫР2024
            </h3>
            <p className="text-white/80 text-sm sm:text-base">
              Скидка 10% на первый заказ. Введите при оформлении!
            </p>
          </div>
          <div className="smooth-radius bg-white/20 backdrop-blur-sm px-6 py-3 text-center">
            <div className="text-2xl font-bold">−10%</div>
            <div className="text-xs text-white/70">на заказ</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ===== REVIEWS SECTION =====
function ReviewsSection() {
  const reviews = [
    { name: 'Анна К.', text: 'Лучшая пицца в городе! Сырный бортик — просто бомба. Заказываю каждую пятницу 🍕', rating: 5, emoji: '👩' },
    { name: 'Дмитрий П.', text: 'Доставили за 25 минут, пицца горячая, вкус невероятный. Рекомендую Четыре сыра!', rating: 5, emoji: '👨' },
    { name: 'Мария С.', text: 'Заказывали комбо на компанию — все остались довольны. Огромные порции и отличный вкус!', rating: 5, emoji: '👩‍🦰' },
    { name: 'Алексей В.', text: 'Наконец-то нормальная пиццерия в Новоcheбoksарске! Пепперони — топ 🔥', rating: 5, emoji: '🧔' },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold mb-3 dark:text-white">
          Отзывы наших гостей
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Более 500 довольных клиентов</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{review.emoji}</span>
              <div>
                <p className="font-medium text-sm dark:text-white">{review.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ===== DELIVERY INFO SECTION =====
function DeliverySection() {
  return (
    <section id="delivery" className="py-16 px-4 bg-gradient-to-b from-transparent to-orange-50/50 dark:to-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold mb-3 dark:text-white">
            Доставка и оплата
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Быстро, удобно, вкусно</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🚗',
              title: 'Доставка',
              desc: 'Бесплатно от 300 ₽. Стоимость доставки — 150 ₽. Среднее время — 30-40 минут.',
              color: 'from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20',
            },
            {
              icon: '🏪',
              title: 'Самовывоз',
              desc: 'ул. Винокурова, 48А. Пн-Чт, Вс: 11:00–21:30. Пт-Сб: 11:00–22:30.',
              color: 'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
            },
            {
              icon: '💳',
              title: 'Оплата',
              desc: 'Банковская карта, СБП, наличные при получении. Безопасно через ЮKassa.',
              color: 'from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`smooth-radius-xl p-6 bg-gradient-to-br ${item.color} dark:bg-gray-800`}
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="font-bold text-lg mb-2 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer id="contacts" className="bg-brand-darker dark:bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🧀</span>
              <span className="font-[var(--font-heading)] font-bold text-xl text-brand-orange">Сыр-Сыр</span>
            </div>
            <p className="text-sm text-gray-400">
              Самая сырная пиццерия Новочебоксарска. Готовим с любовью из свежих ингредиентов.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <a href="tel:+79001234567" className="flex items-center gap-2 hover:text-brand-orange transition-colors">
                <Phone size={16} /> +7 (900) 123-45-67
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>г. Новочебоксарск,<br />ул. Винокурова, 48А</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Пн-Чт, Вс: 11:00–21:30<br />Пт-Сб: 11:00–22:30</span>
              </div>
            </div>
          </div>

          {/* Menu links */}
          <div>
            <h4 className="font-semibold mb-4">Меню</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#menu" className="block hover:text-brand-orange transition-colors">Пиццы</a>
              <a href="#menu" className="block hover:text-brand-orange transition-colors">Закуски</a>
              <a href="#menu" className="block hover:text-brand-orange transition-colors">Комбо-наборы</a>
              <a href="#menu" className="block hover:text-brand-orange transition-colors">Напитки</a>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#delivery" className="block hover:text-brand-orange transition-colors">Доставка и оплата</a>
              <a href="#" className="block hover:text-brand-orange transition-colors">Акции</a>
              <a href="#" className="block hover:text-brand-orange transition-colors">О нас</a>
              <a href="#" className="block hover:text-brand-orange transition-colors">Политика конфиденциальности</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2024 Сыр-Сыр. Все права защищены. ИНН: 212XXXXXXX
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Принимаем:</span>
            <span className="text-lg">💳</span>
            <span className="text-lg">📱</span>
            <span className="text-lg">💵</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-darker transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <PromoBanner />
        <MenuSection />
        <ReviewsSection />
        <DeliverySection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
