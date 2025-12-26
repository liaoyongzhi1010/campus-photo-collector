#!/bin/bash

# Docker 镜像打包脚本
# 用于将应用打包成 Docker 镜像文件，方便分发

set -e

echo "=========================================="
echo "开始构建和打包 Docker 镜像"
echo "=========================================="

# 配置
IMAGE_NAME="campus-photo-collector"
IMAGE_TAG="latest"
OUTPUT_FILE="campus-photo-collector-docker.tar"

# 1. 构建镜像
echo ""
echo "步骤 1/2: 构建 Docker 镜像..."
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

# 2. 导出镜像
echo ""
echo "步骤 2/2: 导出镜像到文件..."
docker save -o ${OUTPUT_FILE} ${IMAGE_NAME}:${IMAGE_TAG}

# 压缩镜像文件（可选，减小文件大小）
echo ""
echo "压缩镜像文件..."
gzip -f ${OUTPUT_FILE}

echo ""
echo "=========================================="
echo "✓ 打包完成！"
echo "=========================================="
echo ""
echo "生成的文件: ${OUTPUT_FILE}.gz"
echo "文件大小: $(du -h ${OUTPUT_FILE}.gz | cut -f1)"
echo ""
echo "请将以下文件发送给老板："
echo "  1. ${OUTPUT_FILE}.gz (Docker 镜像)"
echo "  2. DEPLOYMENT.md (部署说明)"
echo ""
