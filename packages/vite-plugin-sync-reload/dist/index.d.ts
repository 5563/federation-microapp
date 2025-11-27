interface Options {
    role: 'remote' | 'host';
    host?: string;
}
export default function syncReloadPlugin(options: Options): {
    name: string;
    apply(config: any, { command }: any): boolean | "dev";
    buildEnd(error: any): Promise<void>;
    configureServer(server: any): void;
};
export {};
//# sourceMappingURL=index.d.ts.map