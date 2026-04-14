#!/bin/bash
# 从Figma MCP服务器下载图标

# Arrow Right (箭头右)
curl -s -o arrow-right.svg "http://localhost:3845/assets/arrow-right.svg" 2>/dev/null || echo "Arrow Right not found"

# Arrow Down (下拉箭头)  
curl -s -o arrow-down.svg "http://localhost:3845/assets/arrow-down.svg" 2>/dev/null || echo "Arrow Down not found"

# Search (搜索)
curl -s -o search.svg "http://localhost:3845/assets/search.svg" 2>/dev/null || echo "Search not found"

# Close (关闭X)
curl -s -o close.svg "http://localhost:3845/assets/close.svg" 2>/dev/null || echo "Close not found"

echo "Icons download completed"
ls -lh *.svg | grep -E "arrow|search|close|info"
