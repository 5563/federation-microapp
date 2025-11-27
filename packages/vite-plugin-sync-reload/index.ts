interface Options {
  role: 'remote' | 'host';
  host?: string;
}
export default function syncReloadPlugin(options: Options) {
  const role = options.role;
  const hostUrl = options.host;

  return {
    name: 'vite-plugin-sync-reload',

    apply(config: any, { command }: any) {
      if (role !== 'remote') return 'dev';
      return Boolean(command === 'build' && config.build?.watch);
    },

    async buildEnd(error: any) {
      if (role !== 'remote') return;
      if (error) return;

      try {
        await fetch(`${hostUrl}/__fullReload`);
        console.log(`[remote] 已通知 host 刷新`);
      } catch (e) {
        console.log(`[remote] 通知 host 失败（可能 host 未启动）`);
      }
    },

    configureServer(server: any) {
        console.log('req-=======', server)

      if (role !== 'host') return;

      server.middlewares.use((req: any, res: any, next: any) => {

          // remote build 后会访问这里
          if (req.url === '/__fullReload') {

            console.log('[host] 收到 remote 通知，即将刷新页面');

            // 触发浏览器刷新
            setTimeout(() =>{
              server.hot.send({
                type: 'full-reload'
              });
            },100)

            res.end('Full reload triggered');
          } else {
            next(); // 继续下一个中间件
          }
        });
    }
  };
}
