document.addEventListener('DOMContentLoaded', function() {
  // 初始化移动导航菜单
  initMobileNav();
  
  // 初始化滚动到顶部按钮
  initBackToTop();
  
  // 初始化平滑滚动
  initSmoothScroll();
  
  // 更新页脚年份
  updateFooterYear();
  
  // 初始化产品交互
  initProductInteractions();
  
  // 添加淡入动画
  initFadeInAnimations();
  
  // 初始化图片懒加载
  initLazyLoading();
});

// 图片懒加载处理
function initLazyLoading() {
  // 检查浏览器是否原生支持懒加载
  if ('loading' in HTMLImageElement.prototype) {
    // 浏览器支持原生懒加载，无需额外处理
    console.log('Browser supports native lazy loading');
  } else {
    // 浏览器不支持原生懒加载，使用Intersection Observer实现
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src || lazyImage.src;
            imageObserver.unobserve(lazyImage);
          }
        });
      });
      
      lazyImages.forEach(image => {
        imageObserver.observe(image);
      });
    } else {
      // 回退方案：简单地加载所有图片
      lazyImages.forEach(image => {
        image.src = image.dataset.src || image.src;
      });
    }
  }
}

// 移动导航菜单
function initMobileNav() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
    
    // 点击导航链接后关闭菜单
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('active');
          mobileNavToggle.classList.remove('active');
          document.body.classList.remove('nav-open');
        }
      });
    });
  }
}

// 滚动到顶部按钮
function initBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    // 监听滚动事件
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // 点击滚动到顶部
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 平滑滚动到锚点
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 获取header高度作为偏移量
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 更新页脚年份
function updateFooterYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// 产品交互
function initProductInteractions() {
  // 收藏按钮交互
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
      const heartIcon = this.querySelector('.heart-icon');
      
      if (heartIcon.textContent === '♡') {
        heartIcon.textContent = '♥';
        heartIcon.style.color = '#e74c3c';
        
        // 显示收藏成功提示
        showToast('Added to wishlist');
      } else {
        heartIcon.textContent = '♡';
        heartIcon.style.color = '';
        
        // 显示移除收藏提示
        showToast('Removed from wishlist');
      }
    });
  });
  
  // 加入购物车按钮交互
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 获取产品信息
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      
      // 添加到购物车动画
      this.classList.add('adding');
      
      // 显示添加成功提示
      showToast(`${productName} added to cart`);
      
      // 移除动画类
      setTimeout(() => {
        this.classList.remove('adding');
      }, 1000);
    });
  });
}

// 显示提示消息
function showToast(message) {
  // 检查是否已存在toast元素
  let toast = document.querySelector('.toast');
  
  if (!toast) {
    // 创建toast元素
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
    
    // 添加样式
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
  }
  
  // 设置消息内容
  toast.textContent = message;
  
  // 显示toast
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // 3秒后隐藏
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3000);
}

// 添加淡入动画
function initFadeInAnimations() {
  // 获取所有需要添加动画的元素
  const animatedElements = document.querySelectorAll('.hero, .section-header, .product-card, .feature, .testimonial');
  
  // 创建Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // 动画只执行一次
      }
    });
  }, {
    threshold: 0.1, // 当元素10%可见时触发
    rootMargin: '0px 0px 50px 0px' // 提前50px触发，使动画更流畅
  });
  
  // 观察所有元素
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // 为移动设备添加触摸滑动支持
  if ('ontouchstart' in window) {
    initTouchSwipe();
  }
}

// 添加触摸滑动支持
function initTouchSwipe() {
  const testimonialContainer = document.querySelector('.testimonials-container');
  
  if (!testimonialContainer) return;
  
  let startX, moveX, startY, moveY;
  let isScrolling;
  
  testimonialContainer.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isScrolling = undefined;
  }, false);
  
  testimonialContainer.addEventListener('touchmove', function(e) {
    moveX = e.touches[0].clientX;
    moveY = e.touches[0].clientY;
    
    // 检测是垂直滚动还是水平滑动
    if (isScrolling === undefined) {
      isScrolling = Math.abs(moveY - startY) > Math.abs(moveX - startX);
    }
    
    // 如果是水平滑动，阻止默认行为
    if (!isScrolling) {
      e.preventDefault();
    }
  }, false);
  
  testimonialContainer.addEventListener('touchend', function(e) {
    if (isScrolling) return;
    
    const diff = startX - moveX;
    
    // 如果滑动距离足够大，执行滑动操作
    if (Math.abs(diff) > 50) {
      // 这里可以添加滑动切换逻辑
      console.log('Swiped ' + (diff > 0 ? 'left' : 'right'));
      
      // 添加滑动动画效果
      testimonialContainer.style.transition = 'transform 0.3s ease';
      testimonialContainer.style.transform = `translateX(${diff > 0 ? '-10px' : '10px'})`;
      
      setTimeout(() => {
        testimonialContainer.style.transition = '';
        testimonialContainer.style.transform = '';
      }, 300);
    }
  }, false);
}

// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
  // 处理联系表单提交
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 模拟表单提交
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // 更改按钮状态
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="loader"></span> Sending...';
      
      // 模拟API请求延迟
      setTimeout(() => {
        // 重置表单
        contactForm.reset();
        
        // 恢复按钮状态
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // 显示成功消息
        showToast('Your message has been sent successfully. We will get back to you soon!');
      }, 1500);
    });
  }
  
  // 处理订阅表单提交
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 获取邮箱输入
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // 模拟API请求延迟
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // 更改按钮状态
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="loader"></span> 处理中...';
      
      setTimeout(() => {
        // 重置表单
        newsletterForm.reset();
        
        // 恢复按钮状态
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // 显示成功消息
        showToast(`Thank you for subscribing! A confirmation email has been sent to ${email}`);
      }, 1500);
    });
  }
});