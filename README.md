# Smart Tooltip System

一个智能的注释系统，能够自动检测屏幕边缘并调整弹出方向，避免注释内容超出可视区域。

[demo](https://yuuniji.github.io/smart-tooltip/)

## ✨ 特性

- 🎯 **智能定位**：自动检测屏幕边缘，智能调整弹出方向
- 🎨 **优雅动画**：流畅的淡入淡出效果和位移动画
- 📱 **响应式设计**：适配移动端和桌面端
- 🔧 **易于集成**：直接复制CSS即可使用
- ⚡ **轻量级**：纯CSS实现，无需额外JavaScript
- 🎭 **高度自定义**：支持CSS变量自定义颜色和样式

## 🚀 快速开始

### 文件
1. [smart-tooltip.css文件](/smart-tooltip.css)
2. [smart-tooltip.js文件(可选)](smart-tooltip.js)

### 使用注释

```html
这是一段包含<span class="note" data-note="这是注释内容">注释</span>的文字。
```

### 手动指定位置

当你需要手动控制注释显示位置时：

```html
<!-- 左侧显示 -->
<span class="note position-left" data-note="注释内容">文字</span>

<!-- 上方显示 -->
<span class="note position-top" data-note="注释内容">文字</span>

<!-- 左上方显示 -->
<span class="note position-left position-top" data-note="注释内容">文字</span>
```

### 自动位置检测（可选）

如果你想要完全自动化的位置检测，可以添加 `smart-tooltip.js`：

```html
<script src="path/to/smart-tooltip.js"></script>
```

## 🎨 自定义样式

系统使用CSS变量，你可以轻松自定义颜色：

```css
:root {
  --accent: #3b82f6;        /* 注释文字颜色 */
  --accent-hover: #1d4ed8;  /* 弹出框背景色 */
}
```

### 自定义弹出框样式

```css
.note::after {
  width: 250px;           /* 调整宽度 */
  font-size: 0.85em;      /* 调整字体大小 */
  border-radius: 8px;     /* 调整圆角 */
  /* 更多自定义... */
}
```

## 📱 响应式支持

系统内置响应式设计，在小屏幕设备上自动调整：

- 移动端：弹出框宽度自动缩小
- 触摸设备：优化触摸体验
- 高DPI屏幕：清晰的渲染效果

## 🔧 高级配置

### 位置类说明

| 类名 | 说明 | 使用场景 |
|------|------|----------|
| `position-left` | 左侧显示 | 元素靠近右边缘 |
| `position-right` | 右侧显示 | 元素靠近左边缘 |
| `position-top` | 上方显示 | 元素靠近底部 |
| 组合使用 | 对角显示 | 元素在角落位置 |

### JavaScript API

如果使用了 `smart-tooltip.js`，可以调用以下API：

```javascript
// 手动初始化
setupSmartTooltips();

// 为新添加的元素设置智能定位
document.querySelectorAll('.note').forEach(setupTooltipPosition);
```

## 📁 文件结构

```
smart-tooltip/
├── README.md                 # 项目说明
├── LICENSE                   # 开源许可证
├── smart-tooltip.css         # 主要CSS文件
├── smart-tooltip.js          # 可选JavaScript增强
├── index.html                # 演示页面
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

1. Fork这个仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个Pull Request

## 📝 更新日志

### v1.0.0 (2025-06-02)
- ✨ 初始版本发布
- 🎯 智能位置检测功能
- 🎨 优雅的动画效果
- 📱 响应式设计支持

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢Hugo社区的支持
- 灵感来源于现代Web设计趋势
- 特别感谢所有贡献者

## 📞 支持

如果你遇到问题或有建议：

- 📧 提交 [Issue](../../issues)
- 💬 参与 [Discussions](../../discussions)
- ⭐ 如果觉得有用，请给个星标！

---

<div align="center">
  <p>用 ❤️ 制作，为GitHub社区服务</p>
  <p>
    <a href="#top">回到顶部</a> •
    <a href="../../issues">报告Bug</a> •
    <a href="../../pulls">贡献代码</a>
  </p>
</div>
