# 校园照片收集平台 - 部署说明

## 📦 文件说明

本部署包包含：
- `campus-photo-collector-docker.tar.gz` - Docker 镜像文件
- `DEPLOYMENT.md` - 本部署说明文档（即本文件）

## 🚀 快速部署

### 前置要求

确保服务器已安装 Docker：
```bash
# 检查 Docker 是否安装
docker --version

# 如果未安装，请先安装 Docker
# Ubuntu/Debian: sudo apt-get install docker.io
# CentOS/RHEL: sudo yum install docker
# macOS: 下载 Docker Desktop
```

### 步骤 1: 导入镜像

解压并导入 Docker 镜像：

```bash
# 解压镜像文件
gunzip campus-photo-collector-docker.tar.gz

# 导入镜像到 Docker
docker load -i campus-photo-collector-docker.tar

# 验证镜像已导入
docker images | grep campus-photo-collector
```

### 步骤 2: 运行容器

```bash
# 启动容器（端口 3000）
docker run -d \\
  --name campus-photo-collector \\
  -p 3000:3000 \\
  -v campus_data:/app/data \\
  -v campus_uploads:/app/public/uploads \\
  --restart unless-stopped \\
  campus-photo-collector:latest

# 查看运行状态
docker ps | grep campus-photo-collector
```

### 步骤 3: 访问应用

在浏览器中打开：
- **本地访问**: http://localhost:3000
- **远程访问**: http://服务器IP:3000

## 📊 数据持久化

应用使用 Docker 卷存储数据，即使容器删除，数据也不会丢失：

- **campus_data**: 存储 SQLite 数据库（`/app/data`）
- **campus_uploads**: 存储用户上传的照片（`/app/public/uploads`）

## 🔧 常用管理命令

### 查看日志
```bash
# 查看实时日志
docker logs -f campus-photo-collector

# 查看最近 100 行日志
docker logs --tail 100 campus-photo-collector
```

### 停止/启动/重启
```bash
# 停止容器
docker stop campus-photo-collector

# 启动容器
docker start campus-photo-collector

# 重启容器
docker restart campus-photo-collector
```

### 删除容器
```bash
# 停止并删除容器（数据卷不会被删除）
docker stop campus-photo-collector
docker rm campus-photo-collector
```

### 数据备份

```bash
# 备份数据库
docker cp campus-photo-collector:/app/data/photos.db ./photos-backup.db

# 备份上传的照片
docker run --rm -v campus_uploads:/data -v $(pwd):/backup \\
  alpine tar czf /backup/uploads-backup.tar.gz -C /data .
```

### 数据恢复

```bash
# 恢复数据库
docker cp ./photos-backup.db campus-photo-collector:/app/data/photos.db
docker restart campus-photo-collector

# 恢复上传的照片
docker run --rm -v campus_uploads:/data -v $(pwd):/backup \\
  alpine tar xzf /backup/uploads-backup.tar.gz -C /data
```

## 🌐 生产环境部署建议

### 使用 Nginx 反向代理（推荐）

如果需要使用域名访问或配置 HTTPS，建议使用 Nginx：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 修改端口

如果 3000 端口被占用，可以修改映射端口：

```bash
# 使用 8080 端口
docker run -d \\
  --name campus-photo-collector \\
  -p 8080:3000 \\
  -v campus_data:/app/data \\
  -v campus_uploads:/app/public/uploads \\
  --restart unless-stopped \\
  campus-photo-collector:latest
```

然后访问 http://localhost:8080

## 🔍 故障排查

### 容器无法启动
```bash
# 查看详细错误信息
docker logs campus-photo-collector

# 检查端口是否被占用
netstat -tuln | grep 3000
# 或使用 lsof -i :3000
```

### 数据丢失
- 确保使用了 `-v` 参数挂载数据卷
- 不要使用 `docker rm -v` 删除容器（会同时删除卷）

### 权限问题
```bash
# 如果遇到权限错误，检查数据卷权限
docker exec -it campus-photo-collector ls -la /app/data
```

## 📞 技术支持

如有问题，请联系开发团队或查看项目文档。

---

**部署时间**: $(date)
**镜像版本**: latest
