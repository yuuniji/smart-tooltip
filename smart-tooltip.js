/*!
 * Smart Tooltip System - JavaScript Enhancement
 * 自动位置检测和智能定位功能
 * https://github.com/yuuniji/smart-tooltip
 *
 * Copyright (c) 2025
 * Licensed under MIT License
 */

(function() {
  'use strict';

  // 配置选项
  const CONFIG = {
    tooltipWidth: 200,
    tooltipHeight: 100,
    margin: 20,
    selector: '.note',
    enableAutoPosition: true,
    enableTouch: true
  };

  /**
   * 检测元素位置并设置适当的CSS类
   * @param {HTMLElement} element - 需要检测的元素
   */
  function setTooltipPosition(element) {
    // 重置所有位置类
    element.classList.remove('position-left', 'position-right', 'position-top');
    
    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let shouldPositionLeft = false;
    let shouldPositionRight = false;
    let shouldPositionTop = false;
    
    // 检测水平位置
    if (rect.right + CONFIG.tooltipWidth > windowWidth - CONFIG.margin) {
      // 靠近右边缘，弹出框应该在左侧
      shouldPositionLeft = true;
    } else if (rect.left < CONFIG.tooltipWidth + CONFIG.margin) {
      // 靠近左边缘，弹出框应该在右侧
      shouldPositionRight = true;
    }
    
    // 检测垂直位置
    if (rect.bottom + CONFIG.tooltipHeight > windowHeight - CONFIG.margin) {
      // 靠近底部，弹出框应该在上方
      shouldPositionTop = true;
    }
    
    // 应用位置类
    if (shouldPositionLeft) element.classList.add('position-left');
    if (shouldPositionRight) element.classList.add('position-right');
    if (shouldPositionTop) element.classList.add('position-top');
  }

  /**
   * 为所有注释元素设置智能定位
   */
  function setupSmartTooltips() {
    const notes = document.querySelectorAll(CONFIG.selector);
    
    notes.forEach(note => {
      // 鼠标悬停时检测位置
      note.addEventListener('mouseenter', function() {
        if (CONFIG.enableAutoPosition) {
          setTooltipPosition(this);
        }
      });

      // 触摸设备支持
      if (CONFIG.enableTouch) {
        note.addEventListener('touchstart', function(e) {
          if (CONFIG.enableAutoPosition) {
            setTooltipPosition(this);
          }
          // 阻止默认行为，避免触发hover
          e.preventDefault();
          
          // 模拟hover效果
          this.classList.add('touch-active');
          
          // 点击其他地方时移除hover效果
          const removeTouch = (event) => {
            if (!this.contains(event.target)) {
              this.classList.remove('touch-active');
              document.removeEventListener('touchstart', removeTouch);
            }
          };
          
          setTimeout(() => {
            document.addEventListener('touchstart', removeTouch);
          }, 100);
        });
      }
    });
  }

  /**
   * 窗口大小改变时重新计算位置
   */
  function handleResize() {
    const notes = document.querySelectorAll(CONFIG.selector + ':hover');
    notes.forEach(note => {
      if (CONFIG.enableAutoPosition) {
        setTooltipPosition(note);
      }
    });
  }

  /**
   * 初始化函数
   */
  function init() {
    // DOM加载完成后设置
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupSmartTooltips);
    } else {
      setupSmartTooltips();
    }

    // 窗口大小改变时重新计算
    window.addEventListener('resize', debounce(handleResize, 150));

    // 监听新添加的元素（使用MutationObserver）
    if (window.MutationObserver) {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              const newNotes = node.querySelectorAll ?
                node.querySelectorAll(CONFIG.selector) : [];
              
              if (node.matches && node.matches(CONFIG.selector)) {
                setupSmartTooltips();
              } else if (newNotes.length > 0) {
                setupSmartTooltips();
              }
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  /**
   * 防抖函数
   * @param {Function} func - 要防抖的函数
   * @param {number} wait - 等待时间
   * @returns {Function} 防抖后的函数
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 触摸设备的CSS支持
  if (CONFIG.enableTouch) {
    const style = document.createElement('style');
    style.textContent = `
      .note.touch-active::after,
      .note.touch-active::before {
        display: block !important;
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .note.touch-active.position-right::after {
        transform: translateY(-50%) !important;
      }
      
      .note.touch-active.position-left::after {
        transform: translateY(-50%) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 公开API
  window.SmartTooltip = {
    init: init,
    setup: setupSmartTooltips,
    setPosition: setTooltipPosition,
    config: CONFIG
  };

  // 自动初始化
  init();

})();
