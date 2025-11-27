export default function syncReloadPlugin(options) {
    const role = options.role;
    const hostUrl = options.host;
    return {
        name: 'vite-plugin-sync-reload',
        apply(config, { command }) {
            var _a;
            if (role !== 'remote')
                return 'dev';
            return Boolean(command === 'build' && ((_a = config.build) === null || _a === void 0 ? void 0 : _a.watch));
        },
        async buildEnd(error) {
            if (role !== 'remote')
                return;
            if (error)
                return;
            try {
                await fetch(`${hostUrl}/__fullReload`);
                console.log(`[remote] 已通知 host 刷新`);
            }
            catch (e) {
                console.log(`[remote] 通知 host 失败（可能 host 未启动）`);
            }
        },
        configureServer(server) {
            console.log('req-=======', server);
            if (role !== 'host')
                return;
            server.middlewares.use((req, res, next) => {
                // remote build 后会访问这里
                if (req.url === '/__fullReload') {
                    console.log('[host] 收到 remote 通知，即将刷新页面');
                    // 触发浏览器刷新
                    setTimeout(() => {
                        server.hot.send({
                            type: 'full-reload'
                        });
                    }, 100);
                    res.end('Full reload triggered');
                }
                else {
                    next(); // 继续下一个中间件
                }
            });
        }
    };
}
