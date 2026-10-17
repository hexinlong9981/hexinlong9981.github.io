# hexinlong9981.github.io

何鑫龙（He Xinlong）的简历页面（日本語・English・中文），通过 GitHub Pages 发布：<https://hexinlong9981.github.io/>

| 路径 | 内容 |
|---|---|
| `index.html` | 按浏览器语言跳转到 `ja/`・`en/`・`zh/` |
| `zh/index.html` | 中文版（原文） |
| `ja/index.html` | 日语版（汉字注假名、片假名注英文，可用按钮隐藏） |
| `en/index.html` | 英语版 |
| `assets/` | 共用的样式与脚本（明暗主题、手机导航、打印样式） |

修改内容时先改中文版，再同步日语版和英语版。日语版的注音由 echolab_work 的
`learning/tools/add_furigana.py` 生成（可重复运行）：

```bash
/projects2/echolab_work/learning/tools/.venv/bin/python /projects2/echolab_work/learning/tools/add_furigana.py \
  --dir /projects2/hexinlong9981.github.io/ja
```

重新生成注音后，要把下面几处读音改回（辞典读错）：日本＝に・ほん、明＝めい（明暗按钮）、1日・17日＝にち、6月＝がつ、14本＝ほん。

浏览器的“打印 → 另存为 PDF”可以得到单栏的纸质版简历。
