# 使用 Node.js 镜像作为基础镜像
FROM node:20

# 设置工作目录
WORKDIR /app

# 将 package.json 和 yarn.lock 复制到工作目录中
COPY package.json yarn.lock ./

# 安装项目依赖
RUN yarn install

# 将整个项目目录复制到工作目录中
COPY . .

# 构建 Next.js 应用程序
RUN yarn build

# 暴露 Next.js 应用程序默认端口（如果需要）
EXPOSE 3000

# 启动 Next.js 应用程序
CMD ["yarn", "start"]